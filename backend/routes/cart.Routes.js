const express = require('express');
const router = express.Router();

const controllerCart = require('../controllers/carts.controllers')

// carts
router.post('/', controllerCart.PostCarts)
router.post('/get-product', controllerCart.GetProductInCart)

module.exports = router;