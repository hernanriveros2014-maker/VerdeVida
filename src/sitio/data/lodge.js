export const lodge = {
  nombre: 'Toltén Lodge',
  bajada: 'Cabañas, pesca y spa',
  telefono: '+56 9 7497 1320',
  telefonoHref: 'tel:+56974971320',
  whatsapp: 'https://wa.me/56974971320',
  email: 'toltenlodge@gmail.com',
  direccion: 'Km 22 Carretera Freire-Villarrica, Balsa de Coipúe',
  ingreso: 'Ingreso preferente por carretera S-199',
  ciudad: 'Villarrica, Región de la Araucanía, Chile',
  maps: 'https://www.google.com/maps/search/?api=1&query=Balsa+de+Coip%C3%BAe+Villarrica',
  checkin: '16:00',
  checkout: '12:00',
}

export const cabanas = [
  {
    slug: 'el-mirador',
    nombre: 'Cabaña El Mirador',
    huespedes: 6,
    dormitorios: '2 dormitorios',
    resumen: 'Dos dormitorios, un baño, cocina completa, terraza y quincho.',
    hotTub: 'Hot-tub disponible para reservas de más de dos noches.',
    imagen: '/media/hq/mirador-1.jpg',
    fotos: ['/media/hq/mirador-1.jpg', '/media/mirador.jpg', '/media/hq/mirador-2.jpg', '/media/hq/mirador-3.jpg', '/media/hq/mirador-4.jpg', '/media/hq/mirador-5.jpg'],
  },
  {
    slug: 'el-refugio',
    nombre: 'Cabaña El Refugio',
    huespedes: 7,
    dormitorios: 'Ambiente tipo loft',
    resumen: 'Un ambiente amplio, un baño, cocina completa, terraza y quincho.',
    hotTub: 'Hot-tub disponible para reservas de más de dos noches.',
    imagen: '/media/hq/refugio-2.jpg',
    fotos: ['/media/hq/refugio-2.jpg', '/media/hq/refugio-4.jpg', '/media/hq/refugio-1.jpg', '/media/hq/refugio-3.jpg', '/media/hq/refugio-5.jpg', '/media/hq/refugio-6.jpg'],
  },
  {
    slug: 'las-dalias',
    nombre: 'Cabaña Las Dalias',
    huespedes: 2,
    dormitorios: 'Un ambiente',
    resumen: 'Cama matrimonial más cama nido, un baño, cocina completa y terraza.',
    hotTub: 'Hot-tub exclusivo de la cabaña, para estadías de más de dos noches.',
    imagen: '/media/hq/dalias-2.jpg',
    fotos: ['/media/hq/dalias-2.jpg', '/media/hq/dalias-1.jpg', '/media/hq/dalias-3.jpg', '/media/hq/dalias-4.jpg', '/media/hq/dalias-5.jpg', '/media/hq/dalias-6.jpg'],
  },
]

export const albumes = [
  {
    slug: 'el-mirador',
    nombre: 'Cabaña El Mirador',
    fotos: ['/media/hq/mirador-1.jpg', '/media/mirador.jpg', '/media/hq/mirador-2.jpg', '/media/hq/mirador-3.jpg', '/media/hq/mirador-4.jpg', '/media/hq/mirador-5.jpg'],
  },
  {
    slug: 'el-refugio',
    nombre: 'Cabaña El Refugio',
    fotos: ['/media/hq/refugio-2.jpg', '/media/hq/refugio-4.jpg', '/media/hq/refugio-1.jpg', '/media/hq/refugio-3.jpg', '/media/hq/refugio-5.jpg', '/media/hq/refugio-6.jpg'],
  },
  {
    slug: 'las-dalias',
    nombre: 'Cabaña Las Dalias',
    fotos: ['/media/hq/dalias-2.jpg', '/media/hq/dalias-1.jpg', '/media/hq/dalias-3.jpg', '/media/hq/dalias-4.jpg', '/media/hq/dalias-5.jpg', '/media/hq/dalias-6.jpg'],
  },
  {
    slug: 'pesca',
    nombre: 'Pesca deportiva',
    fotos: ['/media/hq/pesca-2.jpg', '/media/hq/pesca-6.jpg', '/media/hq/pesca-1.jpg', '/media/hq/pesca-3.jpg', '/media/hq/pesca-4.jpg', '/media/hq/pesca-5.jpg'],
  },
  {
    slug: 'entorno',
    nombre: 'Entorno',
    fotos: ['/media/hq/entorno-3.jpg', '/media/hq/entorno-2.jpg', '/media/hq/entorno-1.jpg', '/media/hq/entorno-4.jpg', '/media/hq/entorno-5.jpg', '/media/hq/entorno-6.jpg', '/media/hero-2.jpg'],
  },
  {
    slug: 'cafeteria',
    nombre: 'Cafetería',
    fotos: ['/media/hq/cafeteria-1.jpg', '/media/hq/cafeteria-2.jpg', '/media/hq/cafeteria-3.jpg', '/media/hq/cafeteria-4.jpg', '/media/hq/cafeteria-5.jpg', '/media/hq/cafeteria-6.jpg'],
  },
]

export function cabanaPorSlug(slug) {
  return cabanas.find((cabana) => cabana.slug === slug) ?? null
}

export const equipamiento = [
  'Cocina completa',
  'Ropa de cama',
  'Calefacción a leña',
  'TV satelital',
  'Estacionamiento',
  'Quincho',
]
