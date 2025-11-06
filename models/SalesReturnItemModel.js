const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SalesReturn = require('./SalesReturnModel');
const Item = require('./ItemsModel');

const SalesReturnItem = sequelize.define('SalesReturnItem', {
  return_item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  return_id: {
    type: DataTypes.INTEGER,
    references: {
      model: SalesReturn,
      key: 'return_id',
    },
    onDelete: 'CASCADE',
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
  amount: {
    type: DataTypes.DECIMAL(12,2),
  },
}, {
  tableName: 'sales_return_items',
  timestamps: false,
});

// Associations
SalesReturnItem.belongsTo(SalesReturn, { foreignKey: 'return_id', as: 'return' });
SalesReturnItem.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });

module.exports = SalesReturnItem;
