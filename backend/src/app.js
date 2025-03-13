import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fetchData from './utils/fetchData.js';
import logger from './utils/logger.js';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/eventRoutes.js';
import tradeRoutes from './routes/tradeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import {auth} from './middleware/auth.js';
import checkRole from './middleware/role.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  logger.info('Connected to MongoDB');
  fetchData(broadcast); // Fetch data on server startup
}).catch((err) => {
  logger.error('Failed to connect to MongoDB', err);
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Event routes
app.use('/api/events', eventRoutes);

// Trade routes
app.use('/api/trades', tradeRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// Example protected route for all authenticated users
app.get('/protected', auth, (req, res) => {
  res.send('Protected route accessed');
});

// Example protected route for admin users only
app.get('/admin', auth, checkRole(['admin']), (req, res) => {
  res.send('Admin route accessed');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send('Something went wrong');
});

// Create HTTP server
const server = createServer(app);

// Set up Socket.io server
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  logger.info('New client connected');

  socket.on('disconnect', () => {
    logger.info('Client disconnected');
  });

  // Emit live events to clients
  const sendLiveEvents = async () => {
    const liveEvents = await Event.find({ status: 'live' });
    socket.emit('liveEvents', liveEvents);
  };

  sendLiveEvents(); // Send data immediately
  const interval = setInterval(sendLiveEvents, 10000); // Update every 10 seconds

  socket.on('eventUpdate', async (data) => {
    logger.info('eventUpdate', data); // Broadcast event updates
    io.emit('eventUpdate', data);
  });

  socket.on('tradeUpdate', async (data) => {
    logger.info('tradeUpdate', data); // Broadcast trade updates
    io.emit('tradeUpdate', data);
  });
});

// Function to broadcast updates to all connected clients
const broadcast = (data) => {
  io.emit('update', data);
};

// Example function to simulate real-time updates
const simulateUpdates = () => {
  setInterval(() => {
    const update = {
      type: 'update',
      data: {
        event: 'New Event',
        trade: 'New Trade'
      }
    };
    broadcast(update);
  }, 5000); // Broadcast updates every 5 seconds
};

simulateUpdates();

// Start the HTTP server
server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});