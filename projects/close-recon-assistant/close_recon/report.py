"""Markdown and CSV outputs. The markdown is generated to satisfy the repo linter."""

from __future__ import annotations

import csv
from pathlib import Path

from close_recon.audit import posted_count
from close_recon.models import CloseResult
from close_recon.money import ZERO, display, plain

OUTPUT_FILES = (
    "reconciliation_report.md",
    "reconciliation_summary.csv",
    "reconciliation_items.csv",
    "expense_categories.csv",
    "review_queue.csv",
    "audit_log.csv",
    "close_checklist.md",
)


def write_outputs(result: CloseResult, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "reconciliation_report.md").write_text(render_report(result), encoding="utf-8")
    (output_dir / "close_checklist.md").write_text(render_checklist(result), encoding="utf-8")
    _write_csv(output_dir / "reconciliation_summary.csv", ("key", "value"), summary_rows(result))
    _write_csv(
        output_dir / "reconciliation_items.csv",
        (
            "record_type",
            "record_id",
            "status",
            "rule",
            "confidence",
            "amount",
            "side",
            "source_ids",
            "requires_approval",
            "posts_journal_entry",
            "reason",
        ),
        item_rows(result),
    )
    _write_csv(
        output_dir / "expense_categories.csv",
        (
            "expense_id",
            "category",
            "confidence",
            "source",
            "needs_review",
            "posted",
            "status",
            "reason",
        ),
        [
            (
                suggestion.expense_id,
                suggestion.category,
                f"{suggestion.confidence:.2f}",
                suggestion.source,
                str(suggestion.needs_review).lower(),
                str(suggestion.posted).lower(),
                suggestion.status,
                suggestion.reason,
            )
            for suggestion in result.categories
        ],
    )
    _write_csv(
        output_dir / "review_queue.csv",
        (
            "item_id",
            "item_type",
            "priority",
            "summary",
            "proposed_action",
            "confidence",
            "reason",
            "status",
            "reviewer_decision",
            "reviewer",
            "note",
        ),
        [
            (
                item.item_id,
                item.item_type,
                item.priority,
                item.summary,
                item.proposed_action,
                f"{item.confidence:.2f}",
                item.reason,
                item.status,
                item.reviewer_decision,
                item.reviewer,
                item.note,
            )
            for item in result.review
        ],
    )
    _write_csv(
        output_dir / "audit_log.csv",
        (
            "event_id",
            "at",
            "actor",
            "action",
            "object_type",
            "object_id",
            "decision",
            "rule",
            "confidence",
            "reason",
        ),
        [
            (
                event.event_id,
                event.at,
                event.actor,
                event.action,
                event.object_type,
                event.object_id,
                event.decision,
                event.rule,
                event.confidence,
                event.reason,
            )
            for event in result.audit
        ],
    )


def format_summary(result: CloseResult) -> str:
    period = result.books.period
    recon = result.reconciliation
    matched = sum(1 for link in result.match.links if link.status == "matched")
    suggested = sum(1 for link in result.match.links if link.status == "suggested")
    pending = sum(1 for item in result.review if item.status == "pending")
    lines = (
        "Close & Reconciliation Assistant",
        f"Data origin: {period.data_origin}",
        f"Entity: {period.entity_name}",
        f"Period: {period.period}",
        f"Bank balance: {plain(recon.bank_balance)} {period.currency}",
        f"Book balance: {plain(recon.book_balance)} {period.currency}",
        f"Adjusted bank: {plain(recon.adjusted_bank)} {period.currency}",
        f"Adjusted book: {plain(recon.adjusted_book)} {period.currency}",
        f"Unexplained difference: {plain(recon.unexplained)} {period.currency}",
        f"Matched groups: {matched}",
        f"Suggested groups: {suggested}",
        f"Reconciling items: {len(recon.items)}",
        f"Review queue: {pending} pending",
        f"Journal entries posted: {posted_count(result.categories)}",
        f"LLM enabled: {str(result.llm_enabled).lower()}",
        f"Overall status: {result.overall_status}",
    )
    return "\n".join(lines) + "\n"


def render_report(result: CloseResult) -> str:
    period = result.books.period
    recon = result.reconciliation
    proposed = sum((item.amount for item in recon.items if item.posts_journal_entry), ZERO)
    summary = _table(
        ("Line", "Amount"),
        (
            ("Bank beginning balance", display(recon.bank_beginning)),
            ("Book beginning balance", display(recon.book_beginning)),
            ("Bank balance", display(recon.bank_balance)),
            ("Book balance", display(recon.book_balance)),
            ("Adjusted bank balance", display(recon.adjusted_bank)),
            ("Adjusted book balance", display(recon.adjusted_book)),
            ("Unexplained difference", display(recon.unexplained)),
            ("Proposed unposted book adjustments", display(proposed)),
            ("Journal entries posted", str(posted_count(result.categories))),
        ),
    )
    bridge_rows = [
        (
            item.item_id,
            item.kind.replace("_", " "),
            item.statement_side,
            display(item.amount),
            _approval(item.requires_approval, item.provisional),
            item.reason,
        )
        for item in recon.items
    ]
    match_rows = [
        (
            link.match_id,
            link.status,
            link.rule,
            f"{link.confidence:.2f}",
            ", ".join(link.bank_ids),
            ", ".join(link.gl_ids),
            display(link.bank_amount),
            display(link.gl_amount),
        )
        for link in result.match.links
    ]
    expense_rows = [
        (
            suggestion.expense_id,
            suggestion.category,
            f"{suggestion.confidence:.2f}",
            suggestion.source,
            "yes" if suggestion.needs_review else "no",
            "true" if suggestion.posted else "false",
            suggestion.status,
        )
        for suggestion in result.categories
    ]
    blocks = [
        "# Reconciliation report",
        "",
        (
            f"Synthetic demonstration for {period.entity_name}. This is not a real company, "
            "bank, or close. Data origin is SYNTHETIC. No journal entry was posted."
        ),
        "",
        "## Scope",
        "",
        (
            "Positive amounts are cash in. Negative amounts are cash out. "
            f"Bank label: {period.bank_account_label}. Ledger account: {period.gl_cash_account}. "
            f"Period {period.period} ({period.period_start.isoformat()} to {period.period_end.isoformat()}). "
            f"Currency {period.currency}. Prepared for {period.prepared_for}. "
            f"Model step: {'on, in-process only' if result.llm_enabled else 'off'}."
        ),
        "",
        "## Summary",
        "",
        summary,
        "",
        "## Reconciling items",
        "",
        _table(
            ("Item", "Kind", "Side", "Adjustment", "Approval", "Reason"),
            bridge_rows,
        )
        if bridge_rows
        else "No reconciling items.",
        "",
        "## Match results",
        "",
        _table(
            ("Match", "Status", "Rule", "Confidence", "Bank lines", "Book lines", "Bank amount", "Book amount"),
            match_rows,
        )
        if match_rows
        else "No matches or suggestions.",
        "",
        "## Expense coding",
        "",
        (
            "Every category is a suggestion. Low-confidence, conflicting, and duplicate expenses "
            "are marked for review. The review file also lists the high-confidence rows, because "
            "this tool does not post."
        ),
        "",
        _table(
            ("Expense", "Category", "Confidence", "Source", "Needs review", "Posted", "Status"),
            expense_rows,
        )
        if expense_rows
        else "No expenses.",
        "",
        "## Unexplained difference",
        "",
        (
            f"Unexplained difference is {display(recon.unexplained)} {period.currency}. "
            "It equals the opening book balance minus the opening bank balance, because every "
            "loaded line is in the bridge. A zero unexplained difference means the openings agree "
            "and the lines were classified. It does not mean a reviewer has approved the proposed "
            "entries. Items marked as requiring approval are still open until the review file says so."
        ),
        "",
    ]
    return "\n".join(blocks)


def render_checklist(result: CloseResult) -> str:
    period = result.books.period
    rows = [(step.name, step.status, step.detail) for step in result.checklist]
    blocks = [
        "# Month-end close checklist",
        "",
        (
            f"{period.entity_name}, period {period.period}. Overall status: {result.overall_status}. "
            "Data origin is SYNTHETIC. Nothing was posted."
        ),
        "",
        "## Steps",
        "",
        _table(("Step", "Status", "Detail"), rows),
        "",
    ]
    return "\n".join(blocks)


def summary_rows(result: CloseResult) -> list[tuple[str, str]]:
    recon = result.reconciliation
    proposed = sum((item.amount for item in recon.items if item.posts_journal_entry), ZERO)
    pending = sum(1 for item in result.review if item.status == "pending")
    return [
        ("data_origin", result.books.period.data_origin),
        ("entity_name", result.books.period.entity_name),
        ("period", result.books.period.period),
        ("currency", result.books.period.currency),
        ("bank_beginning_balance", plain(recon.bank_beginning)),
        ("book_beginning_balance", plain(recon.book_beginning)),
        ("bank_balance", plain(recon.bank_balance)),
        ("book_balance", plain(recon.book_balance)),
        ("adjusted_bank_balance", plain(recon.adjusted_bank)),
        ("adjusted_book_balance", plain(recon.adjusted_book)),
        ("unexplained_difference", plain(recon.unexplained)),
        ("proposed_unposted_book_adjustments", plain(proposed)),
        ("journal_entries_posted", str(posted_count(result.categories))),
        ("llm_enabled", str(result.llm_enabled).lower()),
        ("review_pending", str(pending)),
        ("overall_status", result.overall_status),
        ("as_of", result.as_of),
    ]


def item_rows(result: CloseResult) -> list[tuple]:
    rows = []
    for link in result.match.links:
        rows.append(
            (
                "match",
                link.match_id,
                link.status,
                link.rule,
                f"{link.confidence:.2f}",
                plain(link.bank_amount),
                "",
                " ".join(link.bank_ids + link.gl_ids),
                str(link.status != "matched").lower(),
                "false",
                link.reason,
            )
        )
    for item in result.reconciliation.items:
        rows.append(
            (
                "reconciling_item",
                item.item_id,
                item.kind,
                item.statement_side,
                f"{item.confidence:.2f}",
                plain(item.amount),
                item.statement_side,
                " ".join(item.source_ids),
                str(item.requires_approval).lower(),
                str(item.posts_journal_entry).lower(),
                item.reason,
            )
        )
    return rows


def _approval(required: bool, provisional: bool) -> str:
    label = "required, not posted" if required else "not required"
    if provisional:
        return label + ", provisional"
    return label


def _table(header: tuple[str, ...], rows: list[tuple] | tuple[tuple, ...]) -> str:
    def line(values) -> str:
        return "| " + " | ".join(_cell(value) for value in values) + " |"

    body = [line(header), "| " + " | ".join("---" for _ in header) + " |"]
    body.extend(line(row) for row in rows)
    return "\n".join(body)


def _cell(value: object) -> str:
    return " ".join(str(value).replace("|", "/").split())


def _write_csv(path: Path, header: tuple[str, ...], rows) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle, lineterminator="\n")
        writer.writerow(header)
        writer.writerows(rows)
