import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Activity, Sliders, ArrowRight, CheckCircle2, ChevronRight, HelpCircle, RefreshCw } from 'lucide-react';

export default function Visualizers() {
  const [activeTab, setActiveTab] = useState<'anatomy-eeg' | 'flowchart' | 'semiology-grid'>('anatomy-eeg');

  // Anatomy & EEG states
  const [eegMode, setEegMode] = useState<'normal' | 'spike'>('normal');
  const [hoveredAnatomy, setHoveredAnatomy] = useState<string | null>(null);

  // Flowchart states
  const [activeStep, setActiveStep] = useState<number>(1);

  // Semiology states
  const [selectedEntity, setSelectedEntity] = useState<'mesial' | 'neocortical' | 'frontal' | 'pnes'>('mesial');

  // Anatomy Descriptions
  const anatomyDetails: Record<string, { title: string; description: string; clinical: string }> = {
    hippocampus: {
      title: "Hippocampus",
      description: "A curved, seahorse-shaped structure in the medial temporal lobe crucial for consolidating short-term memory into long-term memory.",
      clinical: "In mesial TLE, the hippocampus undergoes gliosis and neuronal loss (Mesial Temporal Sclerosis - MTS), appearing hyperintense on FLAIR and atrophic on T2 coronal MRI."
    },
    amygdala: {
      title: "Amygdala",
      description: "An almond-shaped nuclear complex located anterior to the hippocampus, regulating emotion, autonomic responses, and fear conditioning.",
      clinical: "Ictal discharge starting in or invading the amygdala triggers the classic 'epigastric rising' aura, intense fear, and early autonomic activation."
    },
    meyers_loop: {
      title: "Meyer's Loop",
      description: "The anterior-most fibers of the optic radiation that sweep forward and around the temporal horn of the lateral ventricle before traveling to the occipital cortex.",
      clinical: "During an Anterior Temporal Lobectomy (ATL), surgical resection extending >4 cm from the temporal tip risks injuring these fibers, causing a contralateral superior quadrantanopia ('pie in the sky' defect)."
    }
  };

  // Flowchart data
  const flowchartSteps = [
    {
      id: 1,
      title: "Diagnostic Entry & Baseline",
      status: "Initial Presentation",
      description: "A patient presents with episodes of altered awareness and suspected focal seizures. Routine EEG and MRI are ordered.",
      action: "Perform clinical history to decode aura types. Order standard outpatient EEG (sleep-deprived) to catch interictal discharges.",
      warning: "A normal routine EEG does NOT exclude epilepsy; up to 50% of TLE patients have a normal initial interictal EEG."
    },
    {
      id: 2,
      title: "Confirming Pharmacoresistance",
      status: "Fail 2 Optimized ASMs",
      description: "Patient continues to have disabling seizures despite trial of two appropriately chosen, tolerated, and maximally dosed ASMs.",
      action: "Define as Drug-Resistant Epilepsy. Halt additional sequential ASM monotherapy trials, as likelihood of seizure-freedom is <5%.",
      warning: "Delayed referral for surgical workup is a major cause of chronic morbidity; refer early to a Level 3/4 Comprehensive Epilepsy Center."
    },
    {
      id: 3,
      title: "Phase 1 Pre-Surgical Eval",
      status: "Non-Invasive Concordance",
      description: "Admit to Epilepsy Monitoring Unit (EMU) to capture habitual seizures on video-EEG, and schedule specialized auxiliary tests.",
      action: "Execute: 1) Video-EEG (record ictal onset), 2) 3T Brain MRI (epilepsy protocol), 3) Neuropsychological assessment, and 4) FDG-PET scan.",
      warning: "Confirm concordance: Seizure onset zone (EEG), lesion (MRI), and hypometabolism (PET) must point to the same temporal lobe."
    },
    {
      id: 4,
      title: "Language & Memory Mapping",
      status: "Functional Gating",
      description: "Evaluate language dominance and unilateral hippocampal memory capacity to identify post-operative cognitive risks.",
      action: "Order functional MRI (fMRI) or an intracarotid sodium amobarbital (Wada) test, alongside rigorous verbal/non-verbal neuropsychology.",
      warning: "If resecting dominant temporal lobe (usually left), warn patient of high risks of verbal memory and naming decline."
    },
    {
      id: 5,
      title: "Definitive Therapeutics",
      status: "Surgical Path Decision",
      description: "Decide between curative resective surgery, minimal-access ablation, or palliative neuromodulation based on phase 1 concordance.",
      action: "Choose: Anterior Temporal Lobectomy (ATL) (60-70% seizure-free, higher memory risk) or LITT Laser Ablation (50-60% seizure-free, preserves memory).",
      warning: "If bilateral temporal foci are captured, resective surgery is strictly contraindicated. Pivot to Responsive Neurostimulation (RNS)."
    }
  ];

  // Helper to draw realistic simulated EEG waves
  const generateEegPath = (channelIndex: number, mode: 'normal' | 'spike', width: number) => {
    let points = [];
    const baseHeight = 35;
    const segments = 100;
    const step = width / segments;

    for (let i = 0; i <= segments; i++) {
      const x = i * step;
      let y = baseHeight;

      // Background rhythm (alpha/theta blend)
      const f1 = Math.sin(i * 0.4) * 4;
      const f2 = Math.cos(i * 0.15) * 2;
      let noise = f1 + f2;

      // Add a dramatic spike in the middle of the screen for 'spike' mode
      if (mode === 'spike') {
        // Spike centered at x around 50% of width (i = 50)
        const distanceToCenter = Math.abs(i - 50);
        if (distanceToCenter < 6) {
          // Sharp epileptiform spike + slow wave
          const spikeAmplitude = 30;
          const slowWaveAmplitude = 20;

          if (channelIndex === 1) {
            // F7-T3: input 1 (F7) is highly negative. In EEG, negative is UP (drawn as a massive upward peak, i.e. negative subtraction on coordinate space)
            if (i === 50) {
              noise = -spikeAmplitude; // Upwards spike
            } else if (i === 48 || i === 52) {
              noise = -spikeAmplitude * 0.4;
            } else if (i > 50 && i < 58) {
              noise = slowWaveAmplitude * Math.sin((i - 50) * 0.4); // Followed by a slow wave (downwards, i.e. positive polarity)
            }
          } else if (channelIndex === 0) {
            // Fp1-F7: input 2 (F7) is highly negative. Bipolar math: V(Fp1) - V(F7). If F7 is negative, the subtraction becomes positive.
            // Positive is deflecting DOWN (i.e., downward peak). This creates the classic "PHASE REVERSAL" pointing toward each other!
            if (i === 50) {
              noise = spikeAmplitude; // Downwards spike
            } else if (i === 48 || i === 52) {
              noise = spikeAmplitude * 0.4;
            } else if (i > 50 && i < 58) {
              noise = -slowWaveAmplitude * Math.sin((i - 50) * 0.4); // Inverse slow wave
            }
          } else if (channelIndex === 2) {
            // T3-T5: Farther from focus, mild propagation or background spike
            if (i === 50) noise = -10;
          }
        }
      }

      y += noise;
      points.push(`${x},${y}`);
    }

    return `M ${points.join(' L ')}`;
  };

  return (
    <div id="visualizers-section" className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/60 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
        <button
          onClick={() => setActiveTab('anatomy-eeg')}
          className={`px-4 py-2.5 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded transition-all duration-150 cursor-pointer ${
            activeTab === 'anatomy-eeg'
              ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.15)]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 border-2 border-transparent'
          }`}
        >
          Anatomy & EEG Tracing
        </button>
        <button
          onClick={() => setActiveTab('flowchart')}
          className={`px-4 py-2.5 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded transition-all duration-150 cursor-pointer ${
            activeTab === 'flowchart'
              ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.15)]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 border-2 border-transparent'
          }`}
        >
          Pre-Surgical Clinical Flowchart
        </button>
        <button
          onClick={() => setActiveTab('semiology-grid')}
          className={`px-4 py-2.5 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded transition-all duration-150 cursor-pointer ${
            activeTab === 'semiology-grid'
              ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.15)]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 border-2 border-transparent'
          }`}
        >
          Semiology Differential Matrix
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Tab 1: Anatomy & EEG */}
        {activeTab === 'anatomy-eeg' && (
          <motion.div
            key="anatomy-eeg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-6"
          >
            {/* Left Col: Brain anatomy drawing */}
            <div className="xl:col-span-6 bg-white border-2 border-slate-800 rounded-xl p-5 md:p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-slate-900 rounded text-sky-400 border border-slate-950">
                    <Brain className="w-4 h-4" />
                  </div>
                  <h3 className="text-base md:text-lg font-display font-black text-slate-950 uppercase tracking-tight">Anatomical Localization Focus</h3>
                </div>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                  Mesial temporal structures sit on the medial edge of the temporal lobe. Hover over or tap highlighted regions to explore their role in TLE.
                </p>

                {/* Brain SVG diagram */}
                <div className="relative bg-slate-50 border-2 border-slate-200 rounded-lg p-4 flex items-center justify-center min-h-[220px]">
                  <svg viewBox="0 0 400 240" className="w-full max-w-[340px] h-auto drop-shadow-md">
                    {/* Simplified brain contour */}
                    <path
                      d="M 50,120 C 50,40 180,20 280,30 C 350,38 380,80 380,120 C 380,150 360,165 310,165 C 290,165 260,210 210,210 C 170,210 150,175 120,175 C 90,175 50,155 50,120 Z"
                      fill="#f1f5f9"
                      stroke="#94a3b8"
                      strokeWidth="2.5"
                    />

                    {/* Temporal Lobe shaded zone */}
                    <path
                      d="M 120,175 C 150,175 170,210 210,210 C 260,210 290,165 310,165 C 280,140 230,130 150,130 C 110,130 90,145 120,175 Z"
                      fill="#bae6fd"
                      fillOpacity="0.4"
                      stroke="#0ea5e9"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <text x="210" y="185" fill="#0284c7" fontSize="10" className="font-mono font-bold" textAnchor="middle">TEMPORAL LOBE</text>

                    {/* Amygdala (Almond shape) */}
                    <ellipse
                      cx="160"
                      cy="150"
                      rx="10"
                      ry="7"
                      fill={hoveredAnatomy === 'amygdala' ? '#0ea5e9' : '#0284c7'}
                      className="cursor-pointer transition-colors duration-200"
                      onMouseEnter={() => setHoveredAnatomy('amygdala')}
                      onMouseLeave={() => setHoveredAnatomy(null)}
                    />
                    <text x="110" y="153" fill="#0284c7" fontSize="9" className="font-mono font-bold">Amygdala</text>
                    <line x1="125" y1="150" x2="150" y2="150" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Hippocampus (Curved tube) */}
                    <path
                      d="M 170,152 C 180,152 205,158 215,145 C 220,138 215,128 205,132"
                      fill="none"
                      stroke={hoveredAnatomy === 'hippocampus' ? '#14b8a6' : '#0d9488'}
                      strokeWidth="11"
                      strokeLinecap="round"
                      className="cursor-pointer transition-colors duration-200"
                      onMouseEnter={() => setHoveredAnatomy('hippocampus')}
                      onMouseLeave={() => setHoveredAnatomy(null)}
                    />
                    <text x="235" y="132" fill="#0d9488" fontSize="9" className="font-mono font-bold">Hippocampus</text>
                    <line x1="210" y1="131" x2="230" y2="131" stroke="#0d9488" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Meyer's loop (Optic radiation wrap) */}
                    <path
                      d="M 175,156 C 220,165 240,115 285,110"
                      fill="none"
                      stroke={hoveredAnatomy === 'meyers_loop' ? '#f59e0b' : '#d97706'}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="2 1"
                      className="cursor-pointer transition-colors duration-200"
                      onMouseEnter={() => setHoveredAnatomy('meyers_loop')}
                      onMouseLeave={() => setHoveredAnatomy(null)}
                    />
                    <text x="285" y="98" fill="#d97706" fontSize="9" className="font-mono font-bold text-right" textAnchor="end">Meyer's Loop</text>
                    <line x1="250" y1="125" x2="255" y2="100" stroke="#d97706" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                </div>
              </div>

              {/* Dynamic anatomy display pane */}
              <div className="mt-4 bg-slate-50 p-4 rounded-lg border-2 border-slate-200 min-h-[120px] flex flex-col justify-center">
                {hoveredAnatomy ? (
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        hoveredAnatomy === 'hippocampus' ? 'bg-teal-500' : hoveredAnatomy === 'amygdala' ? 'bg-sky-500' : 'bg-amber-500'
                      }`} />
                      {anatomyDetails[hoveredAnatomy].title}
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      {anatomyDetails[hoveredAnatomy].description}
                    </p>
                    <p className="text-xs text-sky-800 mt-1.5 font-sans leading-relaxed bg-sky-50/50 p-2 rounded border border-sky-100">
                      <strong className="text-sky-950 font-bold uppercase text-[10px] block mb-0.5">Surgical/Clinical Impact:</strong> {anatomyDetails[hoveredAnatomy].clinical}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-xs text-slate-500 font-mono font-semibold uppercase tracking-wide">Hover over brain structures (Hippocampus, Amygdala, Meyer's Loop) to display anatomical and surgical details.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: EEG simulator */}
            <div className="xl:col-span-6 bg-white border-2 border-slate-800 rounded-xl p-5 md:p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-900 rounded text-sky-400 border border-slate-950">
                      <Activity className="w-4 h-4" />
                    </div>
                    <h3 className="text-base md:text-lg font-display font-black text-slate-950 uppercase tracking-tight">Dynamic 4-Channel Bipolar EEG Simulator</h3>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-sky-700 bg-sky-50 border-2 border-sky-400 rounded">
                    L. Temporal Focus
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-4 font-medium">
                  Assess how interictal spikes arise. Click "Epileptiform Anterior Spike" to trigger the classic **Phase Reversal** at F7 (Fp1-F7 upward subtraction paired with F7-T3 downward deflection).
                </p>

                {/* Controller buttons */}
                <div className="flex gap-2.5 mb-6">
                  <button
                    onClick={() => setEegMode('normal')}
                    className={`flex-1 px-3 py-2 text-xs font-mono font-bold rounded border-2 transition-all duration-150 cursor-pointer ${
                      eegMode === 'normal'
                        ? 'bg-sky-500 border-slate-950 text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                    }`}
                  >
                    ● Resting Background (Normal Alpha/Theta)
                  </button>
                  <button
                    onClick={() => setEegMode('spike')}
                    className={`flex-1 px-3 py-2 text-xs font-mono font-bold rounded border-2 transition-all duration-150 cursor-pointer ${
                      eegMode === 'spike'
                        ? 'bg-red-500 border-slate-950 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                    }`}
                  >
                    ⚡ Anterior Temporal Spike (Left TLE Focus)
                  </button>
                </div>

                {/* EEG Screen */}
                <div className="bg-slate-950 border-2 border-slate-900 rounded-lg p-4 font-mono text-xs text-slate-400 space-y-2 relative overflow-hidden">
                  {/* Grid Lines for authenticity */}
                  <div className="absolute inset-0 pointer-events-none grid grid-cols-5 divide-x divide-slate-900/60" />
                  <div className="absolute inset-0 pointer-events-none grid grid-rows-4 divide-y divide-slate-900/40" />

                  {/* Channel 1 */}
                  <div className="relative h-16">
                    <span className="absolute top-1 left-1 text-[10px] font-bold text-slate-500 z-10">Fp1 - F7 (Frontopolar-Anterior Temporal)</span>
                    <svg className="w-full h-full">
                      <path
                        d={generateEegPath(0, eegMode, 500)}
                        fill="none"
                        stroke={eegMode === 'spike' ? '#f43f5e' : '#10b981'}
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                    </svg>
                  </div>

                  {/* Channel 2 */}
                  <div className="relative h-16 border-t border-slate-900/60 pt-2">
                    <span className="absolute top-1 left-1 text-[10px] font-bold text-slate-500 z-10">F7 - T3 (Anterior-Mid Temporal)</span>
                    <svg className="w-full h-full">
                      <path
                        d={generateEegPath(1, eegMode, 500)}
                        fill="none"
                        stroke={eegMode === 'spike' ? '#f43f5e' : '#10b981'}
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                    </svg>
                    {eegMode === 'spike' && (
                      <span className="absolute right-12 top-5 border border-red-500/30 bg-red-950/40 px-2 py-0.5 rounded text-[9px] text-red-400 uppercase tracking-widest font-bold animate-pulse z-20">
                        F7 PHASE REVERSAL
                      </span>
                    )}
                  </div>

                  {/* Channel 3 */}
                  <div className="relative h-16 border-t border-slate-900/60 pt-2">
                    <span className="absolute top-1 left-1 text-[10px] font-bold text-slate-500 z-10">T3 - T5 (Mid-Posterior Temporal)</span>
                    <svg className="w-full h-full">
                      <path
                        d={generateEegPath(2, eegMode, 500)}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>

                  {/* Channel 4 */}
                  <div className="relative h-16 border-t border-slate-900/60 pt-2">
                    <span className="absolute top-1 left-1 text-[10px] font-bold text-slate-500 z-10">T5 - O1 (Posterior Temporal-Occipital)</span>
                    <svg className="w-full h-full">
                      <path
                        d={generateEegPath(3, eegMode, 500)}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Legend/Interpretation text */}
              <div className="mt-4 bg-slate-50 p-3 rounded border-2 border-slate-200 text-xs">
                <p className="text-slate-600 font-sans leading-relaxed font-medium">
                  <strong className="text-slate-900 font-bold uppercase text-[10px] block mb-0.5">EEG Interpretation:</strong> In bipolar montages, a localized negative discharge appears as a <strong>phase reversal</strong> (spikes pointing towards each other in adjacent channels). Here, the negative focus at <strong>F7</strong> causes an upward spike in <em>F7-T3</em> and a downward spike in <em>Fp1-F7</em>, confirming a Left Anterior Temporal interictal focus.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Flowchart */}
        {activeTab === 'flowchart' && (
          <motion.div
            key="flowchart"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-2 border-slate-800 rounded-xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-900 rounded text-sky-400 border border-slate-950">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="text-base md:text-lg font-display font-black text-slate-950 uppercase tracking-tight">Pre-Surgical Patient Decisions Flowchart</h3>
            </div>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-6 font-medium">
              Track the strategic patient management timeline. Click any of the numbered milestone circles to review detailed actions, clinical caveats, and surgical decision guidelines.
            </p>

            {/* Stepper visualizer */}
            <div className="flex flex-col md:flex-row items-stretch gap-3 mb-6">
              {flowchartSteps.map((step, idx) => {
                const isActive = activeStep === step.id;
                return (
                  <div key={step.id} className="flex-1 flex flex-col">
                    <button
                      onClick={() => setActiveStep(step.id)}
                      className={`text-left p-3.5 rounded-lg border-2 transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 ${
                        isActive
                          ? 'bg-sky-500 border-slate-950 text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-650 hover:border-slate-800 hover:bg-slate-100 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-7 h-7 rounded text-xs font-mono font-bold flex items-center justify-center border-2 shrink-0 ${
                          isActive
                            ? 'bg-slate-950 border-slate-950 text-white'
                            : 'bg-slate-200 border-slate-300 text-slate-600'
                        }`}>
                          {step.id}
                        </span>
                        <div>
                          <div className={`text-[9px] font-mono uppercase tracking-wider font-bold ${isActive ? 'text-sky-950' : 'text-slate-400'}`}>Milestone</div>
                          <div className={`text-xs font-extrabold leading-tight ${isActive ? 'text-slate-950' : 'text-slate-800'}`}>
                            {step.title}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-950' : 'text-slate-400'}`} />
                    </button>
                    {idx < flowchartSteps.length - 1 && (
                      <div className="h-4 w-0.5 bg-slate-300 self-center md:hidden" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Detail Display Pane */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50 rounded-lg p-5 border-2 border-slate-200 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-mono font-bold text-sky-850 uppercase tracking-wider">
                    Active Phase details • Step {activeStep} of 5
                  </span>
                  <span className="text-xs font-sans font-bold text-teal-850 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {flowchartSteps[activeStep - 1].status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="md:col-span-4 space-y-1.5">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-450 tracking-wider">Clinical Background</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      {flowchartSteps[activeStep - 1].description}
                    </p>
                  </div>

                  <div className="md:col-span-4 space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-5">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-450 tracking-wider">Mandated Action Checklist</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      {flowchartSteps[activeStep - 1].action}
                    </p>
                  </div>

                  <div className="md:col-span-4 space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-5 bg-red-50 p-3.5 rounded-lg border border-red-200">
                    <h4 className="text-xs font-mono font-extrabold text-red-700 flex items-center gap-1.5 uppercase tracking-wider">
                      ⚠️ Crucial Clinical Alert / Caveat
                    </h4>
                    <p className="text-xs text-red-950 leading-relaxed font-sans font-semibold">
                      {flowchartSteps[activeStep - 1].warning}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Tab 3: Semiology Grid */}
        {activeTab === 'semiology-grid' && (
          <motion.div
            key="semiology-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-2 border-slate-800 rounded-xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-900 rounded text-sky-400 border border-slate-950">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="text-base md:text-lg font-display font-black text-slate-950 uppercase tracking-tight">Interactive Semiology Differential Analyzer</h3>
            </div>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-6 font-medium">
              Compare different focal seizure subtypes and major mimics. Select any option below to inspect its unique diagnostic phenotype, semiology profile, and diagnostic approach.
            </p>

            {/* Picker buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { id: 'mesial', label: 'mTLE (Mesial Temporal)', color: 'border-indigo-650 bg-indigo-500 text-white' },
                { id: 'neocortical', label: 'nTLE (Neocortical)', color: 'border-sky-650 bg-sky-500 text-slate-950' },
                { id: 'frontal', label: 'Frontal Lobe (FLE)', color: 'border-teal-650 bg-teal-500 text-slate-950' },
                { id: 'pnes', label: 'PNES (Psychogenic Mimic)', color: 'border-purple-650 bg-purple-500 text-white' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedEntity(item.id as any)}
                  className={`px-3 py-2.5 text-xs font-mono font-bold rounded border-2 transition-all duration-150 cursor-pointer ${
                    selectedEntity === item.id
                      ? item.color + ' shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Display Entity Grid Details */}
            <div className="bg-slate-50 p-5 rounded-lg border-2 border-slate-200 space-y-4">
              {selectedEntity === 'mesial' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-indigo-700 uppercase tracking-widest font-extrabold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-150">Typical Presentation</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Mesial Temporal (mTLE)</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      Steretypical, progressive onset. Begins with rising epigastric aura, deja vu, or metallic tastes. Followed by blank staring, behavioral arrest, ipsilateral manual automatisms (fiddling) and contralateral dystonic arm posturing.
                    </p>
                  </div>
                  <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] font-mono text-indigo-700 uppercase tracking-widest font-extrabold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-150">EEG Signature</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Anterior Temporal Spikes</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      Interictal: sharp spikes or sharp waves centered at F7-T3 (left) or F8-T4 (right). Ictal: rhythmic 5-6 Hz theta activity arising in the temporal channels within seconds of clinical onset.
                    </p>
                  </div>
                  <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] font-mono text-indigo-700 uppercase tracking-widest font-extrabold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-150">MRI & Pathology</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Hippocampal Sclerosis (MTS)</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      High-resolution coronal 3T MRI perpendicular to hippocampus shows volume atrophy, loss of internal architecture digitations, and increased signal intensity on FLAIR and T2-weighted images.
                    </p>
                  </div>
                </div>
              )}

              {selectedEntity === 'neocortical' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-sky-700 uppercase tracking-widest font-extrabold bg-sky-50 px-1.5 py-0.5 rounded border border-sky-150">Typical Presentation</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Neocortical Temporal (nTLE)</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      Seizures originate in the lateral temporal gyri. Aura contains auditory features (buzzing, static, whistling), vestibular hallucinations (vertigo), or complex visual scenes. Unresponsiveness occurs, but rapid secondary generalization or contralateral motor version is more common.
                    </p>
                  </div>
                  <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] font-mono text-sky-700 uppercase tracking-widest font-extrabold bg-sky-50 px-1.5 py-0.5 rounded border border-sky-150">EEG Signature</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Mid-to-Posterior Spikes</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      Interictal spikes localize to mid-temporal (T3/T4) or posterior-temporal (T5/T6) nodes rather than anterior (F7/F8). Ictal onset patterns are less likely to feature highly rhythmic theta and have broader, irregular neocortical rhythms.
                    </p>
                  </div>
                  <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] font-mono text-sky-700 uppercase tracking-widest font-extrabold bg-sky-50 px-1.5 py-0.5 rounded border border-sky-150">MRI & Pathology</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Focal Cortical Dysplasia / Tumor</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      MRI is often normal, or reveals structural etiologies of the lateral cortex: Focal Cortical Dysplasia (FCD), vascular malformations (cavernomas), low-grade gliomas (DNET, ganglioglioma), or focal gliotic scars.
                    </p>
                  </div>
                </div>
              )}

              {selectedEntity === 'frontal' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-teal-700 uppercase tracking-widest font-extrabold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-150">Typical Presentation</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Frontal Lobe Epilepsy (FLE)</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      Seizures are explosive, nocturnal, extremely brief (&lt;30-60 seconds), with minimal or no postictal confusion. Semiology involves hypermotor thrashing, vocalizations (screaming, cursing), bicycling movements of the legs, and asymmetric tonic posturing (fencing posture).
                    </p>
                  </div>
                  <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] font-mono text-teal-700 uppercase tracking-widest font-extrabold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-150">EEG Signature</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Frontal Spikes (Often Obscured)</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      Interictal spikes occur over frontal electrodes (F3/F4, Fz). However, ictal scalp EEG is frequently normal or obscured by massive muscle and movement artifacts due to explosive physical movements.
                    </p>
                  </div>
                  <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] font-mono text-teal-700 uppercase tracking-widest font-extrabold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-150">MRI & Pathology</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">FCD / Lesions / Normal</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      Commonly normal or shows subtle Focal Cortical Dysplasia (FCD Type II), particularly deep in the frontal sulci. Highly associated with structural lesions of the frontal gyri, anterior cingulate, or supplementary motor area.
                    </p>
                  </div>
                </div>
              )}

              {selectedEntity === 'pnes' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-purple-700 uppercase tracking-widest font-extrabold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-150">Typical Presentation</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Psychogenic Seizures (PNES)</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      Highly prolonged episodes (&gt;10-45 minutes), waxing and waning. Semiology: pelvic thrusting, out-of-phase limb thrashing, side-to-side head shaking, closed eyes with strong resistance to eyelid opening. Rapid recovery, weeping/crying, and absence of physical postictal confusion.
                    </p>
                  </div>
                  <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] font-mono text-purple-700 uppercase tracking-widest font-extrabold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-150">EEG Signature</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Perfectly Normal EEG</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      Always normal background during the ictal phase. Normal posterior alpha rhythm persists during clinical "unresponsiveness" without postictal slowing, providing absolute electroclinical proof of non-epileptic origin.
                    </p>
                  </div>
                  <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] font-mono text-purple-700 uppercase tracking-widest font-extrabold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-150">MRI & Pathology</span>
                    <h4 className="text-sm font-bold text-slate-900 uppercase">Entirely Normal Brain</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      Normal brain structure on MRI. Diagnostic investigation of choice is EMU admission to capture events on video-EEG. Treatment consists of immediate, supportive communication of the diagnosis and CBT.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
