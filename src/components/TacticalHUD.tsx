import React, { useState, useEffect } from 'react';
import { Terminal, Download, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface TacticalHUDProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSecurityModal: () => void;
  onOpenTerminal: () => void;
}

export const TacticalHUD: React.FC<TacticalHUDProps> = ({
  currentLang,
  onLanguageChange,
  onOpenSecurityModal,
  onOpenTerminal
}) => {
  const [parisTime, setParisTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setParisTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadCV = () => {
    const cvText = `# Om Shrikrishna Gautam — Curriculum Vitae
Location: Paris, France | Phone: +33 0745701519 | Email: omgautam743@gmail.com

## Academic Qualifications
- MSc Cybersecurity Manager | ECE, Paris, France (2026 – Present)
- Bachelor of Computer Applications (Cloud Computing & System Administration) | D. Y. Patil International University, Pune, India (2024 | CGPA: 7.11/10)

## Work Experience
- Tech Assistant | PITAX Private Limited, Gondia (Jan – June 2025)
  * Monitored network activities and IT infrastructure operations
  * Incident response & basic cybersecurity operations
  * Technical documentation & employee security training
- VAPT Intern | iStudio (June – July 2022)
  * Practical Vulnerability Assessment & Penetration Testing

## Key Projects
- Cloud Blend: Android Task Offloading to AWS S3 & Firebase (Flutter, AWS, Git) — University Hackathon Winner
- Cloud Emergency Management Platform (Angular, AWS, GIS)

## Certifications
- C3SA - Certified Cyber Security Analyst (CWL, Oct 2026)
- Secure Start Cybersecurity Program (TMG Security)
- Oracle Certified Professional (2025)
- Advanced Certificate in Web Technology
`;
    const blob = new Blob([cvText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Om_Shrikrishna_Gautam_CV.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/90 border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono font-bold text-sm">
              OG
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
                <span>Om Gautam</span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                ECE Paris · Cloud & Cybersecurity
              </p>
            </div>
          </a>

          {/* Paris Local Time */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-emerald-400">Paris:</span>
            <span>{parisTime || '23:00:00'} CET</span>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#credentials" className="hover:text-white transition-colors">Certifications</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          {/* Console Button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-all"
            title="Open Developer Console"
          >
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Console</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
            {(['en', 'fr', 'hi'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2 py-0.5 rounded uppercase font-semibold transition-all ${
                  currentLang === lang
                    ? 'bg-slate-800 text-sky-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Security Spec Modal Trigger */}
          <button
            onClick={onOpenSecurityModal}
            title="How this site is built"
            className="hidden sm:flex p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Download CV */}
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>
        </div>

      </div>
    </header>
  );
};
