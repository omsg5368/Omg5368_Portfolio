# System Architecture Document (ARCHITECHTURE.md)

## 1. High-Level Architecture
The application is structured as a modular React 19 single-page application built with Vite and Tailwind CSS, featuring an embedded Three.js WebGL graphics pipeline and static certificate asset delivery.

```mermaid
flowchart TD
    Browser["User Browser (Desktop / Mobile)"]

    subgraph Presentation ["Presentation Layer"]
        TmuxNav["Tmux Navigation & Workstation Header"]
        TerminalCLI["Interactive Hacker Terminal (Zsh shell · Nmap · Projects)"]
        Arch3D["3D Architecture Canvas (Cloud Blend Topology)"]
        Htop["Htop Telemetry Monitor Pane"]
        Certs["Credentials Vault (5 Image Thumbnails · Modal Viewer · PDF Downloads)"]
        Missions["Projects & Case Studies"]
        Skills["Skills Matrix (4 Domain Sectors)"]
        Contact["Contact Console (Email · Phone · Direct Form)"]
    end

    subgraph Assets ["Static Edge Assets (/certificates/)"]
        C3SA["c3sa-analyst.png / .pdf"]
        OCP["oracle-ocp-genai.png / .pdf"]
        WebTech["web-technology.png / .pdf"]
        iStudio["istudio-ethical-hacking.png / .pdf"]
        TMG["tmg-securestart.png / .pdf"]
    end

    Browser --> Presentation
    Certs --> Assets
    TerminalCLI --> Assets
```

## 2. Certificate Asset Pipeline
- **Storage**: Placed inside `public/certificates/` for direct, high-speed static CDN delivery.
- **Formats**:
  - Web-optimized PNG (`sips` rendered) for instant in-browser modal inspection.
  - Authentic PDF files for download and offline verification.
- **Security & Integrity**: Zero external redirect vulnerabilities; all documents served from the local static root with clean MIME types.
