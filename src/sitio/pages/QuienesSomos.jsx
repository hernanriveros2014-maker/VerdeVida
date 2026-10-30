import { useEffect } from 'react'
import { lodge } from '../data/lodge'

export function QuienesSomos() {
  useEffect(() => {
    document.title = `Sobre nosotros · ${lodge.nombre}`
  }, [])

  return (
    <main className="pagina">
      <div className="quienes">
        <img src="/media/verdevida/jardin.jpeg" alt="Entorno natural de VerdeVida en Pucón" />
        <div>
          <span className="hp-label">VerdeVida</span>
          <h1 className="pagina__titulo">Sobre nosotros</h1>
          <p>
            Creemos que el descanso está en lo simple: un entorno natural, una atención cálida y espacios diseñados con cariño. Somos un apart hotel a minutos del centro de Pucón, rodeado de naturaleza.
          </p>
          <p style={{ marginTop: 14 }}>
            Contamos con 8 habitaciones para 18 personas, equipadas para ofrecer privacidad y comodidad. El equipo está disponible para ayudarte, siempre con la mejor disposición.
          </p>
          <p className="cita">En VerdeVida no solo te alojas: te relajas, respiras y renuevas energías.</p>
          <p style={{ marginTop: 18 }}>
            {lodge.direccion}, {lodge.ciudad}. Teléfono {lodge.telefono}.
          </p>
        </div>
      </div>
    </main>
  )
}
