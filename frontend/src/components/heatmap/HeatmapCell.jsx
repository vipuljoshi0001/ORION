import { memo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getColor = (d) => {
  if (!d) return 'bg-gray-900 border border-gray-800';
  if (d.score >= 90) return 'bg-emerald-400';
  if (d.score >= 70) return 'bg-emerald-500';
  if (d.score >= 50) return 'bg-emerald-700';
  return 'bg-emerald-900';
};

export const HeatmapCell = memo(({ date, data, isToday }) => {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ zIndex: hov ? 9999 : 'auto' }}
    >
      <motion.div
        whileHover={{ scale: 1.4 }}
        animate={isToday && data
          ? { boxShadow: ['0 0 0px rgba(52,211,153,0)', '0 0 8px rgba(52,211,153,0.7)', '0 0 0px rgba(52,211,153,0)'] }
          : {}
        }
        transition={isToday ? { duration: 2, repeat: Infinity } : { duration: 0.1 }}
        className={`w-3 h-3 rounded-sm cursor-pointer ${getColor(data)}
          ${isToday ? 'ring-1 ring-emerald-400 ring-offset-1 ring-offset-black' : ''}`}
      />

      <AnimatePresence>
        {hov && date && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              position: 'fixed',
              zIndex: 99999,
              pointerEvents: 'none',
              transform: 'translate(-50%, -110%)',
              left: ref.current
                ? ref.current.getBoundingClientRect().left +
                  ref.current.getBoundingClientRect().width / 2 +
                  'px'
                : '50%',
              top: ref.current
                ? ref.current.getBoundingClientRect().top + 'px'
                : '50%',
            }}
            className="bg-gray-950 border border-white/10 rounded-lg px-3 py-2 text-xs shadow-2xl min-w-[160px]"
          >
            <div className="font-mono text-gray-300 font-medium mb-2 pb-1.5 border-b border-white/8">
              {date}
            </div>
            {data ? (
              <div className="space-y-1.5">
                <div className="flex justify-between gap-6">
                  <span className="text-gray-500">Score</span>
                  <span className="text-white font-mono">{data.score} / 100</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-gray-500">Time</span>
                  <span className="text-white font-mono">{data.timeTaken}s</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-gray-500">Difficulty</span>
                  <span className={`font-mono capitalize
                    ${data.difficulty === 'easy' ? 'text-emerald-400'
                    : data.difficulty === 'medium' ? 'text-amber-400'
                    : 'text-red-400'}`}>
                    {data.difficulty}
                  </span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-gray-500">Result</span>
                  <span className={`font-mono ${data.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                    {data.correct ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-gray-600 font-mono text-center py-1">
                No submission
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
HeatmapCell.displayName = 'HeatmapCell';