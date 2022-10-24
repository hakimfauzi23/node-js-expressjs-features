import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

test('Test ExpressJS', async () => {
  const response = await request(app).get('/').query({ name: 'World' });
  expect(response.text).toBe('Hello World');
});
