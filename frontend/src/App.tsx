import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Image } from './components/Image';
import loadingPaperplane from './assets/animations/loading-paperplane.json';
import { apiService } from './services/api';

import './App.css';

type Data = {
  id: string;
  image_url: string;
  hash: string;
}

function App() {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    apiService.get('/images').then((response) => {
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

    if (!images) {
      return alert('Selecione uma imagem!!');
    }

    images.map((image) => {
      data.append('image', image);
    });

    try {
      await apiService.post('/image', data);

      alert("Imagem enviada com sucesso!");
      
      setImages([]);
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
      <div className="images__container">
        {
          data.map((image: Data) => {
            return (
              <Image key={image.id} src={image} />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
