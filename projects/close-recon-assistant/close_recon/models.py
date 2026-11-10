"""Records the engine passes around. Inputs are immutable."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from decimal import Decimal


class CloseReconError(Exception):
    """Base error for expected input, review, and tie-out failures."""


class DataError(CloseReconError):
    """The synthetic books failed validation."""


class LlmNotConfigured(CloseReconError):
    """A model step was requested without an injected in-process client."""


class ModelReplyError(CloseReconError):
    """An injected model reply did not match the expected shape."""


class ReviewError(CloseReconError):
    """A reviewer decision file could not be applied."""


class ReconciliationError(CloseReconError):
    """The bridge did not tie, so no report is emitted."""


@dataclass(frozen=True)
class Settings:
    """Defaults keep the model step off and the rules conservative."""

    date_window_days: int = 5
    duplicate_day_window: int = 2
    amount_tolerance: Decimal = Decimal("10.00")
    amount_tolerance_ratio: Decimal = Decimal("0.02")
    category_review_threshold: Decimal = Decimal("0.75")
    conflict_margin: Decimal = Decimal("0.15")
    enable_llm: bool = False
    group_match_max_lines: int = 8


@dataclass(frozen=True)
class Period:
    data_origin: str
    entity_name: str
    period: str
    period_start: date
    period_end: date
    currency: str
    bank_account_label: str
    gl_cash_account: str
    bank_beginning_balance: Decimal
    gl_beginning_balance: Decimal
    prepared_for: str


@dataclass(frozen=True)
class BankLine:
    line_id: str
    data_origin: str
    date: date
    description: str
    reference: str
    amount: Decimal


@dataclass(frozen=True)
class GlLine:
    line_id: str
    data_origin: str
    date: date
    description: str
    reference: str
    amount: Decimal
    source: str


@dataclass(frozen=True)
class Expense:
    expense_id: str
    data_origin: str
    date: date
    vendor_name: str
    description: str
    reference: str
    amount: Decimal
    payment_reference: str


@dataclass(frozen=True)
class Books:
    period: Period
    bank: tuple[BankLine, ...]
    gl: tuple[GlLine, ...]
    expenses: tuple[Expense, ...]


@dataclass(frozen=True)
class MatchLink:
    match_id: str
    status: str
    rule: str
    confidence: Decimal
    reason: str
    bank_ids: tuple[str, ...]
    gl_ids: tuple[str, ...]
    bank_amount: Decimal
    gl_amount: Decimal

    @property
    def amount_delta(self) -> Decimal:
        """Bank amount minus book amount. Zero when the two sides agree."""
        return self.bank_amount - self.gl_amount


@dataclass(frozen=True)
class DuplicateFlag:
    side: str
    line_id: str
    keeper_id: str
    amount: Decimal
    reason: str


@dataclass(frozen=True)
class Ambiguity:
    rule: str
    bank_ids: tuple[str, ...]
    gl_ids: tuple[str, ...]
    reason: str


@dataclass(frozen=True)
class Notice:
    code: str
    object_id: str
    message: str


@dataclass(frozen=True)
class MatchResult:
    links: tuple[MatchLink, ...]
    duplicates: tuple[DuplicateFlag, ...]
    ambiguities: tuple[Ambiguity, ...]
    notices: tuple[Notice, ...]


@dataclass(frozen=True)
class ReconcilingItem:
    item_id: str
    kind: str
    statement_side: str
    amount: Decimal
    source_ids: tuple[str, ...]
    requires_approval: bool
    posts_journal_entry: bool
    confidence: Decimal
    reason: str
    provisional: bool


@dataclass(frozen=True)
class Reconciliation:
    bank_beginning: Decimal
    book_beginning: Decimal
    bank_balance: Decimal
    book_balance: Decimal
    adjusted_bank: Decimal
    adjusted_book: Decimal
    unexplained: Decimal
    items: tuple[ReconcilingItem, ...]


@dataclass(frozen=True)
class CategorySuggestion:
    expense_id: str
    category: str
    confidence: Decimal
    reason: str
    source: str
    needs_review: bool
    posted: bool
    status: str


@dataclass
class ReviewItem:
    item_id: str
    item_type: str
    priority: str
    summary: str
    proposed_action: str
    confidence: Decimal
    reason: str
    status: str = "pending"
    reviewer_decision: str = ""
    reviewer: str = ""
    note: str = ""


@dataclass(frozen=True)
class Decision:
    item_id: str
    decision: str
    reviewer: str
    note: str


@dataclass(frozen=True)
class AuditEvent:
    event_id: str
    at: str
    actor: str
    action: str
    object_type: str
    object_id: str
    decision: str
    rule: str
    confidence: str
    reason: str


@dataclass(frozen=True)
class CheckStep:
    name: str
    status: str
    detail: str


@dataclass(frozen=True)
class CloseResult:
    books: Books
    match: MatchResult
    reconciliation: Reconciliation
    categories: tuple[CategorySuggestion, ...]
    review: tuple[ReviewItem, ...]
    audit: tuple[AuditEvent, ...]
    checklist: tuple[CheckStep, ...]
    overall_status: str
    as_of: str
    llm_enabled: bool
    signed_off: bool
