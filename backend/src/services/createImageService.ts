import sharp from 'sharp';
import { encode } from 'blurhash';
import { getRepository } from 'typeorm';
import { Image } from '../entities/Image';

const encodeImageToBlurHash = (
  buffer: Buffer,
  width: number,
  height: number
): string => {
  const hash = encode(new Uint8ClampedArray(buffer), width, height, 4, 4);

  return hash;
};

const getImageHash = async (path: string): Promise<string | Error> => {
  return new Promise((resolve, reject) => {
    sharp(path)
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

  /**
   * if using the server URL will not work, we need to use the entire directory of our project.
   * e.g. /home/user/blurhash/backend/temp/uploads/filename.png;
   */
  const hash = await getImageHash(`${process.cwd()}/uploads/${filename}`)
    .then((hash) => {
      return hash as string;
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });

  const image = imageRepository.create({
    path: filename,
    hash,
  });

  await imageRepository.save(image);
};

export { createImageService };
