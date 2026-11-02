# Design Specification Document (DESIGN.md)

## 1. Design Concept: "Hacker Terminal Workstation & Verified Vault"
The interface combines an authentic Linux/Tmux terminal workstation with a high-trust credential verification vault.

### Core Design Tokens:
- **Themes**:
  - `matrix-green`: `#22c55e` phosphor green on black `#02050b`.
  - `cyber-cyan`: `#00f0ff` laser cyan on dark slate `#020817`.
  - `amber-crt`: `#ffb000` vintage phosphor amber on dark brown `#080400`.
- **Card Media Design**:
  - 5 official credential cards featuring high-resolution preview thumbnails with gradient dark fades (`from-slate-950 via-transparent`).
  - Hover states reveal an "Inspect Attachment" pill with zoom preview effect.
  - Modal overlay (`bg-black/85 backdrop-blur-md`) for full-size inspection of certificates.
  - Dual action buttons: `Preview` (modal) and `PDF` (direct download).
