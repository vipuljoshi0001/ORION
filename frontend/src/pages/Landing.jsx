import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from '../components/layout/StarField.jsx';
import { useAuthStore } from '../store/authStore.js';

export default function Landing() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handle = async () => {
    setError(''); setLoading(true);
    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' ? { email: form.email, password: form.password } : form;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setAuth(data.user, data.token);
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <StarField />
      <div className="layer w-full max-w-md px-6 py-12">

        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }} className="text-center mb-10">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <motion.div animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(37,99,235,0.5) 100%)' }}
            />
            <motion.div animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 rounded-full"
              style={{ background: 'conic-gradient(from 180deg, transparent 70%, rgba(124,58,237,0.4) 100%)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-nebula-blue via-nebula-purple to-nebula-cyan
                              flex items-center justify-center shadow-2xl shadow-nebula-blue/50">
                <span className="font-display font-black text-3xl text-white">O</span>
              </div>
            </div>
          </div>

          <h1 className="font-display font-black text-6xl tracking-tight mb-2">
            <span className="bg-gradient-to-r from-nebula-cyan via-star to-nebula-blue bg-clip-text text-transparent">
              ORION
            </span>
          </h1>
          <p className="text-nebula-cyan font-mono text-xs tracking-widest uppercase mb-1">
            Daily Reasoning Platform
          </p>
          <p className="text-comet/70 font-mono text-xs">
            Hunt Knowledge. Conquer the Cosmos.
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }} className="glass p-7">
          <div className="flex mb-5 p-1 glass rounded-xl gap-1">
            {['login', 'register'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
                  ${mode === m
                    ? 'bg-gradient-to-r from-nebula-blue to-nebula-purple text-white shadow-lg'
                    : 'text-comet hover:text-star'}`}>
                {m === 'login' ? '🚀 Sign In' : '✨ Register'}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {mode === 'register' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}>
                  <input placeholder="Choose a username" value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                    className="input-field" />
                </motion.div>
              )}
            </AnimatePresence>
            <input type="email" placeholder="Email address" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="input-field" />
            <input type="password" placeholder="Password (6+ characters)" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handle()}
              className="input-field" />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="mt-3 text-red-400 text-xs font-mono text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                ⚠️ {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handle} disabled={loading}
            className="w-full mt-5 py-4 rounded-xl font-bold text-white
                       bg-gradient-to-r from-nebula-blue via-nebula-purple to-nebula-cyan
                       hover:opacity-90 transition-all shadow-xl shadow-nebula-blue/20
                       disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? '⏳ Connecting...'
              : mode === 'login' ? '🚀 Launch Into ORION'
              : '✨ Begin Your Journey'}
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-3 mt-5">
          {[['200+','Problems'],['4','Topics'],['Daily','Challenge']].map(([v, l]) => (
            <div key={l} className="glass p-3 text-center">
              <div className="font-display font-bold text-nebula-cyan text-base">{v}</div>
              <div className="text-comet text-xs font-mono">{l}</div>
            </div>
          ))}
        </motion.div>

        <p className="text-center text-comet/30 font-mono text-xs mt-5">
          Named after the mightiest constellation ✦ ORION
        </p>
      </div>
    </div>
  );
}