import { Express } from 'express';
const cookieParser = require('cookie-parser');
const session = require('express-session');

const useCookieParser = (app: Express) => {
    app.use(cookieParser());
};

/* Use Redis as Session Store*/
// const RedisStore = require('connect-redis')(session);
// const useRedisSession = (app: Express) => {
//     app.use(session(
//         {
//             secret: process.env.SECRET_KEY_BASE,
//             resave: true,
//             saveUninitialized: true,
//             maxAge: 1000 * 60 * 60 * 90,
//             store: new RedisStore({
//                 host: process.env.REDIS_HOST,
//                 port: process.env.REDIS_PORT,
//             }),
//             cookie: {
//                 path: '/'
//             }
//         }
//         )
//     );
// }

/* Use Sequelize as Session Store */

import { sequelizeInstance } from 'db/dao';
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const useSequelizeSession = (app: Express) => {
    app.use(session(
        {
            secret: process.env.SECRET_KEY_BASE,
            saveUninitialized: true,
            cookie: {
                path: '/'
            },
            store: new SequelizeStore({
                db: sequelizeInstance,
                checkExpirationInterval: 1000 * 60 * 60 * 24 * 7,
                expiration: 1000 * 60 * 60 * 24 * 30,
            }),
            resave: false,
            proxy: true
        }
        )
    );
}

const useOnMemorySession = (app: Express) => {
    app.use(session(
        {
            secret: process.env.SECRET_KEY_BASE,
            saveUninitialized: true,
            maxAge: 1000 * 60 * 60 * 90,
            cookie: {
                path: '/'
            },
            resave: false,
        }
        )
    );
}

const useSession = (app: Express) => {

        // useOnMemorySession(app);

        useSequelizeSession(app);

};

export const useSessionMiddlewares = (app: Express) => {
    useCookieParser(app);
    useSession(app);
};