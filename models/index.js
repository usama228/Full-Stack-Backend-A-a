const Product = require('./productModel')
const Installer = require('./installerModel')
const Project = require('./projectModel');
const Shop = require('./shopModels');
const Category = require('./category');
const Country = require('./CountryModel');
const User = require('./userModel');

// Relationships
User.hasOne(Shop, { foreignKey: 'user_id' });
Shop.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Installer, { foreignKey: 'user_id' });
Installer.belongsTo(User, { foreignKey: 'user_id' });

Shop.hasMany(Product, { foreignKey: 'shop_id' });
Product.belongsTo(Shop, { foreignKey: 'shop_id' });

Installer.hasMany(Project, { foreignKey: 'installer_id' });
Project.belongsTo(Installer, { foreignKey: 'installer_id' });

Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });
Category.hasMany(Category, { foreignKey: 'parent_id', as: 'children' });

Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
// Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Product.belongsTo(Category, { as: 'category', foreignKey: 'category_id' });

module.exports = { Country, User, Shop, Category, Product, Installer, Project };