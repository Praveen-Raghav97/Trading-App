import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    logger.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    logger.error('Error logging in user:', error);
    res.status(500).send('Error logging in user');
  }
});

export default router;