const express = require('express');

const router = express.Router();

// ------------- GET routes------------- //

// GET all posts
router.get('/', (req, res) => res.send('NOT IMPLEMENTED: GET all posts'));

// GET post by id
router.get('/:id', (req, res) => res.send('NOT IMPLEMENTED: GET post by ID'));

// ------------- POST routes------------- //

// POST new post
router.post('/', (req, res) => res.send('NOT IMPLEMENTED: POST new post'));

// POST comment on post by ID
router.post('/:id', (req, res) => res.send('NOT IMPLEMENTED: POST new comment'));

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
