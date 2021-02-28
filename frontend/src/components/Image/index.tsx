import {useState } from 'react';
import { Blurhash } from 'react-blurhash';

interface Props {
  src: {
    id: string;
    image_url: string;
    hash: string;
  }
}

export function Image({ src }: Props) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const width = 200;
  const height = 200;

  return (
    <div className="content">
      {
        isImageLoading && (
          <Blurhash
            className="blurhash"
            hash={src.hash}
            width={width}
            height={height}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        )
      }

      <img
        className="imagem"
        style={{ display: isImageLoading ? 'none' : 'unset' }}
        src={src.image_url}
        onLoad={() => setIsImageLoading(false)}
        alt="Imagem"
        width={width}
        height={height}
      />
    </div>
  );
}

export default Image;
