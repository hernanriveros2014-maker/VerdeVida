import { useEffect } from 'react'
import { lodge, testimonios } from '../data/lodge'

export function Testimonios() {
  useEffect(() => {
    document.title = `Testimonios · ${lodge.nombre}`
  }, [])

  return (
    <main className="pagina">
      <span className="hp-label">Huéspedes</span>
      <h1 className="pagina__titulo">Testimonios</h1>
      <p className="pagina__lead">Quienes se han alojado en VerdeVida destacan la tranquilidad, la limpieza y la cercanía al centro de Pucón.</p>
      <div className="listing-grid">
        {testimonios.map((item) => (
          <article className="listing-card" key={item.nombre}>
            <div className="listing-card__body">
              <span className="listing-card__meta">{item.contexto}</span>
              <h3>{item.nombre}</h3>
              <p>{item.nota}</p>
              <p>«{item.texto}»</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
