const CartsDetail = require("../models/cartsDetails.Model")


const postCartDetail = async (req, res) => {
    let cartDetailsData = {
        cart_id: req.body.cart_id ?? '',
        product_id: req.body.product_id ?? '',
        quantity: req.body.quantity ?? '',
        size: req.body.size ?? '',
    }
    let msg = ''

    for (const key in cartDetailsData) {
        if (!cartDetailsData[key]) {
            msg = 'Thiếu thông tin.'
        }
    }

    if (msg.length > 0) {
        return res.status(200).json({ 
            msg: msg,
            err: 1
        })
    }

    let haveProduct = await CartsDetail.findOne({where: {cart_id: cartDetailsData.cart_id, product_id: cartDetailsData.product_id}})

    if (!haveProduct) {
        await CartsDetail.create(cartDetailsData).catch(err => {console.log("Fall: " + err);})
        return res.status(200).json({
            msg: 'Thành công',
            err: 0
        })
    }

    await CartsDetail.update(cartDetailsData, {where: {cart_id: cartDetailsData.cart_id, product_id: cartDetailsData.product_id}})

    return res.status(200).json({
        msg: 'Thành công',
        err: 0
    })
}

const deleteProdcutCart = async (req, res) => {
    await CartsDetail.destroy({
        where: { id: req.body.id },
    }).catch((err) => {
        console.log("delete fail: " + err);
    });
    return res.status(200).json({
        result: "Thành công",
        err: 0,
    });
}

module.exports = {
    postCartDetail: postCartDetail,
    deleteProdcutCart: deleteProdcutCart,
}