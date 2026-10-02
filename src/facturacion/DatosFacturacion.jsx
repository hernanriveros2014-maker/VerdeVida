import { useEffect, useState } from 'react'
import { consultarContribuyente, listarCategorias, listarCiudades, listarComunas } from './api'
import { formatearRut, rutValido } from './validar'
import './DatosFacturacion.css'

export function DatosFacturacion({ datos, onChange, errores = {}, origen = 'local' }) {
  const [categorias, setCategorias] = useState([])
  const [ciudades, setCiudades] = useState([])
  const [comunas, setComunas] = useState([])
  const [buscandoRut, setBuscandoRut] = useState(false)
  const factura = String(datos.tipo_dte_cliente) === '33'

  useEffect(() => {
    let activo = true
    listarCategorias().then((res) => {
      if (activo) setCategorias(res.items)
    })
    listarCiudades().then((items) => {
      if (activo) setCiudades(items)
    })
    listarComunas().then((items) => {
      if (activo) setComunas(items)
    })
    return () => {
      activo = false
    }
  }, [])

  function set(campo, valor) {
    onChange({ ...datos, [campo]: valor })
  }

  async function alSalirRut() {
    const rut = formatearRut(datos.rut)
    set('rut', rut)
    if (!rutValido(rut)) return
    setBuscandoRut(true)
    try {
      const contribuyente = await consultarContribuyente(rut.replace(/\./g, ''))
      onChange({
        ...datos,
        rut,
        razon_social: datos.razon_social || contribuyente.razon_social,
        giro: datos.giro || contribuyente.giro,
        acteco: datos.acteco || contribuyente.acteco,
      })
    } catch {
      /* el huésped completa los datos a mano */
    } finally {
      setBuscandoRut(false)
    }
  }

  return (
    <div className="facturacion">
      <div className="facturacion__tipo-doc" role="radiogroup" aria-label="Tipo de documento">
        <Tipo opcion="39" actual={datos.tipo_dte_cliente} onChange={(valor) => set('tipo_dte_cliente', valor)} nombre="Boleta electrónica" detalle="Persona natural o sin crédito fiscal." />
        <Tipo opcion="33" actual={datos.tipo_dte_cliente} onChange={(valor) => set('tipo_dte_cliente', valor)} nombre="Factura electrónica" detalle="Persona jurídica con giro SII." />
      </div>

      <div className="facturacion__grid">
        <Campo id="rut" label="RUT" error={errores.rut} requerido>
          <input
            id="rut"
            name="rut"
            value={datos.rut}
            onChange={(event) => set('rut', event.target.value.toUpperCase())}
            onBlur={alSalirRut}
            autoComplete="off"
            placeholder="12.345.678-9"
            aria-invalid={Boolean(errores.rut)}
          />
        </Campo>
        <Campo id="razon_social" label={factura ? 'Razón social' : 'Nombre'} error={errores.razon_social} requerido>
          <input
            id="razon_social"
            name="razon_social"
            value={datos.razon_social}
            onChange={(event) => set('razon_social', event.target.value)}
            aria-invalid={Boolean(errores.razon_social)}
          />
        </Campo>
        {factura && (
          <>
            <Campo id="acteco" label="Código acteco" error={errores.acteco} requerido>
              <input
                id="acteco"
                name="acteco"
                inputMode="numeric"
                value={datos.acteco}
                onChange={(event) => set('acteco', event.target.value)}
                aria-invalid={Boolean(errores.acteco)}
              />
            </Campo>
            <Campo id="categoria_trib" label="Categoría tributaria" error={errores.categoria_trib} requerido>
              <select
                id="categoria_trib"
                name="categoria_trib"
                value={datos.categoria_trib}
                onChange={(event) => set('categoria_trib', event.target.value)}
                aria-invalid={Boolean(errores.categoria_trib)}
              >
                <option value="">Seleccione…</option>
                {categorias.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo id="giro" label="Giro comercial" error={errores.giro} requerido ancho>
              <input
                id="giro"
                name="giro"
                value={datos.giro}
                onChange={(event) => set('giro', event.target.value)}
                aria-invalid={Boolean(errores.giro)}
              />
            </Campo>
          </>
        )}
        <Campo id="ciudad" label="Ciudad">
          <select id="ciudad" name="ciudad" value={datos.ciudad} onChange={(event) => set('ciudad', event.target.value)}>
            <option value="">Seleccione…</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>
        </Campo>
        <Campo id="comuna" label="Comuna" error={errores.comuna} requerido>
          <select
            id="comuna"
            name="comuna"
            value={datos.comuna}
            onChange={(event) => set('comuna', event.target.value)}
            aria-invalid={Boolean(errores.comuna)}
          >
            <option value="">Seleccione…</option>
            {comunas.map((comuna) => (
              <option key={comuna} value={comuna}>
                {comuna}
              </option>
            ))}
          </select>
        </Campo>
        <Campo id="correo_dte" label="Correo DTE" error={errores.correo_dte} requerido>
          <input
            id="correo_dte"
            name="correo_dte"
            type="email"
            value={datos.correo_dte}
            onChange={(event) => set('correo_dte', event.target.value)}
            aria-invalid={Boolean(errores.correo_dte)}
          />
        </Campo>
        <Campo id="telefono" label="Teléfono">
          <input
            id="telefono"
            name="telefono"
            value={datos.telefono}
            onChange={(event) => set('telefono', event.target.value)}
          />
        </Campo>
      </div>
      <p className="facturacion__estado" role="status">
        {buscandoRut
          ? 'Consultando contribuyente…'
          : origen === 'api'
            ? 'Facturación conectada al servidor.'
            : 'Modo prototipo: los datos se guardan en este navegador hasta conectar el servidor.'}
      </p>
    </div>
  )
}

function Tipo({ opcion, actual, onChange, nombre, detalle }) {
  return (
    <label className="facturacion__tipo-option">
      <input
        type="radio"
        name="tipo_dte_cliente"
        value={opcion}
        checked={String(actual) === opcion}
        onChange={() => onChange(opcion)}
      />
      <span className="facturacion__tipo-box">
        <span className="facturacion__tipo-name">{nombre}</span>
        <span className="facturacion__tipo-desc">{detalle}</span>
      </span>
    </label>
  )
}

function Campo({ id, label, error, requerido, ancho, children }) {
  return (
    <label className={`facturacion__field${ancho ? ' facturacion__field--ancho' : ''}`} htmlFor={id}>
      <span className="facturacion__label">
        {label}
        {requerido ? ' *' : ''}
      </span>
      {children}
      {error ? <span className="facturacion__error">{error}</span> : null}
    </label>
  )
}
