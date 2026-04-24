import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Lightbulb, 
  Gamepad2, 
  Volume2, 
  RotateCcw, 
  ChevronRight,
  BookOpen,
  Sparkles,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types ---

interface Question {
  word: string;
  options: string[];
  correct: string;
  type: 'aguda' | 'llana' | 'esdrujula';
  mode: 'classification' | 'tilde';
}

// --- Data ---
const EXERCISES: Question[] = [
  { word: "Madrid", options: ["Madrid", "Mádrid"], correct: "Madrid", type: "aguda", mode: "tilde" },
  { word: "Mesa", options: ["Mesa", "Mésa"], correct: "Mesa", type: "llana", mode: "tilde" },
  { word: "Musica", options: ["Música", "Musica"], correct: "Música", type: "esdrujula", mode: "tilde" },
  { word: "Cantar", options: ["Cantar", "Cántar"], correct: "Cantar", type: "aguda", mode: "tilde" },
  { word: "Perro", options: ["Perro", "Pérro"], correct: "Perro", type: "llana", mode: "tilde" },
  { word: "Pajaro", options: ["Pájaro", "Pajaro"], correct: "Pájaro", type: "esdrujula", mode: "tilde" },
  { word: "Reloj", options: ["Reloj", "Réloj"], correct: "Reloj", type: "aguda", mode: "tilde" },
  { word: "Libro", options: ["Libro", "Líbro"], correct: "Libro", type: "llana", mode: "tilde" },
  { word: "America", options: ["América", "America"], correct: "América", type: "esdrujula", mode: "tilde" },
  { word: "Papel", options: ["Papel", "Pápel"], correct: "Papel", type: "aguda", mode: "tilde" },
  
  { word: "Cancion", options: ["Canción", "Cancion"], correct: "Canción", type: "aguda", mode: "tilde" },
  { word: "Arbol", options: ["Arbol", "Árbol"], correct: "Árbol", type: "llana", mode: "tilde" },
  { word: "Telefono", options: ["Teléfono", "Telefono"], correct: "Teléfono", type: "esdrujula", mode: "tilde" },
  { word: "Avion", options: ["Avión", "Avion"], correct: "Avión", type: "aguda", mode: "tilde" },
  { word: "Lapiz", options: ["Lápiz", "Lapiz"], correct: "Lápiz", type: "llana", mode: "tilde" },
  { word: "Sabado", options: ["Sábado", "Sabado"], correct: "Sábado", type: "esdrujula", mode: "tilde" },
  { word: "Cafe", options: ["Café", "Cafe"], correct: "Café", type: "aguda", mode: "tilde" },
  { word: "Azucar", options: ["Azucar", "Azúcar"], correct: "Azúcar", type: "llana", mode: "tilde" },
  { word: "Película", options: ["Película", "Pelicula"], correct: "Película", type: "esdrujula", mode: "tilde" },
  { word: "Francés", options: ["Francés", "Frances"], correct: "Francés", type: "aguda", mode: "tilde" }
];

// --- Utilities ---
const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

// --- Main App ---
export default function AccentuationMaster() {
  const [view, setView] = useState<'home' | 'theory' | 'game' | 'finish'>('home');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const currentEx = EXERCISES[currentIdx];

  const handleAnswer = (opt: string) => {
    if (feedback !== 'none') return;
    
    // Speak word on click
    speak(opt);

    if (opt === currentEx.correct) {
      setFeedback('correct');
      setScore(s => s + 50);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 }, colors: ['#ef4444', '#fbbf24', '#f97316', '#ff007f'] });
      
      setTimeout(() => {
        if (currentIdx < EXERCISES.length - 1) {
          setCurrentIdx(prev => prev + 1);
          setFeedback('none');
        } else {
          setView('finish');
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-pink-500 flex flex-col font-sans overflow-x-hidden p-4">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-400 rounded-full blur-3xl animate-bounce" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-orange-400 rounded-full blur-2xl" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-12 z-10"
          >
            <div className="space-y-4">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center shadow-2xl"
              >
                <Target size={64} className="text-red-500" />
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase drop-shadow-xl">
                Acento <br /> <span className="text-yellow-300">Maestro</span>
              </h1>
              <p className="text-white/90 font-bold uppercase tracking-widest text-sm max-w-md mx-auto bg-black/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                Սովորի՛ր իսպաներենի շեշտադրության կանոնները ուրախ և գունավոր խաղով:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-sm">
              <button 
                onClick={() => setView('theory')}
                className="flex-1 px-8 py-6 bg-orange-500 text-white rounded-3xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl border-b-8 border-orange-700"
              >
                <BookOpen className="inline mr-2" /> Կանոններ
              </button>
              <button 
                onClick={() => setView('game')}
                className="flex-1 px-8 py-6 bg-white text-pink-600 rounded-3xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl border-b-8 border-gray-200"
              >
                <Gamepad2 className="inline mr-2" /> Խաղալ
              </button>
            </div>
          </motion.div>
        )}

        {view === 'theory' && (
          <motion.div 
            key="theory"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex-1 flex flex-col max-w-4xl mx-auto w-full py-8 space-y-8 z-10"
          >
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl space-y-8 border-t-8 border-yellow-400">
               <h2 className="text-4xl font-black text-red-500 italic uppercase tracking-tight">Լա Շեշտադրություն (La Acentuación)</h2>
               <p className="text-gray-700 font-bold leading-relaxed">
                 Ահա իսպաներենի շեշտադրման երեք հիմնական կանոնները, որոնք կօգնեն քեզ և քո աշակերտներին ճիշտ կարդալ և գրել բառերը:
               </p>
               
               <div className="space-y-6">
                  <div className="bg-red-50 p-6 rounded-3xl border-l-8 border-red-500">
                     <h3 className="text-xl font-black text-red-600 uppercase mb-2">1. Կանոն. Agudas</h3>
                     <p className="text-stone-700">Շեշտը ընկնում է վերջին վանկի վրա, եթե բառը վերջանում է բաղաձայնով (բացի n և s տառերից):</p>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-3xl border-l-8 border-orange-500">
                     <h3 className="text-xl font-black text-orange-600 uppercase mb-2">2. Կանոն. Llanas / Graves</h3>
                     <p className="text-stone-700">Սա ամենատարածված խումբն է: Շեշտը ընկնում է նախավերջին վանկի վրա, եթե բառը վերջանում է ձայնավորով կամ n և s տառերով:</p>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-3xl border-l-8 border-yellow-500">
                     <h3 className="text-xl font-black text-yellow-700 uppercase mb-2">3. Կանոն. Esdrújulas</h3>
                     <p className="text-stone-700">Շեշտը ընկնում է վերջից երրորդ վանկի վրա: Ե՞րբ է դրվում գրավոր շեշտ (tilde). Միշտ:</p>
                  </div>
               </div>

               <button 
                  onClick={() => setView('game')}
                  className="w-full py-6 bg-pink-500 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-xl"
               >
                  Լավ է, Սկսենք Խաղը!
               </button>
            </div>
          </motion.div>
        )}

        {view === 'game' && (
          <motion.div 
            key="game"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col max-w-4xl mx-auto w-full py-6 space-y-8 z-10"
          >
            {/* Header / Stats */}
            <div className="flex justify-between items-center bg-white/20 backdrop-blur-md p-4 rounded-3xl border border-white/30 text-white font-black uppercase italic text-sm">
               <div className="flex items-center gap-2">
                 <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-stone-900 shadow-md">
                   {currentIdx + 1}
                 </div>
                 <span>/ 20</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="bg-red-500 px-4 py-2 rounded-xl shadow-lg border-b-4 border-red-700">
                    {score} pts
                  </div>
               </div>
            </div>

            {/* Word Display */}
            <div className="bg-white rounded-[50px] p-12 shadow-3xl text-center space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles size={100} className="text-pink-500" />
               </div>
               
               <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-2">
                 Ճիշտ Գրելատեսակը:
               </p>
               <h2 
                 onClick={() => speak(currentEx.word)}
                 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter text-stone-900 hover:text-red-500 cursor-pointer transition-colors"
               >
                 {currentEx.word}
               </h2>
               <div className="flex justify-center">
                  <button 
                    onClick={() => speak(currentEx.word)}
                    className="p-3 bg-gray-100 rounded-full hover:bg-yellow-400 hover:text-white transition-all text-gray-400"
                  >
                    <Volume2 size={24} />
                  </button>
               </div>
            </div>

            {/* Options */}
            <div className={`grid ${currentEx.options.length > 2 ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
               {currentEx.options.map((opt) => (
                 <motion.button
                   key={opt}
                   whileHover={{ scale: 1.05, y: -5 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => handleAnswer(opt)}
                   disabled={feedback !== 'none'}
                   className={`py-8 rounded-[40px] border-4 font-black transition-all text-xl uppercase tracking-tighter italic ${
                     feedback === 'correct' && opt === currentEx.correct
                       ? 'bg-green-500 border-white text-white shadow-2xl scale-110 z-20'
                       : feedback === 'wrong' && opt !== currentEx.correct
                       ? 'bg-red-500 border-white text-white rotate-2'
                       : 'bg-white border-pink-100 text-pink-600 hover:border-pink-500 hover:bg-pink-50 shadow-xl'
                   }`}
                 >
                   {opt}
                 </motion.button>
               ))}
            </div>

            {/* Rule Hint (if wrong) */}
            <AnimatePresence>
               {feedback === 'wrong' && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6 bg-yellow-400 text-stone-900 rounded-3xl font-bold flex items-start gap-4 shadow-xl border-b-6 border-yellow-600"
                 >
                   <Lightbulb className="shrink-0 text-red-600" />
                   <p>Հիշի՛ր կանոնը. {currentEx.type === 'aguda' ? 'Ագուդաները շեշտվում են վերջին վանկում:' : currentEx.type === 'llana' ? 'Լյանաները շեշտվում են նախավերջին վանկում:' : 'Էսդրուխուլաները միշտ ունեն գրավոր շեշտ:'}</p>
                 </motion.div>
               )}
            </AnimatePresence>
          </motion.div>
        )}

        {view === 'finish' && (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-12 z-10"
          >
            <div className="space-y-6">
              <div className="w-40 h-40 bg-white rounded-full mx-auto flex items-center justify-center shadow-3xl text-yellow-500 relative">
                 <Trophy size={80} />
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="absolute -top-4 -right-4 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-black"
                 >
                   !
                 </motion.div>
              </div>
              <h2 className="text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                Ավարտ!
              </h2>
              <p className="text-white bg-black/20 px-8 py-4 rounded-3xl backdrop-blur-md border border-white/20 font-bold uppercase tracking-widest text-sm">
                Դու տիրապետում ես իսպաներենի շեշտադրմանը:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
               <div className="bg-white p-6 rounded-[40px] shadow-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Միավոր</p>
                  <p className="text-5xl font-black text-pink-600 italic leading-none">{score}</p>
               </div>
               <div className="bg-white p-6 rounded-[40px] shadow-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Ճիշտ</p>
                  <p className="text-5xl font-black text-orange-500 italic leading-none">20/20</p>
               </div>
            </div>

            <button 
               onClick={() => { setView('home'); setCurrentIdx(0); setScore(0); }}
               className="px-12 py-6 bg-red-500 text-white rounded-full font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl border-b-8 border-red-700 flex items-center gap-3"
            >
               <RotateCcw size={20} /> Կրկնել
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-auto p-4 text-center">
         <p className="text-[10px] font-black uppercase tracking-[1em] text-white/40">Accent Master v1.0</p>
      </footer>
    </div>
  );
}
