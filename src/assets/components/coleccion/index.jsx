import { useState } from 'react';
import './style.css';

function Coleccion({ personajes, coleccion, abrirHeroe, agregarColeccion }) {
  const [nuevos, setNuevos] = useState([]);

  const totalHeroes = personajes.length;

  const espacio = Array.from(
    { length: totalHeroes },
    (_, i) => i + 1
  );

  const desbloquearAleatorios = () => {
    const disponibles = personajes.filter(
      (heroe) =>
        !coleccion.some((personaje) => personaje.id === heroe.id)
    );

    const repetidos = personajes.filter(
      (heroe) =>
        coleccion.some((personaje) => personaje.id === heroe.id)
    );

    const mezclar = (lista) => {
      const copia = [...lista];

      for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
      }

      return copia;
    };

    const nuevosDisponibles = mezclar(disponibles);
    const repetidosDisponibles = mezclar(repetidos);

    const seleccionados = nuevosDisponibles
      .slice(0, 4)
      .map((personaje) => ({
        personaje,
        repetido: false
      }));

    const cantidadRestante = 4 - seleccionados.length;

    repetidosDisponibles
      .slice(0, cantidadRestante)
      .forEach((personaje) => {
        seleccionados.push({
          personaje,
          repetido: true
        });
      });

    if (seleccionados.length === 0) {
      alert('Ya tienes todos los personajes');
      return;
    }

    seleccionados.forEach(({ personaje, repetido }) => {
      if (!repetido) {
        agregarColeccion(personaje);
      }
    });

    setNuevos(seleccionados);
  };

  return (
    <main className="coleccion">
      <h1 className="coleccion-titulo">Colección</h1>

      <p className="coleccion-contador">
        {coleccion.length} <span>/ {totalHeroes}</span>
      </p>

      <button
        className="coleccion-boton"
        onClick={desbloquearAleatorios}
        disabled={coleccion.length >= totalHeroes}
      >
        4 nuevos
      </button>

      {nuevos.length > 0 && (
        <h2 className="coleccion-subtitulo">
          Tus nuevos héroes
        </h2>
      )}

      <section className="coleccion-nuevos">
        {nuevos.map(({ personaje, repetido }, indice) => (
          <div
            key={`${personaje.id}-${indice}`}
            className={
              repetido
                ? 'coleccion-nuevo repetido'
                : 'coleccion-nuevo'
            }
            onClick={() => abrirHeroe(personaje)}
          >
            <p>{personaje.id}</p>

            <img
              src={personaje.images.md}
              alt={personaje.name}
              width="60"
              height="60"
            />

            <p>{personaje.name}</p>
          </div>
        ))}
      </section>

      <section className="coleccion-album">
        {espacio.map((numero) => {
          const heroe = personajes[numero - 1];

          const capturado = coleccion.some(
            (personaje) => personaje.id === heroe.id
          );

          return (
            <div
              key={heroe.id}
              className={
                capturado
                  ? 'coleccion-personaje capturado'
                  : 'coleccion-personaje'
              }
              onClick={() => capturado && abrirHeroe(heroe)}
            >
              {capturado && (
                <img
                  src={heroe.images.sm}
                  width="auto"
                  height="100"
                  loading="lazy"
                  alt={heroe.name}
                />
              )}

              <p>{numero}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Coleccion;