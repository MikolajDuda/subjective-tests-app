const mongoose = require('mongoose');

const pvsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

const testSessionSchema = new mongoose.Schema({
  dataset_name: {
    type: String,
    required: true
  },
  pvs: {
    type: [ pvsSchema ],
    required: true
  }
});

module.exports = mongoose.model('TestSession', testSessionSchema);