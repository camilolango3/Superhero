
import { useState, useEffect } from 'react';
import './style.css';

function Inicio({ abrirHeroe, favoritos = [], agregarFavorito }) {
  const [todosLosHeroes, setTodosLosHeroes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('Todos');
  const [editorial, setEditorial] = useState('Todas');

  useEffect(() => {
    const cargarHeroes = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json'
        );

        if (!response.ok) {
          throw new Error('No se pudieron cargar los superhéroes');
        }

        const responseData = await response.json();
        setTodosLosHeroes(responseData ?? []);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    cargarHeroes();
  }, []);

  const resultados = busqueda.trim().length >= 3
    ? todosLosHeroes.filter((heroe) =>
        heroe.name.toLowerCase().includes(busqueda.trim().toLowerCase())
      )
    : todosLosHeroes;

  const tipos = ['Todos', 'Superhéroes', 'Villanos'];

  const heroesFiltrados = resultados.filter((heroe) => {
    const coincideTipo =
      tipo === 'Todos' ||
      (tipo === 'Superhéroes' &&
        heroe.biography.alignment === 'good') ||
      (tipo === 'Villanos' &&
        heroe.biography.alignment === 'bad');

    const coincideEditorial =
      editorial === 'Todas' ||
      (editorial === 'Marvel Comics' &&
        heroe.biography.publisher === 'Marvel Comics') ||
      (editorial === 'DC Comics' &&
        heroe.biography.publisher === 'DC Comics') ||
      (editorial === 'Extras' &&
        heroe.biography.publisher !== 'Marvel Comics' &&
        heroe.biography.publisher !== 'DC Comics');

    return coincideTipo && coincideEditorial;
  });

  if (todosLosHeroes.length === 0) {
    return <p>Cargando superhéroes...</p>;
  }

  return (
    <>
      <div className="c-filtro">
        {tipos.map((unTipo) => (
          <button
            type="button"
            key={unTipo}
            onClick={() => setTipo(unTipo)}
          >
            {unTipo}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar superhéroe"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <select
        value={editorial}
        onChange={(e) => setEditorial(e.target.value)}
      >
        <option value="Todas">Todas las editoriales</option>
        <option value="Marvel Comics">Marvel Comics</option>
        <option value="DC Comics">DC Comics</option>
        <option value="Extras">Personajes extra</option>
      </select>

      {heroesFiltrados.length === 0 ? (
        <p>No se encontraron superhéroes.</p>
      ) : (
        heroesFiltrados.map((heroe) => (
          <div
            key={heroe.id}
            onClick={() => abrirHeroe(heroe)}
          >
            <p>{heroe.id}</p>
            <p>{heroe.name}</p>

            <img
              src={heroe.images.sm}
              alt={heroe.name}
              width="auto"
              height="60"
              loading="lazy"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                if (!favoritos.some((f) => f.id === heroe.id)) {
                  agregarFavorito(heroe);
                }
              }}
            >
              {favoritos.some((f) => f.id === heroe.id)
                ? 'En favoritos'
                : 'Agregar a favoritos'}
            </button>
          </div>
        ))
      )}
    </>
  );
}

export default Inicio;
