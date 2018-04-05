import { Express } from 'express';
import { home } from 'controllers/home';
import { newSession, createSession, destorySession } from 'controllers/sessions';
import { usersUpdate, usersEdit } from 'controllers/users';
import { handle404, handle500 } from 'controllers/errors';
import { withoutSession } from 'concerns/routing';
import { withSession } from 'concerns/routing';
import { updatePath } from 'controllers/users';

export const homePath = '/';
export const loginPath = '/sessions/login';
export const logoutPath = '/sessions/logout';
export const secretPath = '/sessions/secret';

export const defineRoutes = (app: Express) => {

    /* home */
    app.get(homePath, home);

    /* session */
    app.get(loginPath, withoutSession, newSession);
    app.post(loginPath, createSession);
    app.delete(logoutPath, withSession, destorySession);

    /* users */
    app.get(secretPath, withSession, usersEdit);
    app.put(updatePath, withSession, usersUpdate);

    /* Errors */
    app.use(handle500);
    app.use(handle404);
}
