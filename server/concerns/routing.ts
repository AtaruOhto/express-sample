import { NextFunction, Request, Response } from 'express';
import { loginPath, secretPath } from 'controllers/sessions';

export const redirectToLogin = (res: Response) => {
    return res.redirect(loginPath);
}

export const redirectUnlessSession = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return res.redirect(loginPath);
    }
    return next();
};

export const redirectIfSession = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return res.redirect(secretPath);
    }
    return next();
};
