import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { codSitio, origenArriendaVip } from '../../config/sitio'
import { lodge } from '../data/lodge'

export function Cuenta() {
  const [params] = useSearchParams()
  const panel = params.get('panel') || 'mis_espacios'
  const pagina = /^[a-z0-9_]+$/.test(panel) ? panel : 'mis_espacios'
  const src = useMemo(() => {
    const consulta = new URLSearchParams({
      dg_cod_sitio_web: codSitio(),
      sin_pie: '1',
    })
    if (pagina !== 'inicio') consulta.set('page', pagina)
    params.forEach((valor, clave) => {
      if (clave !== 'panel') consulta.set(clave, valor)
    })
    return `${origenArriendaVip()}/?${consulta.toString()}`
  }, [pagina, params])

  useEffect(() => {
    document.title = `Administrar · ${lodge.nombre}`
  }, [])

  return (
    <main className="ficha-vip">
      <iframe title="Administrar alojamientos" src={src} style={{ height: 'calc(100dvh - var(--nav-h))' }} />
    </main>
  )
}
