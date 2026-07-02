import Header from './components/Header';
import Vignette from './components/Vignette';
import Scaffolding from './components/Scaffolding';
import Visualizers from './components/Visualizers';
import Quiz from './components/Quiz';
import Pearls from './components/Pearls';
import SummaryTable from './components/SummaryTable';
import { BrainCircuit, BookOpen, Stethoscope, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-slate-800 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-slate-900 rounded-lg text-white shadow-sm border border-slate-950">
            <BrainCircuit className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <span className="font-display font-black text-base tracking-tight text-slate-950 block uppercase">
              Neurology Crucibles
            </span>
            <span className="text-[10px] font-mono text-indigo-700 tracking-wider uppercase block -mt-1 font-bold">
              Topic #17 • Temporal Lobe Epilepsy
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono bg-white border-2 border-slate-800 px-2.5 py-1 rounded text-slate-800 font-bold shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
            <Stethoscope className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5px]" /> BOARD CALIBRATION APPROVED
          </span>
          <span className="text-xs font-mono text-slate-500 font-bold">
            v1.2.4
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-10 space-y-12">
        
        {/* Case Card / Header */}
        <Header />

        {/* Clinical Vignette Panel */}
        <Vignette />

        {/* Clinical Scaffolding Questions */}
        <Scaffolding />

        {/* Dynamic Interactive Visualizers (EEG, Anatomy, Flowchart) */}
        <Visualizers />

        {/* Boards MCQ Assessment Quiz */}
        <Quiz />

        {/* Teaching Pearls Callout */}
        <Pearls />

        {/* Summary Decision Comparison Matrix */}
        <SummaryTable />

      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-200 bg-white py-10 text-center text-xs text-slate-550 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-800" />
          <span className="font-black uppercase text-slate-900 tracking-wider">Neurology Crucibles Case Platform</span>
        </div>
        <p className="max-w-lg mx-auto leading-relaxed px-4 text-slate-600 font-semibold font-sans">
          All case studies, clinical vignettes, and electrographic traces are calibrated under the guidelines of the International League Against Epilepsy (ILAE) and the American Board of Psychiatry and Neurology (ABPN). For academic and clinical training purposes only.
        </p>
        <p className="text-[10px] text-slate-550 font-mono font-bold uppercase tracking-wider">
          © 2026 Neurology Crucibles • Active Case: Mesial Temporal Sclerosis
        </p>
      </footer>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-slate-900 hover:bg-slate-850 text-white rounded-full border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer transition-all duration-150 z-50"
        >
          <ChevronUp className="w-5 h-5 text-sky-400 stroke-[2.5px]" />
        </button>
      )}
    </div>
  );
}
