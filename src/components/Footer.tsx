import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenSecurityModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSecurityModal }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8 mt-16 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div>
          <div className="font-semibold text-slate-200">
            {PERSONAL_INFO.name}
          </div>
          <p className="text-[11px] text-slate-500">
            MSc Cybersecurity Manager · ECE Paris
          </p>
        </div>

        {/* Security Info */}
        <button
          onClick={onOpenSecurityModal}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer text-xs"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Technical Architecture</span>
        </button>

        {/* Copyright */}
        <div className="text-center sm:text-right text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}</p>
        </div>

      </div>
    </footer>
  );
};
