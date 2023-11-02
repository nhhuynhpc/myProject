const express = require('express');
const router = express.Router();

const { authenToken } = require('../middlewares/authentication')

const controllerCartDetail = require('../controllers/cartsDetail.controllers')

// carts detail
router.post('/add', authenToken, controllerCartDetail.PostAddCartDetail)
router.post('/update', authenToken, controllerCartDetail.PostUpdateCartDetail)
router.post('/delete', authenToken, controllerCartDetail.DeleteProdcutCart)

module.exports = router;