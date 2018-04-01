import { sequelizeInstance } from 'db/dao';
import { Model } from 'sequelize';

/* Private */

const _create = (model: Model<any, any>, attrs: {}): Promise<any> => {
    return new Promise((resolve, reject) => {
        model.create(attrs).then(
            (instance: any) => {
                resolve(instance);
            }, (error: any) => {
                reject(error);
            });
    });
};

const _findOne = (model: Model<any, any>, attrs: {}): Promise<any> => {
    return new Promise((resolve, reject) => {
        model.findOne({where: attrs}).then(
            instance => {
                resolve(instance);
            },
            (error: any) => {
                reject(error);
            });
    });
};

/* Public */

export const syncData = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        sequelizeInstance.sync().then(
            () => {
                resolve();
            },
            (error: any) => {
                reject(error);
            });
    });
}

export const create = async (model: Model<any, any>, modelAttrs: {}): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        await syncData().catch((error: any) => {
            reject(error);
        });
        const instance = await _create(model, modelAttrs).catch((error: any) => {
            reject(error);
        });
        resolve(instance);
    });
};

export const findOne = (model: Model<any, any>, modelAttrs: {}): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        await syncData().catch((error: any) => {
            reject(error);
        });
        const instance = await _findOne(model, modelAttrs).catch((error: any) => {
            reject(error);
        });
        resolve(instance);
    });
};
