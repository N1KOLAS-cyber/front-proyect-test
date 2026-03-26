# Optimización de rendimiento React (y organización del proyecto)

## 1) Organización del proyecto

### Rutas en archivo independiente
- Se creó `src/routes/AppRoutes.jsx` para centralizar las definiciones de `Route`/`Routes`.
- `src/App.jsx` ahora funciona como “envoltorio” de alto nivel (mantiene `BrowserRouter` y el `Header`) y delega el mapeo de URLs a `AppRoutes`.

**Justificación técnica:** separar el enrutado mejora la mantenibilidad y reduce el ruido en el componente raíz; además facilita evolucionar el mapa de rutas sin mezclarlo con layout global.

### Estructura de carpetas
- Se añadieron `src/routes/` y `src/data/` para desacoplar responsabilidades:
  - `src/routes/`: navegación (rutas).
  - `src/data/`: consumo/obtención de datos.

## 2) Buenas prácticas

### Eliminación de código innecesario
- Se eliminó `src/components/Card.css` y los imports asociados.
- El CSS eliminado definía clases base (`.card`, `.card-title`, etc.) que **no se estaban usando** en el JSX actual (los componentes usan `movie-card-hover`, `otros-card`, etc., definidos en `App.css`/`index.css`).

**Justificación técnica:** menos CSS cargado y menos archivos “huérfanos” mejoran el mantenimiento y reducen el peso del bundle final.

### Uso adecuado de archivos para consumo de datos
- Se creó `src/data/cinemaApi.js` como capa de acceso a datos.
- `cinemaApi.js` centraliza los requests hacia el contenido de `public/*.json` y agrega una **caché en memoria** (para evitar `fetch` duplicados al navegar entre rutas).
- Se actualizó:
  - `Home.jsx` para usar `getPeliculas()`, `getNoticias()` y `getOpiniones()`.
  - `Cartelera.jsx` para usar `getPeliculas()`.
  - `Alimentos.jsx` para usar `getAlimentos()`.
  - `Otros.jsx` para usar `getPromos()`.
  - `PeliculaDetalle.jsx` para resolver la película con `getPeliculas()` usando el `id` de la URL.

**Justificación técnica:** antes cada página repetía lógica de `fetch`/manejo de errores; ahora hay reutilización y cache, lo cual mejora:
- Rendimiento percibido (menos esperas tras navegar dentro de la misma sesión).
- Rendimiento real (menos requests HTTP duplicados).
- Legibilidad (menos duplicación de código).

## 3) Qué se optimizó (resumen)
- Separación de rutas: `src/routes/AppRoutes.jsx`.
- Mejora de estructura: creación de `src/data/` y `src/routes/`.
- Reutilización y cache de datos: `src/data/cinemaApi.js`.
- Eliminación de CSS no utilizado: borrado de `src/components/Card.css` y sus imports.

