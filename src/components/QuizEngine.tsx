import { CheckCircle2, ChevronRight, Home, RefreshCw, Star, Trophy, XCircle, Clock, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ViewState, Question } from "../types";
import { questionBank, shuffleArray } from "../data";
import confetti from "canvas-confetti";
import { cn } from "../utils";
import { playSound } from "../lib/sounds";

interface QuizEngineProps {
  key?: string;
  onComplete: (score: number) => void;
  onNavigate: (view: ViewState) => void;
}

const QUESTIONS_PER_GAME = 7;
const POINTS_PER_Q = 10;
const TIME_PER_QUESTION = 15;
const HISTORY_STORAGE_KEY = "al_raham_asked_questions";

interface PreparedQuestion extends Question {
  options: string[];
  correctIndex: number;
}

interface IncorrectAnswer {
  question: PreparedQuestion;
  selectedOption: string | null;
}

export const QuizEngine = ({ onComplete, onNavigate }: QuizEngineProps) => {
  const [questions, setQuestions] = useState<PreparedQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [isHintUsed, setIsHintUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<IncorrectAnswer[]>([]);

  const initGame = useCallback(() => {
    let askedIds: number[] = [];
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        askedIds = JSON.parse(stored);
      }
    } catch(e) { console.error("Error reading history", e); }

    let availableQuestions = questionBank.filter(q => !askedIds.includes(q.id));
    
    if (availableQuestions.length < QUESTIONS_PER_GAME) {
      availableQuestions = [...questionBank];
      askedIds = [];
    }

    const pickedQuestions = shuffleArray(availableQuestions).slice(0, QUESTIONS_PER_GAME);
    const newlyAskedIds = pickedQuestions.map(q => q.id);
    const updatedHistory = [...askedIds, ...newlyAskedIds];
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch(e) { }

    const preparedQuestions = pickedQuestions.map(q => {
      const options = shuffleArray([q.correctAnswer, ...q.wrongAnswers]);
      const correctIndex = options.indexOf(q.correctAnswer);
      return { ...q, options, correctIndex };
    });

    setQuestions(preparedQuestions);
    setCurrentQIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setShowResult(false);
    setTimeLeft(TIME_PER_QUESTION);
    setIsHintUsed(false);
    setHiddenOptions([]);
    setIncorrectAnswers([]);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (isAnswered || showResult) return;

    if (timeLeft <= 0) {
      setIsAnswered(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, showResult]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentQIndex];

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQ.correctIndex) {
      playSound('correct');
      setScore(s => s + (isHintUsed ? POINTS_PER_Q / 2 : POINTS_PER_Q));
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fde047', '#10b981', '#3b82f6'],
        zIndex: 150
      });
    } else {
      playSound('wrong');
    }
  };

  const useHint = () => {
    if (isHintUsed || isAnswered || hiddenOptions.length > 0) return;
    
    // Find all wrong indices
    const wrongIndices = currentQ.options
      .map((_, i) => i)
      .filter((i) => i !== currentQ.correctIndex);
    
    // Choose two at random to hide
    const toHide = shuffleArray(wrongIndices).slice(0, 2);
    setHiddenOptions(toHide);
    setIsHintUsed(true);
    playSound('whoosh'); // A small sound effect for the hint
  };

  const handleNext = () => {
    if (selectedOption !== currentQ.correctIndex) {
      setIncorrectAnswers(prev => [
        ...prev,
        {
          question: currentQ,
          selectedOption: selectedOption !== null ? currentQ.options[selectedOption] : "تخطي"
        }
      ]);
    }

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(c => c + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setTimeLeft(TIME_PER_QUESTION);
      setIsHintUsed(false);
      setHiddenOptions([]);
    } else {
      setShowResult(true);
      onComplete(score);
      const isGood = score >= (QUESTIONS_PER_GAME * POINTS_PER_Q) / 2;
      if (isGood) {
        playSound('tada');
        const duration = 4 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);

          const particleCount = 40 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
      }
    }
  };

  if (showResult) {
    const isGood = score >= (QUESTIONS_PER_GAME * POINTS_PER_Q) / 2;

    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl cartoon-panel p-10 md:p-16 text-center relative z-20"
      >
        <Trophy className="w-40 h-40 mx-auto text-yellow-400 mb-6 drop-shadow-md" />
        <h2 className="text-4xl md:text-6xl title-text-amber mb-6 drop-shadow-md leading-relaxed text-center">
          {score === QUESTIONS_PER_GAME * POINTS_PER_Q ? "أنت بطل أبطال رهام! 🌟" : isGood ? "عمل رائع يا بطل! ✨" : "حاول مرة أخرى! 💪"}
        </h2>
        
        <div className="bg-white/45 backdrop-blur-md border-4 border-white/90 rounded-[3.5rem] p-8 mb-10 inline-block w-full max-w-md mx-auto shadow-[0_15px_35px_rgba(217,119,6,0.15)]">
          <p className="text-slate-700 font-bold text-2xl mb-2">النقاط الذهبية</p>
          <div className="text-[5rem] md:text-[6rem] font-black text-yellow-500 flex justify-center items-center gap-4 drop-shadow-md">
            {score} 
            <Star className="w-16 h-16 md:w-20 md:h-20 fill-yellow-400 text-yellow-500" />
          </div>
        </div>

        {incorrectAnswers.length > 0 && (
          <div className="bg-white/80 backdrop-blur-md border-4 border-white rounded-[2rem] p-6 mb-10 text-right shadow-lg max-h-[40vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-amber-500" /> فلنراجع الأسئلة معاً:
            </h3>
            <div className="flex flex-col gap-4">
              {incorrectAnswers.map((item, i) => (
                <div key={i} className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
                  <p className="font-bold text-lg text-slate-700 mb-3">{item.question.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
                    <div className="bg-red-50 text-red-700 border-2 border-red-200 rounded-xl p-3 flex items-start gap-2">
                      <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-1">إجابتك:</span>
                        {item.selectedOption}
                      </div>
                    </div>
                    <div className="bg-green-50 text-green-700 border-2 border-green-200 rounded-xl p-3 flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-1">الإجابة الصحيحة:</span>
                        {item.question.correctAnswer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            onClick={initGame} 
            className="cartoon-button shape-cloud px-8 py-5 text-2xl flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            <RefreshCw className="w-8 h-8" /> العب من جديد
          </button>
          <button 
            onClick={() => onNavigate('home')} 
            className="cartoon-button shape-dome px-8 py-5 text-2xl flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            <span className="text-3xl">🕌</span> العودة للرئيسية
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      key={currentQIndex} 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", bounce: 0.3 }}
      className="w-full max-w-5xl cartoon-panel p-6 md:p-10 z-20 flex flex-col"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        
        <div className="flex-1 w-full text-center sm:text-right">
          <span className="text-slate-500 font-bold text-lg md:text-xl mb-3 block">
            السؤال {currentQIndex + 1} من {QUESTIONS_PER_GAME}
          </span>
          <div className="flex gap-2 w-full max-w-sm mx-auto sm:mx-0">
            {[...Array(QUESTIONS_PER_GAME)].map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-3 flex-1 rounded-full transition-all duration-300",
                  i < currentQIndex ? 'bg-green-400' : 
                  i === currentQIndex ? 'bg-yellow-400 border-2 border-yellow-500 scale-y-125' : 'bg-slate-200'
                )} 
              />
            ))}
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-yellow-100/60 backdrop-blur-md text-yellow-800 px-6 py-2 rounded-full font-bold text-xl flex items-center gap-2 border-2 border-yellow-300 shadow-sm">
            <Star className="w-6 h-6 fill-yellow-500 text-yellow-600" /> 
            <span>{score} نقطة</span>
          </div>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[3.5rem] border-4 border-white/90 shadow-[0_15px_35px_rgba(217,119,6,0.15)] mb-8 mt-12 relative pt-16">
        {/* Animated Circular Timer */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/95 backdrop-blur-sm rounded-full shadow-[0_10px_25px_rgba(217,119,6,0.2)] border-4 border-white/90 flex items-center justify-center z-10">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none p-1" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="42" stroke="#f1f5f9" strokeWidth="8" fill="none" />
             <motion.circle 
               cx="50" cy="50" r="42" 
               stroke={timeLeft > 10 ? '#10b981' : timeLeft > 5 ? '#f59e0b' : '#ef4444'} 
               strokeWidth="8" 
               fill="none" 
               strokeDasharray="264"
               animate={{ 
                  strokeDashoffset: 264 - ((timeLeft / TIME_PER_QUESTION) * 264),
                  stroke: timeLeft > 10 ? '#10b981' : timeLeft > 5 ? '#f59e0b' : '#ef4444'
               }}
               transition={{ duration: 1, ease: 'linear' }}
               strokeLinecap="round"
             />
          </svg>
          <div className="flex flex-col items-center">
             <span className={cn(
                "text-4xl font-black font-mono tracking-tighter",
                timeLeft > 10 ? "text-emerald-500" : timeLeft > 5 ? "text-amber-500" : "text-red-500 animate-pulse"
             )}>
               {timeLeft}
             </span>
          </div>
        </div>

        <div className="flex justify-center mb-2 mt-4">
          <span className="bg-indigo-100 text-indigo-800 border-2 border-indigo-200 px-5 py-2 rounded-full font-bold text-sm md:text-base shadow-sm">
            {currentQ.category}
          </span>
        </div>
        <h3 className="text-3xl md:text-5xl font-magic text-slate-800 leading-tight text-center mt-2">
          {currentQ.question}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        {currentQ.options.map((opt, i) => {
          let stateClass = "btn-card";
          let Icon = null;
          
          if (isAnswered) {
            if (i === currentQ.correctIndex) {
              stateClass = "btn-card correct";
              Icon = <CheckCircle2 className="w-8 h-8 text-white shrink-0" />;
            } else if (i === selectedOption) {
              stateClass = "btn-card wrong";
              Icon = <XCircle className="w-8 h-8 text-white shrink-0" />;
            } else {
              stateClass = "btn-card opacity-50 grayscale cursor-not-allowed";
            }
          }

          const isHidden = hiddenOptions.includes(i);

          return (
            <button 
              key={i} 
              onClick={() => handleAnswer(i)}
              disabled={isAnswered || isHidden}
              className={cn(
                "cartoon-button p-5 md:p-6 text-xl md:text-2xl flex justify-between items-center text-right border-3 transition-all duration-300",
                stateClass,
                isHidden && !isAnswered && 'opacity-40 scale-95 cursor-not-allowed grayscale border-slate-300 bg-slate-100 shadow-none'
              )}
            >
              <span className={cn("leading-snug transition-all duration-300", isHidden && !isAnswered && 'opacity-30')}>{opt}</span>
              {Icon && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>{Icon}</motion.div>}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            className="bg-amber-100/60 backdrop-blur-md p-6 rounded-[3rem] mb-8 border-4 border-amber-200 shadow-[0_10px_20px_rgba(217,119,6,0.1)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-8 h-8 text-amber-600" />
              <h4 className="text-amber-700 font-bold text-2xl">
                معلومة مفيدة!
              </h4>
            </div>
            <p className="text-slate-800 font-bold text-xl leading-relaxed">
              {currentQ.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto gap-4 w-full">
        {!isAnswered ? (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              onClick={() => {
                playSound('whoosh');
                setIsAnswered(true);
              }}
              className="px-6 py-3.5 bg-slate-200/80 hover:bg-slate-300 text-slate-600 font-bold text-lg md:text-xl rounded-full border-b-4 border-slate-300 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 justify-center"
            >
              تخطي <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <button 
              onClick={useHint}
              disabled={isHintUsed}
              className={cn(
                "px-6 py-3.5 font-bold text-lg md:text-xl rounded-full border-b-4 transition-all flex items-center gap-2 justify-center",
                isHintUsed 
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70"
                  : "bg-amber-100 hover:bg-amber-200 text-amber-700 border-amber-300 active:border-b-0 active:translate-y-1"
              )}
            >
              <Lightbulb className={cn("w-5 h-5", isHintUsed ? "opacity-50" : "text-amber-500 animate-pulse")} />
              {isHintUsed ? "تم استخدام تلميح" : "تلميح (-5 نقاط)"}
            </button>
          </div>
        ) : <div />}
        <button 
          onClick={handleNext}
          disabled={!isAnswered}
          className={cn(
            "cartoon-button flex items-center justify-center gap-2 text-xl md:text-2xl px-10 py-4 w-full sm:w-auto",
            !isAnswered 
              ? 'hidden'
              : 'shape-lantern'
          )}
        >
          {currentQIndex < QUESTIONS_PER_GAME - 1 ? 'السؤال التالي' : 'شاهد النتيجة'}
          <ChevronRight className="w-8 h-8 rotate-180" />
        </button>
      </div>
    </motion.div>
  );
};
