"""Deterministic bank-to-ledger matching.

Rule order is fixed:

1. Exact amount, date, and reference become a cleared match when the pair is unique.
2. Exact amount and reference inside the date window become a cleared timing match.
3. Exact amount inside the window with a blank reference becomes a suggestion.
4. A small amount difference with the same reference becomes a suggestion.
5. A unique 2-line or 3-line sum becomes a suggestion.

Ambiguous candidates are not cleared. Same-side repeats inside two days are
flagged as possible duplicates before matching, so one keeper can still clear.
"""

from __future__ import annotations

import re
from collections import defaultdict
from decimal import Decimal
from itertools import combinations

from close_recon.models import (
    Ambiguity,
    BankLine,
    DuplicateFlag,
    GlLine,
    MatchLink,
    MatchResult,
    Notice,
    Settings,
)
from close_recon.money import ZERO, cents

RULE_EXACT = "exact"
RULE_WINDOW = "amount_ref_date_window"
RULE_MISSING_REF = "amount_date_missing_ref"
RULE_TOLERANCE = "amount_tolerance_exact_ref"
RULE_GROUP = "group_sum"

_EXACT_CONFIDENCE = Decimal("1.00")
_WINDOW_CONFIDENCE = Decimal("0.95")
_MISSING_CONFIDENCE = Decimal("0.70")
_TOLERANCE_CONFIDENCE = Decimal("0.62")
_GROUP_CONFIDENCE = Decimal("0.58")


def norm_ref(value: str) -> str:
    return "".join(ch for ch in value.upper() if ch.isalnum())


def words(value: str) -> set[str]:
    return set(re.split(r"[^A-Z0-9]+", value.upper())) - {""}


def same_direction(left, right) -> bool:
    return (left > 0 and right > 0) or (left < 0 and right < 0)


def match_lines(
    bank: tuple[BankLine, ...] | list[BankLine],
    gl: tuple[GlLine, ...] | list[GlLine],
    settings: Settings | None = None,
) -> MatchResult:
    settings = settings or Settings()
    bank_rows = list(bank)
    gl_rows = list(gl)
    bank_flags, bank_blocked = _duplicates(bank_rows, "bank", settings.duplicate_day_window)
    gl_flags, gl_blocked = _duplicates(gl_rows, "book", settings.duplicate_day_window)
    used_bank: set[str] = set()
    used_gl: set[str] = set()
    held_bank: set[str] = set()
    held_gl: set[str] = set()
    links: list[MatchLink] = []
    ambiguities: list[Ambiguity] = []
    notices: list[Notice] = []
    counter = 1

    def apply_pairs(rule: str, confidence, status: str, predicate, reason_for) -> None:
        nonlocal counter
        pairs: list[tuple[BankLine, GlLine]] = []
        for bank_line in bank_rows:
            if bank_line.line_id in bank_blocked or bank_line.line_id in used_bank or bank_line.line_id in held_bank:
                continue
            for gl_line in gl_rows:
                if gl_line.line_id in gl_blocked or gl_line.line_id in used_gl or gl_line.line_id in held_gl:
                    continue
                if predicate(bank_line, gl_line):
                    pairs.append((bank_line, gl_line))
        by_bank: dict[str, list[str]] = defaultdict(list)
        by_gl: dict[str, list[str]] = defaultdict(list)
        for bank_line, gl_line in pairs:
            by_bank[bank_line.line_id].append(gl_line.line_id)
            by_gl[gl_line.line_id].append(bank_line.line_id)
        unique: list[tuple[str, str]] = []
        ambiguous_bank: set[str] = set()
        ambiguous_gl: set[str] = set()
        for bank_id, gl_ids in by_bank.items():
            if len(gl_ids) == 1 and len(by_gl[gl_ids[0]]) == 1:
                unique.append((bank_id, gl_ids[0]))
            else:
                ambiguous_bank.add(bank_id)
                ambiguous_gl.update(gl_ids)
        for gl_id, bank_ids in by_gl.items():
            if not (len(bank_ids) == 1 and len(by_bank[bank_ids[0]]) == 1):
                ambiguous_gl.add(gl_id)
                ambiguous_bank.update(bank_ids)
        bank_by = {line.line_id: line for line in bank_rows}
        gl_by = {line.line_id: line for line in gl_rows}
        for bank_id, gl_id in sorted(unique):
            bank_line = bank_by[bank_id]
            gl_line = gl_by[gl_id]
            links.append(
                MatchLink(
                    match_id=f"M-{counter:02d}",
                    status=status,
                    rule=rule,
                    confidence=confidence,
                    reason=reason_for(bank_line, gl_line),
                    bank_ids=(bank_id,),
                    gl_ids=(gl_id,),
                    bank_amount=bank_line.amount,
                    gl_amount=gl_line.amount,
                )
            )
            counter += 1
            used_bank.add(bank_id)
            used_gl.add(gl_id)
        if ambiguous_bank or ambiguous_gl:
            bank_ids = tuple(sorted(ambiguous_bank))
            gl_ids = tuple(sorted(ambiguous_gl))
            ambiguities.append(
                Ambiguity(
                    rule=rule,
                    bank_ids=bank_ids,
                    gl_ids=gl_ids,
                    reason=(
                        f"Rule {rule} found more than one pairing among bank lines "
                        f"{', '.join(bank_ids) or 'none'} and GL lines {', '.join(gl_ids) or 'none'}. "
                        "Nothing was cleared."
                    ),
                )
            )
            held_bank.update(ambiguous_bank)
            held_gl.update(ambiguous_gl)

    apply_pairs(RULE_EXACT, _EXACT_CONFIDENCE, "matched", _exact(settings), _exact_reason)
    apply_pairs(RULE_WINDOW, _WINDOW_CONFIDENCE, "matched", _window(settings), _window_reason(settings))
    apply_pairs(
        RULE_MISSING_REF,
        _MISSING_CONFIDENCE,
        "suggested",
        _missing_ref(settings),
        _missing_reason,
    )
    apply_pairs(
        RULE_TOLERANCE,
        _TOLERANCE_CONFIDENCE,
        "suggested",
        _tolerance(settings),
        _tolerance_reason,
    )
    counter = _group_match(
        bank_rows,
        gl_rows,
        settings,
        used_bank,
        used_gl,
        held_bank,
        held_gl,
        bank_blocked,
        gl_blocked,
        links,
        ambiguities,
        notices,
        counter,
    )
    return MatchResult(
        links=tuple(links),
        duplicates=tuple(bank_flags + gl_flags),
        ambiguities=tuple(ambiguities),
        notices=tuple(notices),
    )


def _duplicates(lines, side: str, window: int) -> tuple[list[DuplicateFlag], set[str]]:
    groups: dict[tuple, list] = defaultdict(list)
    for line in lines:
        ref = norm_ref(line.reference)
        if ref:
            key = ("ref", line.amount, ref)
        else:
            key = ("desc", line.amount, " ".join(sorted(words(line.description))))
        groups[key].append(line)
    flags: list[DuplicateFlag] = []
    blocked: set[str] = set()
    for group in groups.values():
        if len(group) < 2:
            continue
        ordered = sorted(group, key=lambda line: (line.date, line.line_id))
        keeper = ordered[0]
        for extra in ordered[1:]:
            gap = abs((extra.date - keeper.date).days)
            if gap > window:
                continue
            blocked.add(extra.line_id)
            flags.append(
                DuplicateFlag(
                    side=side,
                    line_id=extra.line_id,
                    keeper_id=keeper.line_id,
                    amount=extra.amount,
                    reason=(
                        f"{extra.line_id} repeats {keeper.line_id} on the {side} side "
                        f"(same amount and {'reference' if norm_ref(extra.reference) else 'description'} "
                        f"within {window} days). It was held out of matching."
                    ),
                )
            )
    flags.sort(key=lambda flag: (flag.side, flag.line_id))
    return flags, blocked


def _gap(bank_line: BankLine, gl_line: GlLine) -> int:
    return abs((bank_line.date - gl_line.date).days)


def _exact(settings: Settings):
    del settings

    def predicate(bank_line: BankLine, gl_line: GlLine) -> bool:
        return (
            bank_line.amount == gl_line.amount
            and bank_line.date == gl_line.date
            and bool(norm_ref(bank_line.reference))
            and norm_ref(bank_line.reference) == norm_ref(gl_line.reference)
            and same_direction(bank_line.amount, gl_line.amount)
        )

    return predicate


def _window(settings: Settings):
    def predicate(bank_line: BankLine, gl_line: GlLine) -> bool:
        gap = _gap(bank_line, gl_line)
        return (
            bank_line.amount == gl_line.amount
            and 1 <= gap <= settings.date_window_days
            and bool(norm_ref(bank_line.reference))
            and norm_ref(bank_line.reference) == norm_ref(gl_line.reference)
            and same_direction(bank_line.amount, gl_line.amount)
        )

    return predicate


def _missing_ref(settings: Settings):
    def predicate(bank_line: BankLine, gl_line: GlLine) -> bool:
        bank_ref = norm_ref(bank_line.reference)
        gl_ref = norm_ref(gl_line.reference)
        return (
            bank_line.amount == gl_line.amount
            and _gap(bank_line, gl_line) <= settings.date_window_days
            and (bank_ref == "" or gl_ref == "")
            and same_direction(bank_line.amount, gl_line.amount)
        )

    return predicate


def _tolerance(settings: Settings):
    def predicate(bank_line: BankLine, gl_line: GlLine) -> bool:
        delta = abs(bank_line.amount - gl_line.amount)
        base = max(abs(bank_line.amount), abs(gl_line.amount), Decimal("0.01"))
        return (
            delta != 0
            and delta <= settings.amount_tolerance
            and delta / base <= settings.amount_tolerance_ratio
            and _gap(bank_line, gl_line) <= settings.date_window_days
            and bool(norm_ref(bank_line.reference))
            and norm_ref(bank_line.reference) == norm_ref(gl_line.reference)
            and same_direction(bank_line.amount, gl_line.amount)
        )

    return predicate


