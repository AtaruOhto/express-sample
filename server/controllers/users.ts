import { Express } from 'express';
import { redirectToLogin , redirectUnlessSession} from 'concerns/routing';
import { findOneUser, updateUser } from 'models/user';
import { secretPath } from 'controllers/sessions';
import { getFilledParams } from 'concerns/queryParams';

export const updatePath = '/users/:id';
export const makeUpdatePath = (id: string) => (
    `/users/${id}?_method=PUT`
);

export const userUpdate = (app: Express) => {
    app.put(updatePath, redirectUnlessSession, async (req, res) => {
        if (!(req.user)) {
            return redirectToLogin(res);
        }
        const user = await findOneUser(req.user.id).catch((error: any) => { console.error(error); });
        const updateParams = getFilledParams(['name', 'password'], req.body);
        updateUser(user, updateParams, {where: {name: user.name }}).catch((error: any) => { console.error(error); });
        req.flash('notice', 'User info was successfully updated!');
        res.redirect(secretPath);
    });
};
