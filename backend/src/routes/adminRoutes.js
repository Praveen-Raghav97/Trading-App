import express from 'express';
import admin from "../middleware/admin";
import { createEvent, deleteEvent, getEvent, listEvents, updateEvent } from '../controllers/eventController';
import { protect } from '../middleware/auth';



const router = express.Router();
admin
router.post('/events', protect, admin, createEvent);
router.get('/events', protect, admin, listEvents);
router.get('/events/:id', protect, admin, getEvent);
router.put('/events/:id', protect, admin, updateEvent);
router.delete('/events/:id', protect, admin, deleteEvent);

// Trade routes
router.get('/trades', auth, admin), getAllTrades);
export default router;