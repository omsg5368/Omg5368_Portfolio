import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO, TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';

interface ContactConsoleProps {
  currentLang: Language;
}

export const ContactConsole: React.FC<ContactConsoleProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubject, setFormSubject] = useState('');
  const [formMsg, setFormMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMsg.trim()) return;

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formSubject || 'Inquiry: Cybersecurity / Cloud Role')}&body=${encodeURIComponent(formMsg)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider block mb-1">
          Direct Contact
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {t.contactTitle}
        </h2>
        <p className="mt-2 text-slate-400 text-sm max-w-2xl">
          {t.contactSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Info (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Email */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Email
                </span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm font-semibold text-white hover:text-sky-400 transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Phone
                </span>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>
            <button
              onClick={handleCopyPhone}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              title="Copy Phone"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Location */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                Location
              </span>
              <p className="text-sm font-semibold text-white">
                Paris, France <span className="text-xs font-normal text-slate-400">(Available for on-site, hybrid, or remote roles)</span>
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Clean Compose Form (7 cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSendEmail}
            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Subject:
              </label>
              <input
                type="text"
                value={formSubject}
                onChange={e => setFormSubject(e.target.value)}
                placeholder="e.g. Cybersecurity Internship Opportunity"
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Message:
              </label>
              <textarea
                rows={4}
                required
                value={formMsg}
                onChange={e => setFormMsg(e.target.value)}
                placeholder="Type your note here..."
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </button>
          </form>
        </div>

      </div>

    </section>
  );
};
