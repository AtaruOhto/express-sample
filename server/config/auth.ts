import { Express } from 'express';
import { PassportStatic } from 'passport';
import passport from 'passport';
import {Strategy as LocalStrategy } from 'passport-local';

import { findOneUser } from 'models/user';
import { comparePlainWithHash } from 'concerns/bcrypt';
import { stdOut, stdErr } from 'concerns/logger';

const authSuccess = (done: Function, user: any, req: any): Function => {
    const msg = 'LOGIN SUCCESS';
    stdOut(msg + user.name);
    req.flash('notice', msg);
    return done(null, user);
};

const authFailed = (done: Function, req: any, error = ''): Function => {
    const msg = 'LOGIN FAILED';
    stdErr(msg + error);
    req.flash('notice', msg + error);
    return done(null, false);
};

const usePassportLocalStrategy = (passportStatic: PassportStatic) => {
    passportStatic.serializeUser(function (user: any, done: Function) {
        done(null, user);
    });

    passportStatic.deserializeUser(function (user: any, done: Function) {
        done(null, user);
    });

    passportStatic.use(new LocalStrategy({
            passReqToCallback: true,
        },
        async(req: any, name: string, password: string, done: Function) => {
            const user = await findOneUser({name: name}).catch((error: any) => {
                return authFailed(done, req, error);
            });

            if (!(user)) {
                return authFailed(done, req, ` User ${name} does not exist!`);
            }

            const isPasswordValid = await comparePlainWithHash(password, user.password).catch((error: any) => {
                return authFailed(done, req, error);
            });

            return isPasswordValid ? authSuccess(done, user, req) : authFailed(done, req);
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
