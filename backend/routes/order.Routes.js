const express = require('express');
const router = express.Router();

const controllerOrder = require('../controllers/orders.controllers')

// orders
router.post('/add', controllerOrder.PostAddOrders)
router.post('/get-data-by-user-id', controllerOrder.GetOrdersByUserId)
router.post('/get-data-by-id', controllerOrder.GetOrderById)
router.get('/all-data', controllerOrder.GetOrdersAll)
router.post('/update', controllerOrder.PostUpdateOrder)
router.post('/cancel-order', controllerOrder.PostCancelOrder)

module.exports = router;