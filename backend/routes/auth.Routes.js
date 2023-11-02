const express = require('express');

const router = express.Router();

const controllerUser = require('../controllers/auth.controllers');

const { authenToken } = require('../middlewares/authentication')

router.post('/data', authenToken, controllerUser.GetUser)
router.post('/user-detail', authenToken, controllerUser.GetUserById)
router.post('/register', controllerUser.Register)
router.post('/login', controllerUser.Login)
router.post('/update', authenToken, controllerUser.PostUpdateUser)
router.post('/delete', authenToken, controllerUser.PostDeleteUser)
router.post('/update-by-id', authenToken, controllerUser.PostUpdateDataUserById)
router.post('/update-password-by-id', authenToken, controllerUser.PostUpdateDataPasswordById)

module.exports = router;