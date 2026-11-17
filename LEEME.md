# Ejemplo resuelto (06) · EcoRuta Temuco, semana 11

El repositorio de un equipo al terminar la semana 11, hecho sobre el ejemplo de la semana 10. Sirve para ver cómo queda cada encargo de la tarde y cómo queda el contrato de la mañana en el README.

## Qué hay aquí

```
index.html, estilos.css, img/   El sitio estático, que sigue publicado en GitHub Pages
README.md                       Con la sección «API propia»: recursos, modelo, contrato y API externa
app/
  db.json                       Borrador de datos que cumple el contrato (se usa en la semana 12)
  src/
    main.jsx                    Integrador: HashRouter envuelve a App
    App.jsx                     Integrador: Routes y Route, una por página
    paginas/
      Inicio.jsx                Encargo B
      Rutas.jsx                 Encargo C: filtro por dificultad con useState
      DetalleRuta.jsx           Encargo D: useParams, Number(id), find
      Emprendimientos.jsx       Encargo E: filtro por comuna con useState
      NoEncontrada.jsx          Encargo A
    components/
      Encabezado.jsx            Encargo A: NavLink, sin props
      TarjetaRuta.jsx           Encargo D: «Ver ruta» con Link
      ListaRutas.jsx            Encargo D: pasa id y recibe titulo
      (los demás no cambian respecto de la semana 10)
```

Cada archivo que cambió tiene al inicio un comentario que explica qué cambió y por qué.

## Cómo verlo funcionando

```
cd app
npm install
npm run dev
```

Prueben escribir en la barra de direcciones `#/rutas/2`, `#/rutas/99` y `#/cualquier-cosa`, y recargar la página estando en el detalle de una ruta.
