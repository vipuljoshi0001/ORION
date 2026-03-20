import { create } from 'zustand';

export const useProblemStore = create((set) => ({
  current: null,
  timerOn: false,
  elapsed: 0,
  submitted: false,
  result: null,
  setCurrent: (p) => set({ current: p, submitted: false, result: null, elapsed: 0 }),
  startTimer: () => set({ timerOn: true }),
  stopTimer: () => set({ timerOn: false }),
  tick: () => set((s) => ({ elapsed: s.elapsed + 1 })),
  setResult: (r) => set({ result: r, submitted: true, timerOn: false }),
  reset: () => set({ current: null, submitted: false, result: null, elapsed: 0, timerOn: false }),
}));