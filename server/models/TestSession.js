const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  }
});

const testSessionSchema = new mongoose.Schema({
  experimentName: {
    type: String,
    required: true
  },
  videos: {
    type: [ videoSchema ],
    required: true
  },
  path: {
    type: String,
    required: true
  },
  currentVideoId: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('testSession', testSessionSchema);