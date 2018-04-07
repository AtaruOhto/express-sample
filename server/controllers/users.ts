import { Response, Request } from 'express';
import { findOneUser, updateUser } from 'models/user';
import { getFilledParams } from 'concerns/queryParams';
import { paths } from 'concerns/path';

// export const updatePath = '/users/:id';
// export const makeUpdatePath = (id: string) => (
//     `/users/${id}?_method=PUT`
// );

export const usersUpdate = async (req: Request, res: Response) => {
    if (!(req.user)) { throw new Error('user is null'); }
    const user = await findOneUser(req.user.id).catch((error: any) => { console.error(error); });
    const updateParams = getFilledParams(['name', 'password'], req.body);
    updateUser(user, updateParams, {where: {name: user.name }}).catch((error: any) => { console.error(error); });
    req.flash('notice', 'User info was successfully updated!');
    res.redirect(paths.sessions.new.route);
}

export const usersEdit = (req: Request, res: Response) => {
    if (!(req.user)) { throw new Error('user is null'); }
    res.render(
        paths.users.edit.view(),
        {
            notice: req.flash('notice'),
            user: req.user,
            logoutPath: paths.sessions.destroy.dynamic(),
            userUpdatePath: paths.users.update.dynamic(req.user.id)
        }
    );
};
