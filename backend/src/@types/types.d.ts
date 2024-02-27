// types.d.ts
import  { IUser }  from '../../src/db/users'; // Adjust the import path as necessary
import express from 'express';
declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Make user optional or required based on your application logic
    }
  }
}
