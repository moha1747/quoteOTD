import express from 'express';

import { register, login, logout } from '../controllers/authentication';
import { isAuthenticated } from '../middlewares/index';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.post('/signout', isAuthenticated, logout);
    router.post('/api/secure-route', isAuthenticated)
}


