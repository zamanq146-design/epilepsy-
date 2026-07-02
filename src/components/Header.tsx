import { Brain, Clock, Flame, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header() {
  const domains = [
    'Epilepsy & Semiology',
    'EEG Interpretation (Anterior Temporal Spikes)',
    'Neuroimaging (Hippocampal Sclerosis)',
    'Pre-surgical Evaluation & Therapeutics'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="case-header"
      className="bg-white border-2 border-slate-800 rounded-xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden"
    >
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-950" />
      
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-wider text-indigo-700 bg-slate-50 border-2 border-slate-950 rounded uppercase">
              Neurology Crucibles • Case #17
            </span>
            <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-wider text-teal-700 bg-slate-50 border-2 border-slate-950 rounded uppercase">
              Diagnostic & Investigation-Based
            </span>
            <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-wider text-amber-700 bg-slate-50 border-2 border-slate-950 rounded uppercase flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Fellowship (Advanced)
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-950 leading-tight uppercase">
            Temporal Lobe Epilepsy <span className="text-slate-500 font-normal">and Mesial Temporal Sclerosis</span>
          </h1>

          <p className="text-slate-700 text-sm md:text-base leading-relaxed font-sans border-l-4 border-slate-800 pl-4 py-2 bg-slate-50 rounded-r-lg font-semibold">
            <strong className="text-slate-900 block mb-0.5 font-bold uppercase tracking-wider text-xs">Core Clinical Insight:</strong>
            Mesial temporal lobe epilepsy (mTLE) represents a highly syndromic electroclinical entity where stereotypical semiology (epigastric aura, automatisms) dictates precise localization. Successful management relies on high-resolution 3T MRI, electroclinical concordance on EEG, and early consideration of surgical evaluation in drug-resistant cases.
          </p>
        </div>

        {/* Info stats block */}
        <div className="flex flex-row lg:flex-col gap-4 self-stretch lg:self-start lg:min-w-[240px] bg-slate-50 p-4 rounded-xl border-2 border-slate-800 justify-around lg:justify-start shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-sky-600 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider font-mono">Est. Completion</div>
              <div className="text-sm font-black text-slate-900 font-sans">
                Reading: 12m • MCQs: 15m
              </div>
            </div>
          </div>
          
          <div className="h-px bg-slate-200 hidden lg:block" />

          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 text-teal-600 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider font-mono">Specialty Core</div>
              <div className="text-sm font-black text-slate-900">
                Epileptology & Surgery
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Tags */}
      <div className="mt-6 pt-5 border-t-2 border-slate-200">
        <h3 className="text-xs font-mono font-extrabold uppercase text-slate-500 tracking-wider mb-2.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-sky-600" /> Syllabus Domains Covered:
        </h3>
        <div className="flex flex-wrap gap-2">
          {domains.map((domain, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-xs text-slate-700 bg-slate-50 border-2 border-slate-200 rounded hover:border-slate-850 hover:text-slate-950 hover:bg-slate-100 transition-all duration-150 font-bold"
            >
              • {domain}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
