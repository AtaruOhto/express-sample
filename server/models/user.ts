import { sequelizeInstance } from 'db/dao';
import Sequelize, { Model, UpdateOptions } from 'sequelize';
import { syncData, buildSave, findOne } from 'concerns/sequelize';
import { genHash } from 'concerns/bcrypt';
import { isNameValid } from 'validators/user';

type TUserType =  'master' | 'normal';

interface IUserAttrs {
    name: string;
    password: string;
    type: TUserType;
}

interface IUserOptionalAttrs {
    name?: string;
    password?: string;
}

export type TUser = Model<'user', IUserAttrs>;
export type TUserUpdate = Model<'user', IUserOptionalAttrs>;

export const UserModel = sequelizeInstance.define(
    'user',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isNameValid: (value: string) => {
                    isNameValid(value);
                }
            }
        },
        password: {type: Sequelize.STRING, allowNull: false},
        type: {
            type:   Sequelize.ENUM,
            allowNull: false,
            values: ['master', 'normal']
        }
    },
    {
        rowFormat: 'DYNAMIC'
    }
);

/* public */

export const createUser = (attrs: IUserAttrs) => (
    new Promise(async (resolve, reject) => {
        attrs.password = await genHash(attrs.password).catch((error: any) => {
            reject(error);
        });
        resolve(buildSave(UserModel, attrs));
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
    const numOfUser = await UserModel.count().catch((error: any) => { console.error(error); });
    if (numOfUser === 0) {
        createUser({name: 'first', password: 'pass', type: 'master'}).catch((error: any) => { console.error(error); });
        console.log('first user created!');
    }
};

(async() => {
    await syncData().catch((error: any) => { console.error(error); });
    if (process.env.CREATE_USER_IF_NOT_EXITS) {
        createFirstUserIfNotExist();
    }
})();
