export const lodge = {
  nombre: 'VerdeVida',
  bajada: 'Apart hotel en Pucón',
  telefono: '+569 4178 7248',
  telefonoHref: 'tel:+56941787248',
  movil: '+569 4178 7248',
  movilHref: 'tel:+56941787248',
  whatsapp: 'https://wa.me/56941787248',
  email: 'verdevidapucon@gmail.com',
  facebook: 'https://www.facebook.com/verdevidapucon/',
  instagram: 'https://www.instagram.com/verdevidapucon/',
  direccion: 'Pasaje Flores 240',
  ingreso: 'A 10 minutos caminando del centro de Pucón',
  ciudad: 'Pucón, Chile',
  maps: 'https://www.google.com/maps/search/?api=1&query=Pasaje+Flores+240+Puc%C3%B3n',
  checkin: '14:00',
  checkout: '12:00',
  huespedesMax: 3,
}

export const servicios = [
  {
    id: 'wifi',
    nombre: 'WiFi gratis',
    detalle: 'Conéctate sin interrupciones desde cualquier rincón, ideal para mantenerte en contacto o compartir tus momentos especiales.',
  },
  {
    id: 'ubicacion',
    nombre: 'Excelente ubicación',
    detalle: 'A solo 10 minutos caminando del centro, lo que te permite disfrutar de la tranquilidad del entorno sin alejarte de la vida urbana.',
  },
  {
    id: 'estacionamiento',
    nombre: 'Estacionamiento',
    detalle: 'Estaciona con tranquilidad en nuestro espacio exclusivo para huéspedes, seguro y de fácil acceso.',
  },
  {
    id: 'bano',
    nombre: 'Baño privado',
    detalle: 'Cada habitación cuenta con baño propio, asegurando comodidad, privacidad y bienestar durante su estadía.',
  },
  {
    id: 'limpieza',
    nombre: 'Servicio de Limpieza',
    detalle: 'Si lo desea, puede solicitar servicio de limpieza durante su estadía. Queremos que elijas cómo disfrutar tu tiempo con nosotros.',
  },
  {
    id: 'terraza',
    nombre: 'Terraza Privada',
    detalle: 'Disfruta del aire libre y de la vista al entorno natural desde tu propia terraza, perfecta para relajarte.',
  },
  {
    id: 'seguridad',
    nombre: 'Seguridad',
    detalle: 'Ofrecemos un entorno seguro, tranquilo y controlado para que vivas una estadía sin preocupaciones.',
  },
  {
    id: 'jardin',
    nombre: 'Jardín',
    detalle: 'Nuestro jardín es un espacio compartido rodeado de naturaleza, ideal para descansar, leer o disfrutar del aire libre en un ambiente relajado.',
  },
  {
    id: 'recepcion',
    nombre: 'Recepción',
    detalle: 'Estamos disponibles todo el día para asistirte cuando lo necesites. Tu comodidad y tranquilidad son nuestra prioridad.',
  },
]

export const habitaciones = [
  {
    slug: 'doble',
    nombre: 'Habitación Doble',
    huespedes: 2,
    resumen: 'Para una o dos personas, con baño privado, zona de comedor, WiFi, TV y calefacción.',
    detalle: 'Está en el primer y segundo piso. Tiene una cama hecha a medida, baño privado y un comedor con tostadora, microondas, hervidor, frigorífico y loza.',
    temporadaBaja: 55000,
    temporadaAlta: 60000,
    imagen: '/media/verdevida/habitaciones/doble.jpeg',
    fotos: [
      '/media/verdevida/habitaciones/doble.jpeg',
      '/media/verdevida/habitaciones/doble-2.jpeg',
      '/media/verdevida/habitaciones/doble-3.jpeg',
      '/media/verdevida/habitaciones/cocina.jpeg',
    ],
  },
  {
    slug: 'triple',
    nombre: 'Habitación Triple',
    huespedes: 3,
    resumen: 'Para tres personas, ideal para una familia pequeña o un grupo.',
    detalle: 'En el primer piso, con cama matrimonial y cama individual, baño privado y comedor equipado con tostadora, microondas, hervidor, frigorífico y loza.',
    temporadaBaja: 60000,
    temporadaAlta: 65000,
    imagen: '/media/verdevida/habitaciones/triple.jpeg',
    fotos: ['/media/verdevida/habitaciones/triple.jpeg', '/media/verdevida/habitaciones/triple-2.jpeg'],
  },
]

export const cabanas = habitaciones

export const testimonios = [
  { nombre: 'Sebastian Solanot', contexto: 'Vacaciones y pareja', texto: 'Muy buen lugar para alojamiento en Pucón. Cerca del centro comercial y a la vez muy tranquilo. Muy buena atención y servicio.', nota: 'Tranquilo, apto para niños y buen precio.' },
  { nombre: 'Cristhian Carrera', contexto: 'Vacaciones y pareja', texto: 'Demasiado cálido el apartamento, cómodo, limpio e impecable. 10 de 10.', nota: 'Vista increíble, romántico, tranquilo y buen precio.' },
  { nombre: 'Vera Costa', contexto: 'Huésped', texto: 'Magnífico lugar, departamentos completamente equipados. Limpieza: 10 puntos. Ubicación tranquila dentro de Pucón.', nota: 'Habitaciones, servicio y ubicación: 5/5.' },
  { nombre: 'Anita Mora', contexto: 'Vacaciones y familia', texto: 'Excelente lugar, habitaciones cómodas y todo muy limpio.', nota: 'Tranquilo, apto para niños y buen precio.' },
  { nombre: 'Sandy Leuthner', contexto: 'Pareja', texto: 'Bueno, bonito y tranquilo para descansar, y su atención excelente.', nota: 'Muy tranquilo y seguro.' },
]

export const albumes = [
  {
    slug: 'habitaciones',
    nombre: 'Habitaciones',
    fotos: [
      '/media/verdevida/habitaciones/doble.jpeg',
      '/media/verdevida/habitaciones/doble-2.jpeg',
      '/media/verdevida/habitaciones/doble-3.jpeg',
      '/media/verdevida/habitaciones/triple.jpeg',
      '/media/verdevida/habitaciones/triple-2.jpeg',
      '/media/verdevida/habitaciones/cocina.jpeg',
      '/media/verdevida/galeria/cocina.jpeg',
    ],
  },
  {
    slug: 'espacios',
    nombre: 'Espacios',
    fotos: [
      '/media/verdevida/galeria/terraza.jpeg',
      '/media/verdevida/galeria/balcon.jpeg',
      '/media/verdevida/galeria/espacio-1.jpeg',
      '/media/verdevida/galeria/espacio-2.jpeg',
      '/media/verdevida/galeria/espacio-3.jpeg',
      '/media/verdevida/galeria/espacio-4.jpeg',
      '/media/verdevida/galeria/espacio-5.jpeg',
      '/media/verdevida/jardin.jpeg',
      '/media/verdevida/hero.jpeg',
    ],
  },
]

export function cabanaPorSlug(slug) {
  return habitaciones.find((item) => item.slug === slug) ?? null
}

export const equipamiento = [
  'Baño privado',
  'WiFi',
  'TV',
  'Calefacción central',
  'Cocina equipada',
  'Terraza',
  'Estacionamiento',
]
