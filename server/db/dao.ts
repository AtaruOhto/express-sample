const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* SQLite */
/* const appRoot = require('app-root-path');
// const dataFile = appRoot + '/data.sqlite';
// export const sequelizeInstance = new Sequelize(
//     'sample_db', null, null, {
//         dialect: 'sqlite',
//         storage: dataFile,
//         operatorsAliases: Op
//     }
// );
*/

/* MySQL */
export const sequelizeInstance = new Sequelize('sample_db', 'root', 'pass', {
    host: '127.0.0.1',
    port: 3333,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: Op
});
