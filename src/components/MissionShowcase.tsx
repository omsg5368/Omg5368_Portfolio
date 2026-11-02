import React, { useState } from 'react';
import { MISSIONS, TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';
import { Server, CheckCircle2, Play, RefreshCw, Award } from 'lucide-react';

interface MissionShowcaseProps {
  currentLang: Language;
}

export const MissionShowcase: React.FC<MissionShowcaseProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [filter, setFilter] = useState<'all' | 'cloud' | 'security' | 'infrastructure'>('all');
  
  const [simState, setSimState] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [latencySaved, setLatencySaved] = useState<number>(0);

  const filteredMissions = MISSIONS.filter(m => filter === 'all' || m.category === filter);

  const runSimulation = () => {
    setSimState('processing');
    setTimeout(() => {
      setLatencySaved(Math.floor(280 + Math.random() * 120));
      setSimState('completed');
    }, 900);
  };

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider block mb-1">
            Projects & Case Studies
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t.missionsTitle}
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl">
            {t.missionsSubtitle}
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-medium">
          {(['all', 'cloud', 'security', 'infrastructure'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-md capitalize transition-all ${
                filter === cat
                  ? 'bg-slate-800 text-sky-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMissions.map(mission => (
          <div
            key={mission.id}
            className="rounded-xl p-6 sm:p-7 flex flex-col justify-between bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <div>
              {/* Top Bar */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  {mission.honours ? <Award className="w-3.5 h-3.5 text-amber-400" /> : <Server className="w-3.5 h-3.5 text-sky-400" />}
                  {mission.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">{mission.timeline}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {mission.title}
              </h3>
              <p className="text-xs text-sky-400 mt-1 mb-3">
                {mission.tagline}
              </p>

              {/* Brief */}
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                {mission.brief}
              </p>

              {/* Cloud Blend Architecture Simulator */}
              {mission.id === 'cloud-blend' && (
                <div className="mb-5 p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-semibold">Architecture Pipeline Test</span>
                    <span className="text-emerald-400">AWS S3 + Firebase</span>
                  </div>
                  
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                    <div>
                      <span>Status: </span>
                      {simState === 'idle' && <span className="text-slate-400">Ready</span>}
                      {simState === 'processing' && <span className="text-amber-400">Offloading payload to AWS S3...</span>}
                      {simState === 'completed' && <span className="text-emerald-400">Offloaded (~65% CPU load spared)</span>}
                    </div>
                    {simState === 'completed' && (
                      <span className="text-sky-400 font-bold">-{latencySaved}ms on-device wait</span>
                    )}
                  </div>

                  <button
                    onClick={runSimulation}
                    disabled={simState === 'processing'}
                    className="w-full py-2 px-3 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {simState === 'processing' ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
                        <span>Running Offload Pipeline...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-sky-400 fill-current" />
                        <span>Simulate Batch Task Offload</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Problem / Solution / Impact */}
              <div className="space-y-2.5 p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 mb-5 text-xs">
                <div>
                  <span className="font-semibold text-rose-400 block mb-0.5">
                    Problem / Challenge:
                  </span>
                  <p className="text-slate-300">
                    {mission.architectureBreakdown.threatOrProblem}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-emerald-400 block mb-0.5">
                    Architecture & Implementation:
                  </span>
                  <p className="text-slate-300">
                    {mission.architectureBreakdown.defenseOrSolution}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-sky-400 block mb-0.5">
                    Measurable Result:
                  </span>
                  <p className="text-slate-200">
                    {mission.architectureBreakdown.impactResult}
                  </p>
                </div>
              </div>

              {/* Key Contributions */}
              <div className="mb-5 space-y-1.5">
                <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                  Responsibilities & Role:
                </span>
                {mission.roleHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-3.5 border-t border-slate-800 flex flex-wrap gap-1.5">
              {mission.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
