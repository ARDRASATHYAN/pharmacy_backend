const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Store = require('./StoresModel');
const Customer = require('./CustomerModel');
const User = require('./UserModel');

const SalesInvoice = sequelize.define('SalesInvoice', {
  sale_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  store_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Store,
      key: 'store_id',
    },
  },
  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Customer,
      key: 'customer_id',
    },
    allowNull: true,
  },
  bill_no: {
    type: DataTypes.STRING(100),
  },
  bill_date: {
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
  doctor_name: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  prescription_no: {
    type: DataTypes.STRING(100),
    allowNull: true,
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
  tableName: 'sales_invoices',
  timestamps: false,
});

// Associations
SalesInvoice.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });
SalesInvoice.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });
SalesInvoice.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = SalesInvoice;
