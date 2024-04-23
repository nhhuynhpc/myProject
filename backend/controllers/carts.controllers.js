const { Sequelize, Op } = require("sequelize");
const sequelize = require("../database/connection");
const CartData = require("../models/carts.Model")


const PostCarts = async (req, res) => {
    let dataCarts = {
        user_id: req.body.user_id ?? ''
    }
    let msg = ''

    for (const key in dataCarts) {
        if (!dataCarts[key]) {
            msg = 'Thiếu thông tin.'
        }
    }

    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1
        })
    }

    let haveUser = await CartData.findOne({where: {user_id: dataCarts.user_id}})
    .catch(err => {console.log("Fall: " + err);})

    if (!haveUser) {
        let resultPost = await CartData.create(dataCarts)
        .catch(err => {console.log("Fall: " + err);})

        let resultGet = await CartData.findOne({
            order: [["id", "DESC"]],
        })
        .catch(err => {console.log("Fall: " + err);})

        return res.status(200).json({
            resultPost: resultPost,
            cart_id: resultGet.id,
            msg: 'Thành công',
            err: 0
        })
    }

    return res.status(200).json({
        cart_id: haveUser.id,
        msg: 'Thành công',
        err: 0
    })
}

const GetProductInCart = async (req, res) => {
    let user_id = req.body.user_id ?? ''
    console.log(user_id);
    const [result, metadata] = await sequelize.query(
        `SELECT products.name, products.image, products.price, carts_details.id AS cartsDetailsId, carts_details.product_id, carts_details.cart_id, carts_details.quantity, carts_details.size, carts_details.status, carts.user_id 
        FROM products 
        INNER JOIN carts_details ON products.id = carts_details.product_id
        INNER JOIN carts ON carts_details.cart_id = carts.id
        WHERE carts.user_id = '${user_id}'`
    );

    return res.status(200).json({
        result: result,
        msg: 'Thành công',
        err: 0
    })
}

module.exports = {
    PostCarts: PostCarts,
    GetProductInCart: GetProductInCart,
}