import request from 'supertest';
import express, { query } from 'express';

const logger = (req, res, next) => {
  console.log(`Receive request: ${req.method} ${req.originalUrl}`);
  next();
};

const addPoweredHeader = (req, res, next) => {
  res.set('X-Powered-By', 'Cyborg Programmer');
  next();
};

const apiKeyMiddleware = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
  }
};

const requestTimeMiddleware = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();
app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);

app.get('/', (req, res) => {
  res.send(`Hello Response`);
});
app.get('/hakim', (req, res) => {
  res.send(`Hello Hakim`);
});
app.get('/time', (req, res) => {
  res.send(`Hello, Today is ${req.requestTime}`);
});

test('Test Response Middleware', async () => {
  const response = await request(app).get('/').query({ apiKey: '123' });
  expect(response.get('X-Powered-By')).toBe('Cyborg Programmer');
  expect(response.text).toBe('Hello Response');
});

test('Test Response Middleware 2', async () => {
  const response = await request(app).get('/hakim').query({ apiKey: '123' });
  expect(response.get('X-Powered-By')).toBe('Cyborg Programmer');
  expect(response.text).toBe('Hello Hakim');
});

test('Test Response Unathorized ', async () => {
  const response = await request(app).get('/hakim');
  expect(response.status).toBe(401);
});

test('Test Response Time', async () => {
  const response = await request(app).get('/time').query({ apiKey: '123' });
  expect(response.get('X-Powered-By')).toBe('Cyborg Programmer');
  expect(response.text).toContain('Hello, Today is');
});
