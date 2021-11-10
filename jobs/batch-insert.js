const csv = require('csvtojson');
const path = require('path');
const mongoose = require('mongoose');
const Agent = require('../server/models/agent');

require('dotenv').config();

const url = process.env.MONGO_URI;
mongoose
  .connect(url)
  .then(() => {
    console.log('mongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

const csvFilePath = path.resolve('../assets/agents.csv');

csv()
  .fromFile(csvFilePath)
  .then((agents) => {
    const agentCollection = agents
      .map(({ name, license, city }) => {
        return {
          license_id: license.trim(),
          name: name.trim(),
          city: city.trim(),
        };
      })
      .filter((agent) => {
        return agent.city && agent.name && agent.license_id;
      });

    console.log(agentCollection);
    Agent.insertMany(agentCollection)
      .then(function () {
        console.log('Data inserted'); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
  });
