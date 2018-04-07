import { Express, Request } from 'express';
import { PassportStatic } from 'passport';
import passport from 'passport';
import {Strategy as LocalStrategy } from 'passport-local';

import { findOneUser, TUser } from 'models/user';
import { comparePlainWithHash } from 'concerns/bcrypt';

const authSuccess = (done: Function, user: TUser, req: Request): Promise<Function> => (
    new Promise((resolve, reject) => {
        if (req.session) {
            req.session.save(() => {
                const msg = 'LOGIN SUCCESS';
                console.log(msg + user.name);
                req.flash('notice', msg);
                resolve(done(null, user));
            });
        } else {
            reject('error request session is null');
        }
    })
)

const authFailed = (done: Function, req: Request, error = ''): Promise<Function> => (
    new Promise((resolve, reject) => {
        if (req.session) {
            req.session.save(() => {
                const msg = 'LOGIN FAILED';
                console.error(msg + error);
                req.flash('notice', msg + error);
                console.log('hello')
                resolve(done(null, false));
            });
        } else {
            reject('error request session is null');
        }
    })
)

const usePassportLocalStrategy = (passportStatic: PassportStatic) => {
    passportStatic.serializeUser(function (user: TUser, done: Function) {
        console.log("erialize")
        done(null, user);
    });

    passportStatic.deserializeUser(function (user: TUser, done: Function) {
        console.log("deserialize")
        done(null, user);
    });

    passportStatic.use(new LocalStrategy(

        {passReqToCallback: true, }, async(req: Request, name: string, password: string, done: Function) => {

            process.nextTick(async () => {
                const user = await findOneUser({name: name}).catch((error: any) => {
                    return authFailed(done, req, error);
                });

                if (!(user)) {
                    return await authFailed(done, req, ` User ${name} does not exist!`);
                }

                const isPasswordValid = await comparePlainWithHash(password, user.password).catch(async (error: any) => {
                    return await authFailed(done, req, error);
                });

                return isPasswordValid ? await authSuccess(done, user, req) : await authFailed(done, req);
            });
        }));
};

const usePassport = (app: Express) => {
    app.use(passport.initialize());
    app.use(passport.session());
    usePassportLocalStrategy(passport);
};

export const useAuthMiddlewares = (app: Express) => {
    usePassport(app);
};

export const getPassport = () => (
    passport
);
