import { Layers, CheckCircle } from 'lucide-react';

export default function SummaryTable() {
  const headers = [
    "Clinical Axis",
    "Mesial Temporal (mTLE)",
    "Neocortical Temporal (nTLE)",
    "Frontal Lobe (FLE)",
    "Psychogenic Seizures (PNES)"
  ];

  const rows = [
    {
      axis: "Typical Aura",
      mesial: "Epigastric rising, déjà vu, gustatory (metallic), olfactory, fear.",
      neocortical: "Auditory (buzzing, static), complex visual hallucinations, vertigo.",
      frontal: "Vague head/body sensation, somatosensory, or none (explosive).",
      pnes: "None, or atypical/fluctuating multi-somatic symptoms (hyperventilation)."
    },
    {
      axis: "Ictal Semiology",
      mesial: "Blank stare, behavioral arrest, lip-smacking, picking (ipsilateral), dystonic posturing (contralateral).",
      neocortical: "Altered awareness, rapid speech arrest, auditory response, contralateral version.",
      frontal: "Explosive hypermotor (bicycling, pelvic thrusts), fencing posture, vocalization.",
      pnes: "Closed eyes, resisting opening, pelvic thrusting, out-of-phase thrashing, side-to-side head shaking."
    },
    {
      axis: "Seizure Duration",
      mesial: "1 to 3 minutes; progressive onset and gradual offset.",
      neocortical: "1 to 2 minutes; rapid onset and progression.",
      frontal: "Very brief (<30–60 seconds); nocturnal clusters; explosive onset.",
      pnes: "Highly prolonged (>5 to 45+ minutes); waxing and waning course."
    },
    {
      axis: "Postictal State",
      mesial: "Prominent confusion (10–20m), dominant-side dysphasia, memory gaps.",
      neocortical: "Minimal confusion, unless secondary generalization occurs.",
      frontal: "Ultra-rapid recovery within seconds; virtually no postictal confusion.",
      pnes: "Rapid cognitive recovery, emotional weeping/crying; no physiological postictal state."
    },
    {
      axis: "EEG Signature",
      mesial: "Anterior temporal spikes (F7/F8); rhythmic 5-6 Hz temporal theta onset.",
      neocortical: "Mid-to-posterior temporal spikes (T3/T4, T5/T6); neocortical rhythms.",
      frontal: "Frontal spikes (F3/F4, Fz); frequently obscured by massive motion artifacts.",
      pnes: "Always normal; preserved posterior alpha rhythm during 'unresponsiveness'."
    },
    {
      axis: "MRI Findings",
      mesial: "Hippocampal Sclerosis (volume loss, increased FLAIR signal, loss of digitations).",
      neocortical: "Normal, or focal cortical dysplasia (FCD), cavernoma, low-grade glioma.",
      frontal: "Normal, or focal cortical dysplasia (FCD Type II), microgyria, cortical scars.",
      pnes: "Normal (no epileptogenic structural brain lesions)."
    },
    {
      axis: "Recommended Action",
      mesial: "First-line ASMs; immediate referral for ATL/LITT surgery if drug-resistant.",
      neocortical: "First-line ASMs; surgical resection of focal lesion if identified/concordant.",
      frontal: "First-line ASMs; surgical mapping or neuromodulation (RNS/VNS).",
      pnes: "Avoid ASMs; supportive communication of diagnosis, refer for CBT."
    }
  ];

  return (
    <div id="summary-matrix-section" className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-slate-900 border-2 border-slate-950 rounded-lg text-indigo-400">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-black text-slate-950 uppercase tracking-tight">4. Comprehensive Decision & Differential Matrix</h2>
          <p className="text-xs text-slate-500 font-mono uppercase font-bold">Multi-Axis Differential Calibration Guidelines</p>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-800 rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs md:text-sm">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-900 border-b-2 border-slate-855">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={`p-4 md:p-5 font-display font-black text-white uppercase tracking-wider text-[10px] md:text-xs ${
                      index === 0 ? 'text-sky-400 font-mono font-bold' : ''
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200">
              {rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="hover:bg-slate-50/60 transition-colors duration-150"
                >
                  {/* Axis Label */}
                  <td className="p-4 md:p-5 font-mono font-black text-slate-800 bg-slate-50 max-w-[140px] shrink-0 border-r-2 border-slate-200 uppercase tracking-wider text-[11px]">
                    {row.axis}
                  </td>
                  {/* Mesial Temporal */}
                  <td className="p-4 md:p-5 text-slate-700 leading-relaxed max-w-[200px] font-semibold">
                    {row.axis === "Recommended Action" ? (
                      <span className="flex items-start gap-1.5 text-indigo-950 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-200 shadow-sm font-bold">
                        <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5 stroke-[2.5px]" />
                        {row.mesial}
                      </span>
                    ) : (
                      row.mesial
                    )}
                  </td>
                  {/* Neocortical Temporal */}
                  <td className="p-4 md:p-5 text-slate-700 leading-relaxed max-w-[200px] font-semibold">
                    {row.axis === "Recommended Action" ? (
                      <span className="flex items-start gap-1.5 text-sky-950 bg-sky-50/50 p-2.5 rounded-lg border border-sky-200 shadow-sm font-bold">
                        <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5 stroke-[2.5px]" />
                        {row.neocortical}
                      </span>
                    ) : (
                      row.neocortical
                    )}
                  </td>
                  {/* Frontal Lobe */}
                  <td className="p-4 md:p-5 text-slate-700 leading-relaxed max-w-[200px] font-semibold">
                    {row.axis === "Recommended Action" ? (
                      <span className="flex items-start gap-1.5 text-teal-950 bg-teal-50/50 p-2.5 rounded-lg border border-teal-200 shadow-sm font-bold">
                        <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5 stroke-[2.5px]" />
                        {row.frontal}
                      </span>
                    ) : (
                      row.frontal
                    )}
                  </td>
                  {/* Psychogenic Seizures */}
                  <td className="p-4 md:p-5 text-slate-700 leading-relaxed max-w-[200px] font-semibold">
                    {row.axis === "Recommended Action" ? (
                      <span className="flex items-start gap-1.5 text-purple-950 bg-purple-50/50 p-2.5 rounded-lg border border-purple-200 shadow-sm font-bold">
                        <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5 stroke-[2.5px]" />
                        {row.pnes}
                      </span>
                    ) : (
                      row.pnes
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
