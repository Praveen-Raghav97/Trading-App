import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['buy', 'sell'], required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  result: { type: String, enum: ['win', 'lose', 'pending'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

tradeSchema.index({ userId: 1 });
tradeSchema.index({ eventId: 1 });

export default mongoose.model('Trade', tradeSchema);