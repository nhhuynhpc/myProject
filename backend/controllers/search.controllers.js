const { Sequelize, Op } = require("sequelize");
const sequelize = require("../database/connection");
const Products = require("../models/products.Model");


const SearchProduct = async (req, res) => {
    let textSearch = req.body.textSearch

    let resultSearchProduct = await Products.findAll({
        where: {
            [Op.or]: [
              { name: { [Op.like]: '%' + textSearch + '%' } },
            ]
          }
    })

    if (resultSearchProduct.length === 0) {
        return res.status(200).json({
            msg: "Không tìm thấy sản phầm nào",
            err: 0
        })
    }

    return res.status(200).json({
        resultSearchProduct: resultSearchProduct,
        quantityResult: resultSearchProduct.length,
        msg: 'Thành công',
        err: 0
    })
}

module.exports = {
    SearchProduct: SearchProduct,
}