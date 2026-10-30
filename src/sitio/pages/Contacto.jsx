import { useEffect, useState } from 'react'
import { lodge } from '../data/lodge'

const VACIO = { nombre: '', email: '', telefono: '', asunto: 'Consulta disponibilidad', mensaje: '' }

export function Contacto() {
  const [datos, setDatos] = useState(VACIO)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = `Contacto · ${lodge.nombre}`
  }, [])

  function cambiar(campo) {
    return (event) => setDatos((prev) => ({ ...prev, [campo]: event.target.value }))
  }

  function enviar(event) {
    event.preventDefault()
    if (!datos.nombre.trim() || !datos.mensaje.trim()) {
      setError('Indica tu nombre y el mensaje.')
      return
    }
    setError('')
    const texto = [
      `Hola, soy ${datos.nombre.trim()}.`,
      datos.asunto,
      datos.mensaje.trim(),
      datos.email.trim() ? `Correo: ${datos.email.trim()}` : '',
      datos.telefono.trim() ? `Teléfono: ${datos.telefono.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    window.open(`${lodge.whatsapp}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="pagina pagina--estrecha">
      <span className="hp-label">VerdeVida</span>
      <h1 className="pagina__titulo">Contacto</h1>
      <p className="pagina__lead">
        Si buscas alojamiento, escríbenos y respondemos lo antes posible. También puedes llamar o escribir por WhatsApp.
      </p>
      <div className="ubicacion" style={{ marginBottom: 28 }}>
        <div>
          <p>
            <a href={lodge.telefonoHref}>{lodge.telefono}</a>
          </p>
          <p>
            <a href={lodge.movilHref}>{lodge.movil}</a>
          </p>
          <p>
            <a href={`mailto:${lodge.email}`}>{lodge.email}</a>
          </p>
        </div>
        <div>
          <p>{lodge.direccion}</p>
          <p>{lodge.ciudad}</p>
          <p>
            <a href={lodge.maps} target="_blank" rel="noreferrer">
              Cómo llegar
            </a>
          </p>
        </div>
      </div>
      <form className="panel" onSubmit={enviar}>
        <div className="form-grid">
          <label className="campo">
            Nombre
            <input value={datos.nombre} onChange={cambiar('nombre')} />
          </label>
          <label className="campo">
            Correo
            <input type="email" value={datos.email} onChange={cambiar('email')} />
          </label>
          <label className="campo">
            Teléfono
            <input value={datos.telefono} onChange={cambiar('telefono')} />
          </label>
          <label className="campo">
            Motivo
            <select value={datos.asunto} onChange={cambiar('asunto')}>
              <option>Consulta disponibilidad</option>
              <option>Gira de estudio</option>
              <option>Otro</option>
            </select>
          </label>
          <label className="campo campo--ancho">
            Mensaje
            <textarea value={datos.mensaje} onChange={cambiar('mensaje')} rows={5} />
          </label>
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="form-acciones">
          <button className="hp-btn hp-btn--gold" type="submit">
            Escribir por WhatsApp
          </button>
        </div>
      </form>
    </main>
  )
}
