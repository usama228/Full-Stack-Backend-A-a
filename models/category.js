const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { generateImageFromName } = require('../utils/convertNameToImage');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.TEXT,
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Categories',
            key: 'id',
        },
    },

}, {
    tableName: 'Categories',
    timestamps: true,
    hooks: {
        beforeCreate: async (category) => {
            if (!category.avatar) {
                const imagePath = await generateImageFromName(category.name);
                category.avatar = imagePath;
            }
        }
    }
});


module.exports = Category;