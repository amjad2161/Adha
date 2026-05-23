import { useState } from "react";
import { ChevronRight, ChevronLeft, Home, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils";
import { SheepIcon, CamelIcon, KaabaIcon, MoonStarIcon, FamilyIcon } from "./EidIcons";

interface InfoViewProps {
  key?: string;
  onHome: () => void;
}

const storyStations = [
  {
    id: 1,
    title: "الرؤيا الصادقة",
    text: "في ليلة هادئة، رأى نبي الله إبراهيم عليه السلام في منامه رؤيا يذبح فيها ابنه إسماعيل. ورؤيا الأنبياء حق وأمر من الله تعالى.",
    renderScene: () => (
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-rose-400 to-amber-500 rounded-[3rem]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-400 via-transparent to-transparent" />
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="z-10 w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_30px_rgba(253,224,71,0.3)]">
          <MoonStarIcon className="w-full h-full text-yellow-300" />
        </motion.div>
      </div>
    ),
    color: "from-rose-100/80 to-amber-200/80",
    borderColor: "border-rose-400"
  },
  {
    id: 2,
    title: "طاعة الابن البار",
    text: "عندما أخبر الأب ابنه العظيم، لم يتردد إسماعيل عليه السلام، وقال بكل إيمان وصبر: «يا أبتِ افعل ما تُؤمر، ستجدني إن شاء الله من الصابرين».",
    renderScene: () => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-200 to-orange-400 rounded-[3rem]">
         <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="absolute -bottom-10 text-[12rem] opacity-30 blur-[2px]">⛰️</motion.div>
         {/* Family SVG scene */}
         <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="z-10 w-48 h-48 md:w-64 md:h-64 relative drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
            <FamilyIcon className="w-full h-full" />
         </motion.div>
         <motion.div animate={{ y: [0, -15, 0], x: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-8 left-10 w-24 h-24 opacity-80 text-white">
           <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 19c-2.485 0-4.5-2.015-4.5-4.5 0-.294.029-.58.083-.855-1.028.536-2.228.855-3.583.855-4.418 0-8-3.582-8-8s3.582-8 8-8c2.485 0 4.5 2.015 4.5 4.5 0 .294-.029.58-.083.855 1.028-.536 2.228-.855 3.583-.855 4.418 0 8 3.582 8 8s-3.582 8-8 8z"/></svg>
         </motion.div>
      </div>
    ),
    color: "from-amber-100/80 to-orange-200/80",
    borderColor: "border-orange-400"
  },
  {
    id: 3,
    title: "الفداء العظيم",
    text: "جزاءً لهذه الطاعة والصبر، أنزل الله تعالى كبشاً أقرن من السماء فداءً لإسماعيل، ليكون درساً لنا في الإيمان والرحمة.",
    renderScene: () => (
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-orange-300 to-rose-400 rounded-[3rem]">
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.6),transparent)] opacity-60" />
         
         <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="z-10 w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] mt-8 relative">
           <SheepIcon className="w-full h-full" />
           <motion.div animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -inset-4 bg-yellow-300 opacity-20 blur-xl rounded-full z-[-1]" />
         </motion.div>
      </div>
    ),
    color: "from-orange-100/80 to-rose-200/80",
    borderColor: "border-orange-500"
  },
  {
    id: 4,
    title: "فرحة العيد والأضحية",
    text: "ومنذ ذلك اليوم، نذبح الأضحية في العيد اقتداءً بسنة سيدنا إبراهيم، نوزع اللحم على الفقراء، ونفرح بالعيدية والملابس الجديدة.",
    renderScene: () => (
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-amber-300 to-orange-500 rounded-[3rem]">
         <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
         
         <div className="flex items-end justify-center w-full z-10 bottom-0 absolute h-full pb-10">
           <motion.div animate={{ x: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-40 h-40 md:w-48 md:h-48 drop-shadow-lg z-10">
              <CamelIcon className="w-full h-full" />
           </motion.div>
           <motion.div animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-32 h-32 -ml-8 drop-shadow-xl z-20">
              <SheepIcon className="w-full h-full" />
           </motion.div>
         </div>
      </div>
    ),
    color: "from-amber-200/80 to-orange-300/80",
    borderColor: "border-amber-500"
  },
  {
    id: 5,
    title: "مكة المكرمة والحج",
    text: "يتوافد الحجاج لمكة لأداء الركن الخامس، يطوفون بالكعبة ويقفون بعرفة ملبين نداء الله. لبيك اللهم لبيك!",
    renderScene: () => (
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-rose-600 to-amber-700 rounded-[3rem]">
        <div className="absolute bottom-4 w-72 h-32 bg-amber-900/40 rounded-full blur-[20px] z-0" />
        
        <motion.div initial={{ y: 20 }} animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="z-10 w-56 h-56 md:w-72 md:h-72 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
          <KaabaIcon className="w-full h-full text-slate-900" />
        </motion.div>
        
        <motion.div animate={{ y: [0, -15, 0], x: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/4 right-[15%] text-[4rem]">🕊️</motion.div>
        <motion.div animate={{ y: [0, 20, 0], x: [0, 40, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[35%] left-[10%] text-[3rem] scale-x-[-1]">🕊️</motion.div>
      </div>
    ),
    color: "from-rose-100/80 to-amber-200/80",
    borderColor: "border-amber-400"
  }
];

export const InfoView = ({ onHome }: InfoViewProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < storyStations.length - 1) setCurrentStep(p => p + 1);
  };
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(p => p - 1);
  };

  const station = storyStations[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="w-full max-w-5xl flex flex-col items-center z-20 relative p-2 md:p-4"
    >
      <div className="w-full text-center mb-8">
        <h2 className="text-5xl md:text-7xl title-text-amber tracking-wide mb-3 drop-shadow-lg">
          رحلة العيد و الأضحية
        </h2>
        <div className="flex bg-white/40 backdrop-blur-md rounded-full px-6 py-2 mx-auto w-max border border-white/60 shadow-sm items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <p className="text-xl md:text-2xl text-slate-800 font-bold">المحطة {currentStep + 1} من {storyStations.length}</p>
        </div>
      </div>

      <div className={`w-full bg-gradient-to-br ${station.color} backdrop-blur-md rounded-[4rem] p-4 md:p-8 shadow-[0_15px_40px_rgba(217,119,6,0.15)] border-4 ${station.borderColor} relative overflow-hidden transition-colors duration-500`}>
        <div className="flex flex-col lg:flex-row gap-8 items-stretch min-h-[400px]">
          
          {/* Illustration Box */}
          <div className="flex-1 w-full lg:w-1/2 min-h-[300px] flex rounded-[3rem] shadow-inner bg-white/30 border-4 border-white/60 relative">
             <AnimatePresence mode="popLayout">
               <motion.div
                 key={currentStep}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                 className="absolute inset-0 m-4"
               >
                 {station.renderScene()}
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Text Content */}
          <div className="flex-1 w-full lg:w-1/2 flex flex-col justify-center">
             <AnimatePresence mode="wait">
               <motion.div
                 key={currentStep}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3 }}
                 className="bg-white/65 backdrop-blur-md rounded-[3rem] p-8 border-4 border-white/90 shadow-[0_10px_25px_rgba(217,119,6,0.1)] h-full flex flex-col justify-center"
               >
                 <h3 className="text-4xl md:text-5xl font-magic text-slate-800 mb-6 drop-shadow-sm leading-tight text-right">
                   {station.title}
                 </h3>
                 <p className="text-2xl text-slate-700 font-bold leading-relaxed text-right">
                   {station.text}
                 </p>
               </motion.div>
             </AnimatePresence>
          </div>
        </div>

        {/* Progress Bar & Indicators */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {storyStations.map((_, idx) => (
             <div 
               key={idx}
               className={cn(
                 "h-3 rounded-full transition-all duration-500",
                 idx === currentStep ? "w-16 bg-white shadow-md border-2 border-slate-200" : "w-4 bg-white/40"
               )}
             />
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-8 w-full">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={cn(
            "cartoon-button shape-cloud px-6 md:px-8 py-4 flex items-center justify-center gap-2 text-2xl font-black w-full sm:w-auto",
            currentStep === 0 && "opacity-50 cursor-not-allowed transform-none shadow-none"
          )}
        >
           <ChevronRight className="w-8 h-8" /> السابق
        </button>
        
        <button
          onClick={currentStep === storyStations.length - 1 ? onHome : handleNext}
          className={cn(
            "cartoon-button px-8 md:px-12 py-5 flex items-center justify-center gap-3 text-3xl font-black flex-1 sm:flex-none",
            currentStep === storyStations.length - 1 ? "shape-dome" : "shape-kaaba"
          )}
        >
          {currentStep === storyStations.length - 1 ? (
             <><Home className="w-8 h-8" /> العودة للرئيسية</>
          ) : (
             <>التالي <ChevronLeft className="w-8 h-8" /></>
          )}
        </button>
      </div>

    </motion.div>
  );
};

