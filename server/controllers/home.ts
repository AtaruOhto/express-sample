import { Request, Response } from 'express';
import {meta} from 'config/meta';
import {loginPath} from 'controllers/sessions';

export const home = (req: Request, res: Response) => {
    if (1 === 1) throw new Error('ha?')
    res.render('home', {...meta.index, loginPath: loginPath});
};
