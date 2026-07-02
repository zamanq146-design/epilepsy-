import { useState } from 'react';
import { HighlightItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Info, HelpCircle, Activity, Sparkles, BookOpen } from 'lucide-react';

export default function Vignette() {
  const highlights: HighlightItem[] = [
    {
      term: "rising sensation in her stomach (epigastric aura)",
      type: "semiology",
      title: "Epigastric Aura (Visceral Sensory)",
      explanation: "This represents the most common aura in mesial TLE (~60-70% of cases). It results from seizure discharges originating in, or rapidly propagating to, the amygdala and the anterior insula, which regulate visceral autonomic sensations."
    },
    {
      term: "metallic taste",
      type: "semiology",
      title: "Gustatory Aura",
      explanation: "A gustatory sensation (like metallic or bitter tastes) suggests seizure involvement of the deep operculo-insular cortex or the amygdala. It can occur in both mesial and neocortical temporal lobe networks."
    },
    {
      term: "déjà vu",
      type: "concept",
      title: "Experiential/Cognitive Aura",
      explanation: "A profound, sudden feeling of familiarity. This occurs due to focal seizure discharges localized to the entorhinal and perirhinal cortices (which handle memory and familiarity gating) rather than the hippocampus itself."
    },
    {
      term: "picking movements with her left hand (ipsilateral automatisms)",
      type: "sign",
      title: "Ipsilateral Manual Automatisms",
      explanation: "Manual automatisms (picking, playing with clothes, rubbing) are semi-purposeful repetitive movements. They typically occur ipsilateral to the seizure focus (i.e., left hand indicates left-sided seizure) due to the preservation of motor control on the side of the seizure focus."
    },
    {
      term: "right arm remains stiff and slightly flexed in a dystonic posture",
      type: "sign",
      title: "Contralateral Ictal Dystonia",
      explanation: "Rigid, tonic, or twisted arm posturing is a highly reliable lateralizing sign. It is contralateral to the seizure focus in over 90% of cases (i.e., right arm dystonia indicates a left temporal seizure focus). It is caused by the seizure propagating into the ipsilateral basal ganglia (caudate/putamen)."
    },
    {
      term: "prominent word-finding difficulty and paraphasic errors (postictal dysphasia)",
      type: "temporal",
      title: "Postictal Dysphasia",
      explanation: "A highly robust lateralizing sign indicating seizure origin in the language-dominant hemisphere. In a right-handed patient, postictal language impairment points directly to a dominant (left) temporal lobe focus with >95% accuracy. It is caused by postictal functional exhaustion of Wernicke's and Broca's networks."
    }
  ];

  const [selectedHighlight, setSelectedHighlight] = useState<HighlightItem | null>(null);

  // Helper to highlight parts of the text
  const renderInteractiveNarrative = () => {
    const text = `A 32-year-old right-handed female presents with a 3-year history of episodic 'altered awareness' occurring 2–3 times per month. Each episode begins with a sudden, intense rising sensation in her stomach (epigastric aura), accompanied by a metallic taste and an undefinable feeling of familiarity (déjà vu). Within 30 seconds, she becomes unresponsive to verbal commands, stares blankly, and performs repetitive picking movements with her left hand (ipsilateral automatisms), while her right arm remains stiff and slightly flexed in a dystonic posture. Within 2 minutes, the seizure resolves, leaving her in a postictal state characterized by prominent word-finding difficulty and paraphasic errors (postictal dysphasia). Neurological examination is entirely normal. Vital signs are stable.`;

    let currentIndex = 0;
    const elements: any[] = [];

    // Sort highlights by length descending to match larger blocks first if overlaps,
    // but in our case they are disjoint and distinct substrings.
    const sortedHighlights = [...highlights].sort((a, b) => text.indexOf(a.term) - text.indexOf(b.term));

    sortedHighlights.forEach((hl, idx) => {
      const startIndex = text.indexOf(hl.term);
      if (startIndex === -1) return;

      // Add preceding plain text
      if (startIndex > currentIndex) {
        elements.push(
          <span key={`text-${idx}`} className="text-slate-800 leading-relaxed font-sans text-sm md:text-base">
            {text.substring(currentIndex, startIndex)}
          </span>
        );
      }

      const isSelected = selectedHighlight?.term === hl.term;

      // Add highlighted interactive text
      elements.push(
        <button
          key={`hl-${idx}`}
          id={`vignette-hl-${idx}`}
          onClick={() => setSelectedHighlight(hl)}
          className={`px-1.5 py-0.5 rounded font-bold text-left transition-all duration-150 cursor-pointer text-xs md:text-sm inline-block my-0.5 border ${
            isSelected
              ? 'bg-sky-500 text-slate-950 border-slate-800 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ring-2 ring-sky-300'
              : hl.type === 'semiology'
              ? 'bg-sky-50 text-sky-800 border-sky-300 hover:bg-sky-100 hover:text-sky-900'
              : hl.type === 'sign'
              ? 'bg-teal-50 text-teal-800 border-teal-300 hover:bg-teal-100 hover:text-teal-900'
              : hl.type === 'temporal'
              ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 hover:text-amber-900'
              : 'bg-indigo-50 text-indigo-800 border-indigo-300 hover:bg-indigo-100 hover:text-indigo-900'
          }`}
        >
          {hl.term}
        </button>
      );

      currentIndex = startIndex + hl.term.length;
    });

    // Add trailing text
    if (currentIndex < text.length) {
      elements.push(
        <span key="text-end" className="text-slate-800 leading-relaxed font-sans text-sm md:text-base">
          {text.substring(currentIndex)}
        </span>
      );
    }

    return elements;
  };

  return (
    <div id="vignette-section" className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-slate-900 border-2 border-slate-950 rounded-lg text-sky-400">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-display font-black text-slate-900 uppercase tracking-tight">1. Clinical Case Narrative</h2>
          <p className="text-xs text-slate-500 font-mono uppercase font-bold">Deciphering Semiology & Electro-Clinical Correlations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Text of Vignette */}
        <div className="lg:col-span-7 bg-white border-2 border-slate-800 rounded-xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 font-bold flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-sky-500" /> Patient Chart #847-17
              </span>
              <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase font-bold">
                Active Semiology View
              </span>
            </div>
            
            {/* The narrative with interactives */}
            <p className="leading-relaxed antialiased">
              {renderInteractiveNarrative()}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Info className="w-4 h-4 text-sky-500 shrink-0" />
            <span className="font-medium">Interactive Guide: Click the highlighted medical terms to analyze their localization power.</span>
          </div>
        </div>

        {/* Right Side: Analysis Display */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-white border-2 border-slate-800 rounded-xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex-1 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {selectedHighlight ? (
                <motion.div
                  key={selectedHighlight.term}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 h-full flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                        selectedHighlight.type === 'semiology'
                          ? 'bg-sky-50 text-sky-700 border-sky-300'
                          : selectedHighlight.type === 'sign'
                          ? 'bg-teal-50 text-teal-700 border-teal-300'
                          : selectedHighlight.type === 'temporal'
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-300'
                      }`}>
                        {selectedHighlight.type} indicator
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">Left TLE Concordance</span>
                    </div>

                    <h3 className="text-lg font-display font-black text-slate-950 flex items-center gap-2 uppercase tracking-tight">
                      <Sparkles className="w-4.5 h-4.5 text-sky-500 shrink-0" />
                      {selectedHighlight.title}
                    </h3>
                    
                    <p className="text-slate-700 text-sm leading-relaxed font-sans bg-slate-50 p-3 rounded border border-slate-200">
                      {selectedHighlight.explanation}
                    </p>
                  </div>

                  {/* Anatomical relevance label */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 font-bold uppercase">Localizing Weight:</span>
                    <span className="text-emerald-600 font-extrabold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ● HIGH CONCORDANCE (&gt;90%)
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="p-3 bg-slate-50 border-2 border-slate-200 rounded-full text-slate-400 shadow-inner">
                    <HelpCircle className="w-8 h-8 text-sky-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Semiology Decoder</h4>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                      Select any colored clinical symptom in the narrative on the left to reveal its underlying localization importance and neurophysiological explanation.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
