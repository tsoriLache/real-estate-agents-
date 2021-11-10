const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  license_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const Agent = mongoose.model('Agent', AgentSchema);

module.exports = Agent;
