import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: String,
  odds: Number,
  status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
  outcome: String
});

eventSchema.index({ date: 1 });
eventSchema.index({ location: 1 });

export default mongoose.model('Event', eventSchema);