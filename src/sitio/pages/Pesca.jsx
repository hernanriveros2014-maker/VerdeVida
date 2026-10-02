import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Pesca() {
  useEffect(() => {
    document.title = 'Pesca deportiva · Toltén Lodge'
  }, [])

  return (
    <main className="pagina">
      <span className="hp-label">Río Toltén y Allipén</span>
      <h1 className="pagina__titulo">Pesca deportiva</h1>
      <p className="pagina__lead">
        Excursiones con guías de la zona, para pescadores con experiencia y para quien está empezando. Toda salida se coordina antes, según disponibilidad.
      </p>
      <div className="articulo">
        <div>
          <img src="/media/hq/pesca-2.jpg" alt="Salmón Chinook pescado en el Toltén" style={{ width: '100%', height: 460, objectFit: 'cover', borderRadius: 20 }} />
          <h2>Salmón Chinook</h2>
          <p>
            El salmón rey o Chinook es el principal atractivo del río Toltén en la última década, con ejemplares que llegan a los 25 kilos. La temporada va del 1 de septiembre al 28 de febrero.
          </p>
          <p>
            Al inicio de temporada la pesca se hace desde el Pacífico hasta la desembocadura del Allipén. A medida que el salmón migra, las salidas se mueven al Allipén, hacia Cunco y Melipeuco.
          </p>
          <h2>Aparejos para Chinook</h2>
          <p>
            Se recomienda caña de bote y señuelos tipo rapala y caimán, de preferencia plateados. Carrete de cinco rodamientos o más, con buen freno, y línea multifilamento de 0,35 a 0,40 mm.
          </p>
          <h2>Fly fishing y trucha</h2>
          <p>
            Hay excursiones de fly fishing para distintos niveles, y clases para principiantes y niños en la rivera del lodge o embarcados en el Toltén. La trucha se pesca en botes de madera y sirve para toda la familia, en tramos de medio día o día completo.
          </p>
        </div>
        <aside>
          <div className="nota">
            <strong>Temporada Chinook</strong>
            1 de septiembre al 28 de febrero. Las rutas cambian con la migración.
          </div>
          <div className="nota">
            <strong>Licencia de pesca</strong>
            El permiso es personal e intransferible. Se solicita en SERNAPESCA, en pescarecreativa.sernapesca.cl o en una oficina regional, y se porta en papel o digital.
          </div>
          <div className="nota">
            <strong>Coordinación</strong>
            Todas las actividades de pesca se confirman antes. Escríbenos para armar la salida.
          </div>
          <p style={{ marginTop: 18 }}>
            <Link className="hp-btn hp-btn--gold" to="/galeria/pesca">
              Galería de pesca
            </Link>
          </p>
        </aside>
      </div>
    </main>
  )
}
