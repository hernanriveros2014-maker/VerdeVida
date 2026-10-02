import { api, conSitio } from '../api/client'

const LOCAL_KEY = 'tolten.facturacion.datos'

export const CATEGORIAS_LOCALES = [
  { id: 'afecto', nombre: 'Afecto a IVA' },
  { id: 'exento', nombre: 'Exento de IVA' },
]

export const CIUDADES_LOCALES = ['Villarrica', 'Pucón', 'Freire', 'Temuco']

export const COMUNAS_LOCALES = ['Villarrica', 'Pucón', 'Freire', 'Temuco', 'Padre Las Casas']

function lista(data, claves) {
  if (Array.isArray(data)) return data
  for (const clave of claves) {
    if (Array.isArray(data?.[clave])) return data[clave]
  }
  return []
}

function leerLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function guardarLocal(datos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(datos))
}

export async function listarCategorias() {
  try {
    const data = await api(conSitio('/api/facturacion/categorias-trib/'))
    const items = lista(data, ['resultados', 'datos', 'categorias'])
    const normal = items
      .map((item, index) => ({
        id: String(item.id ?? item.da_categoria_trib ?? item.codigo ?? index),
        nombre: item.nombre ?? item.glosa ?? item.descripcion ?? '',
      }))
      .filter((item) => item.nombre)
    return { items: normal.length ? normal : CATEGORIAS_LOCALES, origen: normal.length ? 'api' : 'local' }
  } catch {
    return { items: CATEGORIAS_LOCALES, origen: 'local' }
  }
}

export async function listarCiudades() {
  try {
    const data = await api(conSitio('/api/ciudades/'))
    const items = lista(data, ['resultados', 'datos', 'ciudades'])
      .map((item) => item.nombre ?? item.glosa ?? item.ciudad)
      .filter(Boolean)
    return items.length ? items : CIUDADES_LOCALES
  } catch {
    return CIUDADES_LOCALES
  }
}

export async function listarComunas() {
  try {
    const data = await api(conSitio('/api/comunas/'))
    const items = lista(data, ['resultados', 'datos', 'comunas'])
      .map((item) => item.nombre ?? item.glosa ?? item.comuna)
      .filter(Boolean)
    return items.length ? items : COMUNAS_LOCALES
  } catch {
    return COMUNAS_LOCALES
  }
}

export async function consultarContribuyente(rut) {
  const data = await api(conSitio('/api/facturacion-cliente/contribuyente/', { rut }))
  return {
    razon_social: data?.razon_social ?? data?.nombre ?? data?.nombre_contribuyente ?? '',
    giro: data?.giro ?? '',
    acteco: data?.acteco ?? data?.codigo_acteco ?? '',
  }
}

export async function obtenerDatosCliente() {
  try {
    const data = await api(conSitio('/api/facturacion-cliente/datos/'))
    const datos = data?.datos ?? data
    if (datos && (datos.rut || datos.razon_social)) return { datos, origen: 'api' }
  } catch {
    /* el prototipo sigue con la copia local */
  }
  const local = leerLocal()
  return { datos: local, origen: 'local' }
}

export async function guardarDatosCliente(datos) {
  guardarLocal(datos)
  try {
    await api(conSitio('/api/facturacion-cliente/datos/guardar/'), {
      method: 'POST',
      body: JSON.stringify({ ...datos, dg_cod_sitio_web: undefined }),
    })
    return { origen: 'api' }
  } catch {
    return { origen: 'local' }
  }
}
