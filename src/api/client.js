import { apiBase, codSitio } from '../config/sitio'

export function conSitio(path, params = {}) {
  const [pathname, query = ''] = path.split('?')
  const usp = new URLSearchParams(query)
  if (!usp.has('dg_cod_sitio_web')) usp.set('dg_cod_sitio_web', codSitio())
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') usp.set(key, String(value))
  })
  const qs = usp.toString()
  return qs ? `${pathname}?${qs}` : pathname
}

export async function api(path, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 4000)
  try {
    const response = await fetch(`${apiBase()}${path}`, {
      ...options,
      signal: options.signal ?? controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    })
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}`)
      error.status = response.status
      throw error
    }
    const text = await response.text()
    if (!text) return null
    return JSON.parse(text)
  } catch (error) {
    if (error?.name === 'AbortError') {
      const timeout = new Error('No se pudo conectar con el servidor')
      timeout.offline = true
      throw timeout
    }
    if (!error.status) error.offline = true
    throw error
  } finally {
    clearTimeout(timer)
  }
}
