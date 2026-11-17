// ENCARGO E · Emprendimientos (listado con filtro por comuna)
// Mismo patrón que la página Rutas, con otro recurso. Reutiliza la clase
// .filtros que agregó el encargo C en index.css.
import { useState } from "react";
import ListaEmprendimientos from "../components/ListaEmprendimientos.jsx";
import { emprendimientos } from "../datos/emprendimientos.js";

const comunas = ["Todas", "Temuco", "Padre Las Casas"];

export default function Emprendimientos() {
  const [comuna, setComuna] = useState("Todas");

  const visibles =
    comuna === "Todas"
      ? emprendimientos
      : emprendimientos.filter((e) => e.comuna === comuna);

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
