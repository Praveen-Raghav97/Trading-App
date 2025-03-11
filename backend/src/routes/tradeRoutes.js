import express from 'express';
import { placeTrade, checkOutcomes, settleTrade } from '../controllers/tradeController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Place a new trade
router.post('/', auth, placeTrade);

// Check trade outcomes
router.get('/', auth, checkOutcomes);

// Settle a trade
router.post('/settle', protect, admin, settleTrade);

export default router;