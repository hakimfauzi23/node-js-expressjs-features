import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser("SECRETRAHASIA"));
app.use(express.json());
app.get('/', (req, res) => {
  const name = req.cookies['name'];
  res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
  const name = req.body.name;
  res.cookie('Login', name, { path: '/', signed: true });
  res.send(`Hello ${name}`);
});

test('Test Cookie Read', async () => {
  const response = await request(app)
    .get('/')
    .set('Cookie', 'name=Hakim;author=Cyborg Programmer');
  expect(response.text).toBe('Hello Hakim');
});
test('Test Cookie Write', async () => {
  const response = await request(app)
    .post('/login')
    .send({ name: 'Hakim' })
    .set('Cookie', 'name=Hakim;author=Cyborg Programmer');
  expect(response.get('Set-Cookie').toString()).toContain('Hakim');
  expect(response.text).toBe('Hello Hakim');
});
