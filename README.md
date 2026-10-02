# Toltén Lodge

Prototipo navegable del sitio de [Toltén Lodge](https://www.toltenlodge.cl/sitio/), armado con la misma arquitectura de frente que [ArriendaVIP](https://arriendavip.cl/) para poder integrarlo después.

## Arquitectura

El sitio público de ArriendaVIP es una SPA en React + Vite (`localhost:5173`) que habla con Django en `localhost:8000` bajo `/api`. Este proyecto repite ese corte:

- `src/sitio` — páginas públicas del lodge.
- `src/facturacion` — paso 1 de integración. Mismo contrato de boleta (39) y factura (33).
- `src/api/client.js` — cliente HTTP. Agrega `dg_cod_sitio_web` a cada llamada.
- Vite proxea `/api` hacia `http://localhost:8000`.

Si Django no está corriendo, facturación y la solicitud de reserva quedan en `localStorage` y la pantalla lo indica.

### Contrato de facturación

| Uso | Método y ruta |
| --- | --- |
| Categorías tributarias | `GET /api/facturacion/categorias-trib/` |
| Datos del cliente | `GET /api/facturacion-cliente/datos/` |
| Guardar datos | `POST /api/facturacion-cliente/datos/guardar/` |
| Contribuyente por RUT | `GET /api/facturacion-cliente/contribuyente/?rut=` |
| Ciudades y comunas | `GET /api/ciudades/` · `GET /api/comunas/` |

El código de portal se configura con `VITE_COD_SITIO_WEB` (ver `.env.example`). Cuando el lodge exista en ArriendaVIP, se reemplaza por el `dg_cod_sitio_web` real.

## Cómo verlo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

Rutas: `/`, `/cabanas`, `/cabanas/el-mirador`, `/cabanas/el-refugio`, `/cabanas/las-dalias`, `/pesca`, `/galeria`, `/galeria/pesca`, `/quienes-somos`, `/reservas`, `/facturacion`.
