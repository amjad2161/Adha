import { motion } from "motion/react";

export const EidDecorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Cartoon Sun */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-300 rounded-full opacity-70"
        style={{ boxShadow: "0 0 80px rgba(253, 224, 71, 0.5)" }}
      >
        <div className="absolute inset-4 border-8 border-yellow-200 border-dashed rounded-full" />
      </motion.div>

      {/* Floating Crescent & Star */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[8%] left-[5%] flex items-center gap-2"
      >
        <span className="text-[6rem] drop-shadow-[0_4px_10px_rgba(250,204,21,0.6)]">🌙</span>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-[3.5rem] text-yellow-300 drop-shadow-[0_2px_5px_rgba(250,204,21,0.8)]">⭐</span>
        </motion.div>
      </motion.div>

      {/* Hanging Lanterns (Fanoos) */}
      <motion.div
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-0 right-[15%] origin-top flex flex-col items-center"
      >
        <div className="w-1 h-20 bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-sm" />
        <span className="text-[5rem] -mt-3 drop-shadow-lg">🏮</span>
      </motion.div>
      
      <motion.div
        animate={{ rotate: [6, -6, 6] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute top-0 left-[25%] origin-top flex flex-col items-center hidden sm:flex"
      >
        <div className="w-1 h-32 bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-sm" />
        <span className="text-[4rem] -mt-3 drop-shadow-lg filter hue-rotate-180">🏮</span>
      </motion.div>

      {/* Eid Sheep walking in background */}
      <motion.div
         initial={{ x: "-20vw" }}
         animate={{ x: "120vw", y: [0, -15, 0, -15, 0] }}
         transition={{ 
            x: { repeat: Infinity, duration: 25, ease: "linear", delay: 2 },
            y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
         }}
         className="absolute bottom-[5%] opacity-40 text-[6rem] drop-shadow-xl scale-x-[-1]"
      >
        🐑
      </motion.div>

      {/* Another Sheep */}
      <motion.div
         initial={{ x: "120vw" }}
         animate={{ x: "-20vw", y: [0, -10, 0, -10, 0] }}
         transition={{ 
            x: { repeat: Infinity, duration: 30, ease: "linear", delay: 10 },
            y: { repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }
         }}
         className="absolute bottom-[10%] opacity-30 text-[4rem] drop-shadow-xl"
      >
        🐑
      </motion.div>

      {/* Floating Kaaba symbol in background */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[20%] right-[10%] flex items-center justify-center opacity-30 blur-[1px]"
      >
        <span className="text-[7rem] drop-shadow-xl">🕋</span>
      </motion.div>

      {/* Starburst left */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: 180 }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute bottom-[30%] left-[10%] text-[4rem] text-yellow-300 drop-shadow-lg"
      >
        ✨
      </motion.div>

      {/* Doves flying */}
      <motion.div
         initial={{ x: "-10vw", y: 100 }}
         animate={{ x: "110vw", y: -100 }}
         transition={{ 
            x: { repeat: Infinity, duration: 20, ease: "linear", delay: 5 },
            y: { repeat: Infinity, duration: 20, ease: "linear", delay: 5 }
         }}
         className="absolute top-[30%] text-[4rem] opacity-40"
      >
        🕊️
      </motion.div>

      {/* Floating Balloons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[40%] right-[5%] flex items-center gap-1 opacity-50"
      >
        <span className="text-[3rem]">🎈</span>
        <span className="text-[4rem] -mt-8">🎈</span>
        <span className="text-[2.5rem]">🎈</span>
      </motion.div>

      {/* Eid Balloons */}
      <motion.div
         animate={{ y: [0, -40, 0], x: [0, 15, 0] }}
         transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
         className="absolute bottom-[20%] right-[10%] text-[5rem] drop-shadow-xl opacity-70"
      >
        🎈
      </motion.div>

      {/* Floating Fluffy Clouds */}
      <motion.div
        initial={{ x: "110vw" }}
        animate={{ x: "-30vw" }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="absolute top-[25%] w-48 h-12 bg-white rounded-full opacity-70"
        style={{ boxShadow: "0 8px 16px rgba(0,0,0,0.05)" }}
      >
        <div className="absolute -top-8 left-6 w-20 h-20 bg-white rounded-full" />
        <div className="absolute -top-4 right-8 w-16 h-16 bg-white rounded-full" />
      </motion.div>
    </div>
  );
};
