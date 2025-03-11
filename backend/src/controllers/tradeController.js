import Trade from '../models/Trade.js';
import Event from '../models/Event.js';
import logger from '../logger.js';

// Place a new trade
export const placeTrade = async (req, res) => {
  try {
    const { eventId, amount, type } = req.body;
    const trade = new Trade({
      userId: req.user._id,
      eventId,
      amount,
      type
    });
    await trade.save();
    res.status(201).send(trade);
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
    trade.status = 'closed';
    await trade.save();
    res.status(200).send(trade);
  } catch (error) {
    logger.error('Error settling trade:', error);
    res.status(500).send('Error settling trade');
  }
};