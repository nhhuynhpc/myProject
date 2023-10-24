const { Sequelize, DataTypes, INTEGER, DATE } = require('sequelize');
const sequelize = require('../database/connection');

const Contact = sequelize.define('contact', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: false
})

sequelize.sync().then(() => {
    console.log('Get contact user successfully');
}).catch((err) => {
    console.log('Fail: ' + err);
})

module.exports = Contact;