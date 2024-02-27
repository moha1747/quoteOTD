import express from 'express';
import { Request, Response } from 'express';
import User from '../db/users';
import fs from 'fs';
import path from 'path';

import { deleteUserById, getUserById, getUsers } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
        
    }
}

export const updateUser = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);
        if (user){
            user.username = username;
            await user.save();
        }
        else{
            console.log("Error saving user");
        }
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
        
    }
}