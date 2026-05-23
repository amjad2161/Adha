import { useState, useEffect } from "react";
import { ViewState } from "./types";
import { EidDecorations } from "./components/EidDecorations";
import { SchoolLogo } from "./components/SchoolLogo";
import { Home } from "./components/Home";
import { QuizEngine } from "./components/QuizEngine";
import { InfoView } from "./components/InfoView";
import { InteractiveSheep } from "./components/InteractiveSheep";
import { Trophy, LogIn, LogOut, Home as HomeIcon, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { auth, signInWithGoogle, logOut, getUserScore, saveUserScore } from "./lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { playSound, getSoundEnabled, setSoundEnabled } from "./lib/sounds";

export default function App() {
  const [activeView, setActiveView] = useState<ViewState>("home");
  const [globalScore, setGlobalScore] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(getSoundEnabled());

  const toggleSound = () => {
    const newState = !isSoundOn;
    setIsSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) {
      playSound('whoosh');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const score = await getUserScore(currentUser.uid);
        setGlobalScore(score);
      } else {
        setGlobalScore(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleScoreUpdate = async (score: number) => {
    setGlobalScore(prev => prev + score);
    if (user) {
      await saveUserScore(user.uid, score);
    }
  };

  const handleNavigate = (view: ViewState) => {
    if (view !== activeView) {
      playSound('whoosh');
      setActiveView(view);
    }
  };

  return (
    <div dir="rtl" className="min-h-dvh relative overflow-x-hidden flex flex-col selection:bg-yellow-200 text-slate-800">
      <InteractiveSheep />
      <EidDecorations />

      <header className="w-full z-30 relative pt-8 pb-4">
        {/* Auth Buttons */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-40 flex flex-nowrap items-center gap-3">
          {activeView !== "home" && (
            <button 
              onClick={() => handleNavigate("home")}
              className="bg-white/80 backdrop-blur-md rounded-full p-2.5 md:p-3 border-2 border-amber-200 shadow-[0_5px_15px_rgba(217,119,6,0.15)] hover:bg-white text-amber-600 transition-colors flex items-center gap-2 font-bold"
              title="الصفحة الرئيسية"
            >
              <HomeIcon className="w-6 h-6" />
              <span className="hidden sm:inline">الرئيسية</span>
            </button>
          )}
          <div className="bg-white/50 backdrop-blur-md rounded-full p-2 border-2 border-white/80 shadow-[0_5px_15px_rgba(217,119,6,0.15)] flex flex-nowrap items-center gap-4">
            <button
              onClick={toggleSound}
              className="p-2.5 bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-full transition-colors"
              title={isSoundOn ? "كتم الصوت" : "تشغيل الصوت"}
            >
              {isSoundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            {user ? (
              <div className="flex items-center gap-3 px-2">
                {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border-2 border-emerald-400" />}
                <span className="font-bold text-slate-700 hidden sm:inline-block">{user.displayName}</span>
                <button onClick={logOut} className="p-2.5 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-full transition-colors" title="تسجيل الخروج">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button onClick={signInWithGoogle} className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-full transition-colors shadow-sm">
                <LogIn className="w-5 h-5 text-emerald-600" />
                <span className="hidden sm:inline">تسجيل الدخول</span>
              </button>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-4 relative z-10">
          <SchoolLogo />
          
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mt-6 relative z-10 flex flex-col items-center gap-4"
          >
           <div className="bg-white/95 backdrop-blur-xl px-10 py-8 rounded-[3rem] border-4 border-amber-100 shadow-[0_15px_40px_rgba(217,119,6,0.15)] mb-6 flex flex-col items-center justify-center transform hover:scale-[1.01] transition-transform">
             <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black text-rose-700 drop-shadow-sm mb-6 tracking-tight text-center w-full" style={{ lineHeight: 1.2 }}>
               مدرسة رهام الابتدائية
             </h1>
             
             <div className="w-full max-w-lg h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent rounded-full mb-6"></div>

             <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full text-center">
               <div className="flex items-center gap-3 bg-amber-50/80 px-6 py-3 rounded-full border-2 border-amber-100">
                 <span className="text-2xl">📍</span>
                 <h2 className="text-2xl md:text-3xl font-extrabold text-amber-800 tracking-wide">
                    مجد الكروم
                 </h2>
               </div>
             </div>
           </div>
          </motion.div>

          {globalScore > 0 && (
            <motion.div 
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: -5 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="absolute top-4 left-4 md:top-8 md:left-8 bg-yellow-100/60 backdrop-blur-md px-5 py-3 md:px-6 md:py-4 rounded-full shadow-[0_6px_20px_rgba(217,119,6,0.15)] flex items-center gap-3 cursor-pointer z-40 border-4 border-yellow-300"
            >
              <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 drop-shadow-sm" />
              <span className="font-black text-3xl md:text-4xl text-yellow-600 drop-shadow-sm">{globalScore}</span>
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-grow relative z-20 flex flex-col items-center justify-center p-4 md:p-8 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {activeView === "home" && (
            <Home key="home" onNavigate={handleNavigate} globalScore={globalScore} />
          )}
          
          {activeView === "quiz" && (
            <QuizEngine 
              key="quiz" 
              onComplete={handleScoreUpdate} 
              onNavigate={handleNavigate}
            />
          )}

          {activeView === "info" && (
            <InfoView key="info" onHome={() => handleNavigate("home")} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
