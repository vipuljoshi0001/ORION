import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getProblemOfDay = async (req, res) => {
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    let problem = await prisma.problem.findFirst({
      where: { podDate: { gte: today, lt: tomorrow } },
    });
    if (!problem) problem = await prisma.problem.findFirst({ orderBy: { createdAt: 'asc' } });
    if (!problem) return res.status(404).json({ error: 'No problem' });
    let userProgress = null;
    if (req.userId) {
      userProgress = await prisma.progress.findFirst({
        where: { userId: req.userId, problemId: problem.id, date: { gte: today, lt: tomorrow } },
      });
    }
    return res.json({
      problem: { ...problem, options: JSON.parse(problem.options) },
      alreadySolved: !!userProgress,
      progress: userProgress,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const { topic, difficulty, limit = 100 } = req.query;
    const where = {};
    if (topic && topic !== 'All') where.topic = topic;
    if (difficulty && difficulty !== 'All') where.difficulty = difficulty;
    const [problems, total] = await Promise.all([
      prisma.problem.findMany({
        where, take: Number(limit),
        orderBy: [{ difficulty: 'asc' }, { title: 'asc' }],
        select: { id: true, title: true, topic: true, difficulty: true, createdAt: true },
      }),
      prisma.problem.count({ where }),
    ]);
    return res.json({ problems, total });
  } catch (e) {
    res.status(500).json({ error: 'Failed' });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const problem = await prisma.problem.findUnique({ where: { id: req.params.id } });
    if (!problem) return res.status(404).json({ error: 'Not found' });
    return res.json({ problem: { ...problem, options: JSON.parse(problem.options) } });
  } catch {
    res.status(500).json({ error: 'Failed' });
  }
};

export const submitAnswer = async (req, res) => {
  const { problemId, answer, timeTaken } = req.body;
  try {
    const problem = await prisma.problem.findUnique({ where: { id: problemId } });
    if (!problem) return res.status(404).json({ error: 'Not found' });
    const correct = answer === problem.answer;
    const timeScore = Math.max(0, Math.floor((1 - Math.min(timeTaken, 300) / 300) * 50));
    const score = (correct ? 50 : 0) + timeScore;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const progress = await prisma.progress.upsert({
      where: { userId_problemId_date: { userId: req.userId, problemId, date: today } },
      update: { solved: true, correct, score, timeTaken, difficulty: problem.difficulty },
      create: { userId: req.userId, problemId, date: today, solved: true, correct, score, timeTaken, difficulty: problem.difficulty },
    });
    return res.json({ correct, score, correctAnswer: problem.answer, explanation: problem.explanation, progress });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
};