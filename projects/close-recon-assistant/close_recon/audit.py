"""Audit log. One system row for every match, suggestion, duplicate, and coding decision."""

from __future__ import annotations

from close_recon.models import (
    AuditEvent,
    CategorySuggestion,
    Decision,
    MatchResult,
    Reconciliation,
    ReviewItem,
)
from close_recon.review import SIGN_OFF


def build_audit(
    match: MatchResult,
    reconciliation: Reconciliation,
    categories: tuple[CategorySuggestion, ...],
    review: tuple[ReviewItem, ...],
    as_of: str,
    decisions: tuple[Decision, ...] = (),
) -> tuple[AuditEvent, ...]:
    rows: list[tuple] = []
    for flag in match.duplicates:
        rows.append(
            (
                "flag_duplicate",
                "cash_line",
                flag.line_id,
                "possible_duplicate",
                "duplicate",
                "0.50",
                flag.reason,
            )
        )
    for link in match.links:
        action = "match" if link.status == "matched" else "suggest_match"
        rows.append(
            (
                action,
                "match",
                link.match_id,
                link.status,
                link.rule,
                f"{link.confidence:.2f}",
                link.reason,
            )
        )
    for index, ambiguity in enumerate(match.ambiguities, start=1):
        rows.append(
            (
                "flag_ambiguity",
                "match",
                f"AMB-{index:02d}",
                "unmatched",
                ambiguity.rule,
                "0.30",
                ambiguity.reason,
            )
        )
    for notice in match.notices:
        rows.append(
            (
                "notice",
                "bank_line",
                notice.object_id,
                "skipped",
                notice.code,
                "",
                notice.message,
            )
        )
    for item in reconciliation.items:
        rows.append(
            (
                "classify",
                "reconciling_item",
                item.item_id,
                item.kind,
                item.statement_side,
                f"{item.confidence:.2f}",
                item.reason,
            )
        )
    for suggestion in categories:
        rows.append(
            (
                "categorize",
                "expense",
                suggestion.expense_id,
                suggestion.status,
                suggestion.source,
                f"{suggestion.confidence:.2f}",
                suggestion.reason,
            )
        )
    for item in review:
        rows.append(
            (
                "route_review",
                "review_item",
                item.item_id,
                item.status,
                item.item_type,
                f"{item.confidence:.2f}",
                item.summary,
            )
        )
    events = [_event(index, as_of, "system", row) for index, row in enumerate(rows, start=1)]
    start = len(events) + 1
    for offset, decision in enumerate(decisions):
        events.append(
            _event(
                start + offset,
                as_of,
                decision.reviewer,
                (
                    "human_review",
                    "review_item",
                    decision.item_id,
                    _human_decision(decision),
                    "reviewer",
                    "",
                    decision.note or "Reviewer recorded a decision. Nothing was posted.",
                ),
            )
        )
    return tuple(events)


def _human_decision(decision: Decision) -> str:
    if decision.item_id == SIGN_OFF:
        return "signed_off" if decision.decision == "approve" else "sign_off_rejected"
    if decision.decision == "approve":
        return "approved_not_posted"
    return "rejected"


def _event(index: int, as_of: str, actor: str, row: tuple) -> AuditEvent:
    action, object_type, object_id, decision, rule, confidence, reason = row
    return AuditEvent(
        event_id=f"A-{index:04d}",
        at=as_of,
        actor=actor,
        action=action,
        object_type=object_type,
        object_id=object_id,
        decision=decision,
        rule=rule,
        confidence=confidence,
        reason=reason,
    )


def posted_count(categories: tuple[CategorySuggestion, ...]) -> int:
    """The engine has no posting path. A non-zero result is a defect."""
    return sum(1 for suggestion in categories if suggestion.posted)
