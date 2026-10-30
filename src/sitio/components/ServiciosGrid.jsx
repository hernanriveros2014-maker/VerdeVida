const iconos = {
  wifi: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 20c8.8-8 23.2-8 32 0" />
      <path d="M14 26c5.6-5 14.4-5 20 0" />
      <path d="M20 32c2.4-2.2 5.6-2.2 8 0" />
      <circle cx="24" cy="37" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  ubicacion: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 42s12-11.2 12-20a12 12 0 1 0-24 0c0 8.8 12 20 12 20z" />
      <circle cx="24" cy="22" r="4.2" />
    </svg>
  ),
  estacionamiento: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 30h4l3-8h18l3 8h4" />
      <path d="M12 30v6h4v-6M32 30v6h4v-6" />
      <path d="M15 22l2.5-7h13L33 22" />
      <circle cx="16" cy="36" r="2.4" />
      <circle cx="32" cy="36" r="2.4" />
    </svg>
  ),
  bano: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M18 10h8v6" />
      <path d="M22 16c0 6 8 6 8 12H16c0-8 6-8 6-12z" />
      <path d="M16 34h16M18 38h4M26 38h4" />
    </svg>
  ),
  limpieza: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M20 20h10l-1 16H21z" />
      <path d="M21 20c0-4 2-7 4-9 2 2 4 5 4 9" />
      <path d="M14 14l2 2M34 12l2 2M33 20l3-1" />
    </svg>
  ),
  terraza: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="10" y="12" width="28" height="24" rx="1.5" />
      <path d="M24 12v24M10 24h28" />
    </svg>
  ),
  seguridad: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M14 18h16a6 6 0 0 1 6 6v4H14v-4a6 6 0 0 1 0-6z" />
      <path d="M18 18v-2a6 6 0 0 1 12 0v2" />
      <circle cx="24" cy="25" r="2.2" />
      <path d="M20 32h8l2 6H18z" />
    </svg>
  ),
  jardin: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 40V22" />
      <path d="M24 24c-8-1-12-8-10-14 6 1 10 7 10 14z" />
      <path d="M24 26c8-1 12-8 10-14-6 1-10 7-10 14z" />
    </svg>
  ),
  recepcion: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="16" r="5" />
      <path d="M14 36c1.4-6 5-9 10-9s8.6 3 10 9" />
      <path d="M16 38h16" />
    </svg>
  ),
}

export function ServiciosGrid({ items }) {
  return (
    <div className="servicios-grid">
      {items.map((item) => (
        <article className="servicio" key={item.id}>
          <span className="servicio__icono">{iconos[item.id]}</span>
          <h3>{item.nombre}</h3>
          <p>{item.detalle}</p>
        </article>
      ))}
    </div>
  )
}
