const express = require('express');
const router = express.Router();

router.use('/fonts', require('./fonts'));
router.use('/fields', require('./fields'));
router.use('/domains', require('./domains'));
router.use('/screenshots', require('./screenshots'));

module.exports = router;
