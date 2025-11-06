const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Store = require('./StoresModel');
const User = require('./UserModel');
const SalesInvoice = require('./SalesInvoiceModel');

const SalesReturn = sequelize.define('SalesReturn', {
  return_id: {
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
  },
  store_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Store,
      key: 'store_id',
    },
  },
  return_date: {
    type: DataTypes.DATEONLY,
  },
  reason: {
    type: DataTypes.TEXT,
  },
  total_amount: {
    type: DataTypes.DECIMAL(12,2),
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'sales_returns',
  timestamps: false,
});

// Associations
SalesReturn.belongsTo(SalesInvoice, { foreignKey: 'sale_id', as: 'sale' });
SalesReturn.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });
SalesReturn.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = SalesReturn;
