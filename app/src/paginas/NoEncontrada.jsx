// ENCARGO A · NoEncontrada
// Se muestra en cualquier dirección que no esté en la tabla de rutas (path="*").
import { Link } from "react-router";

export default function NoEncontrada() {
  return (
    <section className="lista">
      <h2>Página no encontrada</h2>
      <p>La dirección que escribiste no existe en EcoRuta.</p>
      <p>
        <Link to="/" className="boton">
          Volver al inicio
        </Link>
      </p>
    </section>
  );
}
