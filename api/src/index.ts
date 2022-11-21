import path from 'node:path';
import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import { router } from './router';

dotenv.config();
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    const port = 3002;


    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    server.listen(port, () => {
      console.log(`🚀Server is running na Porta ${port}`);
    });
  })
  .catch(() => console.log('Erro ao conectar no mongodb!'));


