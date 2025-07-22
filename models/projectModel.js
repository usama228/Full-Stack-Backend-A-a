const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { generateImageFromName } = require('../utils/convertNameToImage');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    installer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    address: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    contact_person: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: []
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (project) => {

            if (!project.images || project.images.length <= 0) {
                const imagePath = await generateImageFromName(project.name);
                project.images = [imagePath];
            }
        }
    }
});
module.exports = Project;
