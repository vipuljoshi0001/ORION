import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getColor = (d) => {
  if (!d) return 'bg-space-600 border border-space-500/50';
  if (d.score >= 90) return 'bg-green-400';
  if (d.score >= 70) return 'bg-green-500';
  if (d.score >= 50) return 'bg-green-700';
  return 'bg-green-900';
};

export const HeatmapCell = memo(({ date, data, isToday }) => {
  const [hov, setHov] = useState(false);

  return (
    <div className="relative"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      <motion.div
        whileHover={{ scale: 1.5, zIndex: 20 }}
        animate={isToday && data
          ? { boxShadow: ['0 0 0px rgba(74,222,128,0)', '0 0 10px rgba(74,222,128,0.8)', '0 0 0px rgba(74,222,128,0)'] }
          : {}
        }
        transition={isToday ? { duration: 2, repeat: Infinity } : { duration: 0.1 }}
        className={`w-3 h-3 rounded-sm cursor-pointer transition-colors duration-100 ${getColor(data)}
          ${isToday ? 'ring-2 ring-nebula-cyan ring-offset-1 ring-offset-space-900' : ''}`}
      />
      <AnimatePresence>
        {hov && date && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 glass-dark px-3 py-2 text-xs min-w-[150px] pointer-events-none shadow-2xl"
            style={{ transform: 'translate(-50%, -120%)' }}
          >
            <div className="font-mono text-star font-semibold mb-1.5">{date}</div>
            {data ? (
              <div className="space-y-1">
                <div className="flex justify-between gap-4">
                  <span className="text-comet">Score</span>
                  <span className="text-green-400 font-bold">{data.score}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-comet">Time</span>
                  <span className="text-star">{data.timeTaken}s</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-comet">Result</span>
                  <span className={data.correct ? 'text-green-400' : 'text-red-400'}>
                    {data.correct ? '✓ Correct' : '✗ Wrong'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-comet">Not attempted</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
HeatmapCell.displayName = 'HeatmapCell';