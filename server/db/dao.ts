const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const appRoot = require('app-root-path');

const dataFile = appRoot + '/data.sqlite';
export const sequelizeInstance = new Sequelize(
    'sample_db', null, null, {
        dialect: 'sqlite',
        storage: dataFile,
        operatorsAliases: Op
    }
);
