import { useEffect, useState } from "react";
import FormularioResena from "./FormularioResena.jsx";
import { API_URL } from "../api.js";

export default function Resenas({ rutaId }) {
  // los tres estados del patrón: resenas ([]), cargando y error
  const [cargando, setCargando] = useState(true);  //    si está cargando
  const [error, setError] = useState("");          //    y si hubo error
  const [resenas, setResenas] = useState([]);  // 1. los datos

  const [resena, setResena] = useState("Todas");

  // useEffect con fetch(`${API_URL}/resenas?rutaId=${rutaId}`) y [rutaId] al final
  useEffect(() => {                                // 2. después de dibujar
       async function cargarResenas() {
        try {
         const respuesta = await fetch(`${API_URL}/resenas?rutaId=${rutaId}`);   // 3. el fetch
         if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
         }
        setResenas(await respuesta.json());
        } catch {
           setError("No se pudieron cargar Reseñas. ¿Está corriendo la API?");
        } finally {
           setCargando(false);
      }
    }
    cargarResenas();
  }, [rutaId]); 

  async function borrar(idResena) {
  try {
    const respuesta = await fetch(`${API_URL}/resenas/${idResena}`, { method: "DELETE" });
    if (!respuesta.ok) {
      throw new Error(`La API respondió ${respuesta.status}`);
    }
    setResenas(resenas.filter((r) => r.id !== idResena));
  } catch {
    setError("No se pudo borrar la reseña. Intenta de nuevo.");
  }
}

  function agregar(nueva) {
    setResenas([...resenas, nueva]);
  }

  return (
    <section className="resenas" aria-labelledby="titulo-resenas">
      <h3 id="titulo-resenas">Reseñas</h3>

      {cargando && <p role="status">Cargando reseñas…</p>}
      {error && <p className="estado error" role="alert">{error}</p>}
      {!cargando && resenas.length === 0 && (
        <p>Todavía no hay reseñas. ¡Sé la primera persona en opinar!</p>
      )}

      {}
      <ul>
        {resenas.map((resena) => (
          <li key={resena.id} className="resena">
            <p>
              <strong>{resena.autor}</strong> {"★".repeat(resena.nota)}
            </p>
            <p>{resena.comentario}</p>
            <button
              type="button"
              className="borrar"
              onClick={() => borrar(resena.id)}
              aria-label={`Borrar la reseña de ${resena.autor}`}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>

      <FormularioResena rutaId={rutaId} onCreada={agregar} />
    </section>
  );
}