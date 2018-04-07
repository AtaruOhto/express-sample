import { Request, Response } from 'express';
import { meta } from 'config/meta';
import { getPassport } from 'config/auth';
import { paths } from 'concerns/path';

export const newSession = (req: Request, res: Response) => {
    res.render(
        paths.sessions.new.view(),
        {
            ...meta.login,
            notice: req.flash('notice')
        }
    );
};

export const createSession = getPassport().authenticate('local', {
    successRedirect: paths.users.edit.route,
    failureRedirect: paths.sessions.new.route,
    successFlash: true,
    failureFlash: true
});

export const destroySession = (req: Request, res: Response) => {
    req.logout();
    req.flash('notice', 'Logout Completed!');
    res.redirect(paths.sessions.new.route);
}
