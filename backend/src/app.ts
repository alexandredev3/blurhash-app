import 'reflect-metadata';
import express from 'express';
import { routes } from './routes';
import { resolve } from 'path';

import './database/connection';

const app = express();

app.use(express.json());
app.use(routes);
app.use(
  '/uploads',
  express.static(resolve(__dirname, '..', 'temp', 'uploads'))
);

app.listen(3333, () => {
  return console.log('Server is Running...');
});
