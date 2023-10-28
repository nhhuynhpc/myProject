const express = require('express');
const router = express.Router();

const controllerCartDetail = require('../controllers/cartsDetail.controllers')

// carts detail
router.post('/add', controllerCartDetail.PostAddCartDetail)
router.post('/update', controllerCartDetail.PostUpdateCartDetail)
router.post('/delete', controllerCartDetail.DeleteProdcutCart)

module.exports = router;