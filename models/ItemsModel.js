const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const HSN = require('./HsnModel');
const DrugSchedule = require('./DrugScheduleModel');


const Item = sequelize.define('Item', {
    item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sku: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    barcode: {
        type: DataTypes.STRING(100),
       unique: true,
    },
    name: {
         type: DataTypes.STRING(255),
        allowNull: false,
    },
    brand:{
        type:DataTypes.STRING(100), 
    },
    generic_name:{
        type:DataTypes.STRING(200),
    },
    manufacturer:{
        type:DataTypes.STRING(200),
    },
   hsn_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'hsn_master',
        key: 'hsn_id',
      },
      allowNull: true,
    },
    schedule_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'drug_schedule_master',
        key: 'schedule_id',
      },
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    item_type: {
      type: DataTypes.ENUM('Medicine', 'OTC', 'Consumable', 'Accessory', 'Other'),
      defaultValue: 'Medicine',
    },
    pack_size: {
      type: DataTypes.STRING(50),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'items_master',
    timestamps: false, // already handled manually in DB
  }
);

//Define associations
Item.belongsTo(HSN, { foreignKey: 'hsn_id', as: 'hsn' });
Item.belongsTo(DrugSchedule, { foreignKey: 'schedule_id', as: 'schedule' });

module.exports = Item;