// ENCARGO D · DetalleRuta
// useParams lee el :id de la dirección /rutas/:id.
// El id llega siempre como texto ("2"), por eso se convierte con Number
// antes de compararlo con el id numérico de los datos.
// En la semana 12, este find se reemplaza por fetch a GET /rutas/:id.
import { useParams, Link } from "react-router";
import { rutas } from "../datos/rutas.js";

export default function DetalleRuta() {
  const { id } = useParams();
  const ruta = rutas.find((r) => r.id === Number(id));

  if (!ruta) {
    return (
      <section className="lista">
        <h2>Ruta no encontrada</h2>
        <p>No existe una ruta con el número {id}.</p>
        <p>
          <Link to="/rutas" className="boton">
            Volver a las rutas
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="lista">
      <article className="tarjeta">
        <img src={ruta.imagen} alt={ruta.alt} />
        <div className="cuerpo">
          <h2>{ruta.nombre}</h2>
          <p className="meta">
            {ruta.distanciaKm} km
            <span className={"chip " + ruta.dificultad}>{ruta.dificultad}</span>
            {ruta.accesible && <span className="sello">♿ Accesible</span>}
          </p>
          <p>Las reseñas de esta ruta llegarán en la semana 12, desde la API propia.</p>
          <p>
            <Link to="/rutas" className="boton">
              Volver a las rutas
            </Link>
          </p>
        </div>
      </article>
    </section>
  );
}
