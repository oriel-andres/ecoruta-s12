// ENCARGO D · ListaRutas
// Prop: rutas (arreglo). El valor lo escribe el integrador en App.jsx.
//
// Este componente usa a TarjetaRuta y le escribe los valores de sus props,
// uno por cada ruta del arreglo.
//
// Qué cambió respecto del HTML de la semana 9:
// - Las tres tarjetas escritas a mano se reemplazaron por un map.
// - Cada tarjeta lleva key={ruta.id}, para que React las distinga.
//
// Semana 11: pasa también id={ruta.id} a cada tarjeta (key no llega como
// prop) y recibe un titulo opcional, que por defecto es «Rutas destacadas».
import TarjetaRuta from "./TarjetaRuta.jsx";

export default function ListaRutas({ rutas, titulo = "Rutas destacadas" }) {
  return (
    <section className="lista">
      <h2>{titulo}</h2>
      <div className="fila">
        {rutas.map((ruta) => (
          <TarjetaRuta
            key={ruta.id}
            id={ruta.id}
            nombre={ruta.nombre}
            imagen={ruta.imagen}
            alt={ruta.alt}
            distanciaKm={ruta.distanciaKm}
            dificultad={ruta.dificultad}
            accesible={ruta.accesible}
          />
        ))}
      </div>
    </section>
  );
}
