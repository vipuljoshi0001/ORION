import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from '../components/layout/StarField.jsx';
import { useAuthStore } from '../store/authStore.js';

const SPACE_FACTS = [
  "The observable universe contains an estimated 2 trillion galaxies.",
  "Light from the Sun takes approximately 8 minutes 20 seconds to reach Earth.",
  "A neutron star can rotate up to 700 times per second.",
  "The Milky Way galaxy is approximately 100,000 light-years in diameter.",
  "One million Earths could fit inside the Sun.",
  "The universe is approximately 13.8 billion years old.",
  "There are more stars in the universe than grains of sand on all of Earth's beaches.",
  "The Voyager 1 probe, launched in 1977, has traveled over 23 billion kilometers.",
];

export default function Landing() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fact] = useState(() => SPACE_FACTS[Math.floor(Math.random() * SPACE_FACTS.length)]);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handle = async () => {
    setError(''); setLoading(true);
    try {
      const base = import.meta.env.VITE_API_URL;

const url = mode === 'login'
  ? `${base}/api/auth/login`
  : `${base}/api/auth/register`;
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : form;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      setAuth(data.user, data.token);
      navigate('/explore');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <StarField />

      {/* Hero Section */}
      <div className="layer min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-400 flex items-center justify-center">
              <span className="font-display font-black text-black text-lg">O</span>
            </div>
            <div>
              <div className="font-display font-black text-3xl text-white tracking-widest">
                ORION
              </div>
              <div className="text-[9px] font-mono text-emerald-400/60 tracking-widest text-left">
                REASONING PLATFORM
              </div>
            </div>
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-4 tracking-tight leading-none">
            Hunt Knowledge.<br />
            <span className="text-emerald-400">Conquer the Cosmos.</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm max-w-md mx-auto leading-relaxed">
            Daily reasoning problems. Track your progress. Build your streak.
          </p>

          {/* Space fact */}
          <div className="mt-8 max-w-lg mx-auto border border-white/6 rounded-xl px-5 py-4 bg-white/2">
            <div className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest mb-2">
              Space Fact
            </div>
            <p className="text-gray-400 font-mono text-xs leading-relaxed">
              {fact}
            </p>
          </div>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="w-full max-w-sm"
        >
          <div className="bg-gray-950/80 border border-white/8 rounded-2xl p-7 backdrop-blur-xl">
            {/* Toggle */}
            <div className="flex mb-5 p-1 bg-white/3 rounded-xl gap-1">
              {['login', 'register'].map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(''); }}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300
                    ${mode === m
                      ? 'bg-emerald-400 text-black shadow-lg'
                      : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {m === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {mode === 'register' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <input
                      placeholder="Username"
                      value={form.username}
                      onChange={e => setForm({ ...form, username: e.target.value })}
                      className="input-field"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="input-field"
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handle()}
                className="input-field"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-3 text-red-400 text-xs font-mono text-center bg-red-400/8 py-2 rounded-lg border border-red-400/15"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={handle}
              disabled={loading}
              className="w-full mt-5 py-3.5 rounded-xl font-bold text-black text-sm
                         bg-emerald-400 hover:bg-emerald-300 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connecting...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-center"
        >
          <div className="text-gray-700 font-mono text-xs mb-3">scroll to explore</div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-emerald-400/40 to-transparent mx-auto"
          />
        </motion.div>
      </div>

      {/* Explore Section */}
      <div className="layer min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest mb-3">
              Platform Overview
            </div>
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              What is ORION?
            </h2>
            <p className="text-gray-500 font-mono text-sm max-w-lg mx-auto leading-relaxed">
              A daily reasoning platform designed for competitive exam preparation.
              Solve problems, track progress, build consistency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              {
                title: 'Daily Problem',
                desc: 'One curated problem every day. Rotates at midnight. Build the habit of daily practice.',
                tag: 'Consistency',
              },
              {
                title: 'Problem Library',
                desc: '200+ problems across Logical Reasoning, Mathematics, Verbal, and Pattern Recognition.',
                tag: '200+ Problems',
              },
              {
                title: 'Progress Tracking',
                desc: 'GitHub-style heatmap. Streak counter. Score analytics. See your growth over time.',
                tag: 'Analytics',
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-950/60 border border-white/6 rounded-xl p-6"
              >
                <div className="text-[9px] font-mono text-emerald-400/60 uppercase tracking-widest mb-3">
                  {f.tag}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-gray-600 font-mono text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <div className="text-gray-600 font-mono text-xs mb-6">
              Topics covered in the platform
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {[
                'Logical Reasoning', 'Mathematical Aptitude', 'Verbal Reasoning',
                'Pattern Recognition', 'Data Sufficiency', 'Critical Thinking',
                'Quantitative Aptitude', 'Analytical Reasoning',
              ].map(t => (
                <span key={t} className="chip text-xs">{t}</span>
              ))}
            </div>
            <button
              onClick={() => navigate('/problems')}
              className="primary-btn text-sm px-8 py-3"
            >
              Explore Problems
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}