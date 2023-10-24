const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../database/connection');

const CustomersObject = sequelize.define('customers_objects', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
})

sequelize.sync().then(() => {
    console.log('Get Customers Object successfully');
}).catch((err) => {
    console.log('Fail: ' + err);
})

module.exports = CustomersObject;