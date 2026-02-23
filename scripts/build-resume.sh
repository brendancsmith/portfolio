#!/usr/bin/env bash
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT_DIR="out"
PUBLIC_DIR="public"
PORT=3999

if [ ! -x "$CHROME" ]; then
  echo "Error: Chrome not found at $CHROME" >&2
  exit 1
fi

# Build the static site
npm run build

# Start a temporary server for the static export
npx -y serve "$OUT_DIR" -l "$PORT" &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null || true' EXIT
sleep 2

# Generate PDFs
"$CHROME" --headless --disable-gpu \
  --print-to-pdf="$PUBLIC_DIR/resume.pdf" \
  --no-pdf-header-footer \
  "http://localhost:$PORT/resume"

"$CHROME" --headless --disable-gpu \
  --print-to-pdf="$PUBLIC_DIR/resume-extended.pdf" \
  --no-pdf-header-footer \
  "http://localhost:$PORT/resume-extended"

echo "Generated:"
echo "  $PUBLIC_DIR/resume.pdf"
echo "  $PUBLIC_DIR/resume-extended.pdf"
