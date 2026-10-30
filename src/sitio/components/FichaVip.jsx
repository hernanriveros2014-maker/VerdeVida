import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { codSitio, origenArriendaVip } from '../../config/sitio'
import { lodge } from '../data/lodge'

export function urlFichaVip(id, query = {}) {
  const huespedes = query.huespedes || '0'
  const consulta = new URLSearchParams({
    page: 'detalle_reserva',
    listing: String(id),
    da_alojamiento: String(id),
    dg_cod_sitio_web: codSitio(),
    check_in: query.desde || '',
    check_out: query.hasta || '',
    adults: huespedes,
    children: '0',
    pets: '0',
    rooms: '0',
    beds: '0',
    bathrooms: '0',
    personas: huespedes,
    sin_pie: '1',
  })
  if (query.desde && query.hasta) consulta.set('auto_search', '1')
  return `${origenArriendaVip()}/?${consulta.toString()}`
}

export function FichaVip({ id }) {
  const [params] = useSearchParams()
  const [alto, setAlto] = useState(1600)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [visorAbierto, setVisorAbierto] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)
  const cubre = menuAbierto || visorAbierto || modalAbierto
  const codigo = codSitio()
  const src = useMemo(
    () =>
      urlFichaVip(id, {
        desde: params.get('desde') || '',
        hasta: params.get('hasta') || '',
        huespedes: params.get('huespedes') || '',
      }),
    [id, params],
  )

  useEffect(() => {
    document.title = `Cabaña · ${lodge.nombre}`
  }, [id])

  useEffect(() => {
    document.body.style.overflow = cubre ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [cubre])

  useEffect(() => {
    const origen = origenArriendaVip()
    const alMensaje = (event) => {
      if (event.origin !== origen) return
      if (event.data?.tipo === 'tolten-menu') {
        setMenuAbierto(Boolean(event.data.abierto))
        return
      }
      if (event.data?.tipo === 'tolten-modal') {
        setModalAbierto(Boolean(event.data.abierto))
        if (event.data.abierto) window.scrollTo(0, 0)
        return
      }
      if (event.data?.tipo === 'tolten-lightbox') {
        setVisorAbierto(Boolean(event.data.abierto))
        if (event.data.abierto) window.scrollTo(0, 0)
        return
      }
      if (event.data?.tipo !== 'tolten-ficha-alto') return
      const siguiente = Number(event.data.alto)
      if (siguiente > 400) setAlto(Math.ceil(siguiente))
    }
    window.addEventListener('message', alMensaje)
    return () => window.removeEventListener('message', alMensaje)
  }, [])

  if (!codigo) {
    return (
      <main className="pagina">
        <h1 className="pagina__titulo">Falta el código del sitio</h1>
        <p className="pagina__lead">Define VITE_COD_SITIO_WEB en el archivo .env y reinicia el servidor.</p>
      </main>
    )
  }

  return (
    <main className="ficha-vip">
      <iframe
        className={cubre ? 'ficha-vip__frame--menu' : undefined}
        title="Detalle de la cabaña"
        src={src}
        style={{ height: cubre ? 'calc(100dvh - var(--nav-h))' : alto }}
        onLoad={() => {
          setMenuAbierto(false)
          setVisorAbierto(false)
          setModalAbierto(false)
        }}
        scrolling={cubre ? 'auto' : 'no'}
      />
    </main>
  )
}
