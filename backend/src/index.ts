//important info dont scroll
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import { getUserById } from './db/users';
import * as dotenv from 'dotenv';



const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.get('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
  
    getUserById(userId)
      .then(user => {
        res.json(user);
      })
      .catch(error => {
        res.status(500).send(error.message);
      });
  });
  
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text());


const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on https://localhost:8080');
})
dotenv.config();

const MONGO_URL = 'mongodb://localhost:27017'
console.log(process.env.MONGO_URL)

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());

