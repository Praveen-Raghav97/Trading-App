import Trade from '../models/Trade.js';
import Event from '../models/Event.js';
import logger from '../utils/logger.js';
import User from '../models/User.js';

// Place a new trade
export const placeTrade = async (req, res) => {
  try {
    const { eventId, amount, type } = req.body;
    const user = await User.findById(req.user.id);
    const event = await Event.findById(eventId);

    if (!event || event.status !== 'live') {
      return res.status(400).json({ message: 'Invalid or inactive event' });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.balance -= amount;

    await user.save();

    const trade = await Trade.create({ userId: user._id, eventId, amount, type });
    res.status(201).json(trade);
  } catch (error) {
    logger.error('Error placing trade:', error);
    res.status(500).send('Error placing trade');
  }
};

// Check trade outcomes
export const checkOutcomes = async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.user._id });
    res.status(200).send(trades);
  } catch (error) {
    logger.error('Error checking outcomes:', error);
    res.status(500).send('Error checking outcomes');
  }
};

// Settle a trade
export const settleTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (!trade) {
      return res.status(404).send('Trade not found');
    }
    if (trade.status === 'closed') {
      return res.status(400).send('Trade already settled');
    }

    const event = await Event.findById(trade.eventId);
    if (!event) {
      return res.status(404).send('Event not found');
    }

    // Example logic for settling a trade based on event outcome
    if (event.outcome === 'win' && trade.type === 'buy') {
      trade.status = 'closed';
      trade.result = 'win';
      // Update user balance
      const user = await User.findById(trade.userId);
      user.balance += trade.amount * event.odds;
      await user.save();
    } else {
      trade.status = 'closed';
      trade.result = 'lose';
    }    await trade.save();
    res.status(200).send(trade);
  } catch (error) {
    logger.error('Error settling trade:', error);
    res.status(500).send('Error settling trade');
  }
};


// Get all trades (admin only)
export const getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find();
    res.status(200).send(trades);
  } catch (error) {
    logger.error('Error getting trades:', error);
    res.status(500).send('Error getting trades');
  }
};