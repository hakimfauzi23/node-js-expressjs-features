import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/hakim', (req, res) => {
  res.send('Hello Hakim');
});

app.listen(4000, () => {
  console.log(`Server started on port 4000`);
});
