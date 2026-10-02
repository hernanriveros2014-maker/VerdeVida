import { useEffect, useMemo, useState } from 'react'
import './BuscadorEstadia.css'

const DIAS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function claveHoy() {
  const fecha = new Date()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${fecha.getFullYear()}-${mes}-${dia}`
}

function parseClave(clave) {
  const [anio, mes, dia] = clave.split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

function sumarDia(clave) {
  const fecha = parseClave(clave)
  fecha.setDate(fecha.getDate() + 1)
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${fecha.getFullYear()}-${mes}-${dia}`
}

function textoFecha(clave) {
  if (!clave) return ''
  return parseClave(clave).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })
}

function textoHuespedes(cantidad) {
  const total = Number(cantidad) || 0
  if (total <= 0) return '¿Cuántos?'
  return total === 1 ? '1 huésped' : `${total} huéspedes`
}

export function BuscadorEstadia({ desde = '', hasta = '', huespedes = 0, onBuscar, onLimpiar }) {
  const [ingreso, setIngreso] = useState(desde)
  const [salida, setSalida] = useState(hasta)
  const [cantidad, setCantidad] = useState(Number(huespedes) || 0)
  const [panel, setPanel] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setIngreso(desde)
    setSalida(hasta)
    setCantidad(Number(huespedes) || 0)
  }, [desde, hasta, huespedes])

  function elegirIngreso(clave) {
    setIngreso(clave)
    setError('')
    if (!salida || salida <= clave) {
      setSalida('')
      setPanel('salida')
      return
    }
    setPanel(null)
  }

  function elegirSalida(clave) {
    setSalida(clave)
    setError('')
    setPanel(null)
  }

  function buscar() {
    const faltan = []
    if (!ingreso) faltan.push('ingreso')
    if (!salida) faltan.push('salida')
    if (!cantidad) faltan.push('huéspedes')
    if (faltan.length) {
      setError(`Completa lo siguiente: ${faltan.join(', ')}`)
      return
    }
    setError('')
    setPanel(null)
    onBuscar?.({ desde: ingreso, hasta: salida, huespedes: cantidad })
  }

  function limpiar() {
    setIngreso('')
    setSalida('')
    setCantidad(0)
    setError('')
    setPanel(null)
    onLimpiar?.()
  }

  return (
    <div className={`buscador${panel ? ' buscador--abierto' : ''}`}>
      {panel ? <div className="buscador__fondo" onClick={() => setPanel(null)} /> : null}
      <div className="buscador__barra">
        <div className="buscador__campo">
          <button
            type="button"
            className={`buscador__segmento${panel === 'ingreso' ? ' buscador__segmento--activo' : ''}${error && !ingreso ? ' buscador__segmento--error' : ''}`}
            onClick={() => setPanel(panel === 'ingreso' ? null : 'ingreso')}
          >
            <span className="buscador__etiqueta">Ingreso</span>
            <span className="buscador__valor">{textoFecha(ingreso) || 'Agregar fecha'}</span>
          </button>
          {panel === 'ingreso' ? (
            <Calendario seleccion={ingreso} minimo={claveHoy()} onElegir={elegirIngreso} onCerrar={() => setPanel(null)} />
          ) : null}
        </div>
        <span className="buscador__divisor" />
        <div className="buscador__campo">
          <button
            type="button"
            className={`buscador__segmento${panel === 'salida' ? ' buscador__segmento--activo' : ''}${error && !salida ? ' buscador__segmento--error' : ''}`}
            onClick={() => setPanel(panel === 'salida' ? null : 'salida')}
          >
            <span className="buscador__etiqueta">Salida</span>
            <span className="buscador__valor">{textoFecha(salida) || 'Agregar fecha'}</span>
          </button>
          {panel === 'salida' ? (
            <Calendario
              seleccion={salida}
              minimo={ingreso ? sumarDia(ingreso) : claveHoy()}
              onElegir={elegirSalida}
              onCerrar={() => setPanel(null)}
            />
          ) : null}
        </div>
        <span className="buscador__divisor" />
        <div className="buscador__campo buscador__campo--huespedes">
          <button
            type="button"
            className={`buscador__segmento${panel === 'huespedes' ? ' buscador__segmento--activo' : ''}${error && !cantidad ? ' buscador__segmento--error' : ''}`}
            onClick={() => setPanel(panel === 'huespedes' ? null : 'huespedes')}
          >
            <span className="buscador__etiqueta">Huéspedes</span>
            <span className="buscador__valor">{textoHuespedes(cantidad)}</span>
          </button>
          {panel === 'huespedes' ? (
            <div className="huespedes-popover">
              <div className="huespedes-popover__fila">
                <div>
                  <strong>Huéspedes</strong>
                  <span>¿Cuántos?</span>
                </div>
                <div className="huespedes-popover__controles">
                  <button type="button" onClick={() => setCantidad((n) => Math.max(0, n - 1))} disabled={cantidad <= 0} aria-label="Menos huéspedes">
                    −
                  </button>
                  <span>{cantidad}</span>
                  <button type="button" onClick={() => setCantidad((n) => Math.min(16, n + 1))} disabled={cantidad >= 16} aria-label="Más huéspedes">
                    +
                  </button>
                </div>
              </div>
              <button type="button" className="huespedes-popover__listo" onClick={() => setPanel(null)}>
                Listo
              </button>
            </div>
          ) : null}
        </div>
        <div className="buscador__acciones">
          <button type="button" className="buscador__icono" aria-label="Buscar" data-tooltip="Buscar" onClick={buscar}>
            <Lupa />
          </button>
          <button type="button" className="buscador__icono" aria-label="Limpiar filtros" data-tooltip="Limpiar filtros" onClick={limpiar}>
            <Cerrar />
          </button>
        </div>
      </div>
      {error ? (
        <p className="buscador__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function Calendario({ seleccion, minimo, onElegir, onCerrar }) {
  const inicio = useMemo(() => {
    const base = seleccion || minimo
    const fecha = parseClave(base)
    return new Date(fecha.getFullYear(), fecha.getMonth(), 1)
  }, [minimo, seleccion])
  const [mes, setMes] = useState(inicio)

  useEffect(() => {
    setMes(inicio)
  }, [inicio])

  const celdas = useMemo(() => {
    const primero = new Date(mes.getFullYear(), mes.getMonth(), 1)
    const offset = (primero.getDay() + 6) % 7
    const dias = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate()
    const lista = Array.from({ length: offset }, () => null)
    for (let dia = 1; dia <= dias; dia += 1) {
      const fecha = new Date(mes.getFullYear(), mes.getMonth(), dia)
      const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
      lista.push({ dia, clave, deshabilitado: minimo && clave < minimo })
    }
    return lista
  }, [mes, minimo])

  return (
    <div className="calendario" role="dialog" aria-label="Elegir fecha">
      <button type="button" className="calendario__cerrar" onClick={onCerrar} aria-label="Cerrar">
        ×
      </button>
      <div className="calendario__cabeza">
        <button type="button" onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() - 1, 1))} aria-label="Mes anterior">
          ‹
        </button>
        <strong>
          {MESES[mes.getMonth()]} {mes.getFullYear()}
        </strong>
        <button type="button" onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + 1, 1))} aria-label="Mes siguiente">
          ›
        </button>
      </div>
      <div className="calendario__semana">
        {DIAS.map((dia) => (
          <span key={dia}>{dia}</span>
        ))}
      </div>
      <div className="calendario__dias">
        {celdas.map((celda, index) =>
          celda ? (
            <button
              key={celda.clave}
              type="button"
              disabled={celda.deshabilitado}
              className={celda.clave === seleccion ? 'calendario__dia--activo' : undefined}
              onClick={() => onElegir(celda.clave)}
            >
              {celda.dia}
            </button>
          ) : (
            <span key={`vacio-${index}`} />
          ),
        )}
      </div>
    </div>
  )
}

function Lupa() {
  return (
    <svg className="buscador__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16.5L20 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Cerrar() {
  return (
    <svg className="buscador__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
