#!/usr/bin/env python3
"""Validate YAML and JSON, and check scaffold invariants used by CI."""

from __future__ import annotations

import json
import sys
import tomllib
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", "node_modules", ".venv", "venv"}

REQUIRED_FILES = (
    "README.md",
    "SECURITY.md",
    "CONTRIBUTING.md",
    "CHANGELOG.md",
    "LICENSE",
    ".gitignore",
    ".gitattributes",
    ".env.example",
    ".gitleaks.toml",
    ".markdownlint.yaml",
    ".github/CODEOWNERS",
    ".github/pull_request_template.md",
    ".github/dependabot.yml",
    ".github/workflows/ci.yml",
    ".github/ISSUE_TEMPLATE/config.yml",
    ".github/ISSUE_TEMPLATE/task.yml",
    ".github/ISSUE_TEMPLATE/bug.yml",
    ".github/ISSUE_TEMPLATE/role-request.yml",
    "org/README.md",
    "departments/README.md",
    "hq/README.md",
    "os-queue/README.md",
    "docs/README.md",
    "design/README.md",
)

ISSUE_FORMS = ("task.yml", "bug.yml", "role-request.yml")


def iter_files(suffixes: tuple[str, ...]):
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.suffix.lower() in suffixes:
            yield path


def main() -> int:
    errors: list[str] = []

    for rel in REQUIRED_FILES:
        if not (ROOT / rel).is_file():
            errors.append(f"missing required file {rel}")

    yaml_files = list(iter_files((".yml", ".yaml")))
    json_files = list(iter_files((".json",)))
    if not yaml_files:
        errors.append("no YAML files found")

    for path in yaml_files:
        rel = path.relative_to(ROOT)
        try:
            yaml.safe_load(path.read_text(encoding="utf-8"))
        except yaml.YAMLError as exc:
            errors.append(f"{rel}: invalid YAML: {exc}")

    for path in json_files:
        rel = path.relative_to(ROOT)
        try:
            json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            errors.append(f"{rel}: invalid JSON: {exc}")

    env_example = ROOT / ".env.example"
    if env_example.is_file():
        for line_no, line in enumerate(env_example.read_text(encoding="utf-8").splitlines(), start=1):
            stripped = line.strip()
            if stripped and not stripped.startswith("#"):
                errors.append(
                    f".env.example:{line_no} must stay a comment (names only)"
                )

    template_dir = ROOT / ".github" / "ISSUE_TEMPLATE"
    config_path = template_dir / "config.yml"
    config = (
        yaml.safe_load(config_path.read_text(encoding="utf-8"))
        if config_path.is_file()
        else None
    )
    if not isinstance(config, dict) or config.get("blank_issues_enabled") is not False:
        errors.append("ISSUE_TEMPLATE/config.yml must set blank_issues_enabled: false")

    for name in ISSUE_FORMS:
        form_path = template_dir / name
        if not form_path.is_file():
            continue
        data = yaml.safe_load(form_path.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            errors.append(f"{name}: form must be a mapping")
            continue
        for key in ("name", "description", "body"):
            if key not in data:
                errors.append(f"{name}: missing {key}")
        body = data.get("body")
        if not isinstance(body, list) or not body:
            errors.append(f"{name}: body must be a non-empty list")

    workflow_path = ROOT / ".github" / "workflows" / "ci.yml"
    workflow = (
        yaml.safe_load(workflow_path.read_text(encoding="utf-8"))
        if workflow_path.is_file()
        else None
    )
    jobs = workflow.get("jobs", {}) if isinstance(workflow, dict) else {}
    for job in ("secret-scan", "lint", "tests"):
        if job not in jobs:
            errors.append(f"ci.yml missing job {job}")
        elif jobs[job].get("name") != job:
            errors.append(f"ci.yml job {job} name must be {job!r}")

    # PyYAML 1.1 loads an unquoted `on:` key as boolean True.
    triggers = None
    if isinstance(workflow, dict):
        triggers = workflow.get("on", workflow.get(True))
    if not isinstance(triggers, dict) or "pull_request" not in triggers:
        errors.append("ci.yml must run on pull_request")
    push = triggers.get("push") if isinstance(triggers, dict) else None
    branches = push.get("branches") if isinstance(push, dict) else None
    if branches != ["main"]:
        errors.append("ci.yml push trigger must be limited to main")

    dependabot_path = ROOT / ".github" / "dependabot.yml"
    dependabot = (
        yaml.safe_load(dependabot_path.read_text(encoding="utf-8"))
        if dependabot_path.is_file()
        else None
    )
    if not isinstance(dependabot, dict) or dependabot.get("version") != 2:
        errors.append("dependabot.yml must be version 2")
    updates = dependabot.get("updates") if isinstance(dependabot, dict) else None
    ecosystems = [
        item.get("package-ecosystem")
        for item in updates
        if isinstance(item, dict)
    ] if isinstance(updates, list) else []
    if "github-actions" not in ecosystems:
        errors.append("dependabot.yml must update github-actions")

    codeowners_path = ROOT / ".github" / "CODEOWNERS"
    codeowners = codeowners_path.read_text(encoding="utf-8") if codeowners_path.is_file() else ""
    if "@tishan-perera" not in codeowners:
        errors.append("CODEOWNERS must name @tishan-perera")

    gitleaks_path = ROOT / ".gitleaks.toml"
    cfg: dict = {}
    if gitleaks_path.is_file():
        with gitleaks_path.open("rb") as handle:
            try:
                loaded = tomllib.load(handle)
            except tomllib.TOMLDecodeError as exc:
                errors.append(f".gitleaks.toml: invalid TOML: {exc}")
                loaded = {}
        if isinstance(loaded, dict):
            cfg = loaded
    extend = cfg.get("extend") if isinstance(cfg, dict) else None
    if not isinstance(extend, dict) or extend.get("useDefault") is not True:
        errors.append(".gitleaks.toml must extend the default rules")

    if errors:
        print("lint failed:")
        for err in errors:
            print(f"  - {err}")
        return 1

    print(f"structured lint ok ({len(yaml_files)} yaml, {len(json_files)} json)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
