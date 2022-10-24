import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/contoh.txt');
});

test('Test Response', async () => {
  const response = await request(app).get('/');
  expect(response.text).toContain('This is sample text');
});
