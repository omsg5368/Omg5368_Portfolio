import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { PERSONAL_INFO, MISSIONS, SKILL_SECTORS, CERTIFICATIONS } from '../data/portfolioData';

interface CyberTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const CyberTerminal: React.FC<CyberTerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'init',
      output: (
        <div className="text-slate-300 font-mono text-xs space-y-1">
          <p className="text-sky-400 font-bold">Om Gautam — Developer Console</p>
          <p className="text-slate-400">Type <span className="text-emerald-400 font-semibold">help</span> to list available commands.</p>
        </div>
      )
    }
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let result: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        result = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <p className="text-sky-400 font-semibold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <p><span className="text-emerald-400 font-semibold">whoami</span> — Background & education</p>
              <p><span className="text-emerald-400 font-semibold">projects</span> — Key research & engineering projects</p>
              <p><span className="text-emerald-400 font-semibold">skills</span> — Technical capabilities by domain</p>
              <p><span className="text-emerald-400 font-semibold">certs</span> — Verified certifications</p>
              <p><span className="text-emerald-400 font-semibold">contact</span> — Email, phone, and Paris location</p>
              <p><span className="text-emerald-400 font-semibold">cv</span> — Download Markdown resume</p>
              <p><span className="text-emerald-400 font-semibold">clear</span> — Clear console</p>
              <p><span className="text-emerald-400 font-semibold">exit</span> — Close console</p>
            </div>
          </div>
        );
        break;

      case 'whoami':
        result = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p className="text-sky-400 font-bold">{PERSONAL_INFO.name}</p>
            <p><span className="text-slate-400">Current Studies:</span> {PERSONAL_INFO.currentDegree} at {PERSONAL_INFO.currentSchool}</p>
            <p><span className="text-slate-400">Prior Degree:</span> {PERSONAL_INFO.undergradDegree} ({PERSONAL_INFO.undergradSchool}) — CGPA: {PERSONAL_INFO.undergradCGPA}</p>
            <p><span className="text-slate-400">Location:</span> {PERSONAL_INFO.location}</p>
            <p className="text-slate-400 mt-1">{PERSONAL_INFO.summary}</p>
          </div>
        );
        break;

      case 'projects':
        result = (
          <div className="space-y-2 text-xs font-mono">
            {MISSIONS.map(m => (
              <div key={m.id} className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sky-400">{m.title}</span>
                  <span className="text-[11px] text-slate-400">{m.timeline}</span>
                </div>
                <p className="text-slate-300 mt-1">{m.brief}</p>
                <p className="text-slate-400 text-[11px] mt-1">Stack: {m.techStack.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        result = (
          <div className="space-y-2 text-xs font-mono">
            {SKILL_SECTORS.map(sector => (
              <div key={sector.id} className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="font-semibold text-sky-400">{sector.sectorName}</span>
                <p className="text-slate-300 mt-1">
                  {sector.skills.map(s => s.name).join(' · ')}
                </p>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
        result = (
          <div className="space-y-1.5 text-xs font-mono">
            {CERTIFICATIONS.map(c => (
              <div key={c.id} className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                <div>
                  <span className="font-semibold text-slate-200">{c.title}</span>
                  <span className="text-slate-400 ml-2">[{c.issuer}]</span>
                </div>
                <span className="text-emerald-400 text-[11px]">{c.issuedDate}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <p><span className="text-slate-400">Email:</span> <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-400 underline">{PERSONAL_INFO.email}</a></p>
            <p><span className="text-slate-400">Phone:</span> <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sky-400 underline">{PERSONAL_INFO.phone}</a></p>
            <p><span className="text-slate-400">Location:</span> {PERSONAL_INFO.location}</p>
          </div>
        );
        break;

      case 'cv':
        result = (
          <div className="text-xs font-mono text-emerald-400">
            <p>Downloaded `Om_Shrikrishna_Gautam_CV.md`.</p>
          </div>
        );
        {
          const cvText = `# Om Shrikrishna Gautam — Curriculum Vitae\nLocation: Paris, France | Phone: +33 0745701519 | Email: omgautam743@gmail.com\n\n## Education\n- MSc Cybersecurity Manager | ECE Paris (2026 - Current)\n- BCA (Cloud Computing & System Administration) | D. Y. Patil International University (2024, CGPA 7.11/10)\n\n## Experience\n- Tech Assistant | PITAX Private Limited (Jan - June 2025)\n- VAPT Intern | iStudio (June - July 2022)\n\n## Projects\n- Cloud Blend (Flutter, AWS S3, Firebase) — University Hackathon Winner\n- Emergency Management Platform (Angular, AWS, GIS)\n\n## Certifications\n- C3SA Certified Cyber Security Analyst (CWL)\n- Secure Start Cybersecurity Program (TMG Security)\n- Oracle Certified Professional (2025)\n- Advanced Certificate in Web Technology\n`;
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

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        setInputVal('');
        return;

      default:
        result = (
          <p className="text-amber-400 font-mono text-xs">
            Command not recognized: "{cmd}". Type <span className="text-emerald-400 font-semibold">help</span> for options.
          </p>
        );
        break;
    }

    setHistory(prev => [...prev, { command: inputVal, output: result }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className={`w-full ${
          isMaximized ? 'h-full max-w-none' : 'max-w-3xl h-[520px]'
        } flex flex-col bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-all`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-sky-400" />
            <span className="font-mono text-xs font-semibold text-slate-300">
              Developer Console — om-gautam
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Screen */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs text-slate-300 bg-slate-950">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-sky-400">om-gautam:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="pl-3">{item.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleCommandSubmit}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-t border-slate-800"
        >
          <span className="font-mono text-xs text-sky-400 font-semibold">om-gautam:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Type 'help'..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
