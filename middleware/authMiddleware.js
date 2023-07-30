// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded; // Set the decoded payload as req.user
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.userType === 'admin') {
    next(); // If user is an admin, proceed to the next middleware/controller
  } else {
    res.status(403).json({ message: 'Forbidden - Admin access required' });
  }
};

module.exports = { authenticateUser, isAdmin };
