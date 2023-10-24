const { Sequelize, Op } = require("sequelize");
const sequelize = require("../database/connection");
const CustomersObject = require("../models/customersObject.Model");
const CategoriesDetail = require("../models/categorieDetails.Model");


const GetTitle = async (req, res) => {
    let title = []
    let cusOb = await CustomersObject.findAll()

    for (let i in cusOb) {
        title.push({
            label: cusOb[i].name,
            link: cusOb[i].slug,
            options: []
        })

        const [result, metadata] = await sequelize.query(
            `SELECT categories.id AS cateId, categories.name AS cateName, categories.slug AS cateSlug 
            FROM products 
            INNER JOIN customers_objects ON products.customers_object_id = customers_objects.id 
            INNER JOIN categories ON products.categories_detail_id = categories.id 
            WHERE customers_objects.name = '${cusOb[i].name}' 
            GROUP BY categories.name`
        );

        for (let j in result) {
            title[i].options.push({
                label: result[j].cateName,
                link: result[j].cateSlug,
                options: []
            })

            let cateDeTail = await CategoriesDetail.findAll({where: {categories_id: result[j].cateId}})
            .catch(err => {console.log("Fall: " + err);})

            for (let k in cateDeTail) {
                title[i].options[j].options.push({
                    label: cateDeTail[k].name,
                    link: cateDeTail[k].slug
                })
            }
        }
    }

    return res.status(200).json({
        title: title,
        err: 0
    })
}

module.exports = {
    GetTitle: GetTitle,
}