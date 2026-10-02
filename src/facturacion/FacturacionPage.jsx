import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DatosFacturacion } from './DatosFacturacion'
import { guardarDatosCliente, obtenerDatosCliente } from './api'
import { DATOS_VACIOS, validarFacturacion } from './validar'

export function FacturacionPage() {
  const [datos, setDatos] = useState(DATOS_VACIOS)
  const [errores, setErrores] = useState({})
  const [origen, setOrigen] = useState('local')
  const [aviso, setAviso] = useState('')

  useEffect(() => {
    document.title = 'Facturación · Toltén Lodge'
    obtenerDatosCliente().then((res) => {
      if (res.datos) setDatos({ ...DATOS_VACIOS, ...res.datos })
      setOrigen(res.origen)
    })
  }, [])

  async function guardar(event) {
    event.preventDefault()
    const siguientes = validarFacturacion(datos)
    setErrores(siguientes)
    if (Object.keys(siguientes).length) return
    const resultado = await guardarDatosCliente(datos)
    setOrigen(resultado.origen)
    setAviso(
      resultado.origen === 'api'
        ? 'Datos guardados en facturación.'
        : 'Datos guardados en este navegador. Se enviarán al servidor cuando esté conectado.',
    )
  }

  return (
    <main className="pagina pagina--estrecha">
      <p className="hp-label">Cuenta</p>
      <h1 className="pagina__titulo">Datos de facturación</h1>
      <p className="pagina__lead">
        Boleta o factura electrónica para tu estadía. Si el servidor de ArriendaVIP está conectado, estos datos quedan en tu cuenta. Si no, se guardan en este navegador.
      </p>
      <form className="panel" onSubmit={guardar}>
        <DatosFacturacion datos={datos} onChange={setDatos} errores={errores} origen={origen} />
        {aviso ? <p className="form-aviso">{aviso}</p> : null}
        <div className="form-acciones">
          <button className="hp-btn hp-btn--gold" type="submit">
            Guardar datos
          </button>
          <Link className="hp-btn hp-btn--outline" to="/reservas">
            Ir a reservas
          </Link>
        </div>
      </form>
    </main>
  )
}
