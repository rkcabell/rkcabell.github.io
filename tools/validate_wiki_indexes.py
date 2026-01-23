#!/usr/bin/env python3
from __future__ import annotations

import pathlib
import re
import sys


ROOT = pathlib.Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "_config.yml"
WIKI_DIR = ROOT / "wiki"

INCLUDE_RE = re.compile(r"{%\s*include\s+wiki_index\.html[^%]*%}")
COLLECTION_RE = re.compile(r"collection\s*=\s*[\"']([^\"']+)[\"']")


def load_collections(config_path: pathlib.Path) -> set[str]:
    collections: set[str] = set()
    in_collections = False
    base_indent = None

    for raw_line in config_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.rstrip()
        if not in_collections:
            if line.strip().startswith("#"):
                continue
            if line.strip() == "collections:":
                in_collections = True
                base_indent = len(line) - len(line.lstrip())
            continue

        if not line.strip() or line.strip().startswith("#"):
            continue

        indent = len(line) - len(line.lstrip())
        if indent <= base_indent:
            break

        match = re.match(r"^\s*([A-Za-z0-9_-]+):\s*$", line)
        if match:
            collections.add(match.group(1))

    return collections


def parse_front_matter(text: str) -> dict[str, str]:
    if not text.startswith("---"):
        return {}

    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}

    data: dict[str, str] = {}
    for line in parts[1].splitlines():
        if not line.strip() or line.strip().startswith("#"):
            continue
        match = re.match(r"^([A-Za-z0-9_-]+):\s*(.+)\s*$", line)
        if match:
            key = match.group(1)
            value = match.group(2).strip()
            if (value.startswith("'") and value.endswith("'")) or (
                value.startswith('"') and value.endswith('"')
            ):
                value = value[1:-1]
            data[key] = value
    return data


def is_truthy(value: str | None) -> bool:
    if value is None:
        return False
    return value.strip().lower() in {"true", "yes", "on", "1"}


def count_public_items(collection: str) -> int:
    collection_dir = ROOT / f"_{collection}"
    if not collection_dir.is_dir():
        return 0

    count = 0
    for path in collection_dir.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".md", ".markdown"}:
            continue

        front_matter = parse_front_matter(path.read_text(encoding="utf-8"))
        if is_truthy(front_matter.get("draft")) or is_truthy(front_matter.get("private")):
            continue
        count += 1
    return count


def main() -> int:
    if not CONFIG_PATH.exists():
        print("Missing _config.yml; cannot validate collections.", file=sys.stderr)
        return 1

    collections = load_collections(CONFIG_PATH)
    if not collections:
        print("No collections found in _config.yml.", file=sys.stderr)
        return 1

    errors: list[str] = []
    for page_path in sorted(WIKI_DIR.glob("*.md")):
        text = page_path.read_text(encoding="utf-8")
        if "wiki_index.html" not in text:
            continue

        front_matter = parse_front_matter(text)
        allow_empty = is_truthy(front_matter.get("allow_empty"))

        for include_match in INCLUDE_RE.finditer(text):
            include_block = include_match.group(0)
            collection_match = COLLECTION_RE.search(include_block)
            if not collection_match:
                errors.append(f"{page_path}: wiki_index include missing collection.")
                continue

            collection = collection_match.group(1)
            if collection not in collections:
                errors.append(
                    f"{page_path}: collection '{collection}' is not defined in _config.yml."
                )
                continue

            item_count = count_public_items(collection)
            if item_count == 0 and not allow_empty:
                errors.append(
                    f"{page_path}: collection '{collection}' has no public items."
                )

    if errors:
        print("Wiki index validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("Wiki index validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
