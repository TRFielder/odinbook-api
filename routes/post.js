const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController');

// ------------- GET routes------------- //

// GET all posts
router.get('/', postController.postlist_get);

// GET post by id
router.get('/:id', postController.post_get);

// GET current user

// ------------- POST routes------------- //

// POST new post
router.post('/', (req, res) => res.send('NOT IMPLEMENTED: POST new post'));

// ------------- PATCH routes------------- //

// PATCH comment on post by ID
router.patch('/:id', (req, res) => res.send('NOT IMPLEMENTED: PATCH new comment'));

// ------------- PUT routes------------- //

// PUT update post by ID
router.put('/:id', (req, res) => res.send(req.user));

// PUT update comment by ID
router.put('/:id/:comment', (req, res) => res.send('NOT IMPLEMENTED: PUT update comment by ID'));

// ------------- DELETE routes------------- //

// DELETE remove post by ID
router.delete('/:id', (req, res) => res.send('NOT IMPLEMENTED: DELETE post by ID'));

// DELETE comment by ID
router.put('/:id/:comment', (req, res) => res.send('NOT IMPLEMENTED: DELETE comment by ID'));

module.exports = router;
