const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SalesInvoice = require('./SalesInvoiceModel');
const Item = require('./ItemsModel');

const SalesItem = sequelize.define('SalesItem', {
  sale_item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sale_id: {
    type: DataTypes.INTEGER,
    references: {
      model: SalesInvoice,
      key: 'sale_id',
    },
    onDelete: 'CASCADE', // match SQL cascade
  },
  item_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'item_id',
    },
  },
  batch_no: {
    type: DataTypes.STRING(100),
  },
  qty: {
    type: DataTypes.DECIMAL(10,2),
  },
  rate: {
    type: DataTypes.DECIMAL(10,2),
  },
  gst_percent: {
    type: DataTypes.DECIMAL(5,2),
  },
  discount_percent: {
    type: DataTypes.DECIMAL(5,2),
  },
  total_amount: {
    type: DataTypes.DECIMAL(12,2),
  },
}, {
  tableName: 'sales_items',
  timestamps: false,
});

// Associations
SalesItem.belongsTo(SalesInvoice, { foreignKey: 'sale_id', as: 'sale' });
SalesItem.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });

module.exports = SalesItem;
