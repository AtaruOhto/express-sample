import { Request, Response } from 'express';
import { meta } from 'config/meta';
import { paths } from 'concerns/path';

export const home = (req: Request, res: Response) => {
    res.render(paths.home.show.view(), {
        ...meta.index,
        loginPath: paths.sessions.new.route
    });
};
