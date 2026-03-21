import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarField } from '../components/layout/StarField.jsx';
import { Navbar } from '../components/layout/Navbar.jsx';
import { useAuthStore } from '../store/authStore.js';

const FACTS = [
  "The Sun accounts for 99.86% of all the mass in our solar system.",
  "Light travels at approximately 299,792 kilometres per second in a vacuum.",
  "Jupiter's Great Red Spot is a storm larger than Earth that has persisted for centuries.",
  "The Andromeda Galaxy is on a collision course with the Milky Way — in about 4.5 billion years.",
  "Black holes are regions where gravity is so strong that nothing, not even light, can escape.",
  "Saturn's rings are made primarily of ice particles and rocky debris.",
  "The surface temperature of the Sun is approximately 5,500 degrees Celsius.",
  "There are approximately 100 billion stars in the Milky Way galaxy alone.",
];

export default function Explore() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [fact] = useState(() => FACTS[Math.floor(Math.random() * FACTS.length)]);
  const [todayProblem, setTodayProblem] = useState(null);
  const { headers } = useAuthStore();

  useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/api/problems/today', { headers: headers() })
      .then(r => r.json())
      .then(d => setTodayProblem(d.problem))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      <StarField />
      <Navbar />
      <div className="layer pt-20 min-h-screen flex flex-col">

        {/* Space Fact Hero */}
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest mb-6">
                Space Fact of the Session
              </div>
              <div className="bg-gray-950/60 border border-white/6 rounded-2xl px-8 py-10 mb-10">
                <div className="text-white font-mono text-lg leading-relaxed font-medium mb-4">
                  "{fact}"
                </div>
                <div className="w-12 h-px bg-emerald-400/30 mx-auto" />
              </div>

              <h2 className="font-display font-bold text-2xl text-white mb-3">
                Ready to challenge your mind?
              </h2>
              <p className="text-gray-500 font-mono text-sm mb-8">
                Select a problem from the library or attempt today's daily challenge.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/problems')}
                  className="primary-btn"
                >
                  Explore Problems
                </button>
                <button
                  onClick={() => navigate('/today')}
                  className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/10
                             text-gray-300 hover:text-white hover:border-white/25 transition-all"
                >
                  Today's Problem
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Today's problem preview */}
        {todayProblem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="px-6 pb-10 max-w-2xl mx-auto w-full"
          >
            <div
              onClick={() => navigate('/today')}
              className="bg-gray-950/40 border border-white/6 rounded-xl p-5 cursor-pointer
                         hover:border-emerald-400/20 transition-all duration-300 group"
            >
              <div className="text-[9px] font-mono text-emerald-400/60 uppercase tracking-widest mb-2">
                Today's Challenge
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                    {todayProblem.title}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <span className="chip">{todayProblem.topic}</span>
                    <span className={`chip chip-${todayProblem.difficulty}`}>
                      {todayProblem.difficulty}
                    </span>
                  </div>
                </div>
                <div className="text-gray-600 group-hover:text-emerald-400 transition-colors text-lg">
                  →
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}