// ENCARGO E · FormularioResena (semana 12): POST /resenas.
// Props: rutaId (número) y onCreada (función). Las escribe Resenas.
// Es el formulario validado de la semana 9, ahora en React.
import { useState } from "react";
import { API_URL } from "../api.js";

export default function FormularioResena({ rutaId, onCreada }) {
  // (a) Un estado por campo, más el mensaje y si se está enviando
  const [autor, setAutor] = useState("");
  const [nota, setNota] = useState("5");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();                       // (b) igual que en la semana 9

    if (autor.trim() === "" || comentario.trim().length < 10) {   // (c) validación
      setMensaje("Escribe tu nombre y un comentario de al menos 10 caracteres.");
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await fetch(`${API_URL}/resenas`, {       // (d) el POST
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rutaId: rutaId,
          autor: autor.trim(),
          nota: Number(nota),
          comentario: comentario.trim(),
        }),
      });
      if (respuesta.status !== 201) {
        throw new Error(`La API respondió ${respuesta.status}`);
      }
      onCreada(await respuesta.json());           // (e) avisarle a Resenas
      setAutor("");                               // (f) limpiar el formulario
      setNota("5");
      setComentario("");
      setMensaje("¡Gracias! Tu reseña quedó publicada.");
    } catch {
      setMensaje("No se pudo publicar la reseña. ¿Está corriendo la API?");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <h4>Deja tu reseña</h4>

      <label htmlFor="autor">Tu nombre</label>
      <input id="autor" type="text" value={autor}
             onChange={(e) => setAutor(e.target.value)} />

      <label htmlFor="nota">Nota</label>
      <select id="nota" value={nota} onChange={(e) => setNota(e.target.value)}>
        <option value="5">5 · Excelente</option>
        <option value="4">4 · Muy buena</option>
        <option value="3">3 · Buena</option>
        <option value="2">2 · Regular</option>
        <option value="1">1 · Mala</option>
      </select>

      <label htmlFor="comentario">Comentario</label>
      <textarea id="comentario" rows="3" value={comentario}
                onChange={(e) => setComentario(e.target.value)} />

      <button type="submit" className="boton" disabled={enviando}>
        {enviando ? "Publicando…" : "Publicar reseña"}
      </button>

      <p className="mensaje" role="status">{mensaje}</p>
    </form>
  );
}