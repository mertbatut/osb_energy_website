#!/usr/bin/env bash
#
# OSB Energy — PNG master frames → WebP responsive variants
#
# Usage:
#   ./export_frames.sh [input_dir]
#
# Defaults:
#   input_dir = ./render_output
#
# Output:
#   ../public/frames/desktop/  — 1920x1080 WebP q80 (120 frames)
#   ../public/frames/tablet/   — 1280x720  WebP q75 (90 frames, sampled)
#   ../public/frames/poster.webp — best frame, 1920x1080 WebP q85
#
# Requirements: cwebp (libwebp) or ImageMagick (convert)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INPUT_DIR="${1:-${SCRIPT_DIR}/render_output}"
PUBLIC_DIR="${SCRIPT_DIR}/../public/frames"

DESKTOP_DIR="${PUBLIC_DIR}/desktop"
TABLET_DIR="${PUBLIC_DIR}/tablet"

DESKTOP_RES="1920x1080"
TABLET_RES="1280x720"

DESKTOP_QUALITY=80
TABLET_QUALITY=75
POSTER_QUALITY=85

TOTAL_FRAMES=120
TABLET_FRAMES=90

# Best frame for poster (frame 59 — fly-by hero shot, 0-indexed)
POSTER_FRAME=59

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

has_cmd() { command -v "$1" &>/dev/null; }

die() { echo "ERROR: $*" >&2; exit 1; }

convert_to_webp() {
  local src="$1" dst="$2" width="$3" height="$4" quality="$5"

  if has_cmd cwebp; then
    # Resize with ImageMagick first if available, then encode with cwebp
    if has_cmd magick; then
      magick -- "$src" -resize "${width}x${height}" -quality 100 png:- | \
        cwebp -q "$quality" -o "$dst" -- -
    elif has_cmd convert; then
      convert -- "$src" -resize "${width}x${height}" -quality 100 png:- | \
        cwebp -q "$quality" -o "$dst" -- -
    else
      # cwebp can resize via -resize flag
      cwebp -q "$quality" -resize "$width" "$height" -o "$dst" -- "$src"
    fi
  elif has_cmd magick; then
    magick -- "$src" -resize "${width}x${height}" -quality "$quality" "$dst"
  elif has_cmd convert; then
    convert -- "$src" -resize "${width}x${height}" -quality "$quality" "$dst"
  else
    die "Neither cwebp nor ImageMagick found. Install one:\n  brew install webp imagemagick"
  fi
}

pad3() { printf "%03d" "$1"; }

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

echo "=== OSB Energy Frame Export ==="
echo "Input:  ${INPUT_DIR}"
echo "Output: ${PUBLIC_DIR}"

# Verify input
if [ ! -d "$INPUT_DIR" ]; then
  die "Input directory not found: ${INPUT_DIR}"
fi

frame_count=$(find "$INPUT_DIR" -maxdepth 1 -name "frame-*.png" 2>/dev/null | wc -l | tr -d ' ')
if [ "$frame_count" -eq 0 ]; then
  die "No frame-*.png files found in ${INPUT_DIR}"
fi
echo "Found ${frame_count} PNG frames"

# Create output directories
mkdir -p "$DESKTOP_DIR" "$TABLET_DIR"

# Desktop: all 120 frames at 1920x1080
echo ""
echo "--- Desktop (${DESKTOP_RES}, q${DESKTOP_QUALITY}) ---"
for i in $(seq 0 $((TOTAL_FRAMES - 1))); do
  padded=$(pad3 "$i")
  src="${INPUT_DIR}/frame-${padded}.png"
  dst="${DESKTOP_DIR}/frame-${padded}.webp"

  if [ ! -f "$src" ]; then
    echo "  SKIP: ${src} not found"
    continue
  fi

  convert_to_webp "$src" "$dst" 1920 1080 "$DESKTOP_QUALITY"
  echo "  ${padded}/${TOTAL_FRAMES}"
done

# Tablet: 90 frames sampled evenly from 120
echo ""
echo "--- Tablet (${TABLET_RES}, q${TABLET_QUALITY}) ---"
for t in $(seq 0 $((TABLET_FRAMES - 1))); do
  # Map tablet frame index to source frame index (rounded for even sampling)
  src_idx=$(awk "BEGIN {printf \"%d\", int($t * 119.0 / 89.0 + 0.5)}")
  src_padded=$(pad3 "$src_idx")
  dst_padded=$(pad3 "$t")

  src="${INPUT_DIR}/frame-${src_padded}.png"
  dst="${TABLET_DIR}/frame-${dst_padded}.webp"

  if [ ! -f "$src" ]; then
    echo "  SKIP: ${src} not found"
    continue
  fi

  convert_to_webp "$src" "$dst" 1280 720 "$TABLET_QUALITY"
  echo "  ${dst_padded}/${TABLET_FRAMES}"
done

# Poster: single best frame
echo ""
echo "--- Poster (frame ${POSTER_FRAME}) ---"
poster_padded=$(pad3 "$POSTER_FRAME")
poster_src="${INPUT_DIR}/frame-${poster_padded}.png"

if [ -f "$poster_src" ]; then
  convert_to_webp "$poster_src" "${PUBLIC_DIR}/poster.webp" 1920 1080 "$POSTER_QUALITY"
  echo "  poster.webp created"
else
  echo "  SKIP: poster source not found"
fi

echo ""
echo "=== Export complete ==="
echo "Desktop: $(find "$DESKTOP_DIR" -name "*.webp" | wc -l | tr -d ' ') frames"
echo "Tablet:  $(find "$TABLET_DIR" -name "*.webp" | wc -l | tr -d ' ') frames"
