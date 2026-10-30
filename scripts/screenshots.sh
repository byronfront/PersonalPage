#!/usr/bin/env bash
# Local visual QA (WSL + Windows Chrome headless). Not part of the build.
# Renders the page inside an iframe of the exact width, so media queries
# match real devices even when Chrome enforces a minimum window width.
#
# Usage: scripts/screenshots.sh <path> <width> <height> <name> [section-id] [extra-query]
# Requires `npm run preview` running on port 4173.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
OUTDIR="/mnt/c/Temp/bc"
URLPATH="${1:-/es/}"
W="${2:-1440}"
H="${3:-900}"
NAME="${4:-shot-$W}"
SECTION="${5:-}"
EXTRA="${6:-}"
mkdir -p "$OUTDIR" "$ROOT/out/__qa"
cp "$ROOT/scripts/qa-frame.html" "$ROOT/out/__qa/index.html"
WIN=$(( W < 600 ? 600 : W ))
cd "$OUTDIR"
timeout 90 "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=7000 --window-size="$WIN,$H" \
  --screenshot="C:\\Temp\\bc\\$NAME.png" \
  "http://localhost:4173/__qa/?w=$W&h=$H&p=$URLPATH&s=$SECTION$EXTRA" >/dev/null 2>&1
echo "$OUTDIR/$NAME.png"
