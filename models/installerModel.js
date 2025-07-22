const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Installer = sequelize.define('Installer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
   
});
module.exports = Installer;
