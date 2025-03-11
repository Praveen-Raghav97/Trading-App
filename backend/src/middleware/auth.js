import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import logger from '../logger.js';

const auth = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verified.id);
    next();
  } catch (error) {
    logger.error('Error verifying token:', error);
    res.status(400).send('Invalid Token');
  }
};

export default auth;