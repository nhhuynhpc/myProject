const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../database/connection');

const CategoriesDetail = sequelize.define('categories_details', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    categories_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
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

module.exports = CategoriesDetail;