import { getRepository } from 'typeorm';
import { Image } from '../entities/Image';

const getImagesService = async () => {
  const imageRepository = getRepository(Image);

  const images = await imageRepository.find();

  return images;
};

export { getImagesService };
