const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFile')

const controllerProducts = require('../controllers/auth.products.controllers');

// Product
router.get('/', controllerProducts.GetProduct)
router.post('/upload', upload.single('file'), controllerProducts.LoadImgProduct)
router.post('/create', controllerProducts.PostProduct)
router.post('/update', controllerProducts.UpdateProduct)
router.post('/delete', controllerProducts.DeleteProduct)
router.post('/search', controllerProducts.SearchProduct)
router.post('/product-detail', controllerProducts.GetProductDetail)
router.get('/customers-object', controllerProducts.GetCustomerObject)
router.post('/group-products-by-customer', controllerProducts.GetGroupProductByCustomer)

module.exports = router;