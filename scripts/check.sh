#!/usr/bin/env bash
set -euo pipefail
npm run build -w frontend
npm run build -w backend
