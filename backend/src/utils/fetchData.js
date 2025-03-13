import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event.js';
import MarketData from '../models/MarketData.js';
import logger from './logger.js';

dotenv.config();

const fetchData = async (broadcast) => {
  try {
    const apiKey = process.env.API_KEY;
    const response = await axios.get(process.env.API_URL, {
        params: {
            apiKey,
          regions: 'us', // Adjust for regions like 'uk', 'eu', etc.
          markets: 'h2h', // 'h2h' (head to head) or 'spreads', etc.
          oddsFormat: 'decimal'
        }
      });;
console.log(response, "this is res")
    const events = response.data.events;
    const marketData = response.data.marketData;

    // Store events in MongoDB
  //  await Event.insertMany(events);

    // Store market data in MongoDB
   // await MarketData.insertMany(marketData);

    logger.info('Data fetched and stored successfully');

    // Broadcast updates to WebSocket clients
    broadcast({
      type: 'data-update',
      events,
      marketData
    });
  } catch (error) {
    logger.error('Error fetching data:', error);
  }
};

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  fetchData();
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

export default fetchData;