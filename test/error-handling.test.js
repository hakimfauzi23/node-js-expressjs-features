import request from 'supertest';
import express from 'express';

const app = express();
const errorMiddleware = (err, req, res, next) => {
  res.status(500).send(`Terjadi Error: ${err.message}`);
};

app.get('/', (req, res) => {
  throw new Error('Ups');
});
app.use(errorMiddleware);

test('Test Error Handling Middleware', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(500);
  expect(response.text).toBe('Terjadi Error: Ups');
});
