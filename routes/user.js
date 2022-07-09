const express = require('express');

const router = express.Router();

// -------------GET routes------------- //

// Index
router.get('/', (req, res) => {
  res.send('User index');
});

// GET a user by id
router.get('/:id', (req, res) => {
  res.send(`NOT IMPLEMENTED: Find user ${req.params.id}`);
});

module.exports = router;
