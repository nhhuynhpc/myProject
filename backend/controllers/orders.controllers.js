const sequelize = require('../database/connection');
require('dotenv').config();
var slugify = require('slugify');
const OrderData = require('../models/orders.Model');

const PostAddOrders = async (req, res) => {
    let dataOrders = {
        user_id: req.body.user_id ?? '',
        code_order: req.body.code_order ?? '',
        name: req.body.name ?? '',
        phone: req.body.phone ?? '',
        address:
            req.body.address +
                ', ' +
                req.body.city +
                ', ' +
                req.body.district ?? '',
        note: 'text',
    };
    let msg = '';

    if (!req.body.address || !req.body.city || !req.body.district) {
        msg = 'Hãy nhập đầy đủ thông tin.';
    }

    for (const key in dataOrders) {
        if (!dataOrders[key]) {
            msg = 'Hãy nhập đầy đủ thông tin.';
        }
    }

    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1,
        });
    }

    dataOrders = { ...dataOrders, note: req.body.note ?? null };

    await OrderData.create(dataOrders).catch((err) => {
        console.log('Fall: ' + err);
    });
    const dataitem = await OrderData.findOne({
        order: [['id', 'DESC']],
    });

    return res.status(200).json({
        result: dataitem,
        msg: 'Thành công',
        err: 0,
    });
};

const GetOrdersByUserId = async (req, res) => {
    let result = await OrderData.findAll({
        where: { user_id: req.body.user_id },
    }).catch((err) => {
        console.log('Fall: ' + err);
    });

    return res.status(200).json({
        result: result,
        err: 0,
    });
};

const GetOrderById = async (req, res) => {
    let result = await OrderData.findAll({where: {id: req.body.id }})
    .catch(err => {console.log("Fall: " + err);})

    return res.status(200).json({
        result: result,
        err: 0
    })
}

const GetOrdersAll = async (req, res) => {
    let result = await OrderData.findAll().catch((err) => {
        console.log('Fall: ' + err);
    });

    return res.status(200).json({
        result: result,
        err: 0,
    });
};

const PostUpdateOrder = async (req, res) => {
    let dataOrder = {
        id: req.body.id,
        status: req.body.status,
    };
    
    await OrderData.update(dataOrder, {
        where: { id: dataOrder.id },
    }).catch(err => {console.log("Fall: " + err);})

    return res.status(200).json({
        msg: 'Thành công',
        err: 0
    })
};

module.exports = {
    PostAddOrders: PostAddOrders,
    GetOrdersByUserId: GetOrdersByUserId,
    GetOrdersAll: GetOrdersAll,
    PostUpdateOrder: PostUpdateOrder,
    GetOrderById: GetOrderById,
};
