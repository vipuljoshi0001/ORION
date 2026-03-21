import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarField } from '../components/layout/StarField.jsx';
import { Navbar } from '../components/layout/Navbar.jsx';
import { HeatmapGrid } from '../components/heatmap/HeatmapGrid.jsx';
import { HeatmapLegend } from '../components/heatmap/HeatmapLegend.jsx';
import { useAuthStore } from '../store/authStore.js';
import dayjs from 'dayjs';

export default function Dashboard() {
  const { headers, user } = useAuthStore();
  const navigate = useNavigate();
  const [heatmap, setHeatmap] = useState({});
  const [pod, setPod] = useState(null);
  const [stats, setStats] = useState({ solved: 0, correct: 0, avg: 0, streak: 0, activeDays: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [hr, pr, sr] = await Promise.all([
          fetch('${import.meta.env.VITE_API_URL}/api/progress/heatmap', { headers: headers() }),
          fetch('${import.meta.env.VITE_API_URL}/api/problems/today', { headers: headers() }),
          fetch('${import.meta.env.VITE_API_URL}/api/progress', { headers: headers() }),
        ]);
        const hd = await hr.json();
        const pd = await pr.json();
        const sd = await sr.json();

        const hmap = hd.heatmap || {};
        setHeatmap(hmap);
        setPod(pd.problem);

        // Calculate streak properly
        let streak = 0;
        let cursor = dayjs();
        const todayKey = cursor.format('YYYY-MM-DD');
        if (!hmap[todayKey]) cursor = cursor.subtract(1, 'day');
        while (hmap[cursor.format('YYYY-MM-DD')]) {
          streak++;
          cursor = cursor.subtract(1, 'day');
        }

        // Active days = unique days with at least one submission
        const activeDays = Object.keys(hmap).length;

        const st = sd.stats || {};
        setStats({
          solved: st.totalSolved || 0,
          correct: st.correctAnswers || 0,
          avg: st.avgScore || 0,
          streak,
          activeDays,
        });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const statCards = [
    { label: 'Current Streak', value: `${stats.streak} days`, sub: 'consecutive' },
    { label: 'Problems Solved', value: stats.solved, sub: 'total attempts' },
    { label: 'Correct Answers', value: stats.correct, sub: 'out of attempts' },
    { label: 'Average Score', value: `${stats.avg}%`, sub: 'all time' },
  ];

  return (
    <div className="min-h-screen">
      <StarField />
      <Navbar />
      <div className="layer pt-20 pb-16 max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="py-10 border-b border-white/5 mb-8">
          <div className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest mb-2">
            Mission Control
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">
            {user?.username}
          </h1>
          <p className="text-gray-600 font-mono text-sm">
            {stats.activeDays} active {stats.activeDays === 1 ? 'day' : 'days'} tracked
          </p>
        </div>

        {/* Today's Problem */}
        {pod && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/today')}
            className="bg-gray-950/40 border border-white/6 rounded-xl p-5 mb-8 cursor-pointer
                       hover:border-emerald-400/20 transition-all duration-300 group"
          >
            <div className="text-[9px] font-mono text-emerald-400/60 uppercase tracking-widest mb-2">
              Today's Challenge
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold text-base group-hover:text-emerald-400 transition-colors mb-2">
                  {pod.title}
                </h2>
                <div className="flex gap-2">
                  <span className="chip">{pod.topic}</span>
                  <span className={`chip chip-${pod.difficulty}`}>{pod.difficulty}</span>
                </div>
              </div>
              <div className="text-gray-600 group-hover:text-emerald-400 transition-colors text-2xl">
                →
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-gray-950/40 border border-white/6 rounded-xl p-4"
            >
              <div className="text-2xl font-bold font-mono text-white mb-1">{s.value}</div>
              <div className="text-gray-400 text-xs font-semibold">{s.label}</div>
              <div className="text-gray-700 text-xs font-mono">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-950/40 border border-white/6 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">Constellation Map</h3>
              <p className="text-gray-600 text-xs font-mono">
                365 days — each cell represents one problem solved
              </p>
            </div>
            <HeatmapLegend />
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
            </div>
          ) : <HeatmapGrid heatmapData={heatmap} />}
        </motion.div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "Today's Problem", desc: 'Rotates every 24 hours', to: '/today' },
            { label: 'Problem Library', desc: '200+ problems across 4 topics', to: '/problems' },
            { label: 'Full Profile', desc: 'Detailed stats and history', to: '/profile' },
          ].map((a, i) => (
            <motion.button
              key={a.label}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              onClick={() => navigate(a.to)}
              className="bg-gray-950/40 border border-white/6 rounded-xl p-4 text-left
                         hover:border-emerald-400/20 hover:bg-emerald-400/2 transition-all group"
            >
              <div className="text-white font-semibold text-xs mb-1 group-hover:text-emerald-400 transition-colors">
                {a.label}
              </div>
              <div className="text-gray-600 text-xs font-mono">{a.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}