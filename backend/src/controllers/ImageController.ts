import { Request, Response } from 'express';
import { Image } from '../entities/Image';
import { classToClass } from 'class-transformer';

import { createImageService } from '../services/createImageService';
import { getImagesService } from '../services/getImagesService';

export const ImageController = {
  index: async (
    request: Request,
    response: Response
  ): Promise<Response<Image[]>> => {
    const images = await getImagesService();

    return response.status(200).json(classToClass(images));
  },

  create: async (request: Request, response: Response): Promise<void> => {
    const file = request.file;

    await createImageService(file);

    response.status(204).send();
  },
};
