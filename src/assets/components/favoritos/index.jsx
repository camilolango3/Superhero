import './style.css';

export default function Favoritos({
  favoritos,
  abrirHeroe,
  quitarFavorito
}) {
  return (
    <section>
      <h2>Mis favoritos</h2>

      {favoritos.length === 0 ? (
        <p className="mensaje">
          Todavía no tienes favoritos. Ve a Inicio y agrega alguno.
        </p>
      ) : (
        <div className="lista">
          {favoritos.map(heroe => (
            <div className="tarjeta" key={heroe.id}>
              <img src={heroe.images.sm} alt={heroe.name} />

              <h3>{heroe.name}</h3>

              <p>
                {heroe.biography.publisher || 'Editorial desconocida'}
              </p>

              <button onClick={() => abrirHeroe(heroe)}>
                Ver detalles
              </button>

              <button onClick={() => quitarFavorito(heroe.id)}>
                Quitar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
