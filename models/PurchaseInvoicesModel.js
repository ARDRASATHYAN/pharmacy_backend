const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Store = require('./StoresModel');
const Supplier = require('./SupplierModel');
const User = require('./UserModel');

const PurchaseInvoice = sequelize.define('PurchaseInvoice', {
  purchase_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  invoice_no: {
    type: DataTypes.STRING(100),
  },
  invoice_date: {
    type: DataTypes.DATEONLY,
  },
  total_amount: {
    type: DataTypes.DECIMAL(12,2),
  },
  total_gst: {
    type: DataTypes.DECIMAL(12,2),
  },
  total_discount: {
    type: DataTypes.DECIMAL(12,2),
  },
  net_amount: {
    type: DataTypes.DECIMAL(12,2),
  },
  store_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'stores',
      key: 'store_id',
    },
    allowNull: true,
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'suppliers',
      key: 'supplier_id',
    },
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'user_id',
    },
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'purchase_invoices',
  timestamps: false,
});

// ✅ Define associations
PurchaseInvoice.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });
PurchaseInvoice.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
PurchaseInvoice.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = PurchaseInvoice;