def _exact_reason(bank_line: BankLine, gl_line: GlLine) -> str:
    note = ""
    if bank_line.reference.strip().upper() != gl_line.reference.strip().upper():
        note = " Reference punctuation was ignored."
    return (
        f"Amount, date, and reference match ({bank_line.reference} / {gl_line.reference})."
        f"{note}"
    )


def _window_reason(settings: Settings):
    def reason(bank_line: BankLine, gl_line: GlLine) -> str:
        return (
            f"Amount and reference match. Dates differ by {_gap(bank_line, gl_line)} day(s), "
            f"inside the {settings.date_window_days}-day window. Cleared as timing."
        )

    return reason


def _missing_reason(bank_line: BankLine, gl_line: GlLine) -> str:
    if not norm_ref(bank_line.reference) and not norm_ref(gl_line.reference):
        which = "both references are blank"
    elif not norm_ref(bank_line.reference):
        which = "the bank reference is blank"
    else:
        which = "the book reference is blank"
    return (
        f"Amounts match and the dates are {_gap(bank_line, gl_line)} day(s) apart, but {which}. "
        "Not cleared."
    )


def _tolerance_reason(bank_line: BankLine, gl_line: GlLine) -> str:
    delta = bank_line.amount - gl_line.amount
    return (
        f"Reference {bank_line.reference} matches and the dates are {_gap(bank_line, gl_line)} day(s) apart, "
        f"but the amounts differ by {delta:.2f} "
        f"(bank {bank_line.amount:.2f}, book {gl_line.amount:.2f}). Possible typo. Not cleared."
    )


def _group_match(
    bank_rows,
    gl_rows,
    settings: Settings,
    used_bank: set[str],
    used_gl: set[str],
    held_bank: set[str],
    held_gl: set[str],
    bank_blocked: set[str],
    gl_blocked: set[str],
    links: list[MatchLink],
    ambiguities: list[Ambiguity],
    notices: list[Notice],
    counter: int,
) -> int:
    for bank_line in sorted(bank_rows, key=lambda line: line.line_id):
        if bank_line.line_id in used_bank or bank_line.line_id in held_bank or bank_line.line_id in bank_blocked:
            continue
        pool = [
            gl_line
            for gl_line in gl_rows
            if gl_line.line_id not in used_gl
            and gl_line.line_id not in held_gl
            and gl_line.line_id not in gl_blocked
            and same_direction(bank_line.amount, gl_line.amount)
            and _gap(bank_line, gl_line) <= settings.date_window_days
        ]
        pool.sort(key=lambda line: line.line_id)
        if len(pool) < 2:
            continue
        if len(pool) > settings.group_match_max_lines:
            notices.append(
                Notice(
                    code="group_skipped",
                    object_id=bank_line.line_id,
                    message=(
                        f"Bank line {bank_line.line_id} has {len(pool)} open GL lines in the date window. "
                        "Group suggestions stop above "
                        f"{settings.group_match_max_lines} lines."
                    ),
                )
            )
            continue
        found: list[tuple] = []
        target = cents(bank_line.amount)
        for size in (2, 3):
            if len(pool) < size:
                continue
            for combo in combinations(pool, size):
                if sum(cents(line.amount) for line in combo) == target:
                    found.append(combo)
        if len(found) == 1:
            combo = found[0]
            gl_amount = sum((line.amount for line in combo), ZERO)
            gl_ids = tuple(line.line_id for line in combo)
            links.append(
                MatchLink(
                    match_id=f"M-{counter:02d}",
                    status="suggested",
                    rule=RULE_GROUP,
                    confidence=_GROUP_CONFIDENCE,
                    reason=(
                        f"Bank line {bank_line.line_id} amount {bank_line.amount:.2f} equals GL lines "
                        f"{', '.join(gl_ids)} within {settings.date_window_days} days. "
                        "The references do not match, so this stays a suggestion."
                    ),
                    bank_ids=(bank_line.line_id,),
                    gl_ids=gl_ids,
                    bank_amount=bank_line.amount,
                    gl_amount=gl_amount,
                )
            )
            counter += 1
            used_bank.add(bank_line.line_id)
            used_gl.update(gl_ids)
        elif len(found) > 1:
            gl_ids = tuple(sorted({line.line_id for combo in found for line in combo}))
            ambiguities.append(
                Ambiguity(
                    rule=RULE_GROUP,
                    bank_ids=(bank_line.line_id,),
                    gl_ids=gl_ids,
                    reason=(
                        f"Bank line {bank_line.line_id} equals {len(found)} different groups of open GL lines. "
                        "No group was suggested."
                    ),
                )
            )
            held_bank.add(bank_line.line_id)
            held_gl.update(gl_ids)
    return counter
