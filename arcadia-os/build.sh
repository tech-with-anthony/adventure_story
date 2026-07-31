#!/usr/bin/env bash
#
# Arcadia OS — build the bootable ISO.
#
# Run this on a Debian (or Debian-based) amd64 host. It installs the build
# tools if missing, then runs live-build. Expect a ~2.5–4 GB ISO and roughly
# 20 GB of scratch space + a good internet connection.
#
#   ./build.sh              # normal build
#   sudo ./build.sh         # same (the script re-invokes lb build as root)
#
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

# --- 1. Prerequisites -------------------------------------------------------
if ! command -v lb >/dev/null 2>&1; then
	echo "==> live-build not found; installing (needs sudo)…"
	sudo apt-get update
	sudo apt-get install -y live-build
fi

if [ "$(uname -m)" != "x86_64" ]; then
	echo "!! This image targets amd64; building on $(uname -m) is unsupported." >&2
	exit 1
fi

# --- 2. Clean any previous build -------------------------------------------
echo "==> Cleaning previous build artefacts…"
sudo lb clean --purge || true

# --- 3. Configure -----------------------------------------------------------
# `lb config` reads auto/config for all the image options.
echo "==> Configuring image…"
lb config

# --- 4. Build (must be root) ------------------------------------------------
echo "==> Building ISO (this takes a while)…"
sudo lb build 2>&1 | tee build.log

# --- 5. Report --------------------------------------------------------------
ISO="$(ls -1 *.iso 2>/dev/null | head -n1 || true)"
if [ -n "$ISO" ]; then
	echo
	echo "==> Done:  $HERE/$ISO"
	echo "    Write it to a USB stick with, e.g.:"
	echo "      sudo dd if=$ISO of=/dev/sdX bs=4M status=progress oflag=sync"
	echo "    (replace /dev/sdX with your USB device — double-check it!)"
else
	echo "!! Build finished but no .iso was produced; see build.log" >&2
	exit 1
fi
