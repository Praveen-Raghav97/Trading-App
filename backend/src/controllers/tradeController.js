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
    const { eventId, outcome } = req.body;
    const trade = await Trade.findById(req.params.id);
    const trades = await Trade.find({ eventId, status: 'open' });
    const event = await Event.findById(eventId);
    event.outcome = outcome;
    event.status = 'completed';
    await event.save();

    for (let trade of trades) {
      const user = await User.findById(trade.userId);
      if ((trade.type === 'buy' && outcome === 'win') || (trade.type === 'sell' && outcome === 'lose')) {
        user.balance += trade.amount * 2; // Double payout for winning trades
      }
    trade.status = 'closed';
    await trade.save();
    await user.save();
  }

  res.status(200).json({ message: 'Trades settled' });
  } catch (error) {
    logger.error('Error settling trade:', error);
    res.status(500).send('Error settling trade');
  }
};