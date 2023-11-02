const sequelize = require('../database/connection');
require('dotenv').config();
var slugify = require('slugify');
const OrderDetail = require('../models/ordersDetails.Model');

const PostAddOrdersDetail = async (req, res) => {
    let dataOrdersDetail = {
        order_id: req.body.order_id ?? '',
        size: '',
        product_id: '',
        quantity: '',
        status: '',
    };
    let products = req.body.products ?? [];

    if (!dataOrdersDetail.order_id) {
        return res.status(200).json({
            msg: 'Không thể tìm được order_id',
            err: 1,
        });
    }

    for (let item of products) {
        let dataOrdersDetailItem = {
            ...dataOrdersDetail,
            size: item.size,
            product_id: item.product_id,
            quantity: item.quantity,
            status: '0',
        };
        let checkErr = false;

        await OrderDetail.create(dataOrdersDetailItem).catch((err) => {
            console.log('Fall' + err);
            checkErr = true;
        });

        if (checkErr) {
            return res.status(200).json({
                msg: 'Lỗi!!!',
                err: 1,
            });
        }
    }

    return res.status(200).json({
        msg: 'Thành công',
        err: 0,
    });
};

const GetDataHistoryProduct = async (req, res) => {
    let listOrderId = req.body.listOrderId ?? []
    let productInOrders = []

    for (let item of listOrderId) {
        const [result, metadata] = await sequelize.query(
            `SELECT order_details.id, order_details.order_id, order_details.size, order_details.quantity, order_details.status, products.name, products.slug, 
            products.image, products.price, order_details.created_at, orders.delivery_date
            FROM order_details 
            INNER JOIN products ON order_details.product_id = products.id 
            INNER JOIN orders ON order_details.order_id = orders.id
            WHERE order_details.order_id = '${item}' ` 
        );
        for (let i of result) {
            productInOrders.push(i)
        }
    }

    return res.status(200).json({
        result: productInOrders,
        err: 0
    })
}

const GetDataProductInOrder = async (req, res) => {
    const [result, metadata] = await sequelize.query(
        `SELECT order_details.id, order_details.order_id, order_details.size, order_details.quantity, order_details.status, products.name, products.slug, 
        products.image, products.price, products.created_at 
        FROM order_details 
        INNER JOIN products ON order_details.product_id = products.id 
        WHERE order_details.order_id = '${req.body.id}' ` 
    );

    return res.status(200).json({
        result: result,
        err: 0
    })
}

const PostUpdateOrderDetail = async (req, res) => {
    let dataOrdersDetail = {
        id: req.body.id,
        status: req.body.status
    }

    let result = await OrderDetail.update(dataOrdersDetail, {where: {id: dataOrdersDetail.id}})
    .catch(err => {console.log("Fall: " + err);})
    
    return res.status(200).json({
        result: result,
        msg: 'Thành công',
        err: 0
    })
}

module.exports = {
    PostAddOrdersDetail: PostAddOrdersDetail,
    GetDataHistoryProduct: GetDataHistoryProduct,
    PostUpdateOrderDetail: PostUpdateOrderDetail,
    GetDataProductInOrder: GetDataProductInOrder
};
