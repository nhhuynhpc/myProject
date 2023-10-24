const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../database/connection');

const Categories = sequelize.define('categories', {
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
    console.log('Get categories successfully');
}).catch((err) => {
    console.log('Fail: ' + err);
})

module.exports = Categories;