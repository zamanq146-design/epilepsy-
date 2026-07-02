import { useState } from 'react';
import { ScaffoldingQuestion } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, BookOpen, Quote, Info } from 'lucide-react';

export default function Scaffolding() {
  const [expandedId, setExpandedId] = useState<number | null>(1); // Expand first by default

  const questions: ScaffoldingQuestion[] = [
    {
      id: 1,
      question: "How does the seizure semiology described in the vignette localize the seizure focus, and what are the key lateralizing signs?",
      answer: "The patient's semiology localizes precisely to the left (dominant) mesial temporal lobe. The rising epigastric aura arises from deep limbic structures (amygdala/insula), while déjà vu points to the adjacent parahippocampal or entorhinal cortex. Crucially, the semiology provides highly specific lateralizing features: 1) Left hand manual automatisms are typical of ipsilateral focal onset; 2) Right arm dystonic posturing has >90% lateralizing value pointing to the contralateral hemisphere (due to seizure spread to the left basal ganglia); and 3) Postictal dysphasia is the gold standard for lateralizing language dominance to the left (dominant) hemisphere in a right-handed individual.",
      reference: "ILAE Seizure Semiology & Classification, 2017; Loddenkemper et al., 2011"
    },
    {
      id: 2,
      question: "What is the optimal first-line investigation strategy for this patient, and how should neuroimaging and electrophysiological testing be sequenced?",
      answer: "The immediate strategy requires concordant electroclinical and neuroimaging mapping. High-resolution 3T brain MRI utilizing a dedicated 'Epilepsy Protocol' is required—specifically featuring coronal fluid-attenuated inversion recovery (FLAIR) and T2-weighted sequences sliced perpendicular to the long axis of the hippocampus to assess for hippocampal sclerosis (marked by hippocampal volume loss, increased FLAIR signal, and loss of internal digitations). This must be paired with repeated sleep-deprived EEGs to search for focal interictal epileptiform discharges, which classically present as anterior temporal spikes or sharp waves centered at F7-T3 in left TLE.",
      reference: "ILAE Neuroimaging Task Force, 2019; American Clinical Neurophysiology Society (ACNS) Guidelines"
    },
    {
      id: 3,
      question: "If the patient fails two appropriately chosen and optimized anti-seizure medications (ASMs), how is her condition defined, and what is the next clinical step?",
      answer: "Failure of two appropriately chosen, tolerated, and optimized anti-seizure medications (e.g., Levetiracetam and Lamotrigine) due to lack of efficacy defines Drug-Resistant Epilepsy (or pharmacoresistance). According to Kwan and Brodie, the probability of achieving complete seizure freedom with a third ASM drops below 5%. The recommended next step is prompt referral to a Level 3 or 4 Comprehensive Epilepsy Center for a Phase 1 pre-surgical evaluation, including admission to the Epilepsy Monitoring Unit (EMU) for continuous long-term video-EEG monitoring.",
      reference: "ILAE Consensus Definition of Drug-Resistant Epilepsy (Kwan et al., 2010); AAN Guidelines"
    },
    {
      id: 4,
      question: "Describe the objectives of a Phase 1 pre-surgical evaluation. What is the role of neuropsychological testing and language mapping in dominant TLE?",
      answer: "The objective of Phase 1 is to non-invasively prove 'concordance' between the clinical semiology, seizure onset zone (video-EEG), structural lesion (MRI), and functional metabolism (FDG-PET showing temporal hypometabolism). Comprehensive neuropsychological testing is critical to establish cognitive baselines and localise functional deficits—typically showing verbal memory impairment in dominant-hemisphere TLE (e.g., left hippocampus) versus visual-spatial deficits in non-dominant TLE. Language mapping (via functional MRI or a Wada test) is performed to determine language dominance and assess whether the contralateral hemisphere can support memory, mitigating the risk of a post-operative global amnestic syndrome.",
      reference: "AAN/AES Pre-Surgical Evaluation Standards; Baxendale et al., 2019"
    },
    {
      id: 5,
      question: "If Phase 1 investigations are concordant for left mesial temporal sclerosis, what surgical options are available, and what are their outcomes and risks?",
      answer: "The gold standard is an Anterior Temporal Lobectomy (ATL) or Selective Amygdalohippocampectomy (SAH), which yields long-term seizure freedom (Engel Class I) in 60-70% of patients. Key risks include verbal memory decline (highly prevalent in dominant resections) and visual field deficits—specifically a contralateral superior homonymous quadrantanopia ('pie in the sky') caused by surgical disruption of Meyer's loop (inferior optic radiations wrapping around the temporal horn). Laser Interstitial Thermal Therapy (LITT) is a minimally-invasive MRI-guided alternative that better preserves verbal memory and has fewer visual field complications, but offers a slightly lower seizure-freedom rate (50-60%).",
      reference: "New England Journal of Medicine RCT (Wiebe et al., 2001); SLATE Trial (LITT for mTLE)"
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div id="scaffolding-section" className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-slate-900 border-2 border-slate-950 rounded-lg text-sky-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-black text-slate-900 uppercase tracking-tight">2. Clinical Scaffolding</h2>
          <p className="text-xs text-slate-500 font-mono uppercase font-bold">Key Decision Milestones & Medical Reasoning</p>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q) => {
          const isExpanded = expandedId === q.id;
          return (
            <div
              key={q.id}
              id={`scaffold-q-${q.id}`}
              className={`border-2 rounded-xl transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-white border-sky-500 shadow-[4px_4px_0px_0px_rgba(14,165,233,1)]'
                  : 'bg-white border-slate-850 hover:border-slate-950 hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleExpand(q.id)}
                className="w-full flex items-start justify-between p-5 text-left font-sans font-medium focus:outline-none cursor-pointer"
              >
                <div className="flex gap-4 pr-4">
                  <span className={`font-mono font-bold text-xs shrink-0 flex items-center justify-center w-7 h-7 rounded border-2 ${
                    isExpanded
                      ? 'bg-sky-500 text-slate-950 border-slate-950'
                      : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}>
                    Q{q.id}
                  </span>
                  <span className={`text-sm md:text-base font-bold leading-relaxed ${isExpanded ? 'text-slate-950' : 'text-slate-800'}`}>
                    {q.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 mt-1 ${
                    isExpanded ? 'rotate-180 text-sky-500' : ''
                  }`}
                />
              </button>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4 font-sans text-sm md:text-base bg-white">
                      {/* Answer Body */}
                      <div className="relative text-slate-800 leading-relaxed pl-4 border-l-4 border-sky-500 py-2 bg-sky-50/50 rounded-r p-3.5">
                        <Quote className="w-8 h-8 text-sky-500/10 absolute -top-1 -left-1 pointer-events-none" />
                        <span className="font-mono text-[10px] uppercase text-sky-700 block mb-1.5 font-bold tracking-wider">
                          Clinical Answer & Pathological Logic:
                        </span>
                        {q.answer}
                      </div>

                      {/* Reference Bar */}
                      <div className="flex items-center gap-2 text-xs font-mono bg-slate-50 p-2.5 rounded border border-slate-200">
                        <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                        <span className="text-slate-500 font-bold">Guideline / Landmark Trial Reference:</span>
                        <span className="text-sky-700 font-bold">{q.reference}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
