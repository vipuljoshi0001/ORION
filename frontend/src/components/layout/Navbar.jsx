import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore.js';

const NAV = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/today', label: 'Today' },
  { to: '/problems', label: 'Problems' },
  { to: '/profile', label: 'Profile' },
];

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-400 flex items-center justify-center">
            <span className="font-display font-black text-black text-xs">O</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-sm text-white tracking-wider">
              ORION
            </span>
            <span className="text-[8px] font-mono text-emerald-400/60 tracking-widest">
              REASONING
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className={pathname === n.to ? 'nav-btn-active' : 'nav-btn'}
            >
              {n.label}
            </Link>
          ))}
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400/40
                            flex items-center justify-center text-[10px] font-bold text-emerald-400">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <span className="text-xs text-gray-500 font-mono hidden lg:block">
              {user?.username}
            </span>
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10
                       text-gray-500 hover:text-red-400 hover:border-red-400/30 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex border-t border-white/5 bg-black/90">
        {NAV.map(n => (
          <Link
            key={n.to}
            to={n.to}
            className={`flex-1 py-2.5 text-center text-[10px] font-mono transition-all
              ${pathname === n.to ? 'text-emerald-400 bg-emerald-400/5' : 'text-gray-600'}`}
          >
            {n.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};