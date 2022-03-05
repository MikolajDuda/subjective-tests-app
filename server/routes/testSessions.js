const express = require('express');
const router = express.Router();
const TestSession = require('../models/TestSession');
const ExperimentResult = require('../models/ExperimentResult');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const defaultInstructionalVideoPath = 'data/video/instructions/example_instruction.mp4';

// @route    GET api/test-sessions
// @desc     Get all test-sessions
// @access   Public
router.get('/', async (req, res) => {
  try {
    const testSessions = await TestSession.find({}).sort({
      dataset_name: -1
    });
    res.json(testSessions.map(testSession => testSession.dataset_name));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route    GET api/test-sessions
// @desc     Get test session
// @access   Public
router.get('/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const testSession = await TestSession.findOne({ dataset_name: name });

    if (testSession) {    // if TestSession is defined in the database send the TestSession
      res.json(testSession);
    } else {              // if TestSession is not defined create disposable, random TestSession end send it
      const results = await ExperimentResult.findOne({ dataset_name: name });

      let pvs = results.pvs.map(pvs => ({
          id: pvs.id,
          path: pvs.path
        })
      );

      pvs = shuffle(pvs);

      const randomTestSession = {
        instructional_video_path: 'data/video/instructions/example_instruction.mp4',
        dataset_name: name,
        pvs: pvs
      };
      res.json(randomTestSession);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route    POST api/test-sessions
// @desc     Create new or modify existing test session
// @access   Private
router.post(
  '/',
  auth,
  [
    [
      check('dataset_name', 'dataset_name: pole jest wymagane').not().isEmpty(),
      check('pvs', 'pvs: pole jest wymagane').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let {
        dataset_name,
        pvs,
        instructional_video_path
      } = req.body;

      instructional_video_path = instructional_video_path ?? defaultInstructionalVideoPath;

      let testSession = await TestSession.findOne({ dataset_name });

      if (testSession) {
        testSession = await TestSession.findOneAndUpdate(
          { dataset_name },
          {
            $set: { dataset_name, pvs, instructional_video_path }
          },
          { new: true }
        );

        res.json(testSession);
      } else {
        const newTestSession = new TestSession({
          dataset_name,
          pvs,
          instructional_video_path
        });

        const savedTestSession = await newTestSession.save();

        res.json(savedTestSession);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  }
);

// @route    DELETE api/test-sessions/
// @desc     Delete a test-session
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
      let testSession = await TestSession.findOne({ dataset_name: req.body.dataset_name });

      if (!testSession) return res.status(404).json({ msg: 'Nie znaleziono sesji testowej z podanym dataset_name' });

      await TestSession.findOneAndDelete({ dataset_name: req.body.dataset_name });

      res.json({ msg: 'Usunięto sesję tesową' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  });

function shuffle(array) {     // Durstenfeld shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ array[i], array[j] ] = [ array[j], array[i] ];
  }
  return array;
}

module.exports = router;