import express from 'express';
import { placeTrade, checkOutcomes, settleTrade } from '../controllers/tradeController.js';
import auth, { protect } from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// Place a new trade
router.post('/', protect, auth, placeTrade);

// Check trade outcomes
router.get('/',protect, auth, checkOutcomes);

// Settle a trade only by admin
router.put('/:id/settle',protect, auth, admin, settleTrade);

export default router;