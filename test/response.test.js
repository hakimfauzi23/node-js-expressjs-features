import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello Response`);
});

test('Test Response', async () => {
  const response = await request(app).get('/');
  expect(response.text).toBe('Hello Response');
});
