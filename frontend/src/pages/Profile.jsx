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
  const [activeDays, setActiveDays] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [hr, pr] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/progress/heatmap`, { headers: headers() }),
          fetch(`${import.meta.env.VITE_API_URL}/api/progress`, { headers: headers() }),
        ]);
        const hd = await hr.json();
        const pd = await pr.json();
        const hmap = hd.heatmap || {};
        setHeatmap(hmap);
        setStats(pd.stats);

        // Active days = unique days with a submission
        setActiveDays(Object.keys(hmap).length);

        // Streak calculation
        let s = 0;
        let c = dayjs();
        const todayKey = c.format('YYYY-MM-DD');
        if (!hmap[todayKey]) c = c.subtract(1, 'day');
        while (hmap[c.format('YYYY-MM-DD')]) {
          s++;
          c = c.subtract(1, 'day');
        }
        setStreak(s);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const accuracy = stats?.totalSolved
    ? Math.round((stats.correctAnswers / stats.totalSolved) * 100)
    : 0;

  const memberSince = user?.createdAt
    ? dayjs(user.createdAt).format('MMM YYYY')
    : 'Unknown';

  return (
    <div className="min-h-screen">
      <StarField />
      <Navbar />
      <div className="layer pt-20 pb-16 max-w-4xl mx-auto px-4 sm:px-6">

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-950/40 border border-white/6 rounded-xl p-7 mb-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-emerald-400/10 border border-emerald-400/20
                            flex items-center justify-center text-2xl font-black text-emerald-400 font-display">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-white font-display font-bold text-2xl mb-1">
                {user?.username}
              </h1>
              <p className="text-gray-600 font-mono text-xs mb-3">{user?.email}</p>
              <div className="flex flex-wrap gap-2">
                <span className="chip">{streak} day streak</span>
                <span className="chip">Since {memberSince}</span>
                <span className="chip text-emerald-400 border-emerald-400/20">
                  ORION Explorer
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { label: 'Active Days', value: activeDays },
              { label: 'Total Solved', value: stats.totalSolved },
              { label: 'Correct', value: stats.correctAnswers },
              { label: 'Accuracy', value: `${accuracy}%` },
              { label: 'Avg Score', value: `${stats.avgScore}%` },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-gray-950/40 border border-white/6 rounded-xl p-4 text-center"
              >
                <div className="text-xl font-bold font-mono text-white">{s.value}</div>
                <div className="text-gray-600 text-xs font-mono mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Constellation Map */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-950/40 border border-white/6 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">Your Constellation</h3>
              <p className="text-gray-600 text-xs font-mono">
                Each green cell is a problem you solved
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
      </div>
    </div>
  );
}