const express = require('express');
const router = express.Router();

// @route GET api/posts/test
// @desc  Tests posts route
// @access  Public
router.get('/test', (req, res) => res.send({ msg: 'Posts routes works' }));

module.exports = router;
