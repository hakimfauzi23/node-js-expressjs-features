import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});

test('Test qurty param', async () => {
  const response = await request(app)
    .get('/')
    .query({ firstName: 'Hanif', lastName: 'Hakim' });
  expect(response.text).toBe('Hello Hanif Hakim');
});
