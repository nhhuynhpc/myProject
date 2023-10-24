const express = require('express');
const router = express.Router();

const controllerCate = require('../controllers/auth.categories.controllers');
const controllerProducts = require('../controllers/auth.products.controllers');
const controllerUser = require('../controllers/user.controllers');
const controllerCart = require('../controllers/carts.controllers')
const controllerCartDetail = require('../controllers/cartsDetail.controllers')
const controllerTitle = require('../controllers/title.controllers')
const controllerSearch = require('../controllers/search.controllers')

const { authenToken } = require('../middlewares/authentication')

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// user

router.get('/user-detail', authenToken, controllerUser.getUser)
router.post('/register', controllerUser.register)
router.post('/login', controllerUser.login)

// categories
router.post('/categories/upload', upload.single('file'), controllerCate.loadimg)
router.get('/categories', controllerCate.GetCategories)
router.get('/categories-and-detail', controllerCate.GetCategoriesAndDetail);
router.get('/categories-detail', controllerCate.GetCategoriesDetails)
router.post('/categories-detail', controllerCate.PostCategoriesDetail);
router.post('/categories-detail/update', controllerCate.PostUpdateCateDetail);
router.post('/categories-detail/delete', controllerCate.PostDeleteCateDetail);

router.post('/categories/detail-with-slug', controllerCate.FetchCateDetailWithSlug)

// Product
router.post('/upload', upload.single('file'), controllerProducts.loadimg)
router.post('/product/create', controllerProducts.postProduct)
router.get('/product', controllerProducts.getProduct)
router.post('/product/update', controllerProducts.updateProduct)
router.post('/product/delete', controllerProducts.deleteProduct)
router.post('/product/search', controllerProducts.searchProduct)
router.post('/product/product-detail', controllerProducts.getProductDetail)
router.get('/customers-object', controllerProducts.getCustomerObject)
router.post('/product/group-products-by-customer', controllerProducts.getGroupProductByCustomer)

// carts
router.post('/cart', controllerCart.postCarts)
router.post('/cart/get-product', controllerCart.getProductInCart)

// carts detail
router.post('/cart-detail', controllerCartDetail.postCartDetail)
router.post('/cart-detail/delete', controllerCartDetail.deleteProdcutCart)

// Title
router.get('/title', controllerTitle.GetTitle)

// Search
router.post('/search', controllerSearch.SearchProduct)

module.exports = router;