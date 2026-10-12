#!/usr/bin/env bash
set -euo pipefail
OUT=release-manifest.json
COMMIT=$(git rev-parse HEAD)
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
cat > "$OUT" <<EOF
{
  "commit": "$COMMIT",
  "generatedAt": "$DATE",
  "artifacts": {
    "backend": "backend/dist",
    "frontend": "frontend/dist"
  }
}
EOF
if command -v sha256sum >/dev/null 2>&1; then
  sha256sum "$OUT" > "${OUT}.sha256"
else
  shasum -a 256 "$OUT" > "${OUT}.sha256"
fi
echo "Manifest + hash created."