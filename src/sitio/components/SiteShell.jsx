import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { codSitio, origenArriendaVip } from '../../config/sitio'
import { lodge } from '../data/lodge'

const enlaces = [
  ['/', 'Inicio'],
  ['/cabanas', 'Cabañas'],
  ['/pesca', 'Pesca deportiva'],
  ['/galeria', 'Galería'],
  ['/quienes-somos', 'Quiénes somos'],
]

export function SiteShell({ children }) {
  const location = useLocation()
  const inicio = location.pathname === '/'
  const ficha = /^\/cabanas\/\d+(\/reserva)?$/.test(location.pathname)
  const [scrolled, setScrolled] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)
  const marcoAbierto = menuAbierto || modalAbierto

  useEffect(() => {
    const alScroll = () => setScrolled(window.scrollY > 12)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  useEffect(() => {
    setAbierto(false)
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  const solido = !inicio || scrolled || abierto
  const origen = origenArriendaVip()
  const menuHost = `${origen}/?dg_cod_sitio_web=${encodeURIComponent(codSitio())}&sin_pie=1`

  useEffect(() => {
    const alMensaje = (event) => {
      if (event.origin !== origen) return
      if (event.data?.tipo === 'tolten-ir-inicio') {
        window.location.assign('/')
        return
      }
      if (event.data?.tipo === 'tolten-navegar') {
        const ruta = String(event.data.ruta || '')
        if (ruta.startsWith('/') && !ruta.startsWith('//')) window.location.assign(ruta)
        return
      }
      if (event.data?.tipo === 'tolten-modal') {
        if (!ficha) setModalAbierto(Boolean(event.data.abierto))
        return
      }
      if (event.data?.tipo !== 'tolten-menu') return
      if (ficha) return
      setMenuAbierto(Boolean(event.data.abierto))
    }
    window.addEventListener('message', alMensaje)
    return () => window.removeEventListener('message', alMensaje)
  }, [ficha, origen])

  useEffect(() => {
    if (ficha) return undefined
    document.body.style.overflow = marcoAbierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [ficha, marcoAbierto])

  const abrirMenu = () => {
    const frame = ficha
      ? document.querySelector('.ficha-vip iframe')
      : document.querySelector('.menu-host')
    frame?.contentWindow?.postMessage({ tipo: 'tolten-toggle-menu' }, origen)
  }

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className={`hp-nav${solido ? ' hp-nav--scrolled' : ''}`}>
        <NavLink className="hp-nav__logo" to="/">
          <img className="hp-nav__logo-img" src="/media/logo.png" alt="" />
          <span className="hp-nav__marca">
            <strong>Toltén Lodge</strong>
            <span>Cabañas · Pesca · Spa</span>
          </span>
        </NavLink>
        <ul className="hp-nav__links">
          {enlaces.map(([to, label]) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => (isActive ? 'activa' : undefined)} end={to === '/'}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="hp-nav__acciones">
          <button type="button" className="menu-ficha" aria-label="Menú de usuario" onClick={abrirMenu}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            <span />
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.75" />
              <path d="M5.5 19.5c.9-2.8 3.2-4.5 6.5-4.5s5.6 1.7 6.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
          <button className="hp-nav__menu" type="button" aria-expanded={abierto} aria-label="Abrir menú" onClick={() => setAbierto((v) => !v)}>
            {abierto ? 'Cerrar' : 'Menú'}
          </button>
        </div>
      </header>
      {abierto ? (
        <nav className="menu-movil">
          {enlaces.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/reservas">Reservas</NavLink>
        </nav>
      ) : null}
      <div id="contenido">{children}</div>
      {ficha ? null : (
        <iframe
          className={marcoAbierto ? 'menu-host menu-host--abierto' : 'menu-host'}
          title="Menú"
          src={menuHost}
        />
      )}
      <footer className="hp-footer">
        <div className="hp-footer__grid">
          <div>
            <h2>Toltén Lodge</h2>
            <p>Tres cabañas privadas en más de una hectárea, a orillas del río Toltén.</p>
          </div>
          <div>
            <p>{lodge.direccion}</p>
            <p>{lodge.ingreso}</p>
            <p>{lodge.ciudad}</p>
            <p>
              <a href={lodge.maps} target="_blank" rel="noreferrer">
                Cómo llegar
              </a>
            </p>
          </div>
          <div>
            <ul>
              <li>
                <a href={lodge.telefonoHref}>{lodge.telefono}</a>
              </li>
              <li>
                <a href={`mailto:${lodge.email}`}>{lodge.email}</a>
              </li>
              <li>
                <NavLink to="/reservas">Reservas</NavLink>
              </li>
              <li>
                <NavLink to="/facturacion">Datos de facturación</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="hp-footer__base">
          <span>Toltén Lodge. Todos los derechos reservados.</span>
          <span>Preparado para integrarse con ArriendaVIP.</span>
        </div>
      </footer>
      <a className="wa" href={lodge.whatsapp} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </>
  )
}
