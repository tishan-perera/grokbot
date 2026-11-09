# os-queue

Shared work queue for the organization. Amanda and the department chiefs
place work here once the queue exists. Staff pick up items that belong to
their desk.

Validator tests, when they are added, live in `os-queue/tests`. CI runs those
tests only when that directory is present, and skips cleanly when it is not.
