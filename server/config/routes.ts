import { Express } from 'express';
import { home } from 'controllers/home';
import { newSession, createSession, destroySession } from 'controllers/sessions';
import { usersIndex, usersNew, usersUpdate, usersEdit, usersCreate, usersDestroy } from 'controllers/users';
import { handle404, handle500 } from 'controllers/errors';
import { withoutSession, withAdminSession, withSession } from 'concerns/routing';
import { paths } from 'concerns/path';

export const defineRoutes = (app: Express) => {

    /* home */
    app.get(paths.home.show.route, home);

    /* session */
    app.get(paths.sessions.new.route, withoutSession, newSession);
    app.post(paths.sessions.create.route, createSession);
    app.delete(paths.sessions.destroy.route, withSession, destroySession);

    /* users */
    app.get(paths.users.index.route, withAdminSession, usersIndex);
    app.get(paths.users.new.route, withAdminSession, usersNew);
    app.post(paths.users.create.route, withAdminSession, usersCreate);
    app.get(paths.users.edit.route, withSession, usersEdit);
    app.put(paths.users.update.route, withSession, usersUpdate);
    app.delete(paths.users.destroy.route, withAdminSession, usersDestroy);

    /* Errors */
    app.use(handle500);
    app.use(handle404);
}
