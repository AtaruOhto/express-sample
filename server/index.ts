require('dotenv').config();
console.log(__dirname)
require('app-module-path').addPath(__dirname);
import express, { Express } from 'express';
import { setTimeZone } from 'config/timeZone';
import { defineRoutes } from 'config/routes';
import { useStaticDir } from 'config/static';
import { useSecurityMiddlewares } from 'config/security';
import { useRequestMiddlewares } from 'config/request';
import { setViewEngine } from 'config/viewEngine';
import { useAuthMiddlewares } from 'config/auth';
import { useFlash } from 'config/flash';
import { useLogger } from 'config/logger';
import { useSessionMiddlewares } from 'config/session';

const listen = (app: Express) => {
    app.listen(process.env.APP_PORT, () => {
        console.log('Node Process is running at port : ' + process.env.APP_PORT);
    });
};

const defRoutes = (app: Express) => {
    defineRoutes(app);
};

const configureServer = (app: Express) => {
    setTimeZone();
    useRequestMiddlewares(app);
    useFlash(app);
    useStaticDir(app);
    setViewEngine(app);
    useSessionMiddlewares(app);
    useSecurityMiddlewares(app);
    useAuthMiddlewares(app);
    useLogger(app);
};

const startServer = () => {
    const app = express();
    configureServer(app);
    defRoutes(app);
    listen(app);
};

startServer();
