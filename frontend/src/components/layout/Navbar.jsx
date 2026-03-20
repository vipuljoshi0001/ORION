import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore.js';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: '🌌' },
  { to: '/today', label: 'Today', icon: '🌟' },
  { to: '/problems', label: 'Problems', icon: '🧩' },
  { to: '/profile', label: 'Profile', icon: '👤' },
];

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <motion.nav
      initial={{ y: -80 }} animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 glass-dark rounded-none border-x-0 border-t-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-nebula-blue to-nebula-purple
                          flex items-center justify-center shadow-lg shadow-nebula-blue/30">
            <span className="font-display font-black text-white text-xs">O</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-sm bg-gradient-to-r from-nebula-cyan to-nebula-blue bg-clip-text text-transparent">
              ORION
            </span>
            <span className="text-[8px] font-mono text-comet/50 tracking-widest">REASONING</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link key={n.to} to={n.to}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5
                ${pathname === n.to
                  ? 'bg-nebula-blue/20 text-nebula-cyan border border-nebula-blue/30'
                  : 'text-comet hover:text-star hover:bg-white/5'}`}>
              <span>{n.icon}</span>{n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-nebula-blue to-nebula-purple
                            flex items-center justify-center text-[10px] font-bold">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <span className="text-xs text-comet font-mono hidden lg:block">@{user?.username}</span>
          </div>
          <button onClick={() => { logout(); navigate('/'); }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/20
                       text-comet hover:text-red-400 hover:border-red-400/50 transition-all">
            Logout
          </button>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden flex border-t border-white/5">
        {NAV.map(n => (
          <Link key={n.to} to={n.to}
            className={`flex-1 py-2 text-center transition-all
              ${pathname === n.to ? 'text-nebula-cyan bg-nebula-blue/10' : 'text-comet'}`}>
            <div className="text-sm">{n.icon}</div>
            <div className="text-[9px] font-mono">{n.label}</div>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};