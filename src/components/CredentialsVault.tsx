import React, { useState } from 'react';
import { CERTIFICATIONS, TRANSLATIONS } from '../data/portfolioData';
import { Language, CertificationItem } from '../types';
import { ShieldCheck, Award, CheckCircle, FileText, Download, Eye, ExternalLink, X } from 'lucide-react';

interface CredentialsVaultProps {
  currentLang: Language;
}

export const CredentialsVault: React.FC<CredentialsVaultProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section id="credentials" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
          // SECTION: VERIFIED ACCREDITATIONS
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {t.certsTitle}
        </h2>
        <p className="mt-2 text-slate-400 text-sm max-w-2xl">
          {t.certsSubtitle} Click any credential below to view or download the attached certificate.
        </p>
      </div>

      {/* Grid of Credentials with Attachments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="rounded-xl overflow-hidden flex flex-col justify-between bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 shadow-md group"
          >
            <div>
              {/* Attachment Preview Image Thumbnail (if available) */}
              {cert.attachmentImage ? (
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative h-44 w-full bg-slate-950 overflow-hidden cursor-pointer border-b border-slate-800 group-hover:border-emerald-500/30"
                >
                  <img
                    src={cert.attachmentImage}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded bg-black/75 border border-white/20 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 backdrop-blur-sm">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Attachment</span>
                  </div>
                </div>
              ) : (
                <div className="h-20 w-full bg-slate-950/60 border-b border-slate-800 flex items-center justify-center text-slate-500 text-xs font-mono">
                  <FileText className="w-5 h-5 mr-1.5 text-slate-400" />
                  <span>Formal Accreditation Record</span>
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 space-y-3">
                {/* Badge & Date */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {cert.verificationBadge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{cert.issuedDate}</span>
                </div>

                {/* Title & Issuer */}
                <div>
                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-sky-400 font-mono mt-1">
                    {cert.issuer}
                  </p>
                </div>

                {/* Credential ID / Grade details */}
                {(cert.credentialId || cert.grade) && (
                  <div className="p-2 rounded bg-black/40 border border-white/5 text-[11px] font-mono space-y-0.5">
                    {cert.credentialId && (
                      <p className="text-slate-300 truncate">
                        <span className="text-slate-500">ID:</span> {cert.credentialId}
                      </p>
                    )}
                    {cert.grade && (
                      <p className="text-emerald-400 font-semibold">
                        <span className="text-slate-500 font-normal">Score:</span> {cert.grade}
                      </p>
                    )}
                  </div>
                )}

                {/* Skills Validated */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Validated Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsValidated.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between gap-2">
              {cert.attachmentImage ? (
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              ) : null}

              {cert.attachmentUrl && (
                <a
                  href={cert.attachmentUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
              )}

              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition-colors"
                  title="Verify with Issuer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Extracurricular Leadership & Hackathon Accolades */}
      <div className="mt-8 p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">
              University Hackathon Honours & Graphic Designer (Mehfil Club)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Honourable Mention for Cloud Blend (2024) · Mehfil Club Graphic Designer & Discipline Committee Member at D.Y. Patil International University (2022–2024).
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Modal Viewer */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-950 border border-emerald-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-slate-200">
                  {selectedCert.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedCert.attachmentUrl && (
                  <a
                    href={selectedCert.attachmentUrl}
                    download
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-emerald-400 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div className="flex-1 overflow-auto p-4 bg-black flex items-center justify-center">
              {selectedCert.attachmentImage ? (
                <img
                  src={selectedCert.attachmentImage}
                  alt={selectedCert.title}
                  className="max-w-full max-h-[72vh] object-contain rounded shadow-lg border border-slate-800"
                />
              ) : null}
            </div>

            {/* Modal Footer Info */}
            <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div>
                <span className="text-emerald-400 font-bold">Issuer:</span> {selectedCert.issuer}
                {selectedCert.credentialId && (
                  <span className="ml-3"><span className="text-slate-500">ID:</span> {selectedCert.credentialId}</span>
                )}
              </div>
              <div>
                <span>Issue Date: {selectedCert.issuedDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
