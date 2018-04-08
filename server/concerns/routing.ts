import { NextFunction, Request, Response } from 'express';
import { paths } from 'concerns/path';

export const withAdminSession = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.redirect(paths.sessions.new.route);
    }

    if (!req.isAuthenticated()) {
        return res.redirect(paths.sessions.new.route);
    }

    if (req.user.type !== 'master') {
        return res.send('operation not permitted');
    }

    return next();
}

export const withSession = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return res.redirect(paths.sessions.new.route);
    }
    return next();
};

export const withoutSession = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        if (req.user) {
            return res.redirect(paths.users.edit.dynamic(req.user.id));
        } else {
            return next();
        }
    }
    return next();
};
