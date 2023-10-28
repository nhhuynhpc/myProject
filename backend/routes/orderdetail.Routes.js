const express = require('express');
const router = express.Router();

const controllerOrderDetail = require('../controllers/ordersDetail.controller')

// orders detail
router.post('/add', controllerOrderDetail.PostAddOrdersDetail)
router.post('/data', controllerOrderDetail.GetDataHistoryProduct)
router.post('/update', controllerOrderDetail.PostUpdateOrderDetail)
router.post('/data-in-order', controllerOrderDetail.GetDataProductInOrder)

module.exports = router;