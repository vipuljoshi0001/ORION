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
        const res = await fetch(`/api/problems?${p}`, { headers: headers() });
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
      <div className="layer pt-28 pb-16 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="font-display font-bold text-3xl text-star mb-1">Problem Library</h1>
          <p className="text-comet font-mono text-sm">{total} problems · timer starts automatically when you click</p>
        </motion.div>

        {/* Filters */}
        <div className="glass p-4 mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {TOPICS.map(t => (
              <button key={t} onClick={() => setTopic(t)}
                className={`chip transition-all ${topic === t ? 'border-nebula-cyan/60 bg-nebula-cyan/10 text-nebula-cyan' : 'hover:border-white/40'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {DIFFS.map(d => (
              <button key={d} onClick={() => setDiff(d)}
                className={`chip transition-all ${diff === d
                  ? d === 'easy' ? 'chip-easy'
                  : d === 'medium' ? 'chip-medium'
                  : d === 'hard' ? 'chip-hard'
                  : 'border-nebula-blue/60 bg-nebula-blue/10 text-nebula-blue'
                  : 'hover:border-white/40'}`}>
                {d === 'All' ? 'All Levels' : d}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-2 border-nebula-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => navigate(`/problems/${p.id}`)}
                className="glass p-5 cursor-pointer group hover:border-nebula-cyan/40 hover:bg-white/8 transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <DifficultyBadge difficulty={p.difficulty} />
                  <span className="chip text-[10px]">{p.topic.split(' ')[0]}</span>
                </div>
                <h3 className="text-star font-semibold text-sm mb-3 group-hover:text-nebula-cyan transition-colors leading-snug">
                  {p.title}
                </h3>
                <div className="text-xs font-mono text-nebula-cyan/0 group-hover:text-nebula-cyan/70 transition-all">
                  ▶ Click to solve · timer starts immediately
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}