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
  User.findById(req.params.id, { password: 0 })
    .populate('friends', { firstname: 1, surname: 1, avatar_URL: 1 })
    .sort([['surname', 'descending']])
    .exec((err, user) => {
      if (err) {
        res.json(err);
      }
      if (user) {
        // Successful, so send the response JSON (without the user's hashed password)

        res.json(user);
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
    bcrypt.hash(req.body.password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        return next(hashErr);
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

      User.findOne({ username: req.body.username }).exec(
        (findErr, foundUser) => {
          if (findErr) {
            return next(findErr);
          }
          if (foundUser) {
            return res.send('User with this username already exists');
          }
          user.save((saveErr) => {
            if (saveErr) return next(saveErr);
            // Send response payload containing the created user
            return res.json(user);
          });
          return true;
        },
      );
      return true;
    });
    return true;
  },
];

// ------------- PUT routes------------- //

// PUT update user details
exports.update_details = [
  body('firstname').trim().isLength({ min: 1 }),
  body('surname').trim().isLength({ min: 1 }),
  body('email').trim().isEmail().isLength({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    // Data is valid, create an updated user object and save to database
    User.findByIdAndUpdate(
      req.params.id,
      {
        email: req.body.email,
        firstname: req.body.firstname,
        surname: req.body.surname,
        middle_names: req.body.middle_names,
        about_text: req.body.about_text,
        avatar_URL: req.body.avatar_URL,
      },
      (err) => {
        if (err) {
          return next(err);
        }
        return res.send(`Updated user with ID: ${req.params.id}`);
      },
    );
    return true;
  },
];

// PUT Add friend
exports.add_friends = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { friends: req.params.friend },
    },
    (err) => {
      if (err) {
        return next(err);
      }
      return res.send(
        `Added user ${req.params.friend} as a friend of user ${req.params.id}`,
      );
    },
  );
};

// ------------- DELETE routes------------- //

// DELETE remove user friends
exports.remove_friends = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { friends: req.params.friend },
    },
    (err) => {
      if (err) {
        return next(err);
      }
      return res.send(
        `Removed user ${req.params.friend} as a friend of user ${req.params.id}`,
      );
    },
  );
};
