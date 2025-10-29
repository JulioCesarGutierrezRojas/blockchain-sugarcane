const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    stellar_address: {
        type: DataTypes.STRING(56),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [56, 56] // Stellar addresses are exactly 56 characters
        }
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            is: /^[+]?[\d\s\-(\)]+$/
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: false
});


module.exports = User;
