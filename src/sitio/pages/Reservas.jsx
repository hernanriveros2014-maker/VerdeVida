import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { DatosFacturacion } from '../../facturacion/DatosFacturacion'
import { guardarDatosCliente } from '../../facturacion/api'
import { DATOS_VACIOS, validarFacturacion } from '../../facturacion/validar'
import { cabanaPorSlug, cabanas, lodge } from '../data/lodge'
import { useAlojamientos } from '../useAlojamientos'

const PASOS = ['Estadía', 'Huésped', 'Facturación', 'Confirmación']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function hoy() {
  const fecha = new Date()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${fecha.getFullYear()}-${mes}-${dia}`
}

function noches(desde, hasta) {
  if (!desde || !hasta) return 0
  const ms = new Date(hasta) - new Date(desde)
  return Math.round(ms / 86400000)
}

export function Reservas() {
  const [params] = useSearchParams()
  const inicial = cabanaPorSlug(params.get('cabana'))
  const [paso, setPaso] = useState(0)
  const [estadia, setEstadia] = useState({
    cabana: inicial?.slug || params.get('cabana') || '',
    desde: params.get('desde') ?? '',
    hasta: params.get('hasta') ?? '',
    huespedes: Number(params.get('huespedes') || 2),
  })
  const [huesped, setHuesped] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [facturacion, setFacturacion] = useState({
    ...DATOS_VACIOS,
    correo_dte: '',
    telefono: '',
  })
  const [errores, setErrores] = useState({})
  const [erroresFactura, setErroresFactura] = useState({})
  const [codigo, setCodigo] = useState('')
  const [origenFactura, setOrigenFactura] = useState('local')
  const [omitioFactura, setOmitioFactura] = useState(false)

  const { items } = useAlojamientos()
  const opciones = items.length
    ? items.map((item) => ({
        slug: item.id,
        nombre: item.titulo,
        huespedes: item.huespedes || lodge.huespedesMax,
      }))
    : cabanas
  const cabana = opciones.find((item) => item.slug === estadia.cabana) || cabanaPorSlug(estadia.cabana)
  const estadiaNoches = noches(estadia.desde, estadia.hasta)

  useEffect(() => {
    document.title = `Reservas · ${lodge.nombre}`
  }, [])

  function validarEstadia() {
    const siguientes = {}
    if (!cabana) siguientes.cabana = 'Elige una cabaña.'
    if (!estadia.desde) siguientes.desde = 'Indica la llegada.'
    if (!estadia.hasta) siguientes.hasta = 'Indica la salida.'
    if (estadia.desde && estadia.hasta && estadiaNoches < 1) siguientes.hasta = 'La salida debe ser posterior a la llegada.'
    if (cabana && estadia.huespedes > cabana.huespedes) {
      siguientes.huespedes = `Esta cabaña recibe hasta ${cabana.huespedes} personas.`
    }
    setErrores(siguientes)
    return Object.keys(siguientes).length === 0
  }

  function validarHuesped() {
    const siguientes = {}
    if (huesped.nombre.trim().length < 3) siguientes.nombre = 'Ingresa tu nombre.'
    if (!EMAIL.test(huesped.email.trim())) siguientes.email = 'Ingresa un correo válido.'
    if (huesped.telefono.trim().length < 8) siguientes.telefono = 'Ingresa un teléfono.'
    setErrores(siguientes)
    return Object.keys(siguientes).length === 0
  }

  function continuar() {
    if (paso === 0 && validarEstadia()) {
      setFacturacion((actual) => ({
        ...actual,
        correo_dte: actual.correo_dte || huesped.email,
        telefono: actual.telefono || huesped.telefono,
        razon_social: actual.razon_social || huesped.nombre,
      }))
      setPaso(1)
    } else if (paso === 1 && validarHuesped()) {
      setFacturacion((actual) => ({
        ...actual,
        correo_dte: actual.correo_dte || huesped.email,
        telefono: actual.telefono || huesped.telefono,
        razon_social: actual.razon_social || huesped.nombre,
      }))
      setPaso(2)
    }
  }

  async function confirmar(omitir) {
    if (!omitir) {
      const siguientes = validarFacturacion(facturacion)
      setErroresFactura(siguientes)
      if (Object.keys(siguientes).length) return
      const resultado = await guardarDatosCliente(facturacion)
      setOrigenFactura(resultado.origen)
      setOmitioFactura(false)
    } else {
      setOmitioFactura(true)
    }
    const folio = `TL-${Date.now().toString().slice(-6)}`
    const solicitud = { folio, estadia, huesped, facturacion: omitir ? null : facturacion, creada: new Date().toISOString() }
    const previas = JSON.parse(localStorage.getItem('tolten.reservas') || '[]')
    localStorage.setItem('tolten.reservas', JSON.stringify([solicitud, ...previas]))
    setCodigo(folio)
    setPaso(3)
  }

  return (
    <main className="pagina pagina--estrecha">
      <span className="hp-label">Reserva directa</span>
      <h1 className="pagina__titulo">Reservas</h1>
      <p className="pagina__lead">
        La solicitud queda pendiente hasta la confirmación por correo o teléfono. El abono es de una noche, por transferencia.
      </p>
      <ol className="stepper">
        {PASOS.map((nombre, index) => (
          <li key={nombre} className={index === paso ? 'actual' : undefined}>
            {index + 1}. {nombre}
          </li>
        ))}
      </ol>

      {paso === 0 && (
        <form
          className="panel"
          onSubmit={(event) => {
            event.preventDefault()
            continuar()
          }}
        >
          <div className="form-grid">
            <label className="campo campo--ancho">
              Cabaña
              <select value={estadia.cabana} onChange={(event) => setEstadia({ ...estadia, cabana: event.target.value })}>
                <option value="">Seleccione…</option>
                {opciones.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.nombre} · hasta {item.huespedes}
                  </option>
                ))}
              </select>
              {errores.cabana ? <span className="error">{errores.cabana}</span> : null}
            </label>
            <label className="campo">
              Llegada
              <input type="date" min={hoy()} value={estadia.desde} onChange={(event) => setEstadia({ ...estadia, desde: event.target.value })} />
              {errores.desde ? <span className="error">{errores.desde}</span> : null}
            </label>
            <label className="campo">
              Salida
              <input type="date" min={estadia.desde || hoy()} value={estadia.hasta} onChange={(event) => setEstadia({ ...estadia, hasta: event.target.value })} />
              {errores.hasta ? <span className="error">{errores.hasta}</span> : null}
            </label>
            <label className="campo">
              Huéspedes
              <span className="huespedes">
                <button type="button" onClick={() => setEstadia({ ...estadia, huespedes: Math.max(1, estadia.huespedes - 1) })} aria-label="Menos huéspedes">
                  −
                </button>
                <strong>{estadia.huespedes}</strong>
                <button type="button" onClick={() => setEstadia({ ...estadia, huespedes: Math.min(cabana?.huespedes || lodge.huespedesMax, estadia.huespedes + 1) })} aria-label="Más huéspedes">
                  +
                </button>
              </span>
              {errores.huespedes ? <span className="error">{errores.huespedes}</span> : null}
            </label>
          </div>
          <div className="form-acciones">
            <button className="hp-btn hp-btn--gold" type="submit">
              Continuar
            </button>
          </div>
        </form>
      )}

      {paso === 1 && (
        <form
          className="panel"
          onSubmit={(event) => {
            event.preventDefault()
            continuar()
          }}
        >
          <div className="form-grid">
            <label className="campo campo--ancho">
              Nombre
              <input value={huesped.nombre} onChange={(event) => setHuesped({ ...huesped, nombre: event.target.value })} />
              {errores.nombre ? <span className="error">{errores.nombre}</span> : null}
            </label>
            <label className="campo">
              Correo
              <input type="email" value={huesped.email} onChange={(event) => setHuesped({ ...huesped, email: event.target.value })} />
              {errores.email ? <span className="error">{errores.email}</span> : null}
            </label>
            <label className="campo">
              Teléfono
              <input value={huesped.telefono} onChange={(event) => setHuesped({ ...huesped, telefono: event.target.value })} />
              {errores.telefono ? <span className="error">{errores.telefono}</span> : null}
            </label>
            <label className="campo campo--ancho">
              Mensaje
              <textarea value={huesped.mensaje} onChange={(event) => setHuesped({ ...huesped, mensaje: event.target.value })} />
            </label>
          </div>
          <div className="form-acciones">
            <button className="hp-btn hp-btn--outline" type="button" onClick={() => setPaso(0)}>
              Volver
            </button>
            <button className="hp-btn hp-btn--gold" type="submit">
              Continuar
            </button>
          </div>
        </form>
      )}

      {paso === 2 && (
        <div className="panel">
          <DatosFacturacion datos={facturacion} onChange={setFacturacion} errores={erroresFactura} origen={origenFactura} />
          <div className="form-acciones">
            <button className="hp-btn hp-btn--outline" type="button" onClick={() => setPaso(1)}>
              Volver
            </button>
            <button className="hp-btn hp-btn--gold" type="button" onClick={() => confirmar(false)}>
              Enviar con facturación
            </button>
            <button className="hp-btn hp-btn--outline" type="button" onClick={() => confirmar(true)}>
              Continuar sin documento
            </button>
          </div>
        </div>
      )}

      {paso === 3 && (
        <div className="panel">
          <span className="hp-label">Solicitud {codigo}</span>
          <h2 className="hp-section-title">Recibimos tu reserva.</h2>
          <p className="pagina__lead">
            Aún no está confirmada. Te contactaremos a {huesped.email} o al {huesped.telefono}. El abono de una noche se devuelve íntegro si cancelas hasta una semana antes del ingreso.
          </p>
          <div className="resumen-lista">
            <div>
              <span>Cabaña</span>
              <strong>{cabana?.nombre}</strong>
            </div>
            <div>
              <span>Estadía</span>
              <strong>
                {estadia.desde} → {estadia.hasta} · {estadiaNoches} {estadiaNoches === 1 ? 'noche' : 'noches'}
              </strong>
            </div>
            <div>
              <span>Huéspedes</span>
              <strong>{estadia.huespedes}</strong>
            </div>
            <div>
              <span>Horario</span>
              <strong>
                Entrada {lodge.checkin} · salida {lodge.checkout}
              </strong>
            </div>
            <div>
              <span>Documento</span>
              <strong>{omitioFactura ? 'Pendiente' : facturacion.tipo_dte_cliente === '33' ? 'Factura electrónica' : 'Boleta electrónica'}</strong>
            </div>
          </div>
          <p className="politica">
            Entrada a las {lodge.checkin}. Salida hasta las {lodge.checkout}. En algunas fechas de temporada se piden al menos 2 noches.
          </p>
          <div className="form-acciones">
            <a className="hp-btn hp-btn--gold" href={lodge.whatsapp} target="_blank" rel="noreferrer">
              Escribir por WhatsApp
            </a>
            <Link className="hp-btn hp-btn--outline" to="/">
              Volver al inicio
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
