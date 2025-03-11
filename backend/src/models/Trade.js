import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  amount: Number,
  type: { type: String, enum: ['buy', 'sell'] },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

tradeSchema.index({ userId: 1 });
tradeSchema.index({ eventId: 1 });

export default mongoose.model('Trade', tradeSchema);