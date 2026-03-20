import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUserProgress = async (req, res) => {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 365);
    const progress = await prisma.progress.findMany({
      where: { userId: req.userId, date: { gte: cutoff } },
      orderBy: { date: 'desc' },
      include: { problem: { select: { title: true, topic: true } } },
    });
    const solved = progress.filter(p => p.solved);
    const stats = {
      totalSolved: solved.length,
      correctAnswers: solved.filter(p => p.correct).length,
      avgScore: solved.length ? Math.round(solved.reduce((a, p) => a + p.score, 0) / solved.length) : 0,
      perfectDays: solved.filter(p => p.score >= 90).length,
    };
    return res.json({ progress, stats });
  } catch {
    res.status(500).json({ error: 'Failed' });
  }
};

export const getHeatmapData = async (req, res) => {
  try {
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 1);
    const progress = await prisma.progress.findMany({
      where: { userId: req.userId, date: { gte: cutoff }, solved: true },
      select: { date: true, score: true, timeTaken: true, difficulty: true, correct: true },
    });
    const heatmap = {};
    for (const p of progress) {
      const key = p.date.toISOString().split('T')[0];
      heatmap[key] = { date: key, score: p.score, timeTaken: p.timeTaken, difficulty: p.difficulty, correct: p.correct, solved: true };
    }
    return res.json({ heatmap });
  } catch {
    res.status(500).json({ error: 'Failed' });
  }
};