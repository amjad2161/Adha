import { motion } from "motion/react";
import { School } from "lucide-react";
import { useState } from "react";

export const SchoolLogo = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
      className="w-[240px] md:w-[320px] bg-white/50 backdrop-blur-md p-4 rounded-[3rem] border-4 border-white/90 shadow-[0_12px_30px_rgba(217,119,6,0.15)] flex flex-col items-center justify-center z-50 transform hover:scale-105 transition-transform"
    >
      <img
        src="/logo.jpg"
        alt="شعار مدرسة رهام الابتدائية"
        className={`w-full max-h-[120px] md:max-h-[140px] object-contain rounded-3xl relative z-10 transition-opacity duration-300 ${imageError ? 'opacity-0 h-0 hidden' : 'opacity-100'}`}
        onError={() => setImageError(true)}
      />

      {imageError && (
        <div className="flex w-full flex-col items-center justify-center py-6 bg-amber-50/80 rounded-[2rem]">
          <School className="w-12 h-12 mb-2 text-amber-500" />
          <span className="font-black text-xl text-slate-700">مدرسة الرهام الابتدائية</span>
        </div>
      )}
    </motion.div>
  );
};
