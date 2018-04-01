import express, {Express} from 'express';

export const useStaticDir = (app: Express) => {
    app.use(express.static('public'));
};
