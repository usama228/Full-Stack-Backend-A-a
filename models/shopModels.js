const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Shop = sequelize.define('Shop', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    owner_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
module.exports = Shop;
