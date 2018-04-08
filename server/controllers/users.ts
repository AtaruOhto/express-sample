import { Response, Request } from 'express';
import { createUser, findOneUser, updateUser, UserModel } from 'models/user';
import { getFilledParams } from 'concerns/queryParams';
import { paths } from 'concerns/path';

export const usersUpdate = async (req: Request, res: Response) => {
    if (!(req.user)) { throw new Error('user is null'); }
    const user = await findOneUser(req.user.id).catch((error: any) => { console.error(error); });
    const updateParams = getFilledParams(['name', 'password'], req.body);
    updateUser(user, updateParams, {where: {name: user.name }}).catch((error: any) => { console.error(error); });
    req.flash('notice', 'User info was successfully updated!');
    res.redirect(paths.sessions.new.route);
};

export const usersEdit = (req: Request, res: Response) => {
    if (!(req.user)) { throw new Error('user is null'); }
    res.render(
        paths.users.edit.view(),
        {
            notice: req.flash('notice'),
            user: req.user,
            logoutPath: paths.sessions.destroy.dynamic(),
            userUpdatePath: paths.users.update.dynamic(req.user.id),
            userIndexPath: paths.users.index.route
        }
    );
};

export const usersIndex = async(req: Request, res: Response) => {
    if (!(req.user)) { throw new Error('user is null'); }

    const users = await UserModel.findAll().catch((error: any) => { console.error(error); });
    const userWithUpdate = users.map((user: any) => {
        user.updatePath = paths.users.update.dynamic(user.id);
        user.destroyPath = paths.users.destroy.dynamic(user.id);
        return user;
    });

    res.render(
        paths.users.index.view(),
        {
            users: userWithUpdate,
            createPath: paths.users.new.route,
        }
    );
};

export const usersNew = async(req: Request, res: Response) => {
    res.render(
        paths.users.new.view(), {
            usersCreatePath: paths.users.create.route
        }
    );
};

export const usersCreate = async(req: Request, res: Response) => {
    const newUser = await createUser({name: req.body.name, password: req.body.password, type: 'normal'}).catch((error: any) => { console.error(error); });
    res.send(newUser);
}

export const usersDestroy = async(req: Request, res: Response) => {
    const deleted = await UserModel.destroy(
        {where: {
            id: req.body.id
        }
    }).catch((error: any) => (console.error(error)));

    res.send('deleted' + deleted + 'user');
}
