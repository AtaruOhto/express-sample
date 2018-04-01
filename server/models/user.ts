import { sequelizeInstance } from 'db/dao';
import Sequelize, { Model, UpdateOptions } from 'sequelize';
import { syncData, create, findOne} from 'concerns/sequelize';
import { genHash } from 'concerns/bcrypt';

interface IUserAttrs {
    name: string;
    password: string;
}

interface IUserOptionalAttrs {
    name?: string;
    password?: string;
}

export const UserModel = sequelizeInstance.define('user', {
    name: {type: Sequelize.STRING, allowNull: false, unique: true, len: [4, 10]},
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
)

export const findOneUser = (attrs: IUserOptionalAttrs) => (
    findOne(UserModel, attrs)
)

export const updateUser = (user: Model<'user', IUserOptionalAttrs>, updateAttrs: IUserOptionalAttrs, updateOptions: UpdateOptions) => (
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
)

const createFirstUserIfNotExist = async () => {
    await syncData().catch((error: any) => { /* TODO */
    });
    UserModel.count().then((numOfUser: number) => {
        if (numOfUser === 0) {
            createUser({
                name: 'first',
                password: 'pass'
            })
            console.log('created!');
        }
    }, (error: any) => {
        console.error(error);
    })
};

if (process.env.CREATE_USER_IF_NOT_EXITS) {
    createFirstUserIfNotExist();
}
