# Arcadia OS — a Debian-based gaming distribution

Arcadia OS is a custom Linux operating system built **on top of Debian 13
("trixie")** and tailored for gaming. It ships a lean KDE Plasma desktop with a
full gaming stack preinstalled — Steam, Lutris, Wine/Proton, GameMode,
MangoHud, RetroArch, OBS Studio and more — plus kernel and resource tuning that
games actually benefit from.

This directory is a [Debian **live-build**](https://wiki.debian.org/DebianLive)
project. live-build is the official toolchain the Debian project uses to
produce its own live/installer images, so what you build here is a genuine
Debian derivative: a bootable **live ISO** that also contains the Calamares/
debian-installer so users can install it to disk.

> **Why a build project and not a prebuilt `.iso`?**
> A finished ISO is 3–4 GB of binary and can't live in git. The *recipe* is
> what's version-controlled here; you run `./build.sh` once to turn it into an
> ISO. This is exactly how Debian, Kali, and most derivatives ship their
> images.

---

## What's inside

| Category | Software |
|---|---|
| **Desktop** | KDE Plasma (Wayland + X11), SDDM, Dolphin, Konsole |
| **Store / launchers** | **Steam**, **Lutris**, Heroic (Epic/GOG), Bottles |
| **Windows compat** | Wine, winetricks, Proton (via Steam), protontricks |
| **Performance** | **GameMode**, **MangoHud** (FPS overlay), Gamescope, GOverlay, vkBasalt, CoreCtrl |
| **Emulation** | RetroArch, Dolphin (GC/Wii), Mupen64Plus (N64), PCSX2/PPSSPP* |
| **Streaming / capture** | OBS Studio |
| **Voice / community** | Discord (Flatpak) |
| **Graphics** | Full Mesa stack + Vulkan (AMD/Intel out of the box); NVIDIA on demand |
| **Controllers** | AntiMicroX, `steam-devices` udev rules, joystick tools |
| **System** | PipeWire audio, NetworkManager, Flatpak/Flathub, firmware for Wi-Fi/GPU/BT |

\* Best-effort — installed only if present in the target Debian release.

### Gaming-specific tuning baked in
- `vm.max_map_count = 2147483642` — stops Elden Ring / Star Citizen / many
  Proton titles from crashing (the SteamOS/Fedora default).
- Performance CPU governor auto-engaged by GameMode while a game runs.
- Real-time priority, `nice` and `memlock` limits raised for GameMode and
  low-latency PipeWire audio.
- Higher open-file and inotify limits for Steam/Proton shader compilation.
- i386 (32-bit) architecture enabled so older and 32-bit titles run.

---

## Building the ISO

### Requirements
- A **Debian or Ubuntu amd64** host (a VM or container is fine).
- **Root/sudo**, ~20 GB free disk, and a solid internet connection.
- The `live-build` package (the script installs it for you if missing).

### One command
```bash
cd arcadia-os
./build.sh
```
This runs `lb config` (reads [`auto/config`](auto/config)) then `sudo lb build`,
and drops an `arcadia-os*.iso` (a.k.a. `live-image-amd64.hybrid.iso`) in this
directory. A full log is written to `build.log`.

### Writing it to a USB stick
```bash
sudo dd if=live-image-amd64.hybrid.iso of=/dev/sdX bs=4M status=progress oflag=sync
```
Replace `/dev/sdX` with your USB device (check with `lsblk` — **not** a
partition like `/dev/sdX1`, and definitely not your system disk). You can also
use [balenaEtcher](https://etcher.balena.io/) or Ventoy.

### Booting
Boot the USB and pick **live** to try it, or run the installer to put it on
disk. The live user is `gamer` (passwordless sudo in the live session).

---

## Project layout

```
arcadia-os/
├── build.sh                       # one-shot build wrapper
├── auto/
│   └── config                     # global image options (suite, arch, areas, branding)
├── config/
│   ├── package-lists/             # what gets installed (*.list.chroot)
│   │   ├── 10-desktop.list.chroot
│   │   ├── 20-gaming.list.chroot
│   │   ├── 30-drivers.list.chroot
│   │   └── 40-system.list.chroot
│   ├── hooks/normal/              # scripts run inside the image during build
│   │   ├── 0010-i386-and-steam.hook.chroot
│   │   ├── 0020-extras.hook.chroot
│   │   ├── 0030-flatpak.hook.chroot
│   │   ├── 0040-branding.hook.chroot
│   │   └── 0050-services-and-tweaks.hook.chroot
│   └── includes.chroot/           # files copied verbatim into the image
│       ├── etc/sysctl.d/…         # kernel tuning
│       ├── etc/security/limits.d/…# rtprio / nice / memlock
│       ├── etc/gamemode.ini       # GameMode profile
│       └── usr/local/bin/…        # arcadia-welcome / -install-extras / -nvidia
└── README.md
```

### How the pieces fit together
- **`auto/config`** decides *which Debian* you're building from (trixie),
  which apt areas are on (`main contrib non-free non-free-firmware`), the
  architecture, and the ISO metadata.
- **`config/package-lists/*.list.chroot`** are plain lists of Debian packages
  to install. Only rock-solid packages live here so the build can't break on a
  single rename.
- **`config/hooks/normal/*.hook.chroot`** run *inside* the half-built image.
  This is where Steam is installed (after enabling i386), Flatpak apps are
  pulled from Flathub, and branding/services are set. Every optional step is
  guarded so it can't fail the build.
- **`config/includes.chroot/…`** is an overlay: anything under it is copied to
  the same path in the final system. That's how the tuning files and helper
  scripts get in.

---

## Customising

| I want to… | Do this |
|---|---|
| Add/remove a game or tool | Edit a file in `config/package-lists/` |
| Base it on Debian 12 instead | Change `--distribution trixie` → `bookworm` in `auto/config` |
| Use GNOME instead of KDE | Swap `kde-plasma-desktop`/`sddm` for `gnome-core`/`gdm3` in `10-desktop.list.chroot` |
| Skip baking in Flatpak apps (smaller ISO) | Set `INSTALL_FLATPAK_APPS=false` in `0030-flatpak.hook.chroot` |
| Rename the distro | Edit the branding strings in `0040-branding.hook.chroot` and `auto/config` |
| Add your own repo/PPA | Drop `.list` + `.key` files in `config/archives/` |

After any change, just re-run `./build.sh`.

---

## On the running system

Three helper commands ship in `/usr/local/bin`:

- **`arcadia-welcome`** — prints what's installed and the key shortcuts.
- **`arcadia-install-extras`** — installs more launchers/emulators from Flathub
  (Moonlight, PrismLauncher, mGBA, …).
- **`arcadia-nvidia`** — installs the proprietary NVIDIA driver (matched to your
  GPU via DKMS). AMD/Intel need nothing — Mesa is already set up.

MangoHud is preconfigured; toggle the overlay in-game with **Right-Shift + F12**.
GameMode is automatic for Steam/Lutris, or wrap anything with `gamemoderun`.

---

## Notes & limitations
- Building must happen on a real Debian/Ubuntu host with root and loop-device
  access — it can't run inside every sandbox (e.g. this repo's CI container).
- Package availability follows whatever's in the chosen Debian release; the
  "best-effort" hooks skip anything that isn't there rather than failing.
- NVIDIA is intentionally *not* preinstalled because the correct driver depends
  on the specific card and kernel; `arcadia-nvidia` handles it in one step.
- Arcadia OS is an independent project and is not affiliated with or endorsed
  by Debian, Valve, or any listed software vendor.
