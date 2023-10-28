const express = require('express');
const router = express.Router();

const controllerTitle = require('../controllers/title.controllers')

// Title
router.get('/', controllerTitle.GetTitle)

module.exports = router;