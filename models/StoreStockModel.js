const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Store = require('./StoresModel');
const Item = require('./ItemsModel');



const StoreStock = sequelize.define('StoreStock', {
    stock_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
     expiry_date: {
        type: DataTypes.DATE,
    },
    mrp: {
        type: DataTypes.DECIMAL(10,2),
    },
     purchase_rate: {
        type: DataTypes.DECIMAL(10,2),
    },
     sale_rate: {
        type: DataTypes.DECIMAL(10,2),
    },
     gst_percent: {
        type: DataTypes.DECIMAL(5,2),
    },
    qty_in_stock:{
        type: DataTypes.DECIMAL(10,2),
        defaultValue:0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    
   store_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'stores',
        key: 'store_id',
      },
      allowNull: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'items_master',
        key: 'item_id',
      },
      allowNull: true,
    },
    
  },
  {
    tableName: 'store_stock',
    timestamps: false, // already handled manually in DB
  }
);

//Define associations
StoreStock.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });
StoreStock.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });

module.exports = StoreStock;