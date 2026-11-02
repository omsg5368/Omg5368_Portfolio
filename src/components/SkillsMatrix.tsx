import React from 'react';
import { SKILL_SECTORS, TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';
import { Shield, Cloud, Code, Network } from 'lucide-react';

interface SkillsMatrixProps {
  currentLang: Language;
  activeSector: string | null;
  onSelectSector: (sectorId: string) => void;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({
  currentLang,
  activeSector,
  onSelectSector
}) => {
  const t = TRANSLATIONS[currentLang];

  const getSectorIcon = (id: string) => {
    switch (id) {
      case 'offensive-security': return <Shield className="w-4 h-4 text-sky-400" />;
      case 'cloud-systems': return <Cloud className="w-4 h-4 text-emerald-400" />;
      case 'languages-systems': return <Code className="w-4 h-4 text-indigo-400" />;
      case 'networking-databases': return <Network className="w-4 h-4 text-amber-400" />;
      default: return <Shield className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider block mb-1">
          Technical Inventory
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {t.skillsTitle}
        </h2>
        <p className="mt-2 text-slate-400 text-sm max-w-2xl">
          {t.skillsSubtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_SECTORS.map((sector) => {
          const isSelected = activeSector === sector.id;

          return (
            <div
              key={sector.id}
              onClick={() => onSelectSector(sector.id)}
              className={`rounded-xl p-6 bg-slate-900/60 border transition-all cursor-pointer ${
                isSelected
                  ? 'border-sky-500 bg-slate-900 shadow-md'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                    {getSectorIcon(sector.id)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {sector.sectorName}
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {sector.skills.length} skills
                </span>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                {sector.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/70 border border-slate-800"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-slate-200">
                        {skill.name}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                      {skill.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {skill.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
