const { Sequelize, DataTypes, INTEGER, DATE } = require('sequelize');
const sequelize = require('../database/connection');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email_verified_at: {
        type: DATE,
        allowNull: true
    },
    status: { //0: active; 1: offline
        type: INTEGER,
        allowNull: true
    },
    deleted_at: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false
})

sequelize.sync().then(() => {
    console.log('Get user successfully');
}).catch((err) => {
    console.log('Fail: ' + err);
})

module.exports = User;