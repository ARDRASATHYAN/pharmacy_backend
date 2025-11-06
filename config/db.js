const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // database name
  process.env.DB_USER,      // username
  process.env.DB_PASSWORD,  // password
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // set true if you want SQL logs
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected using Sequelize');
  } catch (error) {
    console.error('❌ Unable to connect to DB:', error);
  }
})();

module.exports = sequelize;
