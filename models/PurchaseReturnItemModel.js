const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PurchaseReturn = require('./PurchaseReturnModel');
const Item = require('./ItemsModel');

const PurchaseReturnItem = sequelize.define('PurchaseReturnItem', {
  return_item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  return_id: {
    type: DataTypes.INTEGER,
    references: {
      model: PurchaseReturn,
      key: 'return_id',
    },
    onDelete: 'CASCADE', // matches your SQL
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
  tableName: 'purchase_return_items',
  timestamps: false,
});

// Associations
PurchaseReturnItem.belongsTo(PurchaseReturn, { foreignKey: 'return_id', as: 'purchaseReturn' });
PurchaseReturnItem.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });

module.exports = PurchaseReturnItem;
