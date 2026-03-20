import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StarField } from '../components/layout/StarField.jsx';
import { Navbar } from '../components/layout/Navbar.jsx';
import { HeatmapGrid } from '../components/heatmap/HeatmapGrid.jsx';
import { HeatmapLegend } from '../components/heatmap/HeatmapLegend.jsx';
import { useAuthStore } from '../store/authStore.js';
import dayjs from 'dayjs';

export default function Profile() {
  const { headers, user } = useAuthStore();
  const [heatmap, setHeatmap] = useState({});
  const [stats, setStats] = useState(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [hr, pr] = await Promise.all([
          fetch('/api/progress/heatmap', { headers: headers() }),
          fetch('/api/progress', { headers: headers() }),
        ]);
        const hd = await hr.json();
        const pd = await pr.json();
        const hmap = hd.heatmap || {};
        setHeatmap(hmap);
        setStats(pd.stats);
        let s = 0, c = dayjs();
        while (hmap[c.format('YYYY-MM-DD')]) { s++; c = c.subtract(1, 'day'); }
        setStreak(s);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const accuracy = stats?.totalSolved
    ? Math.round((stats.correctAnswers / stats.totalSolved) * 100) : 0;

  return (
    <div className="min-h-screen">
      <StarField />
      <Navbar />
      <div className="layer pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-nebula-purple/5 rounded-full blur-3xl"
               style={{ transform: 'translate(30%, -30%)' }} />
          <div className="relative flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-nebula-blue via-nebula-purple to-nebula-cyan
                              flex items-center justify-center text-3xl font-black shadow-2xl shadow-nebula-blue/30">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-space-900
                              flex items-center justify-center text-[8px]">✓</div>
            </div>
            <div>
              <h1 className="font-display font-black text-3xl text-star mb-1">{user?.username}</h1>
              <p className="text-comet font-mono text-sm">{user?.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="chip">🔥 {streak} day streak</span>
                <span className="chip">📅 {dayjs(user?.createdAt).format('MMM YYYY')}</span>
                <span className="chip text-nebula-cyan border-nebula-cyan/30">🌌 ORION Explorer</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              { label: 'Total Solved', v: stats.totalSolved, c: 'text-green-400', icon: '✅' },
              { label: 'Correct', v: stats.correctAnswers, c: 'text-nebula-cyan', icon: '🎯' },
              { label: 'Accuracy', v: `${accuracy}%`, c: 'text-nebula-blue', icon: '📈' },
              { label: 'Avg Score', v: `${stats.avgScore}%`, c: 'text-nebula-purple', icon: '📊' },
              { label: 'Perfect Days', v: stats.perfectDays, c: 'text-yellow-400', icon: '⭐' },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className={`text-2xl font-bold font-mono ${s.c} leading-none`}>{s.v}</div>
                <div className="text-comet text-xs font-mono mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Heatmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }} className="glass p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-star">Your Constellation</h3>
              <p className="text-comet text-xs font-mono mt-1">Each star is a problem you conquered</p>
            </div>
            <HeatmapLegend />
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-2 border-nebula-blue border-t-transparent rounded-full animate-spin" />
                <span className="text-comet font-mono text-xs">Mapping your stars...</span>
              </div>
            </div>
          ) : <HeatmapGrid heatmapData={heatmap} />}
        </motion.div>
      </div>
    </div>
  );
}