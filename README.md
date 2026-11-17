# EcoRuta Temuco · repositorio de ensayo (ejemplo resuelto, semana 11)

Sitio estático en la raíz (semanas 3 a 9) y aplicación React en `app/` (desde la semana 10).

## API propia

Contrato acordado en la reunión frontend-backend del jueves 12 de noviembre de 2026.
Firmado por el PO, un representante de frontend y uno de backend. La foto de la hoja firmada está en la tarjeta «Contrato API» de Trello.

Si el contrato cambia, se cambia primero aquí y después en el código.

### Recursos

| Recurso | La interfaz lo… | Vistas que lo usan | Para qué le sirve al usuario |
|---|---|---|---|
| `rutas` | solo lee | Inicio, Rutas, DetalleRuta | Ver qué rutas hay, filtrarlas y elegir una |
| `emprendimientos` | solo lee | Emprendimientos | Encontrar servicios cerca de las rutas |
| `resenas` | lee, crea y borra | DetalleRuta | Opinar sobre una ruta y leer otras opiniones |

### Modelo de datos

```ts
interface Ruta {
  id: number;
  nombre: string;
  imagen: string;        // ruta relativa del archivo, por ejemplo "img/nielol.svg"
  alt: string;
  distanciaKm: number;
  dificultad: "baja" | "media" | "alta";
  accesible: boolean;
  descripcion: string;   // solo se muestra en el detalle
}

interface Emprendimiento {
  id: number;
  nombre: string;
  rubro: string;
  comuna: string;
}

interface Resena {
  id: number;
  rutaId: number;        // relación con rutas
  autor: string;
  nota: number;          // de 1 a 5
  comentario: string;
}
```

```json
{ "id": 1, "nombre": "Cerro Ñielol", "imagen": "img/nielol.svg", "alt": "Sendero del Cerro Ñielol",
  "distanciaKm": 4, "dificultad": "baja", "accesible": true,
  "descripcion": "Monumento natural en plena ciudad, con senderos señalizados y miradores." }
{ "id": 1, "nombre": "Café Raíces", "rubro": "Cafetería", "comuna": "Temuco" }
{ "id": 1, "rutaId": 1, "autor": "Ana", "nota": 5, "comentario": "Muy bien señalizado." }
```

### Contrato

| Método | Endpoint | Envía el frontend | Responde la API | Código | Vista o componente |
|---|---|---|---|---|---|
| `GET` | `/rutas` | nada | arreglo de rutas | 200 | Inicio, Rutas |
| `GET` | `/rutas/:id` | nada | una ruta | 200 · 404 | DetalleRuta |
| `GET` | `/emprendimientos` | nada | arreglo de emprendimientos | 200 | Emprendimientos |
| `GET` | `/resenas?rutaId=:id` | nada | arreglo de reseñas de esa ruta | 200 | DetalleRuta |
| `POST` | `/resenas` | `{ rutaId, autor, nota, comentario }` | la reseña creada, con su `id` | 201 | FormularioResena (en DetalleRuta) |
| `DELETE` | `/resenas/:id` | nada | `{}` | 200 | DetalleRuta |

Los filtros por dificultad y por comuna se hacen en el frontend con `useState`, sobre la lista completa. Si en algún momento conviene que los haga la API, el contrato ya los admite como `GET /rutas?dificultad=baja` y `GET /emprendimientos?comuna=Temuco`.

### Cómo levantar la API en local

Se completa en la semana 12. El archivo `app/db.json` es un borrador con datos que cumplen este modelo.

### API pública externa

| Dato | Valor |
|---|---|
| Nombre | Open-Meteo |
| URL base | https://api.open-meteo.com/v1 |
| Endpoint que usaremos | `/forecast?latitude=-38.74&longitude=-72.6&current=temperature_2m,wind_speed_10m,weather_code` |
| Requiere autenticación | No |
| Vista en que aparece | Inicio (widget de clima, el mismo de la semana 9) |
| Para qué le sirve al usuario | Saber si es buen momento para salir a una ruta |
