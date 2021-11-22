const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
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
  videos: {
    type: [ videoSchema ],
    required: true
  }
});

module.exports = mongoose.model('TestSession', testSessionSchema);