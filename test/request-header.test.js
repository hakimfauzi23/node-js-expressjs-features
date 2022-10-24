import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  const type = req.get('accept');
  res.send(`Hello ${type}`);
});

test('Test ExpressJS', async () => {
  const response = await request(app).get('/').set('Accept', 'text/plain');
  expect(response.text).toBe('Hello text/plain');
});
