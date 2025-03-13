import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'live', 'finished' , 'cancelled'], default: 'upcoming' },
  outcome: { type: String, enum: ['win', 'lose', 'draw'], default: 'draw' },
  odds: {
    teamA: { type: Number, required: true },
    teamB: { type: Number, required: true },
    draw: { type: Number, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

eventSchema.index({ date: 1 });
eventSchema.index({ location: 1 });

export default mongoose.model('Event', eventSchema);