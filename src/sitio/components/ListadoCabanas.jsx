import { Link } from 'react-router-dom'
import { formatPrecio, urlDetalle, urlReserva } from '../../api/alojamientos'

export function ListadoCabanas({ items, estado, error, reservar = false, query = {}, vacio = '', clase = 'listing-grid' }) {
  if (estado === 'cargando') {
    return <p className="pagina__lead">Cargando cabañas publicadas…</p>
  }
  if (estado === 'error') {
    return <p className="pagina__lead">{error}</p>
  }
  if (!items.length) {
    return <p className="pagina__lead">{vacio || 'Este sitio no tiene cabañas publicadas.'}</p>
  }
  return (
    <div className={clase}>
      {items.map((cabana) => (
        <article className="listing-card" key={cabana.id}>
          <Link to={urlDetalle(cabana.id, query)}>
            <img src={cabana.imagen} alt="" loading="lazy" />
          </Link>
          <div className="listing-card__body">
            <span className="listing-card__meta">
              {cabana.huespedes ? `Hasta ${cabana.huespedes} personas` : cabana.tipo}
              {cabana.habitaciones ? ` · ${cabana.habitaciones} dormitorios` : ''}
            </span>
            <h3>{cabana.titulo}</h3>
            {cabana.descripcion ? <p>{cabana.descripcion}</p> : null}
            {cabana.precio ? (
              <p className="listing-card__precio">
                <strong>{formatPrecio(cabana.precio)}</strong> noche
              </p>
            ) : null}
            <Link className="listing-card__link" to={reservar ? urlReserva(cabana.id, query) : urlDetalle(cabana.id, query)}>
              {reservar ? 'Avanzar en la reserva' : 'Ver detalle'}
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
