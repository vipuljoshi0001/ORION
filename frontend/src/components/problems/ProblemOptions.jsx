import { motion } from 'framer-motion';

export const ProblemOptions = ({ options, onSelect, disabled, correctAnswer, selectedAnswer }) => (
  <div className="grid gap-3">
    {options.map((opt, i) => {
      let cls = 'border-white/15 bg-white/5 hover:border-nebula-cyan/50 hover:bg-nebula-cyan/5 cursor-pointer';
      if (disabled) {
        if (opt === correctAnswer) cls = 'border-green-400 bg-green-400/15 text-green-300 cursor-default';
        else if (opt === selectedAnswer) cls = 'border-red-400 bg-red-400/15 text-red-300 cursor-default';
        else cls = 'border-white/8 opacity-40 cursor-default';
      }
      return (
        <motion.button key={i}
          whileHover={!disabled ? { x: 6 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          onClick={() => !disabled && onSelect(opt)}
          disabled={disabled}
          className={`w-full text-left px-5 py-4 rounded-xl border font-mono text-sm transition-all duration-200 ${cls}`}
        >
          <span className="text-comet mr-3 font-bold">{String.fromCharCode(65 + i)}.</span>
          {opt}
        </motion.button>
      );
    })}
  </div>
);