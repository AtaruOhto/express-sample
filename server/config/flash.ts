import { Express } from 'express';
import flash from 'connect-flash';

export const useFlash = (app: Express) => {
    app.use(flash());
};
