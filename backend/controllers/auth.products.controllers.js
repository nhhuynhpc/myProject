const { Sequelize, Op } = require("sequelize");
const sequelize = require("../database/connection");
require("dotenv").config();
const path = require("path");
const Categories = require("../models/categories.Model");
const Products = require("../models/products.Model");
var slugify = require("slugify");
const CustomersObject = require("../models/customersObject.Model");

const loadimg = async (req, res) => {
  let filename = req.file.filename;
  const fixedImagePath = req.file.path.replace(/\\/g, "/");
  console.log("Fixed image path:", fixedImagePath);
  console.log(req.body.id);
  try {
    await Products.update(
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

const postProduct = async (req, res) => {
  let dataProduct = {
    categories_detail_id: req.body.categories_id ?? "",
    customers_object_id: req.body.customers_object_id ?? "",
    name: req.body.name ?? "",
    slug: req.body.slug ?? "non text",
    description: req.body.description ?? "",
    content: req.body.description ?? "",
    price: req.body.price ?? "",
  };

  let msg = "";

  if (!/\d/.test(dataProduct.price)) {
    msg = "giá phải là số";
  }

  for (const key in dataProduct) {
    if (!dataProduct[key]) {
      msg = "Hãy nhập đầy đủ thông tin.";
    }
  }

  if (msg.length > 0) {
    return res.status(200).json({
      msg: msg,
      err: 1,
    });
  }

  dataProduct.slug = slugify(dataProduct.name.toLowerCase());
  let createProduct = await Products.create(dataProduct).catch((err) => {
    console.log("fail: " + err);
  });
  const dataitem = await Products.findOne({
    order: [["id", "DESC"]],
  });

  return res.status(200).json({
    createProduct: createProduct,
    dataitem: dataitem,
    msg: "Thành công",
    err: 0,
  });
};

const updateProduct = async (req, res) => {
  let dataProduct = {
    id: req.body.id ?? "",
    categories_detail_id: req.body.categories_id ?? "",
    customers_object_id: req.body.customers_object_id ?? "",
    name: req.body.name ?? "",
    slug: req.body.slug ?? "non text",
    description: req.body.description ?? "",
    content: req.body.description ?? "",
    price: req.body.price ?? "",
  };

  let msg = "";

  if (!/\d/.test(dataProduct.price)) {
    msg = "giá phải là số";
  }

  for (const key in dataProduct) {
    if (!dataProduct[key]) {
      msg = "Hãy nhập đầy đủ thông tin.";
    }
  }

  if (msg.length > 0) {
    return res.status(200).json({
      msg: msg,
      err: 1,
    });
  }

  dataProduct.slug = slugify(dataProduct.name.toLowerCase());
  let updateProduct = await Products.update(dataProduct, {
    where: { id: dataProduct.id },
  }).catch((err) => {
    console.log("fail: " + err);
  });

  return res.status(200).json({
    updateProduct: updateProduct,
    msg: "Thành công",
    err: 0,
  });
};

const deleteProduct = async (req, res) => {
  await Products.destroy({
    where: { id: req.body.id },
  }).catch((err) => {
    console.log("delete fail: " + err);
  });
  return res.status(200).json({
    msg: "Thành công",
    err: 0,
  });
};

const getProduct = async (req, res) => {
  const [result, metadata] = await sequelize.query(
    `SELECT products.id, products.categories_detail_id, products.customers_object_id, products.name, products.slug, products.image, products.price, categories_details.name AS typeProduct, customers_objects.name AS typeCustomer
    FROM products 
    INNER JOIN categories_details ON products.categories_detail_id = categories_details.id
    INNER JOIN customers_objects ON products.customers_object_id = customers_objects.id`
  );
  return res.status(200).json({
    dataProduct: result,
  });
};

const searchProduct = async (req, res) => {
  let data = req.body.data ?? "";
  console.log(data);
  let result = await Products.findAll({
    where: {
      name: {
        [Op.like]: "%" + data + "%",
      },
    },
  }).catch((err) => {
    console.log("Fall: " + err);
  });
  if (result.length === 0) {
    return res.status(200).json({
      msg: "Không tìm thấy sản phẩm",
      err: 1,
    });
  }

  return res.status(200).json({
    result: result,
    msg: "",
    err: 0,
  });
}; // Chưa sửa

const getCustomerObject = async (req, res) => {
    const result = await CustomersObject.findAll().catch(err => {console.log("Fall: " + err);})
    return res.status(200).json({
        customersObject: result,
        err: 0
    })
};

const getProductDetail = async (req, res) => {
  const [result, metadata] = await sequelize.query(
    `SELECT products.id, products.categories_detail_id, products.customers_object_id,
    products.name, products.slug, products.description, products.content, 
    products.image, products.price, customers_objects.name AS typeCustomer, 
    categories_details.name AS typeProductDetail, categories.name AS typeProduct 
    FROM products INNER JOIN customers_objects ON products.customers_object_id = customers_objects.id 
    INNER JOIN categories_details ON products.categories_detail_id = categories_details.id 
    INNER JOIN categories ON categories_details.categories_id = categories.id 
    WHERE products.slug = '${req.body.slugProduct}' LIMIT 1;`
  ).catch((err) => {
    console.log("Fall: " + err);
  });

  return res.status(200).json({
    dataProduct: result[0],
    msg: "Search for successful products!",
    err: 0,
  });
}; // Chưa xong

const getGroupProductByCustomer = async (req, res) => {
  let typeCustomer = req.body.typeCustomer
  const [result, metadata] = await sequelize.query(
    `SELECT products.id, products.name, products.slug, products.image, 
    products.price, categories.slug AS cateSlug, categories_details.slug AS cateDetailSlug 
    FROM products 
    INNER JOIN customers_objects ON products.customers_object_id = customers_objects.id 
    INNER JOIN categories_details ON products.categories_detail_id = categories_details.id 
    INNER JOIN categories ON categories_details.categories_id = categories.id 
    WHERE customers_objects.slug = '${typeCustomer}'
    GROUP BY products.name`
  ).catch((err) => {
    console.log("Fall: " + err);
  });

  return res.status(200).json({
    dataProduct: result,
    msg: "Search for successful products!",
    err: 0,
  });
}

module.exports = {
  loadimg: loadimg,
  postProduct: postProduct,
  getProduct: getProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  searchProduct: searchProduct,
  getProductDetail: getProductDetail,
  getCustomerObject: getCustomerObject,
  getGroupProductByCustomer: getGroupProductByCustomer,
};
