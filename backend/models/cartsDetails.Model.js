const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../database/connection');

const CartsDetail = sequelize.define('carts_details', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    size: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true
    }
}, {
    timestamps: false,
})

sequelize.sync().then(() => {
    console.log('Get carts detail successfully');
}).catch((err) => {
    console.log('Fail: ' + err);
})

module.exports = CartsDetail;