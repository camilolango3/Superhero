import { useState } from 'react';
import './style.css';
import heroimg from "../../heroimg.jpg";

export default function Info() {
  const [mostrarGato, setMostrarGato] = useState(false);

  return (
    <section className="info">
      <img
        src={heroimg}
        alt="Información de la API de superhéroes"
        className="info-imagen"
      />

      {mostrarGato && (
        <div className="easter-egg">
          <img
            src="https://media1.tenor.com/m/PkwKq3o1Uv8AAAAC/reacion-poder.gif"
            alt="Gato reaccionando al poder"
          />

          <p>Has descubierto el poder oculto.</p>

          <button
            className="cerrar-easter-egg"
            onClick={() => setMostrarGato(false)}
          >
            Cerrar
          </button>
        </div>
      )}

      <button
        className="boton-secreto"
        onClick={() => setMostrarGato(!mostrarGato)}
        aria-label="Mostrar secreto"
        title="¿?"
      >
        ?
      </button>
    </section>
  );
}