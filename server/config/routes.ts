import { Express } from 'express';
import { home } from 'controllers/home';
import { login, logout, secret } from 'controllers/sessions';
import { userUpdate } from "controllers/users";

export const defineRoutes = (app: Express) => {
    home(app);
    login(app);
    logout(app);
    secret(app);
    userUpdate(app);
}
