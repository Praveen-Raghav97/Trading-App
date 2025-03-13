import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

describe('Event Controller', () => {
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

  it('should create a new event', async () => {
    const res = await request(app)
      .post('/api/admin/events')
      .send({
        name: 'Test Event',
        date: '2025-03-15T00:00:00.000Z',
        location: 'Test Location',
        status: 'upcoming',
        odds: 1.5
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Event');
  });

  it('should list all events', async () => {
    const res = await request(app).get('/api/events');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});