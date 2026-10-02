import { useEffect } from 'react'
import { lodge } from '../data/lodge'

export function QuienesSomos() {
  useEffect(() => {
    document.title = 'Quiénes somos · Toltén Lodge'
  }, [])

  return (
    <main className="pagina">
      <div className="quienes">
        <img src="/media/hq/dalias-2.jpg" alt="Cabaña y jardín del lodge" />
        <div>
          <span className="hp-label">El lugar</span>
          <h1 className="pagina__titulo">Quiénes somos</h1>
          <p>
            Complejo de cabañas rodeadas de bosque nativo, a orillas del río Toltén, para el descanso de la familia. Está a 27 kilómetros de Villarrica y a unos 30 minutos del aeropuerto de La Araucanía, cerca de lagos, zonas de ski, volcanes y ríos.
          </p>
          <p style={{ marginTop: 14 }}>
            Las cabañas son de madera, con calefacción a leña, cocina completa, TV satelital, camas con sábanas, quincho, jardín, rivera tipo playa y estacionamiento. Cada una tiene hot-tub. El lodge lo atienden sus dueños.
          </p>
          <p className="cita">Un paraíso privado entre el bosque, el río y las vertientes.</p>
          <p style={{ marginTop: 18 }}>
            También organizamos excursiones de pesca, paseos en balsa y clases de fly fishing. Cualquier consulta, al {lodge.telefono}.
          </p>
        </div>
      </div>
    </main>
  )
}
