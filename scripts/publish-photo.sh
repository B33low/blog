#!/usr/bin/env bash
set -Eeuo pipefail

# Publish a large photo to R2 and create a lightweight gallery preview using
# the existing Ant Media utility container (ffmpeg + rclone).
#
# Usage:
#   ./scripts/publish-photo.sh /path/to/Remontee.png
#   ./scripts/publish-photo.sh /path/to/Remontee.png Remontee

INPUT="${1:?Usage: $0 /path/to/photo [name]}"
NAME="${2:-$(basename "${INPUT%.*}")}"
EXT="${INPUT##*.}"
CONTAINER="${ANTMEDIA_CONTAINER:-antmedia}"
BUCKET="${R2_MEDIA_BUCKET:-hexadecilab-media}"
PUBLIC_BASE="${MEDIA_PUBLIC_BASE:-https://media.b33low.com}"
RCLONE_CONFIG="/opt/hexadecilab/rclone.conf"
TMP="/tmp/hexadecilab-photo-${NAME}"

if [[ ! -f "$INPUT" ]]; then
  echo "File not found: $INPUT" >&2
  exit 1
fi

cleanup() {
  podman exec "$CONTAINER" rm -rf "$TMP" >/dev/null 2>&1 || true
}
trap cleanup EXIT

podman exec "$CONTAINER" mkdir -p "$TMP"
podman cp "$INPUT" "$CONTAINER:$TMP/original.$EXT"

echo "Creating WebP preview (max 1600 px)..."
podman exec "$CONTAINER" ffmpeg \
  -hide_banner -loglevel warning -y \
  -i "$TMP/original.$EXT" \
  -vf "scale='min(1600,iw)':'min(1600,ih)':force_original_aspect_ratio=decrease" \
  -frames:v 1 \
  -c:v libwebp \
  -quality 82 \
  -compression_level 6 \
  "$TMP/preview.webp"

echo "Uploading original..."
podman exec "$CONTAINER" rclone \
  --config "$RCLONE_CONFIG" \
  copyto "$TMP/original.$EXT" \
  "r2:${BUCKET}/photos/${NAME}.${EXT}"

echo "Uploading preview..."
podman exec "$CONTAINER" rclone \
  --config "$RCLONE_CONFIG" \
  copyto "$TMP/preview.webp" \
  "r2:${BUCKET}/photos/previews/${NAME}.webp"

printf '\nPublished. Use this in Astro:\n\n'
printf 'image: "%s/photos/%s.%s"\n' "$PUBLIC_BASE" "$NAME" "$EXT"
printf 'thumbnail: "%s/photos/previews/%s.webp"\n' "$PUBLIC_BASE" "$NAME"
