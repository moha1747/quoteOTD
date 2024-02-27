import mongoose, { ObjectId } from 'mongoose';
import { Request } from 'express';

export interface IUser{
  _id: ObjectId; 
  username: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  quotes: string[];
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  authentication: { 
    password: { type: String, required: true },
    salt: { type: String, select: false }, 
    sessionToken: { type: String, select: false } },
  quotes: [String],
});

const User = mongoose.model('User', userSchema);



export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => User.findOne({
    'authentication.sessionToken': sessionToken,
});

export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) => new User(values)
    .save().then((user) => user.toObject());

export const deleteUserById = (id: string) => User.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values);

export default User;
