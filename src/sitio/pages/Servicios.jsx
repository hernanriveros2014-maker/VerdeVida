import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { lodge, servicios } from '../data/lodge'
import { ServiciosGrid } from '../components/ServiciosGrid'

export function Servicios() {
  useEffect(() => {
    document.title = `Servicios · ${lodge.nombre}`
  }, [])

  return (
    <main className="pagina">
      <span className="hp-label">VerdeVida</span>
      <h1 className="pagina__titulo servicios-titulo">Servicios</h1>
      <ServiciosGrid items={servicios} />
      <p style={{ marginTop: 28 }}>
        <Link className="hp-btn hp-btn--gold" to="/cabanas">
          Reservar ahora
        </Link>
      </p>
    </main>
  )
}
