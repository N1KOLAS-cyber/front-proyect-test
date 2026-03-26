// cinemaApi.js
// Centraliza el consumo de datos locales (JSON en `public/`) y aplica cache en memoria.
// Esto evita repetir fetch innecesarios cuando el usuario navega entre rutas.

const cache = new Map();

async function fetchJson(url) {
  if (cache.has(url)) return cache.get(url);

  const promise = fetch(url)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Error ${res.status} al cargar ${url}`);
      }
      return res.json();
    })
    .catch((err) => {
      // Si falla, limpiamos del cache para que un reintento futuro funcione.
      cache.delete(url);
      throw err;
    });

  cache.set(url, promise);
  return promise;
}

export function getPeliculas() {
  return fetchJson('/peliculas.json');
}

export function getNoticias() {
  return fetchJson('/noticias.json');
}

export function getOpiniones() {
  return fetchJson('/opiniones.json');
}

export function getPromos() {
  return fetchJson('/promos.json');
}

export function getAlimentos() {
  return fetchJson('/alimentos.json');
}

