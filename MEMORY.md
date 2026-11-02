# Project Memory & Context (MEMORY.md)

## 1. Candidate Context
- **Name**: Om Shrikrishna Gautam
- **Academic**: MSc Cybersecurity Manager at ECE Paris (2026 – Present) | BCA (Cloud Computing & System Administration) from D.Y. Patil International University, Pune (2024, CGPA 7.11/10).
- **Core Experience**: PITAX Private Limited (IT Infrastructure & Security Operations), iStudio (VAPT Internship), Cloud Blend (Mobile Task Offloading to AWS S3 & Firebase — Hackathon Winner).

## 2. Architectural Decision Records (ADRs)
- **ADR-001: Pure Three.js Canvas**: Lightweight WebGL integration with explicit memory disposal (`dispose()`) on unmount.
- **ADR-002: De-AI & Unslop Refactor**:
  - Maintained authentic, grounded technical claims while eliminating AI marketing fluff.
- **ADR-003: Core 6 Documentation Mandate**:
  - Maintained `PRD.md`, `ARCHITECHTURE.md`, `DESIGN.md`, `MEMORY.md`, `RULES.md`, and `TRACKER.md` at root.
- **ADR-004: Global Unslop Skill Integration**:
  - Installed `OPSHARP/unslop` globally at `~/.agents/skills/unslop` and synced locally to `.agents/skills/unslop`.
- **ADR-005: CLI-First Concept & Hacker Workstation Theme**:
  - Interactive `HackerTerminalView` (Tmux window switching, ASCII logo, real shell history, clickable chips, nmap scan, cat files, theme switcher) + `MatrixRainCanvas` background with green/cyan/amber phosphor themes.
- **ADR-006: Official Certificate Attachments & In-Browser High-Res Inspection**:
  - Bound initial 4 certificate PDFs/PNGs to credential cards.
- **ADR-007: TMG Security Securestart Certification Integration**:
  - Bound TMG Security Securestart certificate (`Certificate: 287802`) as the 5th verified credential.
- **ADR-008: Production Export & Free Hosting via Netlify Drop**:
  - *Decision*: User chose **Option 1 (Netlify Drop)** for 100% free hosting with zero CLI login friction.
  - *Implementation*: Compiled production build to `dist/`, packaged `portfolio-dist.zip`, revealed the folder in macOS Finder, and opened `app.netlify.com/drop` in the user's browser.
