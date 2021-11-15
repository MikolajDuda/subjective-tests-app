const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  wasItOpened: {
    type: Boolean,
    default: false
  },
})

const testSessionSchema = new mongoose.Schema({
  files: [fileSchema],
  currentlyOpenFileId: Number
});

module.exports = mongoose.model('testSession', testSessionSchema);