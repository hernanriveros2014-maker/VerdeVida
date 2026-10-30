import { useEffect } from 'react'
import { actividades, lodge } from '../data/lodge'

export function Pucon() {
  useEffect(() => {
    document.title = `Pucón · ${lodge.nombre}`
  }, [])

  return (
    <main className="pagina">
      <span className="hp-label" id="ubicacion">
        IX Región de la Araucanía
      </span>
      <h1 className="pagina__titulo">Pucón</h1>
      <p className="pagina__lead">
        Pucón está al sur de Chile, a 785 km de Santiago, junto al lago Villarrica. La rodean bosques de araucarias, lagos, ríos y volcanes, entre ellos el volcán Villarrica. Es un lugar para la naturaleza durante todo el año: sol en verano y nieve en invierno.
      </p>
      <div className="intro__collage" style={{ margin: '8px 0 36px' }}>
        <img src="/media/misimali/entorno/pucon-29.jpg" alt="Lago y paisaje de Pucón" />
        <img src="/media/misimali/entorno/pucon-15.jpg" alt="Bosque y montaña en la Araucanía" />
        <img src="/media/misimali/entorno/pucon-16.jpg" alt="Entorno natural de Pucón" />
      </div>

      <h2 className="hp-section-title">Cómo llegar</h2>
      <div className="listing-grid">
        <article className="listing-card">
          <div className="listing-card__body">
            <h3>Desde el norte</h3>
            <p>Por Temuco, Freire y Villarrica. Ruta pavimentada.</p>
          </div>
        </article>
        <article className="listing-card">
          <div className="listing-card__body">
            <h3>Desde el sur</h3>
            <p>Por Loncoche y Villarrica. Ruta pavimentada.</p>
          </div>
        </article>
        <article className="listing-card">
          <div className="listing-card__body">
            <h3>Desde Argentina</h3>
            <p>Por el paso Mamuil Malal, también llamado Tromen. Hay ripio en unos 100 km. En invierno puede hacer falta doble tracción.</p>
          </div>
        </article>
      </div>
      <p style={{ marginTop: 18 }}>
        <a className="hp-btn hp-btn--gold" href={lodge.maps} target="_blank" rel="noreferrer">
          Ver Alto Misimali en el mapa
        </a>
      </p>

      <section id="turismo" style={{ marginTop: 56 }}>
        <span className="hp-label">Outdoor</span>
        <h2 className="hp-section-title">Pucón turismo</h2>
        <p className="pagina__lead">
          Ascenso al volcán Villarrica, trekking en los parques Huerquehue, Villarrica y Quetrupillán, rafting en los ríos Trancura y Liucura, kayak, hidrospeed, mountain bike y cabalgatas.
        </p>
        <p>
          La comuna está en la provincia de Cautín. Se extiende desde Melipeuco y Cunco por el norte hasta Panguipulli y Villarrica por el sur. Al este limita con Curarrehue y al oeste con Villarrica.
        </p>
        <div className="listing-grid" style={{ marginTop: 22 }}>
          {actividades.map((item) => (
            <article className="listing-card" key={item.nombre}>
              <div className="listing-card__body">
                <h3>{item.nombre}</h3>
                <p>{item.detalle}</p>
                <a className="listing-card__link" href={item.url} target="_blank" rel="noreferrer">
                  Sitio del operador
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
