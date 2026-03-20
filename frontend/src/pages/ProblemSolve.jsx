import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from '../components/layout/StarField.jsx';
import { Navbar } from '../components/layout/Navbar.jsx';
import { ProblemTimer } from '../components/problems/ProblemTimer.jsx';
import { ProblemOptions } from '../components/problems/ProblemOptions.jsx';
import { DifficultyBadge } from '../components/problems/DifficultyBadge.jsx';
import { useProblemStore } from '../store/problemStore.js';
import { useAuthStore } from '../store/authStore.js';

export default function ProblemSolve() {
  const { id } = useParams();
  const { headers } = useAuthStore();
  const navigate = useNavigate();
  const { elapsed, submitted, result, setCurrent, startTimer, setResult, reset } = useProblemStore();
  const [problem, setProblem] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reset();
    (async () => {
      try {
        const res = await fetch(`/api/problems/${id}`, { headers: headers() });
        const data = await res.json();
        setProblem(data.problem);
        setCurrent(data.problem);
        startTimer();
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
    return () => reset();
  }, [id]);

  const submit = async (opt) => {
    if (submitted) return;
    setSelected(opt);
    const res = await fetch('/api/problems/submit', {
      method: 'POST', headers: headers(),
      body: JSON.stringify({ problemId: problem.id, answer: opt, timeTaken: elapsed }),
    });
    setResult(await res.json());
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <StarField />
      <div className="layer w-12 h-12 border-2 border-nebula-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen">
      <StarField />
      <Navbar />
      <div className="layer pt-28 pb-16 max-w-2xl mx-auto px-4 sm:px-6">
        <motion.button whileHover={{ x: -4 }} onClick={() => navigate('/problems')}
          className="text-comet hover:text-star font-mono text-sm mb-6 flex items-center gap-2 transition-colors">
          ← Back to Library
        </motion.button>

        {problem && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <span className="chip">{problem.topic}</span>
                <DifficultyBadge difficulty={problem.difficulty} />
              </div>
              {!submitted
                ? <ProblemTimer />
                : <div className={`font-mono text-sm font-bold ${result?.correct ? 'text-green-400' : 'text-red-400'}`}>
                    {result?.correct ? '✓ Correct' : '✗ Wrong'} · {result?.score}pts
                  </div>
              }
            </div>

            <h2 className="text-2xl font-bold text-star mb-2">{problem.title}</h2>
            <p className="text-comet font-mono text-sm leading-relaxed mb-8">{problem.description}</p>

            <ProblemOptions
              options={problem.options}
              onSelect={submit}
              disabled={submitted}
              correctAnswer={result?.correctAnswer}
              selectedAnswer={selected}
            />

            <AnimatePresence>
              {submitted && result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-6 rounded-xl border ${result.correct ? 'border-green-400/30 bg-green-400/10' : 'border-red-400/30 bg-red-400/10'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{result.correct ? '🎉' : '💡'}</span>
                    <div>
                      <div className={`font-bold text-xl ${result.correct ? 'text-green-400' : 'text-red-400'}`}>
                        {result.correct ? 'Excellent!' : 'Better luck next time!'}
                      </div>
                      <div className="text-comet text-xs font-mono">Score: {result.score}/100 · Time: {elapsed}s</div>
                    </div>
                  </div>
                  <p className="text-star text-sm font-mono leading-relaxed mb-5">💬 {result.explanation}</p>
                  <div className="flex gap-3">
                    <button onClick={() => navigate('/problems')} className="nebula-btn text-sm">
                      Solve More →
                    </button>
                    <button onClick={() => navigate('/dashboard')}
                      className="px-4 py-2 rounded-xl text-sm border border-white/20 text-comet hover:text-star transition-all">
                      Dashboard
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}