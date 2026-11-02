import React from 'react';
import { ShieldCheck, X, Lock, EyeOff, Server, Terminal } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">
              Technical Architecture of this Site
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs text-slate-300">
          <p className="text-slate-300 leading-relaxed text-sm">
            This portfolio was designed under privacy-first and secure frontend principles:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <EyeOff className="w-4 h-4" />
                <span>Zero Trackers</span>
              </div>
              <p className="text-slate-400 text-xs leading-normal">
                No third-party tracking scripts, analytics cookies, or invasive pixels.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-400 font-semibold">
                <Lock className="w-4 h-4" />
                <span>Content Security</span>
              </div>
              <p className="text-slate-400 text-xs leading-normal">
                Built without inline `eval` scripts to maintain clean client-side hygiene.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                <Server className="w-4 h-4" />
                <span>Static Edge Delivery</span>
              </div>
              <p className="text-slate-400 text-xs leading-normal">
                Assets are pre-compiled and served directly from a static CDN edge.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Terminal className="w-4 h-4" />
                <span>Procedural Graphics</span>
              </div>
              <p className="text-slate-400 text-xs leading-normal">
                The 3D architecture canvas runs locally via Three.js with zero external model assets.
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 font-semibold text-xs hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
