import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from '../components/layout/StarField.jsx';
import { Navbar } from '../components/layout/Navbar.jsx';
import { ProblemTimer } from '../components/problems/ProblemTimer.jsx';
import { ProblemOptions } from '../components/problems/ProblemOptions.jsx';
import { DifficultyBadge } from '../components/problems/DifficultyBadge.jsx';
import { useProblemStore } from '../store/problemStore.js';
import { useAuthStore } from '../store/authStore.js';

export default function ProblemOfDay() {
  const { headers } = useAuthStore();
  const { elapsed, submitted, result, setCurrent, startTimer, setResult } = useProblemStore();
  const [problem, setProblem] = useState(null);
  const [selected, setSelected] = useState(null);
  const [alreadySolved, setAlreadySolved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/problems/today`, { headers: headers() });
        const data = await res.json();
        setProblem(data.problem);
        setAlreadySolved(data.alreadySolved);
        if (!data.alreadySolved) { setCurrent(data.problem); startTimer(); }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const submit = async (opt) => {
    if (submitted || alreadySolved) return;
    setSelected(opt);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/problems/submit`, {
      method: 'POST', headers: headers(),
      body: JSON.stringify({ problemId: problem.id, answer: opt, timeTaken: elapsed }),
    });
    setResult(await res.json());
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen">
      <StarField />
      <Navbar />
      <div className="layer pt-28 pb-16 max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
          <span className="text-xs font-mono text-nebula-cyan uppercase tracking-widest font-bold">
            🌟 Problem of the Day
          </span>
          <h1 className="font-display font-bold text-2xl text-star mt-2">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </h1>
        </motion.div>

        {problem && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} className="glass p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <span className="chip">{problem.topic}</span>
                <DifficultyBadge difficulty={problem.difficulty} />
              </div>
              {!alreadySolved && !submitted
                ? <ProblemTimer />
                : <span className="text-green-400 font-mono text-sm font-bold">✓ Solved</span>
              }
            </div>

            <h2 className="text-xl font-bold text-star mb-2">{problem.title}</h2>
            <p className="text-comet font-mono text-sm leading-relaxed mb-8">{problem.description}</p>

            <ProblemOptions
              options={problem.options}
              onSelect={submit}
              disabled={submitted || alreadySolved}
              correctAnswer={result?.correctAnswer || (alreadySolved ? problem.answer : null)}
              selectedAnswer={selected}
            />

            <AnimatePresence>
              {submitted && result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-5 rounded-xl border ${result.correct ? 'border-green-400/30 bg-green-400/10' : 'border-red-400/30 bg-red-400/10'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{result.correct ? '🎉' : '💡'}</span>
                    <div>
                      <div className={`font-bold text-lg ${result.correct ? 'text-green-400' : 'text-red-400'}`}>
                        {result.correct ? 'Correct!' : 'Not quite!'}
                      </div>
                      <div className="text-comet text-xs font-mono">Score: {result.score}/100 · Time: {elapsed}s</div>
                    </div>
                  </div>
                  <p className="text-star text-sm font-mono leading-relaxed">💬 {result.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {alreadySolved && !submitted && (
              <div className="mt-6 p-4 rounded-xl border border-nebula-cyan/30 bg-nebula-cyan/5 text-center font-mono text-sm text-comet">
                ✅ Already solved today! Come back tomorrow 🌙
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <StarField />
    <div className="layer w-12 h-12 border-2 border-nebula-blue border-t-transparent rounded-full animate-spin" />
  </div>
);