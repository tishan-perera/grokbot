#!/usr/bin/env python3
"""Run the sample close from the repository root.

python3 -B projects/close-recon-assistant/run.py
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from close_recon.cli import main

if __name__ == "__main__":
    raise SystemExit(main())
