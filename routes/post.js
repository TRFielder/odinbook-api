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

module.exports = router;
