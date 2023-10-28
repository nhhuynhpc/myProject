const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFile')

const controllerCate = require('../controllers/auth.categories.controllers');

// categories
router.get('/', controllerCate.GetCategories)
router.post('/upload', upload.single('file'), controllerCate.LoadImgCategories)
router.get('/categories-and-detail', controllerCate.GetCategoriesAndDetail);
router.get('/categories-detail', controllerCate.GetCategoriesDetails)
router.post('/categories-detail', controllerCate.PostCategoriesDetail);
router.post('/categories-detail/update', controllerCate.PostUpdateCateDetail);
router.post('/categories-detail/delete', controllerCate.PostDeleteCateDetail);

router.post('/detail-with-slug', controllerCate.FetchCateDetailWithSlug)

module.exports = router;