const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Post = require('../models/post');
require('dotenv').config();

// ------------- GET routes------------- //

// GET all users
exports.userlist_get = (req, res) => {
  User.find({}, { password: 0 })
    .populate('friends', { firstname: 1, surname: 1, avatar_URL: 1 })
    .sort([['surname', 'descending']])
    .exec((err, allUsers) => {
      if (err) {
        res.json(err);
      }
      // Successful, so send results
      res.json(allUsers);
    });
};

// GET user by id
exports.user_get = (req, res) => {
  User.findById(req.params.id)
    .populate('friends', { firstname: 1, surname: 1, avatar_URL: 1 })
    .sort([['surname', 'descending']])
    .exec((err, user) => {
      if (err) {
        res.json(err);
      }
      if (user) {
        // Successful, so send the response JSON (without the user's hashed password)
        const response = {
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          surname: user.surname,
          middle_names: user.middle_names,
          about_text: user.about_text,
          avatar_URL: user.avatar_URL,
          friends: user.friends,
        };

        res.json(response);
      } else {
        // Unsuccessful, send 404
        res.status(404).send(`User ${req.params.id} not found`);
      }
    });
};

// GET user's posts
exports.user_posts_get = (req, res) => {
  Post.find({ author: req.params.id })
    .populate('likes')
    .sort([['date', 'descending']])
    .exec((err, allPosts) => {
      if (err) {
        res.json(err);
      } // Successful, so send the response JSON (Sends empty array if no posts)
      res.json(allPosts);
    });
};

// GET user's friends
exports.user_friends_get = (req, res) => {
  User.findById(req.params.id)
    .populate('friends', {
      _id: 1,
      firstname: 1,
      surname: 1,
      avatar_URL: 1,
    })
    .exec((err, user) => {
      if (err) {
        res.json(err);
      }
      if (user) {
        // Successful, so send the response JSON
        res.json(user.friends);
      }
      // Unsuccessful, send 404
      res.status(404).send(`User ${req.params.id} not found`);
    });
};

// ------------- POST routes------------- //

// POST new user
exports.user_create = [
  body('username').trim().isLength({ min: 1 }),
  body('firstname').trim().isLength({ min: 1 }),
  body('surname').trim().isLength({ min: 1 }),
  body('email').trim().isEmail().isLength({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    // Data is valid, create the new user and save to database
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        firstname: req.body.firstname,
        surname: req.body.surname,
        middle_names: req.body.middle_names,
        about_text: req.body.about_text,
        avatar_URL: req.body.avatar_URL,
      });
      user.save(() => {
        if (err) return next(err);
        return true;
      });
      // Send response payload containing the created user
      return res.json(user);
    });
    return true;
  },
];
