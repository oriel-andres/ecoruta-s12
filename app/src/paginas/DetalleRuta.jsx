// ENCARGO C · DetalleRuta (semana 12): GET /rutas/:id, caso 404, muestra Resenas.
// useParams lee el :id de la dirección /rutas/:id.
// El id llega siempre como texto ("2"), por eso se convierte con Number
// antes de compararlo con el id numérico de los datos.
// En la semana 12, este find se reemplaza por fetch a GET /rutas/:id.
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Resenas from "../components/Resenas.jsx";
import { API_URL } from "../api.js";

export default function DetalleRuta() {
  const { id } = useParams();
  const [ruta, setRuta] = useState(null);  // 1. los datos
  const [cargando, setCargando] = useState(true);  //    si está cargando
  const [error, setError] = useState("");          //    y si hubo error


useEffect(() => {
  async function cargarDetalleRuta() {
    try {
      const respuesta = await fetch(`${API_URL}/rutas/${id}`);
      if (respuesta.status === 404) {
        setRuta(null);          // no existe: luego se muestra «Ruta no encontrada»
        return;
      }
      if (!respuesta.ok) {
        throw new Error(`La API respondió ${respuesta.status}`);
      }
      setRuta(await respuesta.json());
    } catch {
      setError("No se pudo cargar la ruta. ¿Está corriendo la API?");
    } finally {
      setCargando(false);
    }
  }
  cargarDetalleRuta();
}, [id]);                       // ← [id], no []

if (cargando) {
  return <p className="lista estado" role="status">Cargando ruta…</p>;
}

if (error) {
  return <p className="lista estado error" role="alert">{error}</p>;
}


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
          <p>{ruta.descripcion}</p>
          <p>
            <Link to="/rutas" className="boton">
              Volver a las rutas
            </Link>
          </p>
        </div>
      </article>
      <Resenas rutaId={ruta.id} />
    </section>
  );
}
