// ENCARGO A · Emprendimientos (semana 12): GET /emprendimientos, filtro por comuna.
// Mismo patrón que la página Rutas, con otro recurso. Reutiliza la clase
// .filtros que agregó el encargo C en index.css.
import { useEffect, useState } from "react";
import ListaEmprendimientos from "../components/ListaEmprendimientos.jsx";
import { API_URL } from "../api.js";


const comunas = ["Todas", "Temuco", "Padre Las Casas", "Villarrica"];

export default function Emprendimientos() {
  
  const [emprendimientos, setEmprendimientos] = useState([]);  // 1. los datos
  const [cargando, setCargando] = useState(true);  //    si está cargando
  const [error, setError] = useState("");          //    y si hubo error
  const [comuna, setComuna] = useState("Todas");

  const visibles =
    comuna === "Todas"
      ? emprendimientos
      : emprendimientos.filter((e) => e.comuna === comuna);


      useEffect(() => {                                // 2. después de dibujar
       async function cargarEmprendimientos() {
        try {
         const respuesta = await fetch(`${API_URL}/emprendimientos`);   // 3. el fetch
         if (!respuesta.ok) {
          throw new Error(`La API respondió ${respuesta.status}`);
         }
        setEmprendimientos(await respuesta.json());
        } catch {
           setError("No se pudieron cargar los emprendimientos. ¿Está corriendo la API?");
        } finally {
           setCargando(false);
      }
    }
    cargarEmprendimientos();
  }, []); 

  if (cargando) {
    return (
      <p className="lista estado" role="status">
        Cargando emprendimientos…
      </p>
    );
  }

  if (error) {
    return (
      <p className="lista estado error" role="alert">
        {error}
      </p>
    );
  }

  return (
    <>
      <div className="filtros" role="group" aria-label="Filtrar por comuna">
        {comunas.map((opcion) => (
          <button
            key={opcion}
            type="button"
            aria-pressed={comuna === opcion}
            onClick={() => setComuna(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>
      <ListaEmprendimientos emprendimientos={visibles} />
    </>
  );
}
