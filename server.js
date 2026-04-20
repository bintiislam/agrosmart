const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/test', (req, res) => {
  res.json({ message: 'AgroSmart server is running!' });
});


app.post('/api/recommend', (req, res) => {
  const { soil, season, temperature, rainfall } = req.body;

  let crop = 'Rice';

  if (season === 'rainy' && (soil === 'clay' || soil === 'loamy' || soil === 'clay-loamy')) {
    crop = 'Rice';
  } else if (season === 'winter' && (soil === 'loamy' || soil === 'sandy')) {
    crop = 'Wheat';
  } else if (season === 'summer' && soil === 'sandy') {
    crop = 'Tomato';
  } else if (season === 'summer' && soil === 'loamy') {
    crop = 'Maize';
  } else if (season === 'winter' && soil === 'clay') {
    crop = 'Potato';
  }

  res.json({ recommendedCrop: crop });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('AgroSmart server running at http://localhost:' + PORT);
});