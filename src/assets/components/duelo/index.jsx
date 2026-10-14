import { useState, useEffect } from 'react';
import './style.css';

export default function Duelo({ abrirHeroe }) {
  const [heroes, setHeroes] = useState([]);
  const [heroe1, setHeroe1] = useState('');
  const [heroe2, setHeroe2] = useState('');
  const [primero, setPrimero] = useState(null);
  const [segundo, setSegundo] = useState(null);
  const [puntos1, setPuntos1] = useState(0);
  const [puntos2, setPuntos2] = useState(0);
  const [ganador, setGanador] = useState('');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json')
      .then(respuesta => respuesta.json())
      .then(datos => setHeroes(datos));
  }, []);

  function comparar() {
    if (heroe1 === '' || heroe2 === '') {
      alert('Selecciona los dos personajes');
      return;
    }

    if (heroe1 === heroe2) {
      alert('Selecciona personajes diferentes');
      return;
    }

    let personaje1 = heroes.find(heroe => heroe.id === Number(heroe1));
    let personaje2 = heroes.find(heroe => heroe.id === Number(heroe2));

    let puntos1 = 0;
    let puntos2 = 0;
    let lista = [];

    if (Number(personaje1.powerstats.intelligence) > Number(personaje2.powerstats.intelligence)) {
      puntos1++;
      lista.push('Inteligencia: ganó ' + personaje1.name);
    } else if (Number(personaje2.powerstats.intelligence) > Number(personaje1.powerstats.intelligence)) {
      puntos2++;
      lista.push('Inteligencia: ganó ' + personaje2.name);
    } else {
      lista.push('Inteligencia: empate');
    }

    if (Number(personaje1.powerstats.strength) > Number(personaje2.powerstats.strength)) {
      puntos1++;
      lista.push('Fuerza: ganó ' + personaje1.name);
    } else if (Number(personaje2.powerstats.strength) > Number(personaje1.powerstats.strength)) {
      puntos2++;
      lista.push('Fuerza: ganó ' + personaje2.name);
    } else {
      lista.push('Fuerza: empate');
    }

    if (Number(personaje1.powerstats.speed) > Number(personaje2.powerstats.speed)) {
      puntos1++;
      lista.push('Velocidad: ganó ' + personaje1.name);
    } else if (Number(personaje2.powerstats.speed) > Number(personaje1.powerstats.speed)) {
      puntos2++;
      lista.push('Velocidad: ganó ' + personaje2.name);
    } else {
      lista.push('Velocidad: empate');
    }

    if (Number(personaje1.powerstats.durability) > Number(personaje2.powerstats.durability)) {
      puntos1++;
      lista.push('Resistencia: ganó ' + personaje1.name);
    } else if (Number(personaje2.powerstats.durability) > Number(personaje1.powerstats.durability)) {
      puntos2++;
      lista.push('Resistencia: ganó ' + personaje2.name);
    } else {
      lista.push('Resistencia: empate');
    }

    if (Number(personaje1.powerstats.power) > Number(personaje2.powerstats.power)) {
      puntos1++;
      lista.push('Poder: ganó ' + personaje1.name);
    } else if (Number(personaje2.powerstats.power) > Number(personaje1.powerstats.power)) {
      puntos2++;
      lista.push('Poder: ganó ' + personaje2.name);
    } else {
      lista.push('Poder: empate');
    }

    if (Number(personaje1.powerstats.combat) > Number(personaje2.powerstats.combat)) {
      puntos1++;
      lista.push('Combate: ganó ' + personaje1.name);
    } else if (Number(personaje2.powerstats.combat) > Number(personaje1.powerstats.combat)) {
      puntos2++;
      lista.push('Combate: ganó ' + personaje2.name);
    } else {
      lista.push('Combate: empate');
    }

    setPrimero(personaje1);
    setSegundo(personaje2);
    setPuntos1(puntos1);
    setPuntos2(puntos2);
    setResultados(lista);

    if (puntos1 > puntos2) {
      setGanador(personaje1.name);
    } else if (puntos2 > puntos1) {
      setGanador(personaje2.name);
    } else {
      setGanador('Empate');
    }
  }

  return (
    <section className="duelo">
      <h2>Duelo de superhéroes</h2>

      <label>Primer personaje</label>
      <select value={heroe1} onChange={e => setHeroe1(e.target.value)}>
        <option value="">Selecciona</option>
        {heroes.map(heroe => (
          <option key={heroe.id} value={heroe.id}>
            {heroe.name}
          </option>
        ))}
      </select>

      <label>Segundo personaje</label>
      <select value={heroe2} onChange={e => setHeroe2(e.target.value)}>
        <option value="">Selecciona</option>
        {heroes.map(heroe => (
          <option key={heroe.id} value={heroe.id}>
            {heroe.name}
          </option>
        ))}
      </select>

      <button onClick={comparar}>Comparar</button>

      {primero !== null && segundo !== null && (
        <div className="resultado-duelo">
          <div className="participantes">
            <div className="participante">
              <img src={primero.images.md} alt={primero.name} />
              <h3>{primero.name}</h3>
              <p>{puntos1} puntos</p>
              <button onClick={() => abrirHeroe(primero)}>
                Ver detalles
              </button>
            </div>

            <h2>VS</h2>

            <div className="participante">
              <img src={segundo.images.md} alt={segundo.name} />
              <h3>{segundo.name}</h3>
              <p>{puntos2} puntos</p>
              <button onClick={() => abrirHeroe(segundo)}>
                Ver detalles
              </button>
            </div>
          </div>

          <h2>Ganador final: {ganador}</h2>

          <h3>Resultado de cada habilidad</h3>

          {resultados.map((resultado, indice) => (
            <p key={indice}>{resultado}</p>
          ))}

          <button onClick={() => {
            setPrimero(null);
            setSegundo(null);
            setHeroe1('');
            setHeroe2('');
            setPuntos1(0);
            setPuntos2(0);
            setGanador('');
            setResultados([]);
          }}>
            Nuevo duelo
          </button>
        </div>
      )}
    </section>
  );
}