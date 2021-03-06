const express = require('express');
const router = express.Router();
const ExperimentResult = require('../models/ExperimentResult');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route    GET api/experiment-results
// @desc     Get all experiment-results
// @access   Public
router.get('/', async (req, res) => {
  try {
    const results = await ExperimentResult.find({}).sort({
      dataset_name: -1
    });
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route    GET api/experiment-results/:name
// @desc     Get experiment result
// @access   Private
router.get('/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const result = await ExperimentResult.findOne({ dataset_name: name });
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route    POST api/experiment-results
// @desc     Create an experiment result
// @access   Private
router.post(
  '/',
  auth,
  [
    [
      check('dataset_name', 'dataset_name: pole jest wymagane').not().isEmpty(),
      check('characteristics', 'characteristics: pole jest wymagane').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let experimentResult = await ExperimentResult.findOne({ dataset_name: req.body.dataset_name });

      if (experimentResult) {
        return res.status(400).json({ msg: 'Eksperyment z podanym dataset_name już istnieje!' });
      }

      const newResult = new ExperimentResult({
        ...req.body
      });

      const result = await newResult.save();

      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  }
);

// @route    POST api/experiment-results/rate/
// @desc     Update an experiment result
// @access   Public
router.post('/rate/',
  [
    [
      check('dataset_name', 'dataset_name: pole jest wymagane').not().isEmpty(),
      check('rating', 'rating: pole jest wymagane').not().isEmpty(),
      check('id', 'id: pole jest wymagane').not().isEmpty(),
      check('subject_id', 'subject_id: pole jest wymagane').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { dataset_name, rating, id, subject_id } = req.body;

    let experimentResult = await ExperimentResult.findOne({ dataset_name });

    if (!experimentResult) return res.status(404).json({ msg: 'Nie znaleziono eksperymentu z podanym dataset_name' });

    try {

      const newScore = {
        id: experimentResult.scores.length + 1,
        timestamp: new Date().toISOString(),
        score: rating,
        pvs_id: id,
        subject_id: subject_id
      };

      experimentResult.scores.push(newScore);

      const newExperimentResult = {
        ...experimentResult
      };

      experimentResult = await ExperimentResult.findOneAndUpdate(
        { dataset_name },
        {
          $set: newExperimentResult
        },
        { new: true }
      );
      res.json(experimentResult);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  });

// @route    POST api/experiment-results/subjects/
// @desc     Update an experiment result
// @access   Public
router.post('/subjects/',
  [
    [
      check('dataset_name', 'dataset_name: pole jest wymagane').not().isEmpty(),
      check('subject', 'subject: pole jest wymagane').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { dataset_name, subject } = req.body;

    let experimentResult = await ExperimentResult.findOne({ dataset_name });

    if (!experimentResult) return res.status(404).json({ msg: 'Nie znaleziono eksperymentu z podanym dataset_name' });

    try {

      const newSubject = {
        id: subject.id,
        characteristics: subject.characteristics
      };

      experimentResult.subjects.push(newSubject);

      const newExperimentResult = {
        ...experimentResult
      };

      experimentResult = await ExperimentResult.findOneAndUpdate(
        { dataset_name },
        {
          $set: newExperimentResult
        },
        { new: true }
      );
      res.json(experimentResult);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  });

// @route    PUT api/experiment-results/:name
// @desc     Update an experiment result
// @access   Public
router.put('/',
  [
    [ check('dataset_name', 'dataset_name: pole jest wymagane').not().isEmpty() ]
  ],
  async (req, res) => {
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
      let result = await ExperimentResult.findOne({ dataset_name });

      if (!result) return res.status(404).json({ msg: 'Nie znaleziono eksperymentu z podanym dataset_name!' });

      result = await ExperimentResult.findOneAndUpdate(
        { dataset_name },
        { $set: resultFields },
        { new: true }
      );
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  });

// @route    DELETE api/experiment-results
// @desc     Delete an experiment result
// @access   Private
router.delete('/',
  auth,
  [
    [
      check('dataset_name', 'dataset_name: pole jest wymagane').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let result = await ExperimentResult.findOne({ dataset_name: req.body.dataset_name });

      if (!result) return res.status(404).json({ msg: 'Nie znaleziono eksperymentu z podanym dataset_name!' });

      await ExperimentResult.findOneAndDelete({ dataset_name: req.body.dataset_name });

      res.json({ msg: 'Usunięto eksperment.' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  });

module.exports = router;