export function limpiarRut(rut) {
  return String(rut ?? '')
    .replace(/[^0-9kK]/g, '')
    .toUpperCase()
}

export function formatearRut(rut) {
  const limpio = limpiarRut(rut)
  if (limpio.length < 2) return limpio
  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)
  const conPuntos = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${conPuntos}-${dv}`
}

export function rutValido(rut) {
  const limpio = limpiarRut(rut)
  if (limpio.length < 8 || limpio.length > 9) return false
  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)
  let suma = 0
  let multiplicador = 2
  for (let i = cuerpo.length - 1; i >= 0; i -= 1) {
    suma += Number(cuerpo[i]) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }
  const resto = 11 - (suma % 11)
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto)
  return dv === esperado
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validarFacturacion(datos) {
  const errores = {}
  const factura = String(datos.tipo_dte_cliente) === '33'
  if (!rutValido(datos.rut)) errores.rut = 'Ingresa un RUT válido.'
  if (!String(datos.razon_social ?? '').trim()) {
    errores.razon_social = factura ? 'Ingresa la razón social.' : 'Ingresa el nombre.'
  }
  if (!EMAIL.test(String(datos.correo_dte ?? '').trim())) {
    errores.correo_dte = 'Ingresa un correo para el documento.'
  }
  if (!String(datos.comuna ?? '').trim()) errores.comuna = 'Selecciona una comuna.'
  if (factura) {
    if (!String(datos.acteco ?? '').trim()) errores.acteco = 'Ingresa el código de actividad económica.'
    if (!String(datos.giro ?? '').trim()) errores.giro = 'Ingresa el giro comercial.'
    if (!String(datos.categoria_trib ?? '').trim()) {
      errores.categoria_trib = 'Selecciona la categoría tributaria.'
    }
  }
  return errores
}

export const DATOS_VACIOS = {
  tipo_dte_cliente: '39',
  rut: '',
  razon_social: '',
  acteco: '',
  categoria_trib: '',
  giro: '',
  ciudad: 'Villarrica',
  comuna: '',
  correo_dte: '',
  telefono: '',
}
