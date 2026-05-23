import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const InteractiveSheep = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [target, setTarget] = useState({ x: -100, y: -100 });
  const [facingRight, setFacingRight] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial position center bottom
    setTarget({ x: window.innerWidth / 2, y: window.innerHeight - 100 });
    setIsVisible(true);

    const handleClick = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      setFacingRight(newX > target.x);
      setTarget({ x: newX, y: newY });
      setIsWalking(true);
      
      setTimeout(() => {
        setIsWalking(false);
      }, 1200);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [target.x]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed z-50 pointer-events-none text-[4.5rem] md:text-[6rem] emoji-3d"
      animate={{ 
        x: target.x - 50, 
        y: target.y - 50,
        scaleX: facingRight ? -1 : 1,
      }}
      transition={{ 
        type: "spring",
        damping: 12,
        stiffness: 40,
        mass: 1.5
      }}
    >
      <motion.div
        animate={isWalking ? { y: [0, -20, 0], rotate: [-10, 10, -10] } : { y: [0, -5, 0], rotate: [0, 2, -2, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: isWalking ? 0.35 : 2.5 
        }}
        style={{ transformOrigin: "bottom center" }}
      >
        🐑
      </motion.div>
    </motion.div>
  );
};
