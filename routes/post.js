const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController');

// ------------- GET routes------------- //

// GET all posts
router.get('/', postController.postlist_get);

// GET post by id
router.get('/:id', postController.post_get);

// ------------- POST routes------------- //

// POST new post
router.post('/', postController.post_create);

// ------------- PATCH routes------------- //

// PATCH comment on post by ID
router.patch('/:id', postController.patch_comment);

// ------------- PUT routes------------- //

// PUT update post by ID
router.put('/:id', (req, res) => res.send('NOT IMPLEMENTED: PUT update post by ID'));

// PUT update comment by ID
router.put('/:id/:comment', (req, res) => res.send('NOT IMPLEMENTED: PUT update comment by ID'));

// ------------- DELETE routes------------- //

// DELETE remove post by ID
router.delete('/:id', (req, res) => res.send('NOT IMPLEMENTED: DELETE post by ID'));

// DELETE comment by ID
router.put('/:id/:comment', (req, res) => res.send('NOT IMPLEMENTED: DELETE comment by ID'));

module.exports = router;
