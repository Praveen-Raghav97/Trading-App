import mongoose from 'mongoose';

const marketDataSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  odds: { type: Number, required: true },
  market: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

marketDataSchema.index({ eventId: 1 });
marketDataSchema.index({ market: 1 });

export default mongoose.model('MarketData', marketDataSchema);