import React, { useState } from 'react';
import { Language } from './types';
import { TacticalHUD } from './components/TacticalHUD';
import { HackerTerminalView } from './components/HackerTerminalView';
import { MissionShowcase } from './components/MissionShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { CredentialsVault } from './components/CredentialsVault';
import { ContactConsole } from './components/ContactConsole';
import { Footer } from './components/Footer';
import { SecurityModal } from './components/SecurityModal';
import { MatrixRainCanvas } from './components/MatrixRainCanvas';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false);
  
  // Hacker Environment Theme & Matrix State
  const [hackerTheme, setHackerTheme] = useState<'green' | 'cyan' | 'amber'>('green');
  const [isMatrixActive, setIsMatrixActive] = useState<boolean>(true);

  const handleSelectSector = (sectorId: string) => {
    setActiveSector(sectorId);
    const elem = document.getElementById('skills');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTerminal = () => {
    const elem = document.getElementById('terminal-deck');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative min-h-screen flex flex-col bg-[#02050b] text-[#f8fafc] font-mono selection:bg-emerald-500/30 selection:text-emerald-400 theme-${hackerTheme}`}>
      
      {/* Matrix Digital Rain Ambient Layer */}
      {isMatrixActive && (
        <MatrixRainCanvas
          theme={hackerTheme}
          opacity={0.16}
        />
      )}

      {/* Top Tmux / Terminal Navigation Bar */}
      <TacticalHUD
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        onOpenTerminal={scrollToTerminal}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        
        {/* Hacker CLI & Workstation Hero Section */}
        <section id="terminal-deck" className="pt-2">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 border-b border-emerald-950/80 pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>CYBERSEC WORKSTATION // PARIS ECE SOC</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Om Shrikrishna Gautam — Interactive Terminal Environment
              </h1>
            </div>

            {/* Quick Hacker Controls */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setIsMatrixActive(!isMatrixActive)}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                Matrix Rain: {isMatrixActive ? 'ON' : 'OFF'}
              </button>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-0.5 text-xs">
                {(['green', 'cyan', 'amber'] as const).map((th) => (
                  <button
                    key={th}
                    onClick={() => setHackerTheme(th)}
                    className={`px-2 py-0.5 rounded uppercase font-semibold transition-all ${
                      hackerTheme === th
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {th}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Shell & 3D Split Deck */}
          <HackerTerminalView
            theme={hackerTheme}
            onThemeChange={setHackerTheme}
            onToggleMatrix={() => setIsMatrixActive(!isMatrixActive)}
            isMatrixActive={isMatrixActive}
          />
        </section>

        {/* Structured Projects / Engineering Missions Section */}
        <MissionShowcase currentLang={currentLang} />

        {/* Technical Skills Inventory */}
        <SkillsMatrix
          currentLang={currentLang}
          activeSector={activeSector}
          onSelectSector={handleSelectSector}
        />

        {/* Verified Accreditations & Credentials */}
        <CredentialsVault currentLang={currentLang} />

        {/* Direct Contact & Transmission */}
        <ContactConsole currentLang={currentLang} />

      </main>

      {/* Footer */}
      <Footer onOpenSecurityModal={() => setIsSecurityModalOpen(true)} />

      {/* Security Architecture Modal */}
      <SecurityModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />

    </div>
  );
};

export default App;
