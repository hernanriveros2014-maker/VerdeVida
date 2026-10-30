import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { codSitio, origenArriendaVip } from '../../config/sitio'
import { lodge } from '../data/lodge'

const enlaces = [
  ['/', 'Inicio'],
  ['/servicios', 'Servicios'],
  ['/cabanas', 'Habitaciones'],
  ['/galeria', 'Galería'],
  ['/testimonios', 'Testimonios'],
  ['/contacto', 'Contacto'],
]

export function SiteShell({ children }) {
  const location = useLocation()
  const inicio = location.pathname === '/'
  const ficha = /^\/cabanas\/\d+(\/reserva)?$/.test(location.pathname)
  const cuenta = location.pathname === '/cuenta'
  const [scrolled, setScrolled] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [cuentaAbierta, setCuentaAbierta] = useState(false)
  const botonCuenta = useRef(null)
  const panelCuenta = useRef(null)
  const marcoAbierto = menuAbierto || modalAbierto

  useEffect(() => {
    const alScroll = () => setScrolled(window.scrollY > 12)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  useEffect(() => {
    setAbierto(false)
    setCuentaAbierta(false)
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!cuentaAbierta) return undefined
    const alPulsar = (event) => {
      if (botonCuenta.current?.contains(event.target)) return
      if (panelCuenta.current?.contains(event.target)) return
      setCuentaAbierta(false)
    }
    const alTecla = (event) => {
      if (event.key === 'Escape') setCuentaAbierta(false)
    }
    document.addEventListener('mousedown', alPulsar)
    document.addEventListener('keydown', alTecla)
    return () => {
      document.removeEventListener('mousedown', alPulsar)
      document.removeEventListener('keydown', alTecla)
    }
  }, [cuentaAbierta])

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
    document.documentElement.style.overflow = marcoAbierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [ficha, marcoAbierto])

  const abrirMenu = () => setCuentaAbierta((valor) => !valor)

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className={`hp-nav${solido ? ' hp-nav--scrolled' : ''}`}>
        <NavLink className="hp-nav__logo" to="/" aria-label="VerdeVida">
          <img className="hp-nav__logo-img" src="/media/verdevida/logo.png" alt="VerdeVida, apart hotel en Pucón" />
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
          <a className="hp-nav__social" href={lodge.facebook} target="_blank" rel="noreferrer" aria-label="Facebook de VerdeVida">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 8h-3V6.2c0-.7.5-1.2 1.2-1.2H18V3h-2.4C13 3 11.5 4.4 11.5 6.6V8H9v2.5h2.5V21H15v-10.5h2.4L18 8z" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a className="hp-nav__social" href={lodge.instagram} target="_blank" rel="noreferrer" aria-label="Instagram de VerdeVida">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <button
            ref={botonCuenta}
            type="button"
            className="menu-ficha"
            aria-label="Menú de usuario"
            aria-expanded={cuentaAbierta}
            onClick={abrirMenu}
          >
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
        {cuentaAbierta ? (
          <nav ref={panelCuenta} className="menu-cuenta" aria-label="Cuenta">
            <Link to="/cuenta?panel=inicio">Iniciar sesión</Link>
            <Link to="/cuenta?panel=inicio">Registrarse</Link>
            <Link to="/cuenta?panel=inicio">Cerrar sesión</Link>
          </nav>
        ) : null}
      </header>
      {abierto ? (
        <nav className="menu-movil">
          {enlaces.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/quienes-somos">Quiénes somos</NavLink>
          <NavLink to="/reservas">Reservas</NavLink>
        </nav>
      ) : null}
      <div id="contenido">{children}</div>
      {ficha || cuenta ? null : (
        <iframe
          className={marcoAbierto ? 'menu-host menu-host--abierto' : 'menu-host'}
          title="Menú"
          src={menuHost}
          scrolling="no"
        />
      )}
      {cuenta ? null : (
      <footer className="hp-footer">
        <div className="hp-footer__grid">
          <div>
            <h2>{lodge.nombre}</h2>
            <p>Apart hotel en Pucón, a 10 minutos caminando del centro, rodeado de naturaleza.</p>
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
                <a href={lodge.movilHref}>{lodge.movil}</a>
              </li>
              <li>
                <a href={`mailto:${lodge.email}`}>{lodge.email}</a>
              </li>
              <li>
                <a href={lodge.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
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
          <span>VerdeVida. Pasaje Flores 240, Pucón.</span>
          <span>verdevidapucon@gmail.com</span>
        </div>
      </footer>
      )}
      <a className="wa" href={lodge.whatsapp} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </>
  )
}
