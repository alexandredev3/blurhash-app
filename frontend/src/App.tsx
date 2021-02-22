import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Lottie, { Options } from 'react-lottie';

import { Image } from './components/Image';
import loadingPaperplane from './assets/animations/loading-paperplane.json';
import { useApi } from './hooks/ApiContext';

import './App.css';

type Data = {
  id: string;
  image_url: string;
  hash: string;
}

function App() {
  const { api } = useApi();

  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<File[]>([]);

  const loadingOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: loadingPaperplane,
  }

  useEffect(() => {
    api({
      url: '/images',
      method: 'GET'
    }).then((response) => {
      const { data } = response;

      setLoading(false);
      return setData(data);
    }).catch(() => {
      return;
    })
  }, []);

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    
    if (!files) {
      return;
    }

    const images = [...files];

    setImages(images);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    images.map((image) => {
      data.append('image', image);
    });

    try {
      await api({
        method: 'POST',
        url: '/image',
        data
      });

      alert("Imagem enviada com sucesso!");
    } catch(err) {
      alert(err);
    }
  }

  return (
    <div className="App">
      <form onSubmit={(event) => handleSubmit(event)} className="form__container">
        <input 
          type="file" 
          name="file" 
          onChange={(event) => handleImage(event)} 
        />
        <button>Enviar</button>
      </form>
      {
        loading ? (
          <div className="loading__content">
            <Lottie 
              options={loadingOptions}
              width={300}
              height={300}
              isClickToPauseDisabled={true}
            />
          </div>
        ) : (
          <div className="images__container">
            {
              data.map((image: Data) => {
                return (
                  <Image key={image.id} src={image} />
                )
              })
            }
          </div>
        )
      }
    </div>
  );
}

export default App;
