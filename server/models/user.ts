import { sequelizeInstance } from 'db/dao';
import Sequelize, { Model, UpdateOptions } from 'sequelize';
import { syncData, create, findOne } from 'concerns/sequelize';
import { genHash } from 'concerns/bcrypt';

interface IUserAttrs {
    name: string;
    password: string;
}

interface IUserOptionalAttrs {
    name?: string;
    password?: string;
}

export type TUser = Model<'user', IUserAttrs>;
export type TUserUpdate = Model<'user', IUserOptionalAttrs>;

export const UserModel = sequelizeInstance.define('user', {
    name: {type: Sequelize.STRING, allowNull: false, unique: true},
    password: {type: Sequelize.STRING, allowNull: false},
});

/* public */

export const createUser = (attrs: IUserAttrs) => (
    new Promise(async (resolve, reject) => {
        attrs.password = await genHash(attrs.password).catch((error: any) => {
            reject(error);
        });
        resolve(create(UserModel, attrs));
    })
);

export const findOneUser = (attrs: IUserOptionalAttrs) => (
    findOne(UserModel, attrs)
);

export const updateUser = (user: TUserUpdate, updateAttrs: IUserOptionalAttrs, updateOptions: UpdateOptions) => (
    new Promise(async (resolve, reject) => {

        if (updateAttrs.password) {
            updateAttrs.password = await genHash(updateAttrs.password).catch((error: any) => {
                reject(error);
            });
        }

        user.update(updateAttrs, updateOptions).then(
            () => {
                resolve();
            },
            (error: any) => {
                reject(error);
            }
        );
    })
);

const createFirstUserIfNotExist = async () => {
    await syncData().catch((error: any) => { console.error(error); });
    const numOfUser = await UserModel.count().catch((error: any) => { console.error(error); });

    if (numOfUser === 0) {
        createUser({name: 'first', password: 'pass'}).catch((error: any) => { console.error(error); });
        console.log('first user created!');
    }
};

if (process.env.CREATE_USER_IF_NOT_EXITS) {
    createFirstUserIfNotExist();
}
