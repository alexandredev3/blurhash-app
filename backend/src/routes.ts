import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import { ImageController } from './controllers/ImageController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/images', ImageController.index);
routes.post('/image', upload.single('image'), ImageController.create);

export { routes };
