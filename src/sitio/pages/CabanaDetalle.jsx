import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { formatPrecio, urlReserva } from '../../api/alojamientos'
import { cabanaPorSlug, equipamiento } from '../data/lodge'
import { useAlojamientos } from '../useAlojamientos'
import { FichaVip } from '../components/FichaVip'

export function CabanaDetalle() {
  const { slug } = useParams()
  if (/^\d+$/.test(slug || '')) return <FichaVip id={slug} />
  return <DetalleLocal slug={slug} />
}

function DetalleLocal({ slug }) {
  const [params] = useSearchParams()
  const estatica = cabanaPorSlug(slug)
  const { items, estado } = useAlojamientos()
  const publicada = items.find((item) => item.id === slug) ?? null
  const [foto, setFoto] = useState(0)
  const consulta = {
    desde: params.get('desde') || '',
    hasta: params.get('hasta') || '',
    huespedes: params.get('huespedes') || '',
  }

  useEffect(() => {
    setFoto(0)
  }, [slug])

  useEffect(() => {
    const nombre = publicada?.titulo || estatica?.nombre
    document.title = nombre ? `${nombre} · Toltén Lodge` : 'Cabaña · Toltén Lodge'
  }, [estatica, publicada])

  if (!estatica && estado === 'cargando') {
    return (
      <main className="pagina">
        <p className="pagina__lead">Cargando cabaña…</p>
      </main>
    )
  }

  if (publicada) {
    const fotos = publicada.fotos.length ? publicada.fotos : [publicada.imagen]
    return (
      <main className="pagina">
        <span className="hp-label">Cabañas</span>
        <div className="detalle">
          <div>
            <img className="detalle__foto" src={fotos[foto] || publicada.imagen} alt="" />
            <div className="detalle__thumbs">
              {fotos.map((src, index) => (
                <button key={src} type="button" aria-current={index === foto} onClick={() => setFoto(index)}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
            {publicada.servicios.length ? (
              <div className="chips">
                {publicada.servicios.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            ) : null}
            {publicada.descripcion ? <p className="pagina__lead">{publicada.descripcion}</p> : null}
          </div>
          <aside className="reserva-card">
            <h2>{publicada.titulo}</h2>
            <p>
              {publicada.huespedes ? `Hasta ${publicada.huespedes} personas` : publicada.tipo}
              {publicada.habitaciones ? ` · ${publicada.habitaciones} dormitorios` : ''}
            </p>
            {publicada.precio ? (
              <p>
                <strong>{formatPrecio(publicada.precio)}</strong> noche
              </p>
            ) : null}
            <ul>
              {publicada.camas ? <li>{publicada.camas} camas</li> : null}
              {publicada.banos ? <li>{publicada.banos} baños</li> : null}
              {publicada.direccion ? <li>{publicada.direccion}</li> : null}
            </ul>
            <Link className="hp-btn hp-btn--gold" to={urlReserva(publicada.id, consulta)}>
              Avanzar en la reserva
            </Link>
          </aside>
        </div>
      </main>
    )
  }

  if (!estatica) {
    return (
      <main className="pagina">
        <h1 className="pagina__titulo">Cabaña no encontrada</h1>
        <Link to="/cabanas">Volver a cabañas</Link>
      </main>
    )
  }

  return (
    <main className="pagina">
      <span className="hp-label">Cabañas</span>
      <div className="detalle">
        <div>
          <img className="detalle__foto" src={estatica.fotos[foto]} alt="" />
          <div className="detalle__thumbs">
            {estatica.fotos.map((src, index) => (
              <button key={src} type="button" aria-current={index === foto} onClick={() => setFoto(index)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
          <div className="chips">
            {equipamiento.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="pagina__lead">{estatica.hotTub}</p>
        </div>
        <aside className="reserva-card">
          <h2>{estatica.nombre}</h2>
          <p>
            Hasta {estatica.huespedes} personas · {estatica.dormitorios}
          </p>
          <ul>
            <li>{estatica.resumen}</li>
            <li>Check-in 16:00 · check-out 12:00</li>
          </ul>
          <Link className="hp-btn hp-btn--gold" to={`/reservas?cabana=${estatica.slug}`}>
            Hacer reserva
          </Link>
        </aside>
      </div>
    </main>
  )
}
