const express = require('express');

const router = express.Router();

// Custom middleware to check auth status
router.use((req, res, next) => {
  // Without this, user is prevented from logging in
  if (req.path.includes('/auth/')) {
    return next();
  }
  if (!req.user) return res.sendStatus(401);
  return next();
});

// ------------- GET routes------------- //

// GET all posts
router.get('/', (req, res) => res.send('NOT IMPLEMENTED: GET all posts'));

module.exports = router;
