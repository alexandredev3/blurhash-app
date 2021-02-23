import sharp from 'sharp';
import { encode } from 'blurhash';
import axios from 'axios';

import { getRepository } from 'typeorm';
import { Image } from '../entities/Image';
import { APP_URL } from '../utils/environment';

const api = axios.create({
  baseURL: APP_URL,
});

const encodeImageToBlurHash = (
  buffer: Buffer,
  width: number,
  height: number
): string => {
  const hash = encode(new Uint8ClampedArray(buffer), width, height, 4, 4);

  return hash;
};

const getImageHash = async (path: string): Promise<string> => {
  const { data } = await api({
    url: `/uploads/${path}`,
    responseType: 'arraybuffer',
  });

  return new Promise((resolve, reject) => {
    sharp(data)
      .raw()
      .ensureAlpha()
      .resize({ width: 300, height: 300, fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) {
          reject(err);
        }

        const hash = encodeImageToBlurHash(buffer, width, height);

        resolve(hash);
      });
  });
};

const createImageService = async (file: Express.Multer.File): Promise<void> => {
  const { filename } = file;

  const imageRepository = getRepository(Image);

  await getImageHash(filename)
    .then(async (hash) => {
      const image = imageRepository.create({
        path: filename,
        hash,
      });

      await imageRepository.save(image);
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};

export { createImageService };
