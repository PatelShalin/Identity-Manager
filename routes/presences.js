const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const Presence = require('../models/Presence');

router = express.Router();

// @route   GET api/presences
// @desc    Get all users presences
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const presences = await Presence.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(presences);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/presences
// @desc    Add new Presence
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('username', 'Please enter a Name')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { address, username, email, password, type } = req.body;

    try {
      const newPresence = new Presence({
        user: req.user.id,
        address,
        username,
        email,
        password,
        type
      });

      const presence = await newPresence.save();

      res.json(presence);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/presences/:id
// @desc    Update Presence
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { address, username, email, password, type } = req.body;

  const presenceFields = {};
  if (address) presenceFields.address = address;
  if (username) presenceFields.username = username;
  if (email) presenceFields.email = email;
  if (password) presenceFields.password = password;
  if (type) presenceFields.type = type;

  try {
    let presence = await Presence.findById(req.params.id);

    if (!presence) return res.status(404).json({ msg: 'Presence Not Found' });

    if (presence.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    presence = await Presence.findByIdAndUpdate(
      req.params.id,
      {
        $set: presenceFields
      },
      { new: true }
    );

    res.json(presence);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/presences/:id
// @desc    Delete Presence
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let presence = await Presence.findById(req.params.id);

    if (!presence) return res.status(404).json({ msg: 'Presence Not Found' });

    if (presence.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Presence.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Presence Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
