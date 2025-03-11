import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: String,
  odds: Number,
  status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
  odds: {
    home: Number,
    away: Number,
    draw: Number,
  },
  score: {
    home: Number,
    away: Number,
  },
  externalId: String, // To map events with the external API
  outcome: String
});

eventSchema.index({ date: 1 });
eventSchema.index({ location: 1 });

export default mongoose.model('Event', eventSchema);