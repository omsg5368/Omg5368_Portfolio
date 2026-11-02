import React from 'react';
import { ArrowDown, Terminal, Award, Server, ShieldCheck, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO, TRANSLATIONS } from '../data/portfolioData';
import { CyberMatrixCanvas } from './CyberMatrixCanvas';

interface HeroSectionProps {
  currentLang: Language;
  onOpenTerminal: () => void;
  onSelectSector: (sectorId: string) => void;
  activeSector: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onOpenTerminal,
  onSelectSector,
  activeSector
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Authentic Human Copy */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{t.statusBadge}</span>
          </div>

          {/* Headline & Narrative */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Education Box */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-sky-400 font-semibold">Current Degree</span>
              <span>Paris, France</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {PERSONAL_INFO.currentDegree}
            </div>
            <div className="text-xs text-slate-300">
              {PERSONAL_INFO.currentSchool}
            </div>
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
              Undergraduate: <span className="text-slate-300">{PERSONAL_INFO.undergradDegree}</span> (D.Y. Patil Univ, Pune · CGPA: {PERSONAL_INFO.undergradCGPA})
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-colors"
            >
              <span>{t.exploreMissions}</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-mono text-sm transition-all"
            >
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>{t.launchTerminal}</span>
            </button>
          </div>

        </div>

        {/* Right Column: 3D Distributed Systems Architecture Canvas */}
        <div className="lg:col-span-7">
          <CyberMatrixCanvas
            onSelectSector={onSelectSector}
            activeSector={activeSector}
          />
        </div>

      </div>

      {/* 4 Grounded Metric Cards */}
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-white">Honours</div>
            <div className="text-xs text-slate-400">Univ Hackathon (Cloud Blend)</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-white">~65%</div>
            <div className="text-xs text-slate-400">Mobile CPU Load Cut</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-white">4 Certs</div>
            <div className="text-xs text-slate-400">C3SA, TMG, Oracle OCP</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-white">99.9%</div>
            <div className="text-xs text-slate-400">IT Infra Uptime (PITAX)</div>
          </div>
        </div>

      </div>

    </section>
  );
};
