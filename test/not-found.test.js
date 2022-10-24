import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello Response`);
});

app.use((req, res, next) => {
  res.status(404).send(`404 Not Found babe!`);
});

test('Test Response', async () => {
  const response = await request(app).get('/');
  expect(response.text).toBe('Hello Response');
});
test('Test Response Not Found', async () => {
  const response = await request(app).get('/test-failed');
  expect(response.text).toBe('404 Not Found babe!');
});
