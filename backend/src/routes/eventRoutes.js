import express from 'express';
import { createEvent, listEvents, getEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import auth from '../middleware/auth.js';
import checkRole from '../middleware/role.js';

const router = express.Router();

// Create a new event (admin only)
router.post('/', auth, checkRole(['admin']), createEvent);

// List all events
router.get('/', auth, checkRole(['admin']), listEvents);

// Get a single event by ID
router.get('/:id', auth, checkRole(['admin']), getEvent);

// Update an event by ID (admin only)
router.put('/:id', auth, checkRole(['admin']), updateEvent);

// Delete an event by ID (admin only)
router.delete('/:id', auth, checkRole(['admin']), deleteEvent);

export default router;