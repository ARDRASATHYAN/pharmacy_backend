const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Supplier = sequelize.define('Supplier', {
    supplier_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    supplier_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,  
    },
    state: {
         type: DataTypes.STRING(100),
    },
    gst_no: {
         type: DataTypes.STRING(20),
    },
    phone: {
         type: DataTypes.STRING(20),
    },
    email: {
         type: DataTypes.STRING(100),
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},
    {
        tableName: 'suppliers',
        timestamps: false, // already handled manually in DB
    }
);





module.exports = Supplier;

