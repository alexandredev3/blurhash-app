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
  const [imageIsLoaded, setImageIsLoaded] = useState(true);

  const width = 200;
  const height = 200;

  return (
    <div className="content">
      {
        imageIsLoaded && (
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
        style={{ display: imageIsLoaded ? 'none' : 'unset' }}
        src={src.image_url}
        onLoad={() => setImageIsLoaded(false)}
        alt="Imagem"
        width={width}
        height={height}
      />
    </div>
  );
}

export default Image;
