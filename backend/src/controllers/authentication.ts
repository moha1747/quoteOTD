import  User  from '../db/users'; 
import { createUser, getUserByEmail } from '../db/users';
import express from 'express';
import { authentication, random } from '../helpers';
import { useNavigate } from 'react-router-dom';

export const login = async (req: express.Request, res: express.Response) =>{
    try{
        const { email, password } = req.body;
        
        if (!email || !password){
            return res.sendStatus(400);
        }
        
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash ){
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie('QUOTE-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'});
        // localStorage.setItem('userId', user._id.toString());

        return res.status(200).json({ userId: user._id, sessionToken: user.authentication.sessionToken});

    } catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
    
}
export const register = async (req: express.Request, res: express.Response) =>{
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        
        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            },
        });

        return res.status(200).json({ userId: user._id, sessionToken: user.authentication.sessionToken});
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const logout = async (req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies['QUOTE-AUTH'];

        if (!sessionToken) {
            console.log('!sessionToken')
            return res.sendStatus(400);
        }

        const user = await User.findOne({'authentication.sessionToken': sessionToken});

        if (!user) {
            res.clearCookie('QUOTE-AUTH', {domain: 'localhost', path: '/'});
            return res.sendStatus(200);
        }
        user.authentication.sessionToken = '';
        res.clearCookie('QUOTE-AUTH', { domain: 'localhost', path: '/' });
        await user.save();
        return res.json({ success: true, message: 'Logged out successfully' });

    } catch (error){
        console.log(error);
        return res.sendStatus(400);
    }

}