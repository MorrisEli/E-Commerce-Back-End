// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const { toDefaultValue } = require('sequelize/types/utils');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true,
    },
    product_name: {
        type: DataTypes.STRONG,
        allowNull: false,
    },
    price: {
        type: DataTypes.STRONG,
        allowNull: false,
        validate: {
            isDecimal: true,
        }
    },
    stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: {
        isNumeric: true,
    }
  },
  categor_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'category',
        key: 'id',
    },
  },
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
