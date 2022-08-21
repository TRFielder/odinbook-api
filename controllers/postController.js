const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
require('dotenv').config();

// ------------- GET routes------------- //

// GET all posts
exports.postlist_get = (req, res) => {
  Post.find({})
    .populate('author', {
      _id: 1,
      firstname: 1,
      surname: 1,
      avatar_URL: 1,
    })
    .populate('comments')
    .populate('likes')
    .sort([['date', 'descending']])
    .exec((err, allPosts) => {
      if (err) {
        res.json(err);
      }
      // Successful, so send results
      res.json(allPosts);
    });
};

// GET post by id
exports.post_get = (req, res) => {
  Post.findById(req.params.id)
    .populate('author', {
      _id: 1,
      firstname: 1,
      surname: 1,
      avatar_URL: 1,
    })
    .populate('comments')
    .populate('likes')
    .sort([['date', 'descending']])
    .exec((err, post) => {
      if (err) {
        res.status(400).send(err.message);
      } else if (post) {
        // Successful, so send the response JSON
        res.json(post);
      } else {
        // Unsuccessful, send 404
        res.status(404).json({ message: `Post ${req.params.id} not found` });
      }
    });
};

// ------------- POST routes------------- //

// POST new post
exports.post_create = [
  body('text').trim().isLength({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    // Data is valid, create the new user and save to database
    const post = new Post({
      author: req.user.id,
      text: req.body.text,
    });
    post.save((saveErr) => {
      if (saveErr) return next(saveErr);
      // Send response payload containing the created user
      return res.json(post);
    });
    return true;
  },
];

// ------------- PATCH routes------------- //

// PATCH comment on post by ID
exports.patch_comment = [
  body('text').trim().isLength({ min: 1 }),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const comment = new Comment({
      author: req.user.id,
      owningPost: req.params.id,
      text: req.body.text,
    });
    // Comment is valid, add it to the comments array and save it to the database
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: comment },
      },
      {},
      (pushError) => {
        if (pushError) {
          res.send(`Error: ${pushError}`);
        }
        res.json(comment);
      },
    );
    return true;
  },
];
