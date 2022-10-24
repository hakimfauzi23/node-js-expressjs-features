import request from 'supertest';
import express from 'express';

const app = express();

app.get('/products/:id', (req, res) => {
  const idProduct = req.params.id;
  res.send(`Product: ${idProduct}`);
});

app.get('/categories/:id(\\d+)', (req, res) => {
  const idCategory = req.params.id;
  res.send(`Category: ${idCategory}`);
});

test('Test Route Parameter', async () => {
  let response = await request(app).get('/products/hanif');
  expect(response.text).toBe('Product: hanif');

  response = await request(app).get('/products/salah');
  expect(response.text).toBe('Product: salah');

  response = await request(app).get('/categories/1234');
  expect(response.text).toBe('Category: 1234');

  response = await request(app).get('/categories/salah');
  expect(response.status).toBe(404);
});
