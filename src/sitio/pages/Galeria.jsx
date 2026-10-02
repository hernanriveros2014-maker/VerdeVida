import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { albumes } from '../data/lodge'

export function Galeria() {
  const { album: slug } = useParams()
  const album = albumes.find((item) => item.slug === slug) ?? null
  const fotos = album ? album.fotos : albumes.flatMap((item) => item.fotos)
  const unicas = [...new Set(fotos)]
  const [activa, setActiva] = useState(null)

  useEffect(() => {
    document.title = album ? `${album.nombre} · Galería` : 'Galería · Toltén Lodge'
    setActiva(null)
  }, [album])

  useEffect(() => {
    if (!activa) return undefined
    const cerrar = (event) => {
      if (event.key === 'Escape') setActiva(null)
    }
    window.addEventListener('keydown', cerrar)
    return () => window.removeEventListener('keydown', cerrar)
  }, [activa])

  if (slug && !album) {
    return (
      <main className="pagina">
        <h1 className="pagina__titulo">Álbum no encontrado</h1>
        <NavLink to="/galeria">Volver a la galería</NavLink>
      </main>
    )
  }

  return (
    <main className="pagina">
      <span className="hp-label">Fotografías del lodge</span>
      <h1 className="pagina__titulo">{album ? album.nombre : 'Galería'}</h1>
      <nav className="galeria-nav" aria-label="Álbumes">
        <NavLink to="/galeria" end className={({ isActive }) => (isActive ? 'activa' : undefined)}>
          Todas
        </NavLink>
        {albumes.map((item) => (
          <NavLink key={item.slug} to={`/galeria/${item.slug}`} className={({ isActive }) => (isActive ? 'activa' : undefined)}>
            {item.nombre}
          </NavLink>
        ))}
      </nav>
      <div className="galeria-grid">
        {unicas.map((src) => (
          <button key={src} type="button" onClick={() => setActiva(src)}>
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      {activa ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Foto ampliada" onClick={() => setActiva(null)}>
          <button type="button" onClick={() => setActiva(null)} aria-label="Cerrar">
            ×
          </button>
          <img src={activa} alt="" onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </main>
  )
}
