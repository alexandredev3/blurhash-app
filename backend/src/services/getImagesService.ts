import { getRepository } from 'typeorm';
import { Image } from '../entities/Image';
import { APP_URL } from '../utils/environment';

const getImage = (image: Image) => {
  const { id, path, hash } = image;

  return {
    id,
    image_url: `${APP_URL}/uploads/${path}`,
    hash,
  };
};

const getImages = (images: Image[]) => {
  const image = images.map((image) => {
    return getImage(image);
  });

  return image;
};

const getImagesService = async () => {
  const imageRepository = getRepository(Image);

  const images = await imageRepository.find();

  return getImages(images);
};

export { getImagesService };
