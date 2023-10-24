const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../database/connection');

const Products = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    categories_detail_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    customers_object_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: false,
})

sequelize.sync().then(() => {
    console.log('Get categories successfully');
}).catch((err) => {
    console.log('Fail: ' + err);
})

module.exports = Products;