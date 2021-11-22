const express = require('express');
const router = express.Router();
const TestSession = require('../models/TestSession');
const { check, validationResult } = require('express-validator');
const ExperimentResult = require('../models/ExperimentResult');
const auth = require('../middleware/auth');

// @route    GET api/test-sessions
// @desc     Get test session
// @access   Public
router.get('/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const testSession = await TestSession.findOne({ dataset_name: name });

    if (testSession) {    // if testSession is defined in the database send the testSession
      res.json(testSession);
    } else {              // is testSession is not defined create disposable, random testSession end send it
      const results = await ExperimentResult.findOne({ dataset_name: name });

      let pvs = results.pvs.map(pvs => ({
          id: pvs.id,
          path: pvs.path
        })
      );

      pvs = shuffle(pvs);

      const randomTestSession = {
        dataset_name: name,
        pvs: pvs
      };
      res.json(randomTestSession);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
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
      check('dataset_name', 'dataset_name field is required').not().isEmpty(),
      check('pvs', 'pvs field is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        dataset_name,
        pvs
      } = req.body;

      let testSession = await TestSession.findOne({ dataset_name });

      if (testSession) {
        testSession = await TestSession.findOneAndUpdate(
          { dataset_name },
          {
            $set: { dataset_name, pvs }
          },
          { new: true }
        );

        res.json(testSession);
      } else {
        const newTestSession = new TestSession({
          dataset_name,
          pvs,
        });

        const savedTestSession = await newTestSession.save();

        res.json(savedTestSession);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

function shuffle(array) {     // Durstenfeld shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ array[i], array[j] ] = [ array[j], array[i] ];
  }
  return array;
}

module.exports = router;