const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../database/connection');

const CartData = sequelize.define('carts', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
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
    console.log('Get carts successfully');
}).catch((err) => {
    console.log('Fail: ' + err);
})

module.exports = CartData;