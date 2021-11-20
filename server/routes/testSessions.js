const express = require('express');
const router = express.Router();
const TestSession = require('../models/TestSession');
const { check, validationResult } = require('express-validator');

// @route    GET api/test-sessions
// @desc     Get test session
// @access   Public
router.get('/:name', async (req, res) => {
  try {
    const testSession = await TestSession.find({experimentName: req.params.name});
    res.json(testSession);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    POST api/test-sessions
// @desc     Create a test session
// @access   Private
router.post(
  '/',
  [
    [
      check('experimentName', 'experimentName field is required').not().isEmpty(),
      check('videos', 'videos field is required').not().isEmpty(),
      check('path', 'path field is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        experimentName,
        videos,
        path,
        currentVideoId
      } = req.body;

      const newTestSession = new TestSession({
        experimentName,
        videos,
        path,
        currentVideoId
      });

      const testSession = await newTestSession.save();

      res.json(testSession);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;