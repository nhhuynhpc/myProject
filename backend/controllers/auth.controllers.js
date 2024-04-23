const sequelize = require('../database/connection');
require('dotenv').config();
var slugify = require('slugify');
const bcrypt = require('bcryptjs');
const userServices = require('../services/user.Service');
const { generateToken } = require('../services/auth.Service');
const User = require('../models/user.Model');
const Contact = require('../models/contact.Model');

const GetUser = async (req, res) => {
    let dataUser = [];
    if (req.body.role !== 'admin') {
        return res.status(200).json({
            msg: 'Bạn không đủ quyền!!!',
            err: 0,
        });
    }
    const [result, metadata] = await sequelize.query(
        `SELECT users.id, users.email, users.password, users.role,
         users.remember_token, users.email_verified_at, users.status, users.deleted_at, contacts.name, 
         contacts.date_of_birth, contacts.phone, contacts.address
         FROM users 
         INNER JOIN contacts 
         ON users.id = contacts.user_id`
    );

    dataUser = result.filter((item) => item.deleted_at === null);

    return res.status(200).json({
        dataUser: dataUser,
        err: 0,
    });
};

const PostUpdateUser = async (req, res) => {
    let dataUpdate = {
        role: req.body.role,
        status: req.body.status,
    };
    let error = '';

    await User.update(dataUpdate, { where: { id: req.body.id } }).catch(
        (err) => (error = err)
    );

    if (error) {
        return res.status(200).json({
            msg: error,
            err: 1,
        });
    }

    return res.status(200).json({
        msg: 'success',
        err: 0,
    });
};

const GetUserById = async (req, res) => {
    const [result, metadata] = await sequelize.query(
        `SELECT users.id, users.email, users.password, users.role,
         users.remember_token, users.email_verified_at, users.status, users.deleted_at, contacts.name, 
         contacts.date_of_birth, contacts.phone, contacts.address
         FROM users 
         INNER JOIN contacts 
         ON users.id = contacts.user_id
         Where users.id = '${req.body.id}'`
    );

    return res.status(200).json({
        dataUser: result[0],
        err: 0,
    });
};

const Login = async (req, res) => {
    let dataLogin = {
        email: req.body.email ?? '',
        password: req.body.password ?? '',
    };
    let regexEmail =
        /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let msg = '';
    let user = await User.findOne({ where: { email: dataLogin.email } });

    if (user === null) {
        msg = 'Tên tài khoản hoặc mật khẩu không chính xác.';
    }

    if (!regexPassword.test(dataLogin.password)) {
        msg =
            'Mật khẩu phải tối thiểu tám ký tự, ít nhất một chữ cái và một số';
    }

    if (!regexEmail.test(dataLogin.email)) {
        msg = 'Email không hợp lệ.';
    }

    for (const key in dataLogin) {
        if (!dataLogin[key]) {
            msg = 'Hãy nhập đầy đủ thông tin.';
        }
    }

    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1,
        });
    }

    let checkPassword = await bcrypt.compareSync(
        dataLogin.password,
        user.password
    );
    if (!checkPassword) {
        msg = 'Tên tài khoản hoặc mật khẩu không chính xác.';
    }
    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1,
        });
    }

    let token;
    token = generateToken({
        email: dataLogin.email,
        password: user.password,
    }).accessToken;
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
        err: 0,
    });
};

const Register = async (req, res) => {
    let dataRegister = {
        email: req.body.email ?? '',
        password: req.body.password ?? '',
        confirmPassword: req.body.confirmPassword ?? '',
    };
    let dataContactUser = {
        user_id: '',
        name: req.body.username ?? '',
    };
    let regexEmail =
        /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let msg = '';

    if (!req.body.checkRule) {
        msg = 'Bạn phải đồng ý với điều khoản của web';
    }

    if (dataRegister.password !== dataRegister.confirmPassword) {
        msg = 'Mật khẩu nhập lại không khớp.';
    }

    if (!regexPassword.test(dataRegister.password)) {
        msg =
            'Mật khẩu phải tối thiểu tám ký tự, ít nhất một chữ cái và một số';
    }

    if (!regexEmail.test(dataRegister.email)) {
        msg = 'Email không hợp lệ.';
    }

    for (const key in dataRegister) {
        if (!dataRegister[key]) {
            msg = 'Hãy nhập đầy đủ thông tin.';
        }
    }

    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1,
        });
    }

    let checkUser = await User.findOne({
        where: { email: dataRegister.email },
    });

    if (checkUser !== null) {
        return res.status(200).json({
            msg: 'Tài khoản đã tồn tại',
            err: 1,
        });
    }

    let hashPassword = await userServices.hashPassword(dataRegister.password);
    let token = generateToken({
        email: dataRegister.email,
        password: hashPassword,
    }).accessToken;
    dataRegister = {
        ...dataRegister,
        password: hashPassword,
        remember_token: token,
        role: 'user',
        email_verified_at: new Date(),
    };
    await User.create(dataRegister);
    const userNewCreate = await User.findOne({
        order: [['id', 'DESC']],
    });

    dataContactUser = { ...dataContactUser, user_id: userNewCreate.id };
    await Contact.create(dataContactUser);

    return res.status(200).json({
        token: token,
        result: userNewCreate,
        msg: 'Tạo Tài khoản thành công',
        err: 0,
    });
};

const PostDeleteUser = async (req, res) => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = today.getDate();
    day = day < 10 ? `0${day}` : day;
    let hours = today.getHours();
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let seconds = today.getSeconds();
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    await User.update(
        { deleted_at: formattedDate },
        {
            where: { id: req.body.id },
        }
    ).catch((err) => {
        console.log('delete fail: ' + err);
    });

    return res.status(200).json({
        msg: 'Thành công',
        err: 0,
    });
};

const PostUpdateDataUserById = async (req, res) => {
    let dataUpdate = {
        name: req.body.name ?? '',
        phone: req.body.phone ?? '',
        date_of_birth: req.body.dateOfBirth ?? '',
        address: req.body.address ?? '',
    };

    if (req.body.email) {
        await User.update(
            { email: req.body.email },
            { where: { id: req.body.id } }
        ).catch((err) => console.log(err));
    }

    await Contact.update(dataUpdate, { where: { user_id: req.body.id } }).catch(
        (err) => console.log(err)
    );

    return res.status(200).json({
        msg: 'success',
        err: 0,
    });
};

const PostUpdateDataPasswordById = async (req, res) => {
    let dataPassword = {
        id: req.body.id ?? '',
        password: req.body.password ?? '',
        newPassword: req.body.newPassword ?? '',
        newConfirmPassword: req.body.newConfirmPassword ?? '',
    };
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let msg = '';

    if (dataPassword.password) {
        let checkUser = await User.findOne({
            where: { id: req.body.id },
        });
    
        let checkPassword = await bcrypt.compareSync(
            dataPassword.password,
            checkUser.password
        );
        if (!checkPassword) {
            msg = 'Mật khẩu cũ không đúng'
        }
    }

    if (dataPassword.newPassword === dataPassword.password) {
        msg = 'Mật khẩu mới phải khác mật khẩu cũ.';
    }

    if (dataPassword.newPassword !== dataPassword.newConfirmPassword) {
        msg = 'Mật khẩu nhập lại không khớp.';
    }

    if (
        !regexPassword.test(dataPassword.password) ||
        !regexPassword.test(dataPassword.newPassword)
    ) {
        msg =
            'Mật khẩu phải tối thiểu tám ký tự, ít nhất một chữ cái và một số';
    }

    for (const key in dataPassword) {
        if (!dataPassword[key]) {
            msg = 'Hãy nhập đầy đủ thông tin.';
            break
        }
    }

    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1,
        });
    }

    let newPassword = await userServices.hashPassword(dataPassword.newPassword);

    await User.update({password: newPassword}, {where: {id: dataPassword.id}})
    .catch(err => console.log(err))

    return res.status(200).json({
        msg: 'success',
        err: 0
    })
};

module.exports = {
    GetUser: GetUser,
    GetUserById: GetUserById,
    Login: Login,
    Register: Register,
    PostUpdateUser: PostUpdateUser,
    PostDeleteUser: PostDeleteUser,
    PostUpdateDataUserById: PostUpdateDataUserById,
    PostUpdateDataPasswordById: PostUpdateDataPasswordById
};
