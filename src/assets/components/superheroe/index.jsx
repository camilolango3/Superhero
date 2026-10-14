import './style.css';

export default function Superheroe({ heroe }) {
  if (!heroe) {
    return <p>No se ha seleccionado ningún personaje.</p>;
  }

  return (
    <section>
      <h2>{heroe.name}</h2>

      <img
        className="detalle-imagen"
        src={heroe.images.md}
        alt={heroe.name}
      />

      <h3>Biografía</h3>
      <p>Nombre completo: {heroe.biography.fullName || 'Desconocido'}</p>
      <p>Alias: {heroe.biography.aliases.join(', ') || 'Ninguno'}</p>
      <p>Editorial: {heroe.biography.publisher || 'Desconocida'}</p>
      <p>Alineación: {heroe.biography.alignment || 'Desconocida'}</p>
      <p>Primera aparición: {heroe.biography.firstAppearance || 'Desconocida'}</p>

      <h3>Apariencia</h3>
      <p>Género: {heroe.appearance.gender || 'Desconocido'}</p>
      <p>Raza: {heroe.appearance.race || 'Desconocida'}</p>
      <p>Altura: {heroe.appearance.height.join(', ')}</p>
      <p>Peso: {heroe.appearance.weight.join(', ')}</p>
      <p>Color de ojos: {heroe.appearance.eyeColor}</p>
      <p>Color de cabello: {heroe.appearance.hairColor}</p>

      <h3>Trabajo</h3>
      <p>Ocupación: {heroe.work.occupation || 'Desconocida'}</p>
      <p>Base: {heroe.work.base || 'Desconocida'}</p>

      <h3>Conexiones</h3>
      <p>Afiliación: {heroe.connections.groupAffiliation || 'Ninguna'}</p>
      <p>Familiares: {heroe.connections.relatives || 'Desconocidos'}</p>

      <h3>Estadísticas de poder</h3>
      <p>Inteligencia: {heroe.powerstats.intelligence ?? 'Sin datos'}</p>
      <p>Fuerza: {heroe.powerstats.strength ?? 'Sin datos'}</p>
      <p>Velocidad: {heroe.powerstats.speed ?? 'Sin datos'}</p>
      <p>Resistencia: {heroe.powerstats.durability ?? 'Sin datos'}</p>
      <p>Poder: {heroe.powerstats.power ?? 'Sin datos'}</p>
      <p>Combate: {heroe.powerstats.combat ?? 'Sin datos'}</p>
    </section>
  );
}