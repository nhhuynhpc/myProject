const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/auth.controllers');

const { authenToken } = require('../middlewares/authentication')

router.get('/user-detail', authenToken, controllerUser.GetUser)
router.post('/register', controllerUser.Register)
router.post('/login', controllerUser.Login)

module.exports = router;