#!/usr/bin/env python3
"""
Utility script to strip version suffixes from import specifiers such as
`import { X } from "@radix-ui/react-accordion@1.2.3"`.

Render's TypeScript build fails because those specifiers don't match actual
package names. Running this script once normalizes every .ts/.tsx file.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TS_EXTENSIONS = {".ts", ".tsx"}

FROM_PATTERN = re.compile(r"(from\s+['\"])([^'\"]+)(['\"])")
IMPORT_PATTERN = re.compile(r"(import\s*\(\s*['\"])([^'\"]+)(['\"]\s*\))")
REQUIRE_PATTERN = re.compile(r"(require\s*\(\s*['\"])([^'\"]+)(['\"]\s*\))")


def strip_version(module: str) -> str:
    """Remove trailing @<version> if it exists (and only if it looks like one)."""
    if "@@" in module:
        # Avoid touching things like scoped packages with @@ artifacts.
        return module

    last_at = module.rfind("@")
    if last_at <= 0:
        return module

    suffix = module[last_at + 1 :]
    if re.fullmatch(r"[0-9][0-9A-Za-z.\-]*", suffix):
        return module[:last_at]
    return module


def replace_matches(pattern: re.Pattern[str], content: str) -> tuple[str, bool]:
    changed = False

    def repl(match: re.Match[str]) -> str:
        nonlocal changed
        start, module, end = match.groups()
        new_module = strip_version(module)
        if new_module != module:
            changed = True
        return f"{start}{new_module}{end}"

    return pattern.sub(repl, content), changed


def process_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text

    for pattern in (FROM_PATTERN, IMPORT_PATTERN, REQUIRE_PATTERN):
        text, _ = replace_matches(pattern, text)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed_files = 0
    for file_path in ROOT.rglob("*"):
        if file_path.suffix.lower() not in TS_EXTENSIONS:
            continue
        if file_path.is_dir():
            continue
        if process_file(file_path):
            changed_files += 1

    print(f"Updated {changed_files} file(s).")


if __name__ == "__main__":
    main()
