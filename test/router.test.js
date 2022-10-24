import request from 'supertest';
import express from 'express';

const app = express();

const router = express.Router();
router.use((req, res, next) => {
  console.log(`Receive request : ${req.originalUrl}`);
  next();
});

router.get('/feature/a', (req, res) => {
  res.send('feature a');
});

test('Test Router Disabled', async () => {
  let response = await request(app).get('/feature/a');
  expect(response.status).toBe(404);
});

test('Test Router Enabled', async () => {
  app.use(router);
  let response = await request(app).get('/feature/a');
  expect(response.text).toBe('feature a');
});
