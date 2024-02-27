import express from 'express';
import User  from '../db/users';
import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/save/:id', isAuthenticated, isOwner, updateUser);
    router.get('/users/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
        try {
          const user = await User.findById(req.params._id);
          if (!user) {
            return res.status(404).send('User not found');
          }
          res.json(user);
        } catch (error) {
          console.error('Error fetching user:', error);
          res.status(500).send('Internal server error');
        }
      });

}