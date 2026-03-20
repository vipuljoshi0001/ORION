import { verifyToken } from '../utils/jwt.js';

export const requireAuth = (req, res, next) => {
  try {
    const h = req.headers.authorization;
    if (!h?.startsWith('Bearer '))
      return res.status(401).json({ error: 'No token' });
    const decoded = verifyToken(h.split(' ')[1]);
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};