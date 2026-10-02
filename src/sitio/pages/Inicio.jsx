import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { lodge } from '../data/lodge'
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
      <section className="hp-hero" style={{ backgroundImage: "url('/media/hero-2.jpg')" }}>
        <div className="hp-hero__velo" />
        <div className="hp-hero__contenido">
          <span className="hp-label">Villarrica · Río Toltén</span>
          <h1>Toltén Lodge</h1>
          <p className="hp-hero__bajada">
            Tres cabañas de madera nativa, cada una con hot-tub, en 500 metros de rivera privada. A 30 minutos de Villarrica y del aeropuerto de La Araucanía.
          </p>
        </div>
      </section>

      <BuscadorEstadia onBuscar={buscar} onLimpiar={() => navigate('/cabanas')} />

      <section className="hp-section">
        <div className="hp-inner intro">
          <div>
            <span className="hp-label">El lodge</span>
            <h2 className="hp-section-title">Un complejo privado entre el río y el bosque.</h2>
            <p>
              Toltén Lodge está a orillas del río Toltén, con rivera y bosque nativo, pensado para el descanso de toda la familia. Son solo tres cabañas en más de una hectárea, cada una con su hot-tub.
            </p>
            <p>
              Para quien viene a pescar, el lodge es la puerta de entrada al sur: salmón Chinook en el Toltén, cercanía al Allipén y excursiones con guías de la zona.
            </p>
            <div className="cifras">
              <div>
                <strong>3</strong>
                <span>cabañas</span>
              </div>
              <div>
                <strong>500 m</strong>
                <span>de rivera</span>
              </div>
              <div>
                <strong>1 ha</strong>
                <span>de terreno privado</span>
              </div>
              <div>
                <strong>30 min</strong>
                <span>de Villarrica</span>
              </div>
            </div>
          </div>
          <div className="intro__collage">
            <img src="/media/hq/mirador-1.jpg" alt="Cabaña de madera entre el bosque nativo" />
            <img src="/media/hq/refugio-4.jpg" alt="Hot-tub de madera junto al río" />
            <img src="/media/hq/entorno-3.jpg" alt="Jardín y bosque del lodge" />
          </div>
        </div>
      </section>

      <section className="hp-section" style={{ paddingTop: 0 }}>
        <div className="hp-inner">
          <span className="hp-label">Alojamiento</span>
          <h2 className="hp-section-title">Cabañas</h2>
          <p className="hp-section-sub">Equipadas, de madera nativa, con cocina completa y vista al río.</p>
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

      <section className="franja">
        <img src="/media/hq/pesca-6.jpg" alt="Botes de pesca en el río Toltén" />
        <div className="franja__texto">
          <span className="hp-label">1 de septiembre al 28 de febrero</span>
          <h2 className="hp-section-title">Pesca de salmón Chinook</h2>
          <p>
            El río Toltén es conocido por el Chinook, con ejemplares que llegan a los 25 kilos. También hay excursiones de fly fishing, trucha y clases para quien está empezando.
          </p>
          <Link className="hp-btn hp-btn--claro" to="/pesca">
            Ver excursiones
          </Link>
        </div>
      </section>

      <section className="hp-section">
        <div className="hp-inner spa">
          <img src="/media/hq/refugio-4.jpg" alt="Hot-tub frente al río Toltén" />
          <div>
            <span className="hp-label">Cabañas, pesca y spa</span>
            <h2 className="hp-section-title">Hot-tub propio y rivera para caminar.</h2>
            <p className="hp-section-sub">
              Desde la cabaña se ve el río y se puede recorrer flora y fauna en 500 metros de rivera exclusiva, para pesca, caminata o fotografía. El hot-tub queda disponible en estadías de más de dos noches.
            </p>
            <Link className="hp-btn hp-btn--gold" to="/galeria/entorno">
              Ver el entorno
            </Link>
          </div>
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
              <p style={{ marginTop: 16 }}>Ingreso desde las {lodge.checkin}. Salida hasta las {lodge.checkout}.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
