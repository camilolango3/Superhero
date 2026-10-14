
import { useState, useEffect } from 'react';

import Inicio from './assets/components/inicio/index.jsx';
import Coleccion from './assets/components/coleccion/index.jsx';
import Favoritos from './assets/components/favoritos/index.jsx';
import Duelo from './assets/components/duelo/index.jsx';
import Info from './assets/components/info/index.jsx';
import Usuario from './assets/components/usuario/index.jsx';
import Superheroe from './assets/components/superheroe/index.jsx';

export default function App() {
  const [pagina, setPagina] = useState('Inicio');
  const [personajes, setPersonajes] = useState([]);
  const [coleccion, setColeccion] = useState(() => {
    const guardados = localStorage.getItem('coleccion');
    return guardados ? JSON.parse(guardados) : [];
  });
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem('favoritos');
    return guardados ? JSON.parse(guardados) : [];
  });
  const [heroe, setHeroe] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json')
      .then(respuesta => respuesta.json())
      .then(datos => setPersonajes(datos))
      .catch(() => alert('No se pudieron cargar los personajes'));
  }, []);

  useEffect(() => {
    localStorage.setItem('coleccion', JSON.stringify(coleccion));
  }, [coleccion]);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  function cambiarPagina(nombre) {
    setHeroe(null);
    setPagina(nombre);
  }

  function agregarColeccion(personaje) {
    if (!coleccion.some(item => item.id === personaje.id)) {
      setColeccion([...coleccion, personaje]);
    }
  }

  function quitarColeccion(id) {
    setColeccion(coleccion.filter(item => item.id !== id));
  }

  function agregarFavorito(personaje) {
    if (!favoritos.some(item => item.id === personaje.id)) {
      setFavoritos([...favoritos, personaje]);
    }
  }

  function quitarFavorito(id) {
    setFavoritos(favoritos.filter(item => item.id !== id));
  }

  return (
    <div>
      <header>
        <h1>Superhéroes</h1>

        <nav>
          <button onClick={() => cambiarPagina('Inicio')}>
            Inicio
          </button>

          <button onClick={() => cambiarPagina('Colección')}>
            Colección
          </button>

          <button onClick={() => cambiarPagina('Favoritos')}>
            Favoritos
          </button>

          <button onClick={() => cambiarPagina('Duelo')}>
            Duelo
          </button>

          <button onClick={() => cambiarPagina('Info')}>
            Info
          </button>

          <button onClick={() => cambiarPagina('Usuario')}>
            Usuario
          </button>
        </nav>
      </header>

      <main>
        {heroe ? (
          <div>
            <button onClick={() => setHeroe(null)}>
              Volver
            </button>

            <Superheroe heroe={heroe} />

            <button onClick={() => agregarFavorito(heroe)}>
              {favoritos.some(item => item.id === heroe.id)
                ? 'Ya está en favoritos'
                : 'Añadir a favoritos'}
            </button>
          </div>
        ) : (
          <>
            {pagina === 'Inicio' && (
              <Inicio
                abrirHeroe={setHeroe}
                coleccion={coleccion}
                agregarColeccion={agregarColeccion}
                favoritos={favoritos}
                agregarFavorito={agregarFavorito}
              />
            )}

            {pagina === 'Colección' && (
              <Coleccion
                personajes={personajes}
                coleccion={coleccion}
                abrirHeroe={setHeroe}
                agregarColeccion={agregarColeccion}
                quitarColeccion={quitarColeccion}
              />
            )}

            {pagina === 'Favoritos' && (
              <Favoritos
                favoritos={favoritos}
                abrirHeroe={setHeroe}
                quitarFavorito={quitarFavorito}
              />
            )}

            {pagina === 'Duelo' && (
              <Duelo abrirHeroe={setHeroe} />
            )}

            {pagina === 'Info' && (
              <Info personajes={personajes} />
            )}

            {pagina === 'Usuario' && (
              <Usuario
                coleccion={coleccion}
                favoritos={favoritos}
                personajes={personajes}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
