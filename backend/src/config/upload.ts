import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err, file.originalname);

        const fileName = `${res.toString('hex')}-${Date.now()}-${
          file.originalname
        }`;

        return cb(null, fileName);
      });
    },
  }),
};
