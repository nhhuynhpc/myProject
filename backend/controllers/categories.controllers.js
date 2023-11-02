const sequelize = require("../database/connection");
require('dotenv').config();
var slugify = require("slugify");
const CategoriesDetail = require("../models/categorieDetails.Model");
const Categories = require('../models/categories.Model')

const LoadImgCategories = async (req, res) => {
    let filename = req.file.filename;
    try {
      await CategoriesDetail.update(
        {
          image: filename,
        },
        {
          where: { id: req.body.id },
        }
      );
  
      return res.send(req.file);
    } catch (error) {
      res.status(500).json({ error: "Error uploading image" });
    }
  };

const GetCategoriesAndDetail = async (req, res) => {
    const [result, metadata] = await sequelize.query(
        "SELECT categories_details.id, categories_details.name, categories_details.categories_id, categories.name AS type, categories_details.image FROM categories_details INNER JOIN categories ON categories_details.categories_id = categories.id"
    ).catch(err => { return res.status(200).json({err: err})})
    return res.status(200).json({
        cateInfo: result,
    })
}

const GetCategories = async (req, res) => {
    const result = await Categories.findAll().catch(err => {console.log("Fall: " + err);})

    return res.status(200).json({
        categories: result,
        err: 0
    })
}

const GetCategoriesDetails = async (req, res) => {
    const result = await CategoriesDetail.findAll().catch(err => {console.log("Fall: " + err);})

    return res.status(200).json({
        categories: result,
        err: 0
    })
}

const PostCategoriesDetail = async (req, res) => {
    let cateInfo = {
        name: req.body.name ?? '',
        categories_id: req.body.categories_id ?? '',
        slug: 'none text'
    }
    let msg = '';

    for (const key in cateInfo) {
        if (!cateInfo[key]) {
            msg = 'Hãy nhập đầy đủ thông tin.'
        }
    }

    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1,
        })
    }

    cateInfo.slug = slugify(cateInfo.name.toLowerCase());
    let createCate = await CategoriesDetail.create(cateInfo).catch(err => {
        console.log('Fail: ' + err);
    })
    const dataitem = await CategoriesDetail.findOne({
        order: [["id", "DESC"]],
    });

    return res.status(200).json({
        createCate: createCate,
        dataitem: dataitem,
        msg: 'Thành công', 
        err: 0
    })
}

const PostUpdateCateDetail = async (req, res) => {
    let cateInfo = {
        id: req.body.id ?? '',
        name: req.body.name ?? '',
        categories_id: req.body.categories_id ?? '',
        slug: 'none text'
    }
    let msg = '';

    for (const key in cateInfo) {
        if (!cateInfo[key]) {
            msg = 'Hãy nhập đầy đủ thông tin.'
        }
    }

    if (msg.length > 0) {
        return res.status(200).json({
            msg: msg,
            err: 1,
        })
    }

    cateInfo.slug = slugify(cateInfo.name.toLowerCase());
    let updateCate = await CategoriesDetail.update(cateInfo, {
        where: { id: cateInfo.id },
      }).catch((err) => {
        console.log("fail: " + err);
      });

    return res.status(200).json({
        updateCate: updateCate,
        msg: 'Thành công',
        err: 0
    })
}

const PostDeleteCateDetail = async (req, res) => {
    await CategoriesDetail.destroy({
        where: { id: req.body.id }
    }).catch(err => { console.log('delete fail: ' + err);})
    return res.status(200).json({
        msg: 'Thành công',
        err: 0
    })
}

const FetchCateDetailWithSlug = async (req, res) => {
    const [result, metadata] = await sequelize.query(
      `SELECT categories_details.id, categories_details.name, categories_details.image, categories_details.slug 
      FROM categories_details 
      INNER JOIN categories ON categories_details.categories_id = categories.id 
      INNER JOIN products ON categories.id = products.categories_detail_id 
      INNER JOIN customers_objects ON products.customers_object_id = customers_objects.id 
      WHERE customers_objects.slug = '${req.body.slugCate}' 
      GROUP BY categories_details.name `
    ).catch((err) => {
      console.log("Fall: " + err);
    });
  
    return res.status(200).json({
      dataCateDetail: result,
      msg: "Search for successful products!",
      err: 0,
    });
  }; // Chưa xong

module.exports = {
    PostCategoriesDetail: PostCategoriesDetail,
    GetCategoriesAndDetail: GetCategoriesAndDetail,
    PostUpdateCateDetail: PostUpdateCateDetail,
    PostDeleteCateDetail: PostDeleteCateDetail,
    GetCategoriesDetails: GetCategoriesDetails,
    GetCategories: GetCategories,
    LoadImgCategories: LoadImgCategories,
    FetchCateDetailWithSlug,
}
