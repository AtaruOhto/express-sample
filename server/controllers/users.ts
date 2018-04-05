import { Response, Request } from 'express';
import { redirectToLogin } from 'concerns/routing';
import { findOneUser, updateUser } from 'models/user';
import { logoutPath, secretPath } from 'controllers/sessions';
import { getFilledParams } from 'concerns/queryParams';
import { viewPath } from 'concerns/path';

export const updatePath = '/users/:id';
export const makeUpdatePath = (id: string) => (
    `/users/${id}?_method=PUT`
);

export const usersUpdate = async (req: Request, res: Response) => {
    if (!(req.user)) { throw new Error('user is null'); }
    const user = await findOneUser(req.user.id).catch((error: any) => { console.error(error); });
    const updateParams = getFilledParams(['name', 'password'], req.body);
    updateUser(user, updateParams, {where: {name: user.name }}).catch((error: any) => { console.error(error); });
    req.flash('notice', 'User info was successfully updated!');
    redirectToLogin(res);
}

export const usersEdit = (req: Request, res: Response) => {
    if (!(req.user)) { throw new Error('user is null'); }
    res.render(
        viewPath(secretPath),
        {
            notice: req.flash('notice'),
            user: req.user,
            logoutPath: logoutPath + '?_method=DELETE',
            userUpdatePath: makeUpdatePath(req.user.id)
        }
    );
};
