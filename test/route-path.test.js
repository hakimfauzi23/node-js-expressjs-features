import request from 'supertest';
import express from 'express';

const app = express();

app.get('/products/*.json', (req, res) => {
  res.send(req.originalUrl);
});

app.get('/categories/*(\\d+).json', (req, res) => {
  res.send(req.originalUrl);
});

test('Test Route Path', async () => {
  let response = await request(app).get('/products/hanif.json');
  expect(response.text).toBe('/products/hanif.json');

  response = await request(app).get('/products/salah.json');
  expect(response.text).toBe('/products/salah.json');

  response = await request(app).get('/categories/1234.json');
  expect(response.text).toBe('/categories/1234.json');

  response = await request(app).get('/categories/salah.json');
  expect(response.status).toBe(404);
});
