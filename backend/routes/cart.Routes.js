const express = require('express');
const router = express.Router();

const controllerCart = require('../controllers/carts.controllers')

const { authenToken } = require('../middlewares/authentication')

// carts
router.post('/',authenToken, controllerCart.PostCarts)
router.post('/get-product', authenToken, controllerCart.GetProductInCart)

module.exports = router;