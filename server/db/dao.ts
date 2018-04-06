const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* SQLite */
/* const appRoot = require('app-root-path');
// const dataFile = appRoot + '/data.sqlite';
// export const sequelizeInstance = new Sequelize(
//     process.env.DB_NAME, null, null, {
//         dialect: 'sqlite',
//         storage: dataFile,
//         operatorsAliases: Op
//     }
// );
*/

/* MySQL */
export const sequelizeInstance = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: Op,
    timezone: process.env.TIME_ZONE
});
