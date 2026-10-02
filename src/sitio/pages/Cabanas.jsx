import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
    document.title = 'Cabañas · Toltén Lodge'
  }, [])

  function buscar(criterio) {
    const consulta = new URLSearchParams({
      desde: criterio.desde,
      hasta: criterio.hasta,
      huespedes: String(criterio.huespedes),
    })
    navigate(`/cabanas?${consulta.toString()}`)
  }

  return (
    <main className="pagina">
      <BuscadorEstadia
        desde={desde}
        hasta={hasta}
        huespedes={huespedes}
        onBuscar={buscar}
        onLimpiar={() => navigate('/cabanas')}
      />
      <div style={{ height: 28 }} />
      <ListadoCabanas
        items={items}
        estado={estado}
        error={error}
        query={consulta}
        vacio={desde && hasta ? 'No hay cabañas disponibles para esas fechas.' : ''}
      />
    </main>
  )
}
