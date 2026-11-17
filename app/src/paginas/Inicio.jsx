// ENCARGO A · Inicio (semana 12)
// Las rutas ya no vienen de datos/rutas.js: se piden a la API propia.
import { useEffect, useState } from "react";
import { Link } from "react-router";
import BannerPrincipal from "../components/BannerPrincipal.jsx";
import ListaRutas from "../components/ListaRutas.jsx";
import { API_URL } from "../api.js";

export default function Inicio() {
  const [rutas, setRutas] = useState([]);          // 1. los datos
  const [cargando, setCargando] = useState(true);  //    si está cargando
  const [error, setError] = useState("");          //    y si hubo error

  useEffect(() => {                                // 2. después de dibujar
    async function cargarRutas() {
      try {
        const respuesta = await fetch(`${API_URL}/rutas`);   // 3. el fetch
        if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
        }
        setRutas(await respuesta.json());
      } catch {
        setError("No se pudieron cargar las rutas. ¿Está corriendo la API?");
      } finally {
        setCargando(false);
      }
    }
    cargarRutas();
  }, []);                                          // [] = una sola vez

  return (                                         // 4. según el estado
    <>
      <BannerPrincipal
        titulo="Rutas sostenibles de La Araucanía"
        subtitulo="Senderos y emprendimientos cerca de Temuco"
      />
      {cargando && <p className="lista estado" role="status">Cargando rutas…</p>}
      {error && <p className="lista estado error" role="alert">{error}</p>}
      {!cargando && !error && <ListaRutas rutas={rutas.slice(0, 3)} />}
      <p className="lista">
        <Link to="/rutas" className="boton">Ver todas las rutas</Link>
      </p>
    </>
  );
}