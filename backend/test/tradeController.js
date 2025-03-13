import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

describe('Trade Controller', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
  });

  it('should place a new trade', async () => {
    const res = await request(app)
      .post('/api/trades')
      .send({
        eventId: 'event_id',
        amount: 100,
        type: 'buy'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('amount', 100);
  });

  it('should list all trades for the authenticated user', async () => {
    const res = await request(app).get('/api/trades');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});