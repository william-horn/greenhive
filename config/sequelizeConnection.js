const Sequelize = require('sequelize');
console.log('from sequelizeConnection:', process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW);

const sequelizeConnection = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USER, 
        process.env.DB_PW,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        });

module.exports = sequelizeConnection;
require('../models').loadTables();