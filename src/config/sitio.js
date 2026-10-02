export function codSitio() {
  return String(import.meta.env.VITE_COD_SITIO_WEB ?? '').trim()
}

export function apiBase() {
  return import.meta.env.VITE_API_BASE || ''
}

export function origenMedia() {
  return import.meta.env.VITE_MEDIA_ORIGIN || 'http://localhost:8000'
}

export function origenArriendaVip() {
  return import.meta.env.VITE_ARRIENDAVIP_ORIGIN || 'http://localhost:5173'
}
