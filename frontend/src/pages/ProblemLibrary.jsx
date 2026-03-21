import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarField } from '../components/layout/StarField.jsx';
import { Navbar } from '../components/layout/Navbar.jsx';
import { DifficultyBadge } from '../components/problems/DifficultyBadge.jsx';
import { useAuthStore } from '../store/authStore.js';

const TOPICS = ['All', 'Logical Reasoning', 'Math Puzzles', 'Verbal Reasoning', 'Pattern Recognition'];
const DIFFS = ['All', 'easy', 'medium', 'hard'];

export default function ProblemLibrary() {
  const { headers } = useAuthStore();
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [topic, setTopic] = useState('All');
  const [diff, setDiff] = useState('All');
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const p = new URLSearchParams({ limit: '100' });
        if (topic !== 'All') p.set('topic', topic);
        if (diff !== 'All') p.set('difficulty', diff);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/problems?${p}`, { headers: headers() });
        const data = await res.json();
        setProblems(data.problems || []);
        setTotal(data.total || 0);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [topic, diff]);

  return (
    <div className="min-h-screen">
      <StarField />
      <Navbar />
      <div className="layer pt-20 pb-16 max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="py-8 border-b border-white/5 mb-6">
          <h1 className="font-display font-bold text-2xl text-white mb-1">Problem Library</h1>
          <p className="text-gray-600 font-mono text-xs">
            {total} problems — timer begins when you open a problem
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-950/40 border border-white/6 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-gray-700 font-mono text-[10px] uppercase tracking-widest
                            flex items-center mr-2">Topic</span>
            {TOPICS.map(t => (
              <button key={t} onClick={() => setTopic(t)}
                className={`chip transition-all text-xs ${
                  topic === t
                    ? 'border-emerald-400/40 bg-emerald-400/8 text-emerald-400'
                    : 'hover:border-white/25 hover:text-gray-300'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-gray-700 font-mono text-[10px] uppercase tracking-widest mr-2">
              Level
            </span>
            {DIFFS.map(d => (
              <button key={d} onClick={() => setDiff(d)}
                className={`chip transition-all text-xs ${
                  diff === d
                    ? d === 'easy' ? 'chip-easy border-opacity-60'
                    : d === 'medium' ? 'chip-medium border-opacity-60'
                    : d === 'hard' ? 'chip-hard border-opacity-60'
                    : 'border-emerald-400/40 bg-emerald-400/8 text-emerald-400'
                    : 'hover:border-white/25 hover:text-gray-300'}`}>
                {d === 'All' ? 'All Levels' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {problems.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.015 }}
                onClick={() => navigate(`/problems/${p.id}`)}
                className="bg-gray-950/40 border border-white/6 rounded-xl p-5 cursor-pointer
                           hover:border-emerald-400/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <DifficultyBadge difficulty={p.difficulty} />
                  <span className="chip text-[10px]">{p.topic.split(' ')[0]}</span>
                </div>
                <h3 className="text-white font-semibold text-sm leading-snug
                               group-hover:text-emerald-400 transition-colors mb-3">
                  {p.title}
                </h3>
                <div className="text-gray-700 text-[10px] font-mono group-hover:text-emerald-400/60 transition-all">
                  Click to solve — timer starts on open
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}