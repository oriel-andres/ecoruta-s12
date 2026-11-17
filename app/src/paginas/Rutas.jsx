// ENCARGO B · Rutas (semana 12): GET /rutas con el filtro de la semana 11
// // useState guarda la dificultad elegida. Cada vez que setDificultad cambia
// ese valor, React vuelve a ejecutar esta función y redibuja la lista.
import { useEffect, useState } from "react";
import ListaRutas from "../components/ListaRutas.jsx";
import { API_URL } from "../api.js";


const opciones = ["todas", "baja", "media", "alta"];

export default function Rutas() {
  const [rutas, setRutas] = useState([]);  // 1. los datos
  const [cargando, setCargando] = useState(true);  //    si está cargando
  const [error, setError] = useState("");          //    y si hubo error
  const [dificultad, setDificultad] = useState("todas");

  const visibles =
    dificultad === "todas"
      ? rutas
      : rutas.filter((ruta) => ruta.dificultad === dificultad);


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
  }, []); 

if (cargando) {
  return <p className="lista estado" role="status">Cargando rutas…</p>;
}

if (error) {
  return <p className="lista estado error" role="alert">{error}</p>;
}

  return (
    <>
      <div className="filtros" role="group" aria-label="Filtrar por dificultad">
        {opciones.map((opcion) => (
          <button
            key={opcion}
            type="button"
            aria-pressed={dificultad === opcion}
            onClick={() => setDificultad(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>
      {visibles.length === 0 ? (
        <p className="lista">No hay rutas de dificultad {dificultad}.</p>
      ) : (
        <ListaRutas titulo="Todas las rutas" rutas={visibles} />
      )}
    </>
  );
}
