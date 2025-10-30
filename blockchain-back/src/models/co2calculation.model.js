const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Co2Calculation = sequelize.define('Co2Calculation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    farm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'farms',
            key: 'id'
        }
    },
    calculation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    hectares_measured: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    co2_captured_tons: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
        validate: {
            min: 0.0001
        }
    },
    calculation_method: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Método utilizado para el cálculo (ej: fotosíntesis, biomasa, etc.)'
    },
    stellar_transaction_hash: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: true,
        comment: 'Hash de la transacción en Stellar donde se mintearon los tokens'
    },
    verification_status: {
        type: DataTypes.ENUM('pending', 'verified', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
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
    tableName: 'co2_calculations',
    timestamps: false,
    indexes: [
        {
            fields: ['farm_id']
        },
        {
            fields: ['calculation_date']
        },
        {
            fields: ['verification_status']
        },
        {
            unique: true,
            fields: ['stellar_transaction_hash']
        }
    ]
});

module.exports = Co2Calculation;