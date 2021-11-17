const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const ExperimentResult = require('../models/ExperimentResult');

// @route    GET api/experiment-results
// @desc     Get all experiment-results
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const results = await ExperimentResult.find({}).sort({
      dataset_name: -1
    });
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/experiment-results
// @desc     Create an experiment result
// @access   Private
router.post(
  '/',
  [
    [
      check('dataset_name', 'dataset_name field is required').not().isEmpty(),
      check('characteristics', 'characteristics field is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newResult = new ExperimentResult({
        ...req.body
      });

      const result = await newResult.save();

      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/experiment-results/:id
// @desc     Update an experiment result
// @access   Public
router.put('/:id', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    dataset_name,
    sujson_version,
    characteristics,
    tasks,
    scales,
    questions,
    src,
    hrc,
    pvs,
    subjects,
    trials,
    scores
  } = req.body;

  // Build experimentResult object
  const resultFields = {};
  if (dataset_name) resultFields.dataset_name = dataset_name;
  if (sujson_version) resultFields.sujson_version = sujson_version;
  if (characteristics) resultFields.characteristics = characteristics;
  if (tasks) resultFields.tasks = tasks;
  if (scales) resultFields.scales = scales;
  if (questions) resultFields.questions = questions;
  if (src) resultFields.src = src;
  if (hrc) resultFields.hrc = hrc;
  if (pvs) resultFields.pvs = pvs;
  if (subjects) resultFields.subjects = subjects;
  if (trials) resultFields.trials = trials;
  if (scores) resultFields.scores = scores;

  try {
    let result = await ExperimentResult.findById(req.params.id);

    if (!result) return res.status(404).json({ msg: 'ExperimentResult not found' });

    result = await ExperimentResult.findByIdAndUpdate(
      req.params.id,
      { $set: resultFields },
      { new: true }
    );

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/experiment-results/:id
// @desc     Delete an experiment result
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await ExperimentResult.findById(req.params.id);

    if (!result) return res.status(404).json({ msg: 'ExperimentResult not found' });

    await ExperimentResult.findByIdAndRemove(req.params.id);

    res.json({ msg: 'ExperimentResult removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;