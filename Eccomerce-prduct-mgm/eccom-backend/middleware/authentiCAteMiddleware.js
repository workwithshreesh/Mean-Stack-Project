const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // contains id and role
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

exports.requireRole = (roleArray) => {
  return (req, res, next) => {
    if (!roleArray.includes(req.user?.role)) {
      return res.status(403).json({ error: 'Access forbidden: Insufficient privileges.' });
    }
    next();
  };
};
