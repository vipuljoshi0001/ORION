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
  const [stats, setStats] = useState({ solved: 0, correct: 0, avg: 0, streak: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [hr, pr] = await Promise.all([
          fetch('/api/progress/heatmap', { headers: headers() }),
          fetch('/api/problems/today', { headers: headers() }),
        ]);
        const hd = await hr.json();
        const pd = await pr.json();
        const hmap = hd.heatmap || {};
        setHeatmap(hmap);
        setPod(pd.problem);
        let streak = 0, cursor = dayjs();
        while (hmap[cursor.format('YYYY-MM-DD')]) { streak++; cursor = cursor.subtract(1, 'day'); }
        const vals = Object.values(hmap);
        setStats({
          solved: vals.length,
          correct: vals.filter(v => v.correct).length,
          avg: vals.length ? Math.round(vals.reduce((a, v) => a + v.score, 0) / vals.length) : 0,
          streak,
        });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="min-h-screen">
      <StarField />
      <Navbar />
      <div className="layer pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-nebula-cyan animate-pulse" />
            <span className="text-xs font-mono text-nebula-cyan uppercase tracking-widest">Mission Control</span>
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-1">
            Welcome,{' '}
            <span className="bg-gradient-to-r from-nebula-cyan to-nebula-blue bg-clip-text text-transparent">
              {user?.username}
            </span>
          </h1>
          <p className="text-comet font-mono text-sm">Your constellation of knowledge grows every day 🌌</p>
        </motion.div>

        {/* POD Banner */}
        {pod && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/today')}
            className="relative overflow-hidden glass p-6 mb-8 cursor-pointer
                       border-nebula-blue/20 hover:border-nebula-cyan/50 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-r from-nebula-blue/5 to-nebula-purple/5
                            group-hover:from-nebula-blue/10 group-hover:to-nebula-purple/10 transition-all" />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🌟</span>
                  <span className="text-xs font-mono text-nebula-cyan uppercase tracking-widest font-bold">
                    Today's Challenge
                  </span>
                </div>
                <h2 className="text-xl font-bold text-star mb-2 group-hover:text-nebula-cyan transition-colors">
                  {pod.title}
                </h2>
                <div className="flex gap-2">
                  <span className="chip">{pod.topic}</span>
                  <span className={`chip chip-${pod.difficulty}`}>{pod.difficulty?.toUpperCase()}</span>
                </div>
              </div>
              <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="text-4xl ml-4 opacity-50 group-hover:opacity-100 transition-opacity">→</motion.div>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Day Streak', v: `${stats.streak}`, icon: '🔥', c: 'text-orange-400', sub: 'days in a row' },
            { label: 'Total Solved', v: stats.solved, icon: '✅', c: 'text-green-400', sub: 'problems done' },
            { label: 'Correct', v: stats.correct, icon: '🎯', c: 'text-nebula-cyan', sub: 'right answers' },
            { label: 'Avg Score', v: `${stats.avg}%`, icon: '⭐', c: 'text-nebula-purple', sub: 'average' },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="glass p-5">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xl">{s.icon}</span>
                <div className={`text-3xl font-black font-display ${s.c}`}>{s.v}</div>
              </div>
              <div className="text-star text-xs font-semibold">{s.label}</div>
              <div className="text-comet text-xs font-mono opacity-60">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Heatmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }} className="glass p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-star">Constellation Map</h3>
              <p className="text-comet text-xs font-mono mt-1">365 days · every square = one problem solved</p>
            </div>
            <HeatmapLegend />
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-14">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-2 border-nebula-blue border-t-transparent rounded-full animate-spin" />
                <span className="text-comet font-mono text-xs">Mapping your stars...</span>
              </div>
            </div>
          ) : <HeatmapGrid heatmapData={heatmap} />}
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Today's Problem", desc: 'Rotates every 24h', icon: '🌟', to: '/today', grad: 'from-nebula-blue to-nebula-purple' },
            { label: 'All Problems', desc: '200+ across 4 topics', icon: '🧩', to: '/problems', grad: 'from-nebula-purple to-nebula-cyan' },
            { label: 'My Profile', desc: 'Full stats & history', icon: '📊', to: '/profile', grad: 'from-nebula-cyan to-nebula-blue' },
          ].map((a, i) => (
            <motion.button key={a.label}
              whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
              onClick={() => navigate(a.to)}
              className="glass p-4 text-left hover:border-white/25 transition-all duration-200 group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.grad} flex items-center justify-center mb-3 text-lg
                              shadow-lg group-hover:scale-110 transition-transform`}>
                {a.icon}
              </div>
              <div className="text-star font-semibold text-sm mb-1">{a.label}</div>
              <div className="text-comet text-xs font-mono">{a.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}