const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Agent = require('../server/models/agent');

const url = process.env.MONGO_URI;
mongoose
  .connect(url)
  .then(() => {
    console.log('mongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.get('/cities', function (req, res) {
  Agent.find({})
    .distinct('city') // distinct values
    .then((cities) => {
      res.json(cities);
    });
});

app.get('/agents/:city', function (req, res) {
  Agent.find({ city: req.params.city }).then((agents) => {
    res.json(agents);
  });
});

app.put('/agent/:id/edit/:city', function (req, res) {
  const city = req.params.city;
  Agent.findOneAndUpdate({ _id: req.params.id }, { city: city }).then(
    (agent, city) => {
      res.json(`${agent.name} city updated to ${city}`);
    }
  );
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
