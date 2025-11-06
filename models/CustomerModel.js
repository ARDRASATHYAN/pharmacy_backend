const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Customer = sequelize.define('Customer', {
    customer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_name: {
        type: DataTypes.STRING(200),
    },
    address: {
        type: DataTypes.TEXT,  
    },
    phone: {
         type: DataTypes.STRING(20),
    },
    email: {
         type: DataTypes.STRING(100),
    },
     gst_no: {
         type: DataTypes.STRING(20),
    },
    doctor_name: {
         type: DataTypes.STRING(150),
    },
    prescription_no: {
         type: DataTypes.STRING(100),
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},
    {
        tableName: 'customers',
        timestamps: false, // already handled manually in DB
    }
);




module.exports = Customer;

