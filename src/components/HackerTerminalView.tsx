import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, Cpu, HardDrive, Wifi, CornerDownLeft, ExternalLink, Download, Maximize2, Minimize2 } from 'lucide-react';
import { PERSONAL_INFO, MISSIONS, SKILL_SECTORS, CERTIFICATIONS, ASCII_LOGO } from '../data/portfolioData';
import { CyberMatrixCanvas } from './CyberMatrixCanvas';

interface HackerTerminalViewProps {
  theme: 'green' | 'cyan' | 'amber';
  onThemeChange: (theme: 'green' | 'cyan' | 'amber') => void;
  onToggleMatrix: () => void;
  isMatrixActive: boolean;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const HackerTerminalView: React.FC<HackerTerminalViewProps> = ({
  theme,
  onThemeChange,
  onToggleMatrix,
  isMatrixActive
}) => {
  const [activeTab, setActiveTab] = useState<'cli' | 'topology' | 'htop'>('cli');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [isSimulatingOffload, setIsSimulatingOffload] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Initialize terminal with boot sequence
  useEffect(() => {
    setHistory([
      {
        id: 'boot',
        command: 'boot --system ece-paris-soc',
        output: (
          <div className="space-y-2 text-xs font-mono">
            <pre className="text-[10px] sm:text-xs leading-none font-mono text-emerald-400 select-none overflow-x-auto">
              {ASCII_LOGO}
            </pre>
            <div className="p-3 rounded bg-black/60 border border-emerald-950/80 space-y-1 text-slate-300">
              <p className="text-emerald-400 font-bold">
                [SYSTEM READY] Om Shrikrishna Gautam · ECE Paris Cybersecurity Workstation
              </p>
              <p className="text-slate-400">
                OS: Debian GNU/Linux 6.1 (x86_64) · Node: <span className="text-sky-400">paris-soc-01</span> · Status: <span className="text-emerald-400">ONLINE</span>
              </p>
              <p className="text-slate-400">
                Specialization: <span className="text-white">Cloud Architecture (AWS) · VAPT Penetration Testing · System Administration</span>
              </p>
              <p className="text-slate-300 pt-1">
                Type <span className="text-emerald-400 font-bold underline">help</span> or click the command chips below to inspect.
              </p>
            </div>
          </div>
        )
      }
    ]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    setPastCommands(prev => [...prev, cmd]);
    setCommandIndex(-1);

    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];
    const arg = parts[1];

    let result: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        result = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">// AVAILABLE SHELL COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">whoami</span>
                <p className="text-slate-400 text-[11px]">Academic & engineering bio</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">ls</span> / <span className="text-emerald-400 font-bold">cat &lt;file&gt;</span>
                <p className="text-slate-400 text-[11px]">Browse & read files</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">projects</span>
                <p className="text-slate-400 text-[11px]">Cloud Blend, Emergency GIS, PITAX</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">cloud-blend</span>
                <p className="text-slate-400 text-[11px]">Run live task offload benchmark</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">skills</span>
                <p className="text-slate-400 text-[11px]">VAPT, AWS, Python, Networking</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">certs</span>
                <p className="text-slate-400 text-[11px]">C3SA CWL, TMG, Oracle OCP</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">nmap</span>
                <p className="text-slate-400 text-[11px]">Audit active network services</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">cv</span>
                <p className="text-slate-400 text-[11px]">Download Markdown resume</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">contact</span>
                <p className="text-slate-400 text-[11px]">Email, phone & Paris location</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">theme [green|cyan|amber]</span>
                <p className="text-slate-400 text-[11px]">Switch phosphor CRT palette</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">matrix</span>
                <p className="text-slate-400 text-[11px]">Toggle background digital rain</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-emerald-400 font-bold">clear</span>
                <p className="text-slate-400 text-[11px]">Clear screen buffer</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        result = (
          <div className="p-3 rounded bg-black/60 border border-white/10 space-y-2 text-xs font-mono text-slate-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-emerald-400 font-bold text-sm">{PERSONAL_INFO.name}</span>
              <span className="text-sky-400">{PERSONAL_INFO.location}</span>
            </div>
            <p><span className="text-slate-400 font-semibold">Current Degree:</span> {PERSONAL_INFO.currentDegree} at <span className="text-white">{PERSONAL_INFO.currentSchool}</span></p>
            <p><span className="text-slate-400 font-semibold">Undergrad:</span> {PERSONAL_INFO.undergradDegree} ({PERSONAL_INFO.undergradSchool}) — CGPA: <span className="text-emerald-400">{PERSONAL_INFO.undergradCGPA}</span></p>
            <p><span className="text-slate-400 font-semibold">Profile Summary:</span> {PERSONAL_INFO.summary}</p>
            <p className="text-emerald-400 pt-1 font-semibold">{PERSONAL_INFO.statusBadge}</p>
          </div>
        );
        break;

      case 'ls':
        result = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-slate-400">total 48K</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sky-400">
              <span>-rw-r--r-- about.txt</span>
              <span>-rw-r--r-- cloud-blend.md</span>
              <span>-rw-r--r-- emergency-gis.md</span>
              <span>-rw-r--r-- pitax-secops.log</span>
              <span>-rw-r--r-- vapt-istudio.txt</span>
              <span>-rw-r--r-- skills.json</span>
              <span>-rw-r--r-- certs.asc</span>
              <span className="text-emerald-400 font-bold">-rwxr-xr-x contact.sh</span>
            </div>
            <p className="text-slate-400 text-[11px] mt-1">Use <span className="text-emerald-400">cat &lt;filename&gt;</span> to view file contents.</p>
          </div>
        );
        break;

      case 'cat':
        if (!arg) {
          result = <p className="text-amber-400 text-xs font-mono">Usage: cat &lt;filename&gt; (e.g. cat about.txt, cat cloud-blend.md)</p>;
        } else if (arg === 'about.txt') {
          result = (
            <div className="p-3 rounded bg-black/60 border border-white/10 text-xs font-mono text-slate-300 space-y-1">
              <p className="text-emerald-400 font-bold">== about.txt ==</p>
              <p>{PERSONAL_INFO.summary}</p>
              <p className="pt-2 text-slate-400">Education: {PERSONAL_INFO.currentDegree} at {PERSONAL_INFO.currentSchool}</p>
              <p className="text-slate-400">Undergraduate: {PERSONAL_INFO.undergradDegree} (CGPA: {PERSONAL_INFO.undergradCGPA})</p>
            </div>
          );
        } else if (arg === 'cloud-blend.md') {
          const m = MISSIONS[0];
          result = (
            <div className="p-3 rounded bg-black/60 border border-white/10 text-xs font-mono text-slate-300 space-y-2">
              <p className="text-emerald-400 font-bold">== {m.title} [{m.badge}] ==</p>
              <p className="text-sky-400">{m.tagline}</p>
              <p>{m.brief}</p>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 space-y-1">
                <p><span className="text-rose-400">Problem:</span> {m.architectureBreakdown.threatOrProblem}</p>
                <p><span className="text-emerald-400">Architecture:</span> {m.architectureBreakdown.defenseOrSolution}</p>
                <p><span className="text-sky-400">Impact:</span> {m.architectureBreakdown.impactResult}</p>
              </div>
              <p className="text-slate-400">Stack: {m.techStack.join(', ')}</p>
            </div>
          );
        } else if (arg.includes('emergency') || arg.includes('gis')) {
          const m = MISSIONS[1];
          result = (
            <div className="p-3 rounded bg-black/60 border border-white/10 text-xs font-mono text-slate-300 space-y-2">
              <p className="text-emerald-400 font-bold">== {m.title} ==</p>
              <p className="text-sky-400">{m.tagline}</p>
              <p>{m.brief}</p>
              <p className="text-slate-400">Stack: {m.techStack.join(', ')}</p>
            </div>
          );
        } else if (arg.includes('pitax')) {
          const m = MISSIONS[2];
          result = (
            <div className="p-3 rounded bg-black/60 border border-white/10 text-xs font-mono text-slate-300 space-y-2">
              <p className="text-emerald-400 font-bold">== {m.title} ==</p>
              <p className="text-sky-400">{m.tagline}</p>
              <p>{m.brief}</p>
              <p className="text-slate-400">Stack: {m.techStack.join(', ')}</p>
            </div>
          );
        } else {
          result = <p className="text-rose-400 text-xs font-mono">cat: {arg}: No such file or directory. Try 'ls'.</p>;
        }
        break;

      case 'projects':
        result = (
          <div className="space-y-3 text-xs font-mono">
            {MISSIONS.map(m => (
              <div key={m.id} className="p-3 rounded bg-black/60 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">{m.title}</span>
                  <span className="text-slate-400 text-[11px]">{m.timeline}</span>
                </div>
                <p className="text-sky-400 text-[11px]">{m.tagline}</p>
                <p className="text-slate-300">{m.brief}</p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Stack: {m.techStack.join(', ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'cloud-blend':
        setIsSimulatingOffload(true);
        result = (
          <div className="p-3 rounded bg-black/70 border border-sky-500/40 text-xs font-mono space-y-1.5">
            <p className="text-sky-400 font-bold">[TEST] Benchmarking Cloud Blend Task Offload Pipeline...</p>
            <p className="text-slate-300">1. Serializing mobile payload batch (Flutter edge client)...</p>
            <p className="text-slate-300">2. Authenticating client token with Firebase Auth...</p>
            <p className="text-slate-300">3. Streaming batch binary directly to AWS S3 bucket...</p>
            <p className="text-slate-300">4. Triggering asynchronous cloud compute worker pool...</p>
            <p className="text-emerald-400 font-bold">[✓] EXECUTION COMPLETE: 340ms latency · ~65% mobile CPU reduction recorded.</p>
          </div>
        );
        setTimeout(() => setIsSimulatingOffload(false), 800);
        break;

      case 'skills':
        result = (
          <div className="space-y-3 text-xs font-mono">
            {SKILL_SECTORS.map(sec => (
              <div key={sec.id} className="p-2.5 rounded bg-black/50 border border-white/10">
                <span className="text-emerald-400 font-bold">[{sec.sectorCode}] {sec.sectorName}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {sec.skills.map((s, idx) => (
                    <div key={idx} className="p-1.5 rounded bg-slate-950 border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{s.name}</span>
                        <span className="text-emerald-400 text-[10px]">{s.level}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
        result = (
          <div className="space-y-2 text-xs font-mono">
            {CERTIFICATIONS.map(c => (
              <div key={c.id} className="p-2.5 rounded bg-black/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{c.title}</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                      {c.verificationBadge}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Issuer: {c.issuer} · Date: {c.issuedDate}</p>
                  {c.credentialId && <p className="text-sky-400 text-[11px]">Credential ID: {c.credentialId}</p>}
                  {c.grade && <p className="text-emerald-300 text-[11px]">{c.grade}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {c.attachmentUrl && (
                    <a
                      href={c.attachmentUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white border border-slate-700 text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF Attachment</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'nmap':
        result = (
          <div className="p-3 rounded bg-black/60 border border-white/10 text-xs font-mono text-slate-300 space-y-1">
            <p className="text-emerald-400 font-bold">Starting Nmap 7.94 ( https://nmap.org ) at 2026-11-02 23:35 CET</p>
            <p>Nmap scan report for ece-paris-soc (127.0.0.1)</p>
            <p>Host is up (0.00012s latency).</p>
            <div className="py-1 text-slate-400">
              <p>PORT     STATE SERVICE       VERSION</p>
              <p className="text-white">22/tcp   open  ssh           OpenSSH 9.2p1 Debian</p>
              <p className="text-white">80/tcp   open  http          Vite HMR Development Server</p>
              <p className="text-white">443/tcp  open  https         TLS 1.3 / Strict CSP</p>
              <p className="text-white">3000/tcp open  react-app     Om Gautam Portfolio WebGL</p>
            </div>
            <p className="text-emerald-400">Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds</p>
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="p-3 rounded bg-black/60 border border-white/10 text-xs font-mono text-slate-300 space-y-1.5">
            <p className="text-emerald-400 font-bold">== Direct Comms Channels ==</p>
            <p><span className="text-slate-400">Email:</span> <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-400 underline font-semibold">{PERSONAL_INFO.email}</a></p>
            <p><span className="text-slate-400">Phone:</span> <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sky-400 underline font-semibold">{PERSONAL_INFO.phone}</a></p>
            <p><span className="text-slate-400">Location:</span> {PERSONAL_INFO.location}</p>
            <p className="text-slate-400 pt-1">Open to internship and career opportunities in Paris, hybrid, or remote.</p>
          </div>
        );
        break;

      case 'cv':
        result = (
          <div className="p-2.5 rounded bg-black/60 border border-emerald-500/40 text-xs font-mono text-emerald-400">
            <p>[✓] Generated verified Markdown resume: `Om_Shrikrishna_Gautam_CV.md`</p>
          </div>
        );
        {
          const cvText = `# Om Shrikrishna Gautam — Curriculum Vitae\nLocation: Paris, France | Phone: +33 0745701519 | Email: omgautam743@gmail.com\n\n## Education\n- MSc Cybersecurity Manager | ECE Paris (2026 – Present)\n- BCA (Cloud Computing & System Administration) | D. Y. Patil International University (2024, CGPA 7.11/10)\n\n## Experience\n- Tech Assistant | PITAX Private Limited (Jan – June 2025)\n- VAPT Intern | iStudio (June – July 2022)\n\n## Key Projects\n- Cloud Blend: Android Task Offloading to AWS S3 & Firebase (Flutter, AWS, Git) — University Hackathon Winner\n- Emergency Management Platform (Angular, AWS, GIS)\n\n## Certifications\n- C3SA Certified Cyber Security Analyst (CWL)\n- Secure Start Cybersecurity Program (TMG Security)\n- Oracle Certified Professional (2025)\n- Advanced Certificate in Web Technology\n`;
          const blob = new Blob([cvText], { type: 'text/markdown' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Om_Shrikrishna_Gautam_CV.md';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
        break;

      case 'theme':
        if (arg === 'green' || arg === 'cyan' || arg === 'amber') {
          onThemeChange(arg);
          result = <p className="text-xs font-mono text-emerald-400">Phosphor theme switched to '{arg}'.</p>;
        } else {
          result = <p className="text-xs font-mono text-amber-400">Usage: theme &lt;green|cyan|amber&gt;</p>;
        }
        break;

      case 'matrix':
        onToggleMatrix();
        result = <p className="text-xs font-mono text-emerald-400">Matrix digital rain: {isMatrixActive ? 'DISABLED' : 'ENABLED'}.</p>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        result = (
          <p className="text-rose-400 text-xs font-mono">
            zsh: command not found: {cmd}. Type <span className="text-emerald-400 font-bold">help</span> to view commands.
          </p>
        );
        break;
    }

    setHistory(prev => [...prev, { id: Date.now().toString(), command: cmd, output: result }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIndex = commandIndex + 1;
        if (nextIndex < pastCommands.length) {
          setCommandIndex(nextIndex);
          setInputVal(pastCommands[pastCommands.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const nextIndex = commandIndex - 1;
        setCommandIndex(nextIndex);
        setInputVal(pastCommands[pastCommands.length - 1 - nextIndex]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickChips = [
    'whoami',
    'projects',
    'cloud-blend',
    'skills',
    'certs',
    'nmap',
    'contact',
    'cv',
    'matrix',
    'clear'
  ];

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden border border-emerald-500/30 bg-[#05090f]/95 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
      
      {/* Tmux Style Top Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0a121e] border-b border-emerald-950/80 text-xs font-mono select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>[tmux 3.3a]</span>
          </div>

          {/* Window Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('cli')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                activeTab === 'cli'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              0:zsh*
            </button>
            <button
              onClick={() => setActiveTab('topology')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                activeTab === 'topology'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1:3d-topology
            </button>
            <button
              onClick={() => setActiveTab('htop')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                activeTab === 'htop'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2:htop-monitor
            </button>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400 hidden sm:flex">
          <span className="text-emerald-400">HOST: paris-soc-01</span>
          <span className="text-sky-400">IP: 127.0.0.1</span>
          <span>UPTIME: 99.9%</span>
        </div>
      </div>

      {/* Main Content Area based on Tab */}
      {activeTab === 'cli' && (
        <div className="flex flex-col h-[580px]">
          {/* Terminal Output Scroll Area */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs cursor-text bg-black/60"
          >
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">om@paris-soc:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
                <div className="pl-3">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Clickable Quick Command Chips */}
          <div className="px-3 py-2 bg-[#080d16] border-t border-emerald-950/80 flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline">Quick Run:</span>
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => executeCommand(chip)}
                className="px-2 py-0.5 rounded bg-black/50 hover:bg-emerald-950/60 text-slate-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer text-[11px]"
              >
                ${chip}
              </button>
            ))}
          </div>

          {/* Interactive Shell Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(inputVal);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-[#0a121e] border-t border-emerald-950/80"
          >
            <span className="text-emerald-400 font-bold font-mono text-xs">om@paris-soc:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help', 'projects', 'nmap', 'skills')..."
              className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-600 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-emerald-900/60 border border-emerald-700/80 text-emerald-400 hover:bg-emerald-800 text-xs font-mono flex items-center gap-1 transition-all"
            >
              <CornerDownLeft className="w-3 h-3" />
              <span>exec</span>
            </button>
          </form>
        </div>
      )}

      {/* 3D Topology Tab */}
      {activeTab === 'topology' && (
        <div className="p-4 bg-black/60">
          <div className="mb-3 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>[PANE 1: 3D DISTRIBUTED ARCHITECTURE — CLOUD BLEND]</span>
            <span className="text-emerald-400">INTERACTIVE THREE.JS VIEWPORT</span>
          </div>
          <CyberMatrixCanvas onSelectSector={() => {}} />
        </div>
      )}

      {/* Htop / Telemetry Monitor Tab */}
      {activeTab === 'htop' && (
        <div className="p-4 bg-black/70 font-mono text-xs space-y-4">
          <div className="p-3 rounded bg-slate-950 border border-white/10 space-y-2">
            <div className="text-emerald-400 font-bold">// HTOP SYSTEM METRICS · PARIS SOC NODE</div>
            <div className="space-y-1.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-400"><span>CPU [Core 0..7]</span><span>14.2%</span></div>
                <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[14%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-400"><span>MEM [Task Allocation]</span><span>3.8G / 16.0G</span></div>
                <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                  <div className="bg-sky-400 h-full w-[24%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-400"><span>CLOUD BLEND OFFLOAD EFFICIENCY</span><span>65% SAVED</span></div>
                <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                  <div className="bg-amber-400 h-full w-[65%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded bg-slate-950 border border-white/10">
              <span className="text-emerald-400 font-bold block mb-1">CANDIDATE DISPATCH</span>
              <p className="text-slate-300">Name: Om Shrikrishna Gautam</p>
              <p className="text-slate-400">Degree: MSc Cybersecurity Manager (ECE Paris)</p>
              <p className="text-slate-400">Location: Paris, France</p>
              <p className="text-emerald-400 mt-1">Status: Ready for Internship / Employment</p>
            </div>
            <div className="p-3 rounded bg-slate-950 border border-white/10">
              <span className="text-sky-400 font-bold block mb-1">VERIFIED ACCREDITATIONS</span>
              <p className="text-slate-300">• C3SA Cyber Security Analyst (CWL)</p>
              <p className="text-slate-300">• Secure Start Security Program (TMG)</p>
              <p className="text-slate-300">• Oracle Certified Professional (2025)</p>
              <p className="text-slate-300">• University Hackathon Winner (2024)</p>
            </div>
          </div>
        </div>
      )}

      {/* Tmux Bottom Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#0a121e] border-t border-emerald-950/80 text-[11px] font-mono text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">[omgautam]</span>
          <span>zsh 5.9</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">UTF-8</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onThemeChange(theme === 'green' ? 'cyan' : theme === 'cyan' ? 'amber' : 'green')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            THEME: <span className="text-emerald-400 font-bold uppercase">{theme}</span>
          </button>
          <span className="text-slate-600">|</span>
          <span>PARIS CET: {new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Paris' })}</span>
        </div>
      </div>

    </div>
  );
};

