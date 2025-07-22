const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { generateImageFromName } = require('../utils/convertNameToImage');
/// active inactive stock show_price quantity
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0,
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (product) => {
      if (!product.images || product.images.length <= 0) {
        const imagePath = await generateImageFromName(product.title);
        product.images = [imagePath];
      }
    }
  }
});

module.exports = Product;
