import express from 'express';

import authentication from './authentication';
import users from './users';
import quotes from './quotes'

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    quotes(router)
    
    return router;
};