import './style.css';

export default function Usuario({ coleccion, favoritos, personajes }) {
  const total = personajes.length;
  const desbloqueados = coleccion.length;
  const cantidadFavoritos = favoritos.length;

  const porcentaje = total > 0
    ? Math.round((desbloqueados / total) * 100)
    : 0;

  const faltantes = total - desbloqueados;

  return (
    <section>
      <h2>Mi usuario</h2>

      <p>Bienvenido a tu perfil de superhéroes.</p>

      <h3>Mi colección</h3>
      <p>Personajes desbloqueados: {desbloqueados}</p>
      <p>Personajes por descubrir: {faltantes}</p>
      <p>Progreso de la colección: {porcentaje}%</p>

      <progress value={desbloqueados} max={total || 1} />

      <h3>Mis favoritos</h3>
      <p>Tienes {cantidadFavoritos} personajes favoritos.</p>

      <h3>Resumen</h3>
      <div className="lista">
        <div className="tarjeta">
          <h3>Total de personajes</h3>
          <p>{total}</p>
        </div>

        <div className="tarjeta">
          <h3>En mi colección</h3>
          <p>{desbloqueados}</p>
        </div>

        <div className="tarjeta">
          <h3>Mis favoritos</h3>
          <p>{cantidadFavoritos}</p>
        </div>
      </div>

      {total > 0 && desbloqueados === total && (
        <p>¡Felicitaciones! ¡Has desbloqueado todos los personajes!</p>
      )}
    </section>
  );
}
