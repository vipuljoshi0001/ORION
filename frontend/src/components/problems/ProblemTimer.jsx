import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProblemStore } from '../../store/problemStore.js';

export const ProblemTimer = () => {
  const { timerOn, elapsed, tick } = useProblemStore();

  useEffect(() => {
    if (!timerOn) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timerOn, tick]);

  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  const color = elapsed < 60 ? 'text-green-400' : elapsed < 180 ? 'text-yellow-400' : 'text-red-400';

  return (
    <motion.div
      animate={timerOn ? { scale: [1, 1.03, 1] } : {}}
      transition={{ duration: 1, repeat: Infinity }}
      className={`font-mono text-xl font-bold ${color} flex items-center gap-2`}
    >
      ⏱ {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </motion.div>
  );
};