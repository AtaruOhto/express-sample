import { Express, Request, Response } from 'express';
import { meta } from 'config/meta';
import { getPassport } from 'config/auth';
import {redirectIfSession, redirectToLogin, redirectUnlessSession} from 'concerns/routing';
import { viewPath } from 'concerns/path';
import {makeUpdatePath} from "./users";

export const loginPath = '/sessions/login';
export const logoutPath = '/sessions/logout';
export const secretPath = '/sessions/secret';

export const login = (app: Express) => {
    app.get(
        loginPath,
        redirectIfSession,
        (req: Request, res: Response) => {
            res.render(
                viewPath(loginPath),
                {
                    ...meta.login,
                    notice: req.flash('notice'),
                    loginPath: loginPath
                }
            );
        });

    app.post(
        loginPath,
        getPassport().authenticate('local', {
            successRedirect: secretPath,
            failureRedirect: loginPath,
            successFlash: true,
            failureFlash: true
        }),
    );
};

export const secret = (app: Express) => {
    app.get(secretPath, redirectUnlessSession, (req, res) => {
        if (!(req.user)) {
            console.error('User is null');
            return redirectToLogin(res);
        }

        res.render(
            viewPath(secretPath),
            {
                notice: req.flash('notice'),
                user: req.user,
                logoutPath: logoutPath + '?_method=DELETE',
                userUpdatePath: makeUpdatePath(req.user.id)
            }
        );
    });
};

export const logout = (app: Express) => {
    app.delete(logoutPath, redirectUnlessSession, (req, res) => {
        req.logout();
        req.flash('notice', 'Logout Completed!');
        res.redirect(loginPath);
    });
};
