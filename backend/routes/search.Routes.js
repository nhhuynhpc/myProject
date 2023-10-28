const express = require('express');
const router = express.Router();

const controllerSearch = require('../controllers/search.controllers')

// Search
router.post('/', controllerSearch.SearchProduct)

module.exports = router;