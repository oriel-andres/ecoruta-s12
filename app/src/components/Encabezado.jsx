// ENCARGO A · Encabezado (semana 11)
// Sin props: los enlaces del menú son los mismos en todas las vistas,
// así que viven dentro del componente.
//
// Qué cambió respecto de la semana 10:
// - <a href="#"> pasó a <NavLink to="...">, que cambia de vista sin recargar.
// - La clase "activo" ya no se calcula con paginaActual: NavLink sabe en qué
//   dirección estamos y además agrega aria-current="page".
// - Inicio lleva end, para que no quede activo en todas las direcciones.
import { NavLink } from "react-router";
import logo from "../assets/logo.svg";

const enlaces = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Rutas", ruta: "/rutas" },
  { texto: "Emprendimientos", ruta: "/emprendimientos" },
];

export default function Encabezado() {
  return (
    <header className="encabezado">
      <h1 className="logo">
        <img src={logo} alt="" />
        EcoRuta Temuco
      </h1>
      <nav className="menu" aria-label="Principal">
        {enlaces.map((enlace) => (
          <NavLink
            key={enlace.ruta}
            to={enlace.ruta}
            end={enlace.ruta === "/"}
            className={({ isActive }) => (isActive ? "activo" : "")}
          >
            {enlace.texto}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
