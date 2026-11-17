// ENCARGO C · Rutas (listado con filtro)
// useState guarda la dificultad elegida. Cada vez que setDificultad cambia
// ese valor, React vuelve a ejecutar esta función y redibuja la lista.
import { useState } from "react";
import ListaRutas from "../components/ListaRutas.jsx";
import { rutas } from "../datos/rutas.js";

const opciones = ["todas", "baja", "media", "alta"];

export default function Rutas() {
  const [dificultad, setDificultad] = useState("todas");

  const visibles =
    dificultad === "todas"
      ? rutas
      : rutas.filter((ruta) => ruta.dificultad === dificultad);

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
