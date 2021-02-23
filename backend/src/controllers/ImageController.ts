import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { createImageService } from '../services/createImageService';
import { getImagesService } from '../services/getImagesService';

export const ImageController = {
  index: async (request: Request, response: Response) => {
    try {
      const images = await getImagesService();

      return response.status(200).json(classToClass(images));
    } catch (err) {
      return response.status(400).json('Unexpected error.');
    }
  },

  create: async (request: Request, response: Response) => {
    const file = request.file;

    try {
      await createImageService(file);
    } catch (err) {
      return response.status(400).json('Unexpected error.');
    }

    return response.status(204).send();
  },
};
