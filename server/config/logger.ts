import { Express } from 'express';
import logger from 'morgan';

export const useLogger = (app: Express) => {
    app.use(logger('dev'));
};
