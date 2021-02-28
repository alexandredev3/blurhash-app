import 'reflect-metadata';
import express from 'express';
import { routes } from './routes';
import { resolve } from 'path';
import cors from 'cors';

import './database/connection';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));

app.listen(3333 || process.env.PORT, () => {
  return console.log('Server is Running...');
});
