import { useEffect, useState } from 'react'
import { listarAlojamientosPublicos } from '../api/alojamientos'
import { codSitio } from '../config/sitio'

export function useAlojamientos(filtro = {}) {
  const desde = filtro.desde || ''
  const hasta = filtro.hasta || ''
  const huespedes = Number(filtro.huespedes) || 0
  const codigo = codSitio()
  const [items, setItems] = useState([])
  const [estado, setEstado] = useState(codigo ? 'cargando' : 'error')
  const [error, setError] = useState(
    codigo ? '' : 'Falta VITE_COD_SITIO_WEB en el archivo .env. Reinicia el servidor después de definirlo.',
  )

  useEffect(() => {
    if (!codigo) return undefined
    let activo = true
    listarAlojamientosPublicos({ desde, hasta, huespedes })
      .then((lista) => {
        if (!activo) return
        setItems(lista)
        setEstado('listo')
      })
      .catch(() => {
        if (!activo) return
        setEstado('error')
        setError('No se pudieron cargar las cabañas publicadas en ArriendaVIP.')
      })
    return () => {
      activo = false
    }
  }, [codigo, desde, hasta, huespedes])

  return { items, estado, error, codigo }
}
