import { Request, Response } from 'express';
import { Image } from '../entities/Image';

import { createImageService } from '../services/createImageService';
import { getImagesService } from '../services/getImagesService';

export const ImageController = {
  index: async (request: Request, response: Response) => {
    const images = await getImagesService();

    return response.status(200).json(images);
  },

  create: async (request: Request, response: Response): Promise<void> => {
    const file = request.file;

    await createImageService(file);

    response.status(204).send();
  },
};
