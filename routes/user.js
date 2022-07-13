const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

// ------------- GET routes------------- //

// GET all users
router.get('/', userController.userlist_get);

// GET user by id
router.get('/:id', userController.user_get);

// GET user's posts
router.get('/:id/posts', userController.user_posts_get);

// GET user's friends
router.get('/:id/friends', userController.user_friends_get);

// ------------- POST routes------------- //

// POST new user
router.post('/', userController.user_create);

// ------------- PUT routes------------- //

// PUT update user details
router.put('/:id', userController.update_details);

// PUT Add friend
router.put('/:id/friends/:friend', userController.add_friends);

// ------------- DELETE routes------------- //

// DELETE remove user friends
router.put('/:id/friends/:friend', userController.remove_friends);

module.exports = router;
