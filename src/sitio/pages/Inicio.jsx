import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { lodge, servicios, testimonios } from '../data/lodge'
import { ServiciosGrid } from '../components/ServiciosGrid'
import { BuscadorEstadia } from '../components/BuscadorEstadia'
import { ListadoCabanas } from '../components/ListadoCabanas'
import { useAlojamientos } from '../useAlojamientos'

const POR_PAGINA = 4

export function Inicio() {
  const navigate = useNavigate()
  const { items, estado, error } = useAlojamientos()
  const [pagina, setPagina] = useState(0)
  const paginas = Math.max(1, Math.ceil(items.length / POR_PAGINA))
  const paginaActual = Math.min(pagina, paginas - 1)
  const visibles = items.slice(paginaActual * POR_PAGINA, paginaActual * POR_PAGINA + POR_PAGINA)

  function buscar({ desde, hasta, huespedes }) {
    const params = new URLSearchParams({ desde, hasta, huespedes: String(huespedes) })
    navigate(`/cabanas?${params.toString()}`)
  }

  return (
    <main>
      <section className="hp-hero" style={{ backgroundImage: "url('/media/verdevida/hero.jpeg')" }}>
        <div className="hp-hero__velo" />
        <div className="hp-hero__contenido">
          <span className="hp-label">Pucón</span>
          <h1>El nuevo comienzo en armonía con la naturaleza</h1>
          <p className="hp-hero__bajada">
            Apart hotel a minutos del centro, rodeado de naturaleza. Ocho habitaciones para descansar con calma.
          </p>
          <Link className="hp-btn hp-btn--gold" to="/cabanas">
            Reservar ahora
          </Link>
        </div>
      </section>

      <BuscadorEstadia onBuscar={buscar} onLimpiar={() => navigate('/cabanas')} />

      <section className="hp-section" id="servicios">
        <div className="hp-inner">
          <span className="hp-label">El apart hotel</span>
          <h2 className="hp-section-title servicios-titulo">Servicios</h2>
          <ServiciosGrid items={servicios} />
        </div>
      </section>

      <section className="hp-section" id="nosotros" style={{ paddingTop: 0 }}>
        <div className="hp-inner intro">
          <div>
            <span className="hp-label">Sobre nosotros</span>
            <h2 className="hp-section-title">Un descanso simple, en un entorno natural.</h2>
            <p>
              En VerdeVida el descanso está en lo simple: un entorno natural, una atención cálida y espacios hechos con cariño. Es un apart hotel a minutos del centro de Pucón, rodeado de naturaleza.
            </p>
            <p>
              Hay 8 habitaciones para un total de 18 personas, equipadas para ofrecer privacidad y comodidad. El lugar funciona bien para parejas o viajeros que buscan tranquilidad y cercanía.
            </p>
            <div className="cifras">
              <div>
                <strong>8</strong>
                <span>habitaciones</span>
              </div>
              <div>
                <strong>18</strong>
                <span>personas</span>
              </div>
              <div>
                <strong>10 min</strong>
                <span>caminando al centro</span>
              </div>
              <div>
                <strong>14:00</strong>
                <span>entrada · salida 12:00</span>
              </div>
            </div>
          </div>
          <div className="intro__collage">
            <img src="/media/verdevida/jardin.jpeg" alt="Jardín y entorno natural de VerdeVida" />
            <img src="/media/verdevida/habitaciones/doble.jpeg" alt="Habitación doble de VerdeVida" />
            <img src="/media/verdevida/galeria/terraza.jpeg" alt="Terraza del apart hotel" />
          </div>
        </div>
      </section>

      <section className="hp-section" style={{ paddingTop: 0 }}>
        <div className="hp-inner">
          <span className="hp-label">Alojamiento</span>
          <h2 className="hp-section-title">Habitaciones disponibles</h2>
          <p className="hp-section-sub">Elige fechas y reserva en línea. El pago y la disponibilidad se confirman con ArriendaVIP.</p>
          <ListadoCabanas items={visibles} estado={estado} error={error} clase="listing-grid listing-grid--cuatro" />
          {estado === 'listo' && items.length > 0 ? (
            <div className="paginacion">
              <button type="button" disabled={paginaActual === 0} onClick={() => setPagina(paginaActual - 1)}>
                Retroceder
              </button>
              <span>
                {paginaActual + 1} / {paginas}
              </span>
              <button type="button" disabled={paginaActual >= paginas - 1} onClick={() => setPagina(paginaActual + 1)}>
                Avanzar
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="hp-section" style={{ paddingTop: 0 }}>
        <div className="hp-inner">
          <span className="hp-label">Huéspedes</span>
          <h2 className="hp-section-title">Testimonios</h2>
          <div className="listing-grid">
            {testimonios.slice(0, 3).map((item) => (
              <article className="listing-card" key={item.nombre}>
                <div className="listing-card__body">
                  <span className="listing-card__meta">{item.contexto}</span>
                  <h3>{item.nombre}</h3>
                  <p>{item.texto}</p>
                </div>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 22 }}>
            <Link className="hp-btn hp-btn--outline" to="/testimonios">
              Ver todos
            </Link>
          </p>
        </div>
      </section>

      <section className="hp-section" style={{ paddingTop: 0 }}>
        <div className="hp-inner">
          <span className="hp-label">Contacto</span>
          <h2 className="hp-section-title">Dónde estamos</h2>
          <div className="ubicacion">
            <div>
              <p>
                <strong>{lodge.direccion}</strong>
              </p>
              <p>{lodge.ingreso}</p>
              <p>{lodge.ciudad}</p>
              <p style={{ marginTop: 16 }}>
                <a href={lodge.maps} target="_blank" rel="noreferrer">
                  Abrir mapa
                </a>
              </p>
            </div>
            <div>
              <p>
                <a href={lodge.telefonoHref}>{lodge.telefono}</a>
              </p>
              <p>
                <a href={`mailto:${lodge.email}`}>{lodge.email}</a>
              </p>
              <p style={{ marginTop: 16 }}>
                Entrada {lodge.checkin}. Salida {lodge.checkout}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
