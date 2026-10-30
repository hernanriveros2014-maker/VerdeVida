import { Navigate, Route, Routes } from 'react-router-dom'
import { FacturacionPage } from './facturacion/FacturacionPage'
import { SiteShell } from './sitio/components/SiteShell'
import { CabanaDetalle } from './sitio/pages/CabanaDetalle'
import { Contacto } from './sitio/pages/Contacto'
import { Cuenta } from './sitio/pages/Cuenta'
import { Cabanas } from './sitio/pages/Cabanas'
import { Galeria } from './sitio/pages/Galeria'
import { Inicio } from './sitio/pages/Inicio'
import { QuienesSomos } from './sitio/pages/QuienesSomos'
import { Servicios } from './sitio/pages/Servicios'
import { Testimonios } from './sitio/pages/Testimonios'
import { ReservaPortal } from './sitio/pages/ReservaPortal'
import { Reservas } from './sitio/pages/Reservas'

export default function App() {
  return (
    <SiteShell>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cabanas" element={<Cabanas />} />
        <Route path="/cabanas/:id/reserva" element={<ReservaPortal />} />
        <Route path="/cabanas/:slug" element={<CabanaDetalle />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/pesca" element={<Navigate to="/servicios" replace />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/galeria/:album" element={<Galeria />} />
        <Route path="/testimonios" element={<Testimonios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/pucon" element={<Navigate to="/contacto" replace />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/cuenta" element={<Cuenta />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/facturacion" element={<FacturacionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteShell>
  )
}
