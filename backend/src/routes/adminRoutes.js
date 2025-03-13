import express from 'express';
import { createEvent, deleteEvent, getEvent, listEvents, updateEvent } from '../controllers/adminController.js';
import { getAllTrades } from '../controllers/tradeController.js';
import { admin, auth, protect } from '../middleware/auth.js';


const router = express.Router();

router.post('/events', protect, admin, createEvent);
router.get('/events', protect, admin, listEvents);
router.get('/events/:id', protect, admin, getEvent);
router.put('/events/:id', protect, admin, updateEvent);
router.delete('/events/:id', protect, admin, deleteEvent);

// Trade routes
router.get('/trades', auth, admin, getAllTrades);
export default router;