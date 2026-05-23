import { Award, BookOpen, Star } from "lucide-react";
import { motion } from "motion/react";
import { ViewState } from "../types";

interface HomeProps {
  key?: string;
  onNavigate: (view: ViewState) => void;
  globalScore: number;
}

export const Home = ({ onNavigate, globalScore }: HomeProps) => {
  const BADGES = [
    { threshold: 50, icon: '🌟', color: 'bg-yellow-300', title: 'مبتدئ' },
    { threshold: 150, icon: '🏆', color: 'bg-amber-400', title: 'بطل' },
    { threshold: 300, icon: '👑', color: 'bg-yellow-500', title: 'أسطورة' },
  ];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 1.05, opacity: 0, y: -20 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
      className="w-full max-w-4xl mx-auto p-4 z-20 relative"
    >
      <div className="cartoon-panel p-8 md:p-14 text-center relative overflow-hidden">
        
        {/* Childish/Cartoon Islamic Landscape Background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-lime-400 rounded-b-[3rem]" style={{ clipPath: "ellipse(150% 100% at 50% 100%)" }} />

        <div className="relative z-10 w-full flex flex-col items-center mb-16 mt-8">
          <div className="relative w-full max-w-[400px] h-64 md:h-80 mx-auto flex items-end justify-center">
            
            {/* Kaaba */}
            <motion.div 
              animate={{ y: [-5, 5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatType: "mirror" }}
              className="absolute left-[15%] text-[10rem] md:text-[13rem] z-10 emoji-3d origin-bottom"
            >
              🕋
            </motion.div>
            
            {/* Sheep */}
            <motion.div 
               animate={{ y: [0, -20, 0], rotate: [0, 8, -8, 0] }}
               transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
               className="absolute -right-[5%] -bottom-10 text-[7rem] md:text-[9rem] z-20 emoji-3d origin-bottom"
            >
              🐑
            </motion.div>
            
            {/* Sparkles */}
            <motion.div 
               animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
               className="absolute top-10 right-[25%] text-yellow-400 text-5xl emoji-3d cursor-default"
            >
              ✦
            </motion.div>
            <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }}
               className="absolute top-0 left-[25%] text-yellow-400 text-4xl emoji-3d cursor-default"
            >
              ✧
            </motion.div>
          </div>
        </div>

        <div className="relative z-20">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 font-bold px-6 py-2 rounded-full mb-4 border-2 border-amber-300">
             <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
             <span className="text-xl">عيد أضحى مبارك!</span>
             <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>

          <h2 className="text-6xl md:text-8xl title-text-rose mb-6">
            تحدي العيد!
          </h2>
          <p className="text-xl md:text-2xl text-slate-800 font-extrabold mb-8 max-w-2xl mx-auto leading-relaxed bg-white/40 backdrop-blur-md p-6 rounded-[3rem] border-4 border-white/60 shadow-[0_12px_35px_rgba(217,119,6,0.1)]">
            يا أبطال مدرسة رهام الصغار! 🌟<br/>
            هيا نلعب ونتعلم عن العيد والأضحية ومكة المكرمة، ونجمع النجوم الذهبية!
          </p>

          <div className="flex justify-center gap-4 mb-10">
            {BADGES.map((badge, index) => {
              const earned = globalScore >= badge.threshold;
              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{ 
                    scale: earned ? [1, 1.2, 1] : 1,
                    rotate: earned ? [0, -10, 10, 0] : 0,
                    opacity: earned ? 1 : 0.5,
                    filter: earned ? 'grayscale(0%)' : 'grayscale(100%)'
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col items-center justify-center p-3 rounded-[2rem] border-4 ${earned ? 'border-amber-200 shadow-[0_5px_15px_rgba(217,119,6,0.2)]' : 'border-white/50'} bg-white/60 backdrop-blur-sm w-24 md:w-32`}
                >
                  <span className="text-4xl md:text-5xl mb-2 drop-shadow-sm">{badge.icon}</span>
                  <span className={`text-sm md:text-base font-bold ${earned ? 'text-amber-700' : 'text-slate-400'}`}>
                    {badge.title}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-5 md:gap-8">
            <button 
              onClick={() => onNavigate('quiz')} 
              className="cartoon-button shape-kaaba px-10 py-5 text-2xl md:text-3xl flex justify-center items-center gap-3 w-full sm:w-auto"
            >
              <span className="text-4xl">🕋</span> ابدأ التحدي والمرح!
            </button>
            <button 
              onClick={() => onNavigate('info')} 
              className="cartoon-button shape-dome px-10 py-5 text-2xl md:text-3xl flex justify-center items-center gap-3 w-full sm:w-auto"
            >
              <span className="text-4xl">🕌</span> حكاية العيد
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
