import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { lodge } from '../data/lodge'
import { ListadoCabanas } from '../components/ListadoCabanas'
import { BuscadorEstadia } from '../components/BuscadorEstadia'
import { useAlojamientos } from '../useAlojamientos'

export function Cabanas() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const desde = params.get('desde') || ''
  const hasta = params.get('hasta') || ''
  const huespedes = Number(params.get('huespedes') || 0)
  const { items, estado, error } = useAlojamientos({ desde, hasta, huespedes })
  const consulta = { desde, hasta, huespedes: huespedes || '' }

  useEffect(() => {
    document.title = `Habitaciones · ${lodge.nombre}`
  }, [])

  function buscar(criterio) {
    const consultaNueva = new URLSearchParams({
      desde: criterio.desde,
      hasta: criterio.hasta,
      huespedes: String(criterio.huespedes),
    })
    navigate(`/cabanas?${consultaNueva.toString()}`)
  }

  return (
    <main className="pagina pagina--cabanas">
      <span className="hp-label">Alojamiento</span>
      <h1 className="pagina__titulo">Habitaciones</h1>
      <p className="pagina__lead">
        Habitación doble para una o dos personas, y triple para tres. En Navidad, Año Nuevo y vacaciones de verano e invierno, algunas fechas piden un mínimo de 2 noches. Entrada {lodge.checkin}, salida {lodge.checkout}.
      </p>
      <BuscadorEstadia
        desde={desde}
        hasta={hasta}
        huespedes={huespedes}
        onBuscar={buscar}
        onLimpiar={() => navigate('/cabanas')}
      />
      <div id="disponibles" style={{ height: 28 }} />
      <h2 className="hp-section-title">Disponibles para reservar</h2>
      <p className="hp-section-sub">Estas son las habitaciones publicadas. Desde aquí se abre la ficha, la reserva y el pago.</p>
      <ListadoCabanas
        items={items}
        estado={estado}
        error={error}
        query={consulta}
        vacio={desde && hasta ? 'No hay habitaciones disponibles para esas fechas.' : ''}
      />
    </main>
  )
}
