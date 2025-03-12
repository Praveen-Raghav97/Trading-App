import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
  outcome: { type: String, enum: ['win', 'lose', 'draw'], default: 'draw' },
  odds: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

eventSchema.index({ date: 1 });
eventSchema.index({ location: 1 });

export default mongoose.model('Event', eventSchema);