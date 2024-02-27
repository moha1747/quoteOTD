import express from 'express';

import { register, login, logout } from '../controllers/authentication';
import { isAuthenticated } from '../middlewares/index';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.post('/signout', logout);
    router.post('/api/secure-route', isAuthenticated, (req, res) => {

        // const userId = req.user._id;
        // You can now use userId to access or modify the authenticated user's data
      });

}