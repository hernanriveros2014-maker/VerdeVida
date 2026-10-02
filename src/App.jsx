import { Navigate, Route, Routes } from 'react-router-dom'
import { FacturacionPage } from './facturacion/FacturacionPage'
import { SiteShell } from './sitio/components/SiteShell'
import { CabanaDetalle } from './sitio/pages/CabanaDetalle'
import { Cabanas } from './sitio/pages/Cabanas'
import { Galeria } from './sitio/pages/Galeria'
import { Inicio } from './sitio/pages/Inicio'
import { Pesca } from './sitio/pages/Pesca'
import { QuienesSomos } from './sitio/pages/QuienesSomos'
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
        <Route path="/pesca" element={<Pesca />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/galeria/:album" element={<Galeria />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/facturacion" element={<FacturacionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteShell>
  )
}
