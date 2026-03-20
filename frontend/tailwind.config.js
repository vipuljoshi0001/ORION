export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#010409', 900: '#020817', 800: '#0a0f2e',
          700: '#0f172a', 600: '#1e293b', 500: '#334155',
        },
        nebula: {
          blue: '#2563eb', purple: '#7c3aed',
          cyan: '#06b6d4', pink: '#ec4899', green: '#10b981',
        },
        star: '#e2e8f0',
        comet: '#94a3b8',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      keyframes: {
        twinkle: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.2 } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-15px)' } },
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};