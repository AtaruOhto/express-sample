import { Request, Response } from 'express';
import {meta} from 'config/meta';
import {loginPath} from 'controllers/sessions';

export const home = (req: Request, res: Response) => {
    res.render('home', {...meta.index, loginPath: loginPath});
};
