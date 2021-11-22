const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true
  },
  end: String
});

const environmentSchema = new mongoose.Schema({
  software: {
    type: String,
    default: 'tester-app'
  }
});

const characteristicsSchema = new mongoose.Schema({
  pixel_format: String,
  width: Number,
  height: Number,
  length: Number,
  rating_order_known: Boolean,
  per_subject_data: Boolean,
  src_dir: String,
  pvs_dir: String,
  laboratory: {
    type: String,
    required: true
  },
  date: dateSchema,
  environment: environmentSchema,
  pre_experiment_questions: [ String ],
  post_experiment_questions: [ String ],
  with_sound: Boolean,
  description: {
    type: String,
    required: true
  }
});

const taskSchema = new mongoose.Schema({
  id: Number,
  task: String
});

const rangeSchema = new mongoose.Schema({
  min: Number,
  max: Number
});

const scaleSchema = new mongoose.Schema({
  id: Number,
  name: String,
  type: String,
  description: String,
  range: rangeSchema,
  labels: Object,
  characteristics: Object
});

const questionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  scale_id: Number,
  characteristics: Object
});

const srcSchema = new mongoose.Schema({
  id: Number,
  name: String,
  path: String,
  characteristics: Object
});

const hrcSchema = new mongoose.Schema({
  id: Number,
  characteristics: Object
});

const pvsSchema = new mongoose.Schema({
  id: Number,
  hrc_id: Number,
  src_id: Number,
  path: String                                        // TODO: Stąd będą brane path do plików wideo
});

const subjectSchema = new mongoose.Schema({
  id: Number,
  characteristics: Object
});

const trialSchema = new mongoose.Schema({
  id: Number,
  subject_id: Number,
  task_id: Number,
  session_num: Number,
  order_num: Number,
  pvs_id: [ Number ],
  score_id: [ Number ],
});

const scoreSchema = new mongoose.Schema({
  id: Number,
  question_id: Number,
  timestamp: String,
  score: Number,
  pvs_id: mongoose.Schema.Types.Mixed
});

const experimentResultSchema = new mongoose.Schema({
  dataset_name: {
    type: String,
    required: true,
    unique: true
  },
  sujson_version: {
    type: String,
    default: "1.1.1"
  },
  characteristics: {
    type: characteristicsSchema,
    required: true
  },
  tasks: [ taskSchema ],
  scales: [ scaleSchema ],
  questions: [ questionSchema ],
  src: [ srcSchema ],
  hrc: [ hrcSchema ],
  pvs: [ pvsSchema ],
  subjects: [ subjectSchema ],
  trials: [ trialSchema ],
  scores: [ scoreSchema ]
});

module.exports = mongoose.model('experimentResult', experimentResultSchema);