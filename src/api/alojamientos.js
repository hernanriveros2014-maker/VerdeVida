import { api, conSitio } from './client'
import { origenMedia } from '../config/sitio'

export function urlMedia(ruta) {
  if (!ruta) return ''
  if (/^https?:\/\//.test(ruta)) return ruta
  const path = ruta.startsWith('/') ? ruta : `/${ruta}`
  if (path.startsWith('/media/Sitios')) return `${origenMedia()}${path}`
  return path
}

export function formatPrecio(valor) {
  const numero = Number(valor)
  if (!Number.isFinite(numero)) return ''
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(numero)
}

function normalizar(row) {
  const id = String(row.da_alojamiento ?? row.id ?? '').trim()
  const fotos = [row.imagen, ...(Array.isArray(row.imagenes) ? row.imagenes : [])]
    .map(urlMedia)
    .filter(Boolean)
  return {
    id,
    titulo: row.titulo || 'Cabaña',
    precio: row.precio,
    huespedes: Number(row.huespedes) || 0,
    habitaciones: Number(row.habitaciones) || 0,
    camas: Number(row.camas) || 0,
    banos: Number(row.banos) || 0,
    descripcion: row.descripcion || '',
    direccion: row.direccionMapa || '',
    tipo: row.tipo || 'Cabaña',
    imagen: fotos[0] || '',
    fotos: [...new Set(fotos)],
    servicios: Array.isArray(row.servicios) ? [...new Set(row.servicios.filter(Boolean))] : [],
  }
}

export async function listarAlojamientosPublicos(filtro = {}) {
  const params = {}
  if (filtro.desde && filtro.hasta) {
    params.fecha_desde = filtro.desde
    params.fecha_hasta = filtro.hasta
  }
  if (Number(filtro.huespedes) > 0) params.p_huespedes = Number(filtro.huespedes)
  const data = await api(conSitio('/api/detalle-home/', params), { timeoutMs: 20000 })
  const filas = Array.isArray(data) ? data : data?.resultados || data?.datos || []
  return filas.map(normalizar).filter((item) => item.id)
}

export function urlDetalle(id, query = {}) {
  const params = new URLSearchParams()
  if (query.desde) params.set('desde', query.desde)
  if (query.hasta) params.set('hasta', query.hasta)
  if (query.huespedes) params.set('huespedes', String(query.huespedes))
  const qs = params.toString()
  return `/cabanas/${id}${qs ? `?${qs}` : ''}`
}

export function urlReserva(id, query = {}) {
  const params = new URLSearchParams()
  if (query.desde) params.set('desde', query.desde)
  if (query.hasta) params.set('hasta', query.hasta)
  if (query.huespedes) params.set('huespedes', query.huespedes)
  const qs = params.toString()
  return `/cabanas/${id}/reserva${qs ? `?${qs}` : ''}`
}
