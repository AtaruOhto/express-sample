import { Express } from 'express';
import { home } from 'controllers/home';
import { newSession, createSession, destroySession } from 'controllers/sessions';
import { usersUpdate, usersEdit } from 'controllers/users';
import { handle404, handle500 } from 'controllers/errors';
import { withoutSession } from 'concerns/routing';
import { withSession } from 'concerns/routing';
import { paths } from 'concerns/path';

export const defineRoutes = (app: Express) => {

    /* home */
    app.get(paths.home.show.route, home);

    /* session */
    app.get(paths.sessions.new.route, withoutSession, newSession);
    app.post(paths.sessions.create.route, createSession);
    app.delete(paths.sessions.destroy.route, withSession, destroySession);

    /* users */
    app.get(paths.users.edit.route, withSession, usersEdit);
    // app.post(secretPath, withSession, usersCreate);
    app.put(paths.users.update.route, withSession, usersUpdate);

    /* Errors */
    app.use(handle500);
    app.use(handle404);
}
