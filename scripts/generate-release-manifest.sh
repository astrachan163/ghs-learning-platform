#!/usr/bin/env bash
set -e
OUT=release-manifest.json
COMMIT=$(git rev-parse HEAD)
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
cat > $OUT <<EOF
{
  "commit": "$COMMIT",
  "generatedAt": "$DATE",
  "artifacts": {
    "backend": "backend/dist",
    "frontend": "frontend/.next"
  }
}
EOF
shasum -a 256 $OUT > ${OUT}.sha256
echo "Manifest + hash created."