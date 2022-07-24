const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers/userController');

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

// Passport auth using facebook
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.send(`login success, ${req.user.firstname}`);
    // Successful authentication, redirect home
  },
);

// GET Logout current user with passport
router.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) res.send(err);
    res.send('You have been logged out');
  });
});

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
router.delete('/:id/friends/:friend', userController.remove_friends);

module.exports = router;
