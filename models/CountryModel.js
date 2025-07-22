const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Country = sequelize.define('Country', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_code: {
        type: DataTypes.STRING
    },
    numeric_code: {
        type: DataTypes.STRING
    },
    other_details: {
        type: DataTypes.JSON
    },
    states: {
        type: DataTypes.JSONB,  // Store an array of states, which will include cities as nested objects
        allowNull: false
    }
}, {
    timestamps: true,
});

module.exports = Country;
