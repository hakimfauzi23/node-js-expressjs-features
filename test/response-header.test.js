import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.set({
    'X-Powered-By': 'Cyborg WannaBe',
    'X-Author': 'Hakim',
  });
  res.send(`Hello Response`);
});

test('Test Header Response', async () => {
  const response = await request(app).get('/');
  expect(response.text).toBe('Hello Response');
  expect(response.get("X-Powered-By")).toBe("Cyborg WannaBe");
  expect(response.get("X-Author")).toBe("Hakim");

});
