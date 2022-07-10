const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

// ------------- GET routes------------- //

// GET all users
router.get('/', userController.userlist_get);

// GET user by id
router.get('/:id', (req, res) => {
  res.send(`NOT IMPLEMENTED: Find user ${req.params.id}`);
});

// GET user's posts
router.get('/:id/posts', (req, res) => {
  res.send(`NOT IMPLEMENTED: Get posts for user ${req.params.id}`);
});

// GET user's friends
router.get('/:id/friends', (req, res) => {
  res.send(`NOT IMPLEMENTED: Get friends for user ${req.params.id}`);
});

// ------------- POST routes------------- //

// POST new user
router.post('/', (req, res) => {
  res.send('NOT IMPLEMENTED: Create new user');
});

// ------------- PUT routes------------- //

// PUT update user details
router.put('/:id', (req, res) => {
  res.send(`NOT IMPLEMENTED: Update user ${req.params.id}`);
});

// PUT update user friends
router.put('/:id/friends', (req, res) => {
  res.send(`NOT IMPLEMENTED: Update friends for user ${req.params.id}`);
});

module.exports = router;
