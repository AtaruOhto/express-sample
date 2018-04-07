import { Request, Response } from 'express';
import { meta } from 'config/meta';
import { getPassport } from 'config/auth';
import { viewPath } from 'concerns/path';

export const loginPath = '/sessions/login';
export const logoutPath = '/sessions/logout';
export const secretPath = '/sessions/secret';

export const newSession = (req: Request, res: Response) => {
    res.render(
        viewPath(loginPath),
        {
            ...meta.login,
            notice: req.flash('notice'),
            loginPath: loginPath
        }
    );
};

export const createSession = getPassport().authenticate('local', {
    successRedirect: secretPath,
    failureRedirect: loginPath,
    successFlash: true,
    failureFlash: true
});

export const destoroySession = (req: Request, res: Response) => {
    req.logout();
    req.flash('notice', 'Logout Completed!');
    res.redirect(loginPath);
}
