import { AlertTriangle, Lightbulb, Zap } from 'lucide-react';

export default function Pearls() {
  const bulletPearls = [
    {
      label: "The Gastric-to-Experiential Cascade",
      text: "Always track the chronology of auras. An epigastric rising sensation (amygdala/insula) transitioning to deja vu or a metallic taste (entorhinal/medial temporal) provides highly robust localizing data for mesial temporal networks."
    },
    {
      label: "Semiotics of Lateralization (>90% Specificity)",
      text: "Unilateral manual automatisms (fiddling, rubbing) occur ipsilateral to the focus, while rigid, flexed, or twisted arm posturing (ictal dystonia) is contralateral to the focus (due to seizure invasion of the basal ganglia). Postictal dysphasia points directly to the language-dominant hemisphere."
    },
    {
      label: "The Rule of Two in Drug Resistance",
      text: "Failing two appropriately selected, optimized, and scheduled anti-seizure medications (e.g. failing Lamotrigine and Levetiracetam) defines Drug-Resistant Epilepsy. Third ASMs succeed in achieving seizure freedom in <5% of cases; refer early for surgery evaluation."
    },
    {
      label: "Meyer's Loop and Surgical Vision Field Cuts",
      text: "Anterior temporal lobe resection risks damaging the inferior optic radiations (Meyer's loop) wrapping around the temporal horn. This generates a contralateral superior homonymous quadrantanopia, classically described as 'pie in the sky'."
    }
  ];

  return (
    <div id="teaching-pearls-section" className="bg-amber-50/50 border-2 border-amber-900/60 rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(217,119,6,1)] relative overflow-hidden">
      {/* Decorative background visual */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* Warning Icon Badge */}
        <div className="p-3 bg-slate-900 border-2 border-slate-950 rounded-xl text-amber-400 shrink-0 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <h3 className="text-xs font-mono uppercase text-amber-800 tracking-wider font-extrabold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" /> Teaching Pearls Callout
            </h3>
            <h2 className="text-xl md:text-2xl font-display font-black text-slate-950 tracking-tight mt-1 uppercase">
              ⚠️ Temporal Lobe Epilepsy: Key Clinical Discriminators
            </h2>
          </div>

          {/* Bullet points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {bulletPearls.map((pearl, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border-2 border-slate-200 hover:border-amber-500/50 transition-all duration-150 space-y-1.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                <h4 className="text-xs font-mono text-amber-850 font-black flex items-center gap-1.5 uppercase">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" /> {pearl.label}
                </h4>
                <p className="text-xs md:text-sm leading-relaxed text-slate-700 font-sans font-medium">
                  {pearl.text}
                </p>
              </div>
            ))}
          </div>

          {/* Actionable takeaway footer */}
          <div className="pt-4 border-t-2 border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm">
            <span className="text-slate-600 font-sans font-semibold">
              💡 <span className="text-amber-950 font-bold uppercase text-[10px] tracking-wide">Immediate Takeaway:</span> Unilateral MTS is a surgically remediable syndrome. Resection offers up to a <strong className="text-emerald-700 font-black">70% chance</strong> of a permanent cure, far exceeding medical management.
            </span>
            <span className="text-amber-800 font-mono font-black flex items-center gap-1 shrink-0 uppercase tracking-widest text-[10px]">
              CLINICAL GUIDELINES → ILAE 2022
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
