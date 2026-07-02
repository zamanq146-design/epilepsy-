import { useState } from 'react';
import { MCQ } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Award, RefreshCw, ChevronLeft, ChevronRight, HelpCircle, BookOpen } from 'lucide-react';

export default function Quiz() {
  const mcqs: MCQ[] = [
    {
      id: 1,
      title: "MCQ 1: Semiology & Localization",
      scenario: "A 28-year-old male is admitted to the Epilepsy Monitoring Unit (EMU). Video-EEG captures a habitual seizure starting with an auditory aura of 'buzzing static', followed rapidly by forced head turning (version) to the left, followed by bilateral tonic-clonic activity. Brain MRI shows no structural lesions. Interictal EEG shows sharp spikes in the left mid-to-posterior temporal region.",
      question: "Which of the following is the most likely seizure onset zone?",
      options: [
        { id: "A", text: "Left mesial temporal structures (hippocampus/amygdala)" },
        { id: "B", text: "Left lateral temporal neocortex (auditory cortex)" },
        { id: "C", text: "Right mesial temporal structures" },
        { id: "D", text: "Right frontal lobe (supplementary motor area)" },
        { id: "E", text: "Right lateral temporal neocortex" }
      ],
      correctAnswer: "B",
      explanation: "Auditory auras (such as buzzing, ringing, or complex sounds) are the classic signature of neocortical (lateral) temporal lobe epilepsy, distinct from mesial TLE. The primary auditory cortex resides in Heschl's gyrus on the superior temporal gyrus (lateral temporal neocortex). Forced head turning (ictal version) is typically contralateral to the seizure focus (i.e. version to the left points to a right-sided focus, or here left posterior focus propagation to the contralateral hemisphere). The left-sided lateral temporal spikes on interictal EEG further support a Left Lateral (Neocortical) Temporal Lobe origin.",
      whyNot: "A is incorrect as mesial TLE presents with epigastric or experiential/cognitive auras (e.g. deja vu), not auditory. C and E are contralateral (right-sided). D (supplementary motor area) classically presents with explosive hypermotor seizures or asymmetric fencing postures, rather than initial auditory auras."
    },
    {
      id: 2,
      title: "MCQ 2: Neuroimaging Interpretation",
      scenario: "A 35-year-old female with drug-resistant epilepsy undergoes coronal brain MRI utilizing an epilepsy protocol. Coronal FLAIR sequences show hyperintensity in the right hippocampus, and T2-weighted images show hippocampal volume loss with flattening of the normal digitations. High-density video-EEG captures her habitual seizures, with right anterior temporal rhythmic theta activity (5-6 Hz) within 10 seconds of clinical onset.",
      question: "Which of the following represents the most appropriate next step in management?",
      options: [
        { id: "A", text: "Initiate a third anti-seizure medication (e.g., Lacosamide) at maximum tolerated dose." },
        { id: "B", text: "Perform invasive intracranial depth electrode monitoring (sEEG) of the bilateral temporal lobes." },
        { id: "C", text: "Proceed directly to a pre-surgical neuropsychological evaluation and fMRI/Wada test." },
        { id: "D", text: "Implant a responsive neurostimulation (RNS) system in the right hippocampus." },
        { id: "E", text: "Perform an urgent right-sided anterior temporal lobectomy without further cognitive mapping." }
      ],
      correctAnswer: "C",
      explanation: "The patient is confirmed to have Drug-Resistant Epilepsy (failure of 2 appropriately chosen ASMs) and has highly concordant findings pointing to right mesial temporal sclerosis (right anterior temporal EEG spikes and concordant right hippocampal sclerosis on MRI). The next clinical step in the pre-surgical evaluation (Phase 1) is to perform a comprehensive neuropsychological evaluation (to assess baseline cognitive/memory status) and language/memory mapping (via fMRI or a Wada test) to ensure safe surgical planning.",
      whyNot: "A is incorrect as failing 2 ASMs carries a <5% chance of seizure freedom with a third medication. B is incorrect because intracranial sEEG is reserved for discordant or non-lesional cases; this patient has fully concordant non-invasive data. D (RNS) is palliative and reserved for eloquent or bilateral foci; unilateral MTS is prime for a curative resection. E is incorrect as cognitive and language mapping must be completed first to protect against post-operative memory decline."
    },
    {
      id: 3,
      title: "MCQ 3: Mimic Recognition (TLE vs. PNES)",
      scenario: "A 24-year-old female presents with frequent episodes of unresponsiveness. The episodes are described as lasting from 5 to 45 minutes, with waxing and waning thrashing of all four limbs, pelvic thrusting, and tightly closed eyes with resistance to eyelid opening. There is no postictal confusion; she frequently recovers immediately, sometimes crying. She has failed three different ASMs. Interictal and routine ictal EEGs are completely normal.",
      question: "What is the most appropriate next step to confirm the diagnosis?",
      options: [
        { id: "A", text: "Increase the dose of her current ASMs and add a benzodiazepine rescue therapy." },
        { id: "B", text: "Obtain a high-resolution 3T epilepsy-protocol brain MRI." },
        { id: "C", text: "Admit the patient to the Epilepsy Monitoring Unit (EMU) for continuous video-EEG monitoring." },
        { id: "D", text: "Refer the patient for cognitive behavioral therapy (CBT) for confirmed somatic symptom disorder." },
        { id: "E", text: "Perform a lumbar puncture to rule out autoimmune limbic encephalitis." }
      ],
      correctAnswer: "C",
      explanation: "The clinical presentation (extremely prolonged duration, waxing and waning course, pelvic thrusting, out-of-phase limb movements, tightly closed eyes with resistance to opening, rapid recovery, and absence of postictal state) is highly classic for Psychogenic Non-Epileptic Seizures (PNES), a major psychiatric mimic of TLE. However, before stopping medications or confirming psychogenic origin, the gold standard is to admit the patient to the EMU for video-EEG monitoring to capture a habitual event without electrographic seizure correlates.",
      whyNot: "A is incorrect as increasing ASMs will only increase systemic toxicity. B and E are premature and not the gold standard for distinguishing PNES from epilepsy. D is incorrect because although CBT is the treatment for PNES, the diagnosis must be definitively confirmed in the EMU first to prevent clinical errors and maintain patient trust."
    },
    {
      id: 4,
      title: "MCQ 4: Complications & Side Effects",
      scenario: "A 45-year-old male with a history of left-sided mesial temporal lobe epilepsy undergoes a successful left anterior temporal lobectomy. Six months post-operatively, he is completely seizure-free but complains of a visual disturbance where he occasionally bumps into objects on his right-hand side. Neuropsychological evaluation reveals he has new difficulty recalling names of familiar people.",
      question: "Which pair of anatomical complications is most likely responsible for these symptoms?",
      options: [
        { id: "A", text: "Damage to the optic chiasm and post-operative depression." },
        { id: "B", text: "Injury to Meyer's loop (inferior optic radiations) and dominant hippocampus resection." },
        { id: "C", text: "Injury to Baumann's loop (superior optic radiations) and non-dominant amygdala resection." },
        { id: "D", text: "Retinal detachment and ischemic stroke of the middle cerebral artery." },
        { id: "E", text: "Damage to the lateral geniculate nucleus and temporal horn collapse." }
      ],
      correctAnswer: "B",
      explanation: "Left anterior temporal lobectomy can injure Meyer's loop (the inferior fibers of the optic radiations that loop around the temporal horn of the lateral ventricle), leading to a contralateral superior homonymous quadrantanopia ('pie in the sky' visual defect), causing him to bump into objects on his right. Additionally, resecting the dominant (usually left) hippocampus frequently leads to verbal memory decline, such as word-finding and name-recall deficits.",
      whyNot: "A is incorrect as the optic chiasm is not in the surgical pathway of a temporal lobectomy. C is incorrect as superior radiations (Baumann's loop) travel through the parietal lobe, causing a contralateral inferior quadrantanopia, and non-dominant resection is associated with visual-spatial deficits, not verbal deficits. D and E are highly unlikely and incorrect anatomical localisations."
    },
    {
      id: 5,
      title: "MCQ 5: Complex Management & Pregnancy",
      scenario: "A 26-year-old female with a history of well-controlled temporal lobe epilepsy is planning her first pregnancy. She is currently taking Valproate 1000 mg daily. Her last seizure was 3 years ago. She is highly anxious about the risk of malformations in her child and wants to know the safest approach.",
      question: "Which of the following represents the most appropriate integrated management strategy?",
      options: [
        { id: "A", text: "Stop all anti-seizure medications immediately to eliminate teratogenic risk during the first trimester." },
        { id: "B", text: "Keep her on Valproate but reduce the dose to 250 mg daily and add high-dose folic acid (5 mg/day)." },
        { id: "C", text: "Gradually transition her to Levetiracetam or Lamotrigine prior to conception, optimize the dose, and prescribe folic acid (4-5 mg/day)." },
        { id: "D", text: "Switch her immediately to Phenytoin and monitor serum free levels weekly during the first trimester." },
        { id: "E", text: "Stop Valproate and proceed to an urgent anterior temporal lobectomy so she can be drug-free during pregnancy." }
      ],
      correctAnswer: "C",
      explanation: "Valproate is associated with the highest rate of major congenital malformations (neural tube defects, cardiac anomalies) and neurodevelopmental delays among all ASMs. In a patient planning pregnancy, the standard guideline is to gradually transition to safer alternatives (such as Levetiracetam or Lamotrigine) prior to conception, while administering high-dose folic acid (4–5 mg/day) to reduce the risk of neural tube defects. Abrupt cessation of ASMs is contraindicated as status epilepticus represents a critical threat to both mother and fetus.",
      whyNot: "A is incorrect as stopping ASMs carries a high risk of seizure recurrence and fetal hypoxia. B is incorrect as any dose of Valproate carries higher teratogenic risk than other ASMs, and lowering the dose may trigger breakthrough seizures without eliminating the risk. D is incorrect as Phenytoin is also highly teratogenic (fetal hydantoin syndrome) and difficult to manage. E is incorrect as epilepsy surgery is an elective, highly evaluated procedure that cannot be rushed, and she is already well-controlled."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const activeMCQ = mcqs[currentIdx];
  const hasAnswered = selectedAnswers[activeMCQ.id] !== undefined;
  const chosenAnswer = selectedAnswers[activeMCQ.id];

  const handleSelectOption = (optionId: string) => {
    if (hasAnswered) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [activeMCQ.id]: optionId
    });
  };

  const handleNext = () => {
    if (currentIdx < mcqs.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setQuizFinished(false);
  };

  // Score Calculations
  const correctCount = Object.keys(selectedAnswers).reduce((acc, qId) => {
    const mcq = mcqs.find((m) => m.id === parseInt(qId));
    return mcq && selectedAnswers[mcq.id] === mcq.correctAnswer ? acc + 1 : acc;
  }, 0);  const getCompetencyRating = (score: number) => {
    if (score === 5) return { title: "Expert Neuro-Epileptologist", desc: "Superb! You demonstrated flawless clinical reasoning, precise anatomical localization, and full command of guideline-directed epilepsy therapeutics.", color: "text-emerald-950 border-2 border-emerald-600 bg-emerald-50" };
    if (score === 4) return { title: "Advanced Clinical Fellow", desc: "Excellent! You have a highly advanced grasp of seizure semiology, MRI interpretation, and surgical gating procedures.", color: "text-sky-950 border-2 border-sky-600 bg-sky-50" };
    if (score === 3) return { title: "Competent Neuromedical Practitioner", desc: "Good. You understand TLE structures and pharmacoresistance, but double-check surgical complications and mimic discrimination.", color: "text-amber-950 border-2 border-amber-600 bg-amber-50" };
    return { title: "Junior Medical Officer", desc: "Review Recommended. Spend more time analyzing semiotic lateralization signs and the step-by-step pre-surgical workup flow.", color: "text-red-950 border-2 border-red-600 bg-red-50" };
  };

  return (
    <div id="quiz-section" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-900 border-2 border-slate-950 rounded-lg text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-display font-black text-slate-950 uppercase tracking-tight">3. Scenario-Based Case MCQ Examination</h2>
            <p className="text-xs text-slate-500 font-mono uppercase font-bold">Testing Clinical Judgement Under Uncertainty</p>
          </div>
        </div>
        
        {/* Score tracker pill */}
        {!quizFinished && (
          <div className="px-3 py-1 bg-white border-2 border-slate-800 rounded-lg font-mono text-xs text-slate-800 font-bold shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
            Progress: <span className="text-sky-600 font-black">{Object.keys(selectedAnswers).length}/{mcqs.length}</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={activeMCQ.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            id={`quiz-card-${activeMCQ.id}`}
            className="bg-white border-2 border-slate-800 rounded-2xl p-5 md:p-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-6 relative"
          >
            {/* Top progress bar indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200">
              <div
                className="h-full bg-sky-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / mcqs.length) * 100}%` }}
              />
            </div>

            {/* Header info */}
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-sky-700 uppercase tracking-wider font-extrabold">{activeMCQ.title}</span>
              <span className="text-slate-450 uppercase tracking-wide">Board Calibration: R3/Fellow Level</span>
            </div>

            {/* Scenario Box */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 md:p-5 space-y-3 font-sans">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-700 bg-slate-200 border border-slate-300 px-2 py-0.5 rounded">
                Clinical Vignette
              </span>
              <p className="text-slate-800 text-sm md:text-base font-semibold leading-relaxed antialiased">
                {activeMCQ.scenario}
              </p>
            </div>

            {/* Core Question */}
            <h3 className="text-base md:text-lg font-display font-black text-slate-950 leading-snug tracking-tight uppercase">
              {activeMCQ.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3">
              {activeMCQ.options.map((opt) => {
                const isSelected = chosenAnswer === opt.id;
                const isCorrect = opt.id === activeMCQ.correctAnswer;
                const shouldHighlightCorrect = hasAnswered && isCorrect;
                const shouldHighlightWrong = hasAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={opt.id}
                    id={`mcq-opt-${opt.id}`}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 font-sans text-xs md:text-sm transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer ${
                      shouldHighlightCorrect
                        ? 'bg-emerald-100 border-emerald-600 text-emerald-950 shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] font-semibold'
                        : shouldHighlightWrong
                        ? 'bg-red-100 border-red-600 text-red-950 shadow-[2px_2px_0px_0px_rgba(239,68,68,1)] font-semibold'
                        : isSelected
                        ? 'bg-sky-100 border-slate-950 text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-850 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded text-xs font-mono font-bold flex items-center justify-center border-2 shrink-0 ${
                        shouldHighlightCorrect
                          ? 'bg-emerald-500 border-slate-950 text-white'
                          : shouldHighlightWrong
                          ? 'bg-red-500 border-slate-950 text-white'
                          : isSelected
                          ? 'bg-sky-500 border-slate-950 text-slate-950'
                          : 'bg-slate-200 border-slate-300 text-slate-700'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="leading-relaxed font-semibold">{opt.text}</span>
                    </div>

                    {/* Status icons */}
                    {shouldHighlightCorrect && <Check className="w-5 h-5 text-emerald-600 shrink-0 stroke-[3px]" />}
                    {shouldHighlightWrong && <X className="w-5 h-5 text-red-600 shrink-0 stroke-[3px]" />}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Explanation Panel (Revealed once answered) */}
            <AnimatePresence>
              {hasAnswered && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-50 rounded-xl p-5 border-2 border-slate-200 space-y-4"
                >
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-mono uppercase font-bold text-emerald-700 tracking-wider">
                      Educational Rationale — Choice {activeMCQ.correctAnswer} Is Correct
                    </h4>
                  </div>

                  <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-sans font-medium">
                    {activeMCQ.explanation}
                  </p>

                  <div className="pt-3 border-t-2 border-slate-200 text-xs text-slate-500 font-sans leading-relaxed">
                    <strong className="text-slate-900 font-bold block mb-1">Anatomical / Guideline Differential (Why not others?):</strong>
                    {activeMCQ.whyNot}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-5 mt-4">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="px-4 py-2.5 text-xs font-mono font-bold rounded-lg border-2 border-slate-800 bg-slate-50 text-slate-800 hover:bg-slate-200 hover:text-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-all duration-150"
              >
                <ChevronLeft className="w-4 h-4" /> PREVIOUS
              </button>

              <button
                onClick={handleNext}
                disabled={!hasAnswered}
                className="px-5 py-3 text-xs font-mono font-bold rounded-lg bg-slate-900 text-white border-2 border-slate-950 hover:bg-slate-850 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-all duration-150"
              >
                {currentIdx < mcqs.length - 1 ? 'NEXT' : 'COMPLETE EVALUATION'} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-slate-800 rounded-2xl p-6 md:p-8 text-center space-y-6 max-w-2xl mx-auto shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden"
          >
            {/* Top decorative bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900" />

            <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-full inline-block text-sky-500 mx-auto shadow-inner">
              <Award className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-display font-black text-slate-950 uppercase tracking-tight">Board-Level Evaluation Complete</h3>
              <p className="text-xs text-slate-500 font-mono font-bold uppercase tracking-wider">NEUROLOGY CRUCIBLE #17 ASSESSMENT METRICS</p>
            </div>

            {/* Score pill */}
            <div className="inline-flex flex-col items-center justify-center p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 min-w-[200px] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <div className="text-4xl font-display font-black text-slate-950">
                {correctCount} <span className="text-slate-400 font-medium">/ {mcqs.length}</span>
              </div>
              <div className="text-[10px] font-mono text-sky-700 font-black tracking-widest uppercase mt-1">
                Accuracy: {((correctCount / mcqs.length) * 100).toFixed(0)}%
              </div>
            </div>

            {/* Feedback card */}
            <div className={`p-5 rounded-xl text-left space-y-2.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.1)] ${getCompetencyRating(correctCount).color}`}>
              <h4 className="font-display font-black text-base flex items-center gap-1.5 uppercase tracking-wide">
                🎓 Level: {getCompetencyRating(correctCount).title}
              </h4>
              <p className="text-xs md:text-sm leading-relaxed font-semibold">
                {getCompetencyRating(correctCount).desc}
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-center">
              <button
                onClick={handleReset}
                className="px-5 py-3 text-xs font-mono font-bold bg-slate-900 border-2 border-slate-950 text-sky-400 hover:text-sky-300 hover:bg-slate-850 rounded-xl flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all duration-150"
              >
                <RefreshCw className="w-4 h-4" /> RETAKE CLINICAL CRUCIBLE QUIZ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
