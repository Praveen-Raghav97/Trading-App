import Event from '../models/Event.js';
import logger from '../utils/logger.js';

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { name, odds } = req.body;
    const event = await Event.create({ name, odds });
    res.status(201).json(event);
  } catch (error) {
    logger.error('Error creating event:', error);
    res.status(500).send('Error creating event');
  }
};

// Get a list of all events
export const listEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (error) {
    logger.error('Error listing events:', error);
    res.status(500).send('Error listing events');
  }
};

// Get a single event by ID
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.status(200).send(event);
  } catch (error) {
    logger.error('Error getting event:', error);
    res.status(500).send('Error getting event');
  }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.status(200).send(event);
  } catch (error) {
    logger.error('Error updating event:', error);
    res.status(500).send('Error updating event');
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.status(200).send('Event deleted');
  } catch (error) {
    logger.error('Error deleting event:', error);
    res.status(500).send('Error deleting event');
  }
};