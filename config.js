const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const config = mongoose.connection;

module.exports = config;

// const {Sequelize} = require('sequelize');

// const connection = async () =>{
//     const sequelize = new Sequelize('usermanagement', 'postgres', 'Aksh7782', {
//         host: 'localhost',
//         dialect: 'postgres',
//         port: 4000,
//         logging: console.log
//     });

//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
// module.exports = {connection};