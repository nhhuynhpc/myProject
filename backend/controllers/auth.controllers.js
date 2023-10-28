const User = require('../models/user.Model')
const bcrypt = require('bcryptjs')
const userServices = require('../services/user.Service')
const { generateToken } = require('../services/auth.Service')

const GetUser = async (req, res) => {
    let dataUser = await User.findAll()

    return res.status(200).json({
        dataUser: dataUser,
        err: 0
    })
}

const Login = async (req, res) => {
    let dataLogin = {
        email: req.body.email ?? '',
        password: req.body.password ?? '',
    }
    let regexEmail = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let msg = ''
    let user = await User.findOne({where: { email: dataLogin.email }})
    
    if (user === null) {
        msg = 'Tên tài khoản hoặc mật khẩu không chính xác.'
    }

    if (!regexPassword.test(dataLogin.password)) {
        msg = 'Mật khẩu phải tối thiểu tám ký tự, ít nhất một chữ cái và một số'
    }

    if (!regexEmail.test(dataLogin.email)) {
        msg = 'Email không hợp lệ.'
    }

    for (const key in dataLogin) {
        if (!dataLogin[key]) {
            msg = 'Hãy nhập đầy đủ thông tin.'
        }
    }

    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1
        })
    }

        
    let checkPassword = await bcrypt.compareSync(dataLogin.password, user.password)
    if (!checkPassword) {
        msg = 'Tên tài khoản hoặc mật khẩu không chính xác.'
    }
    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1
        })
    }

    let token
    token = generateToken({email: dataLogin.email, password: user.password}).accessToken
    // if (!user.remember_token) {
    //     token = generateToken({email: dataLogin.email, password: user.password}).accessToken
    //     if (dataLogin.saveAccount === '0') {
    //         await User.update({
    //             remember_token: token
    //         }, {
    //             where: {email: dataLogin.email}
    //         })
    //     }
    // }else{
    //     token = user.remember_token
    // }
    return res.status(200).json({
        token: token,
        result: user,
        role: user.role,
        msg: 'Đăng nhập thành công',
        err: 0
    })
}

const Register = async (req, res) => {
    let dataRegister = {
        username: req.body.username ?? '',
        email: req.body.email ?? '',
        password: req.body.password ?? '',
        confirmPassword: req.body.confirmPassword ?? ''
    }
    let regexEmail = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let msg = ''

    if (!req.body.checkRule) {
        msg = 'Bạn phải đồng ý với điều khoản của web'
    }

    if (dataRegister.password !== dataRegister.confirmPassword) {
        msg = 'Mật khẩu nhập lại không khớp.'
    }

    if (!regexPassword.test(dataRegister.password)) {
        msg = 'Mật khẩu phải tối thiểu tám ký tự, ít nhất một chữ cái và một số'
    }

    if (!regexEmail.test(dataRegister.email)) {
        msg = 'Email không hợp lệ.'
    }

    for (const key in dataRegister) {
        if (!dataRegister[key]) {
            msg = 'Hãy nhập đầy đủ thông tin.'
        }
    }

    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1
        })
    }
    
    let checkUser = await User.findOne({where: { email: dataRegister.email }})

    if (checkUser !== null) {
        return res.status(200).json({
            msg: 'Tài khoản đã tồn tại',
            err: 1
        })
    }

    let hashPassword = await userServices.hashPassword(dataRegister.password)
    let token = generateToken({ email: dataRegister.email, password: hashPassword }).accessToken
    dataRegister = { ...dataRegister, password: hashPassword, remember_token: token, role: 'user', email_verified_at: new Date()}
    let createUser = await User.create(dataRegister)

    return res.status(200).json({
        result: createUser,
        msg: 'Tạo Tài khoản thành công',
        err: 0
    })
}

module.exports = {
    GetUser: GetUser,
    Login: Login,
    Register: Register,
}