# GUÍA DE ESTUDIO — Proyecto Cinemex React

## Estructura del Proyecto

```
src/
├── components/          ← Componentes REUTILIZABLES
│   ├── Header.jsx       ← Navegación con menú responsive (useState)
│   ├── Button.jsx       ← Botón genérico (solo props, sin estado)
│   ├── MovieCard.jsx    ← Tarjeta de película (props + children)
│   ├── FoodCard.jsx     ← Tarjeta de alimento (props + callback)
│   └── PromoCard.jsx    ← Tarjeta de promoción (props + map)
├── pages/               ← Páginas (rutas)
│   ├── Home.jsx         ← Página principal (3 fetch, opiniones, noticias)
│   ├── Cartelera.jsx    ← Cartelera (favoritos, filtros, sinopsis)
│   ├── Alimentos.jsx    ← Dulcería (carrito de compras)
│   └── Otros.jsx        ← Promos + formulario controlado
├── App.jsx              ← Componente raíz con React Router
├── main.jsx             ← Punto de entrada
└── index.css            ← Estilos globales + responsive

public/
├── peliculas.json       ← Datos de películas (consumido por fetch)
├── alimentos.json       ← Datos de alimentos (consumido por fetch)
├── promos.json          ← Datos de promociones (consumido por fetch)
├── noticias.json        ← Datos de noticias (consumido por fetch)
└── opiniones.json       ← Datos de opiniones (consumido por fetch)
```

---

## 1. ARQUITECTURA — Preguntas frecuentes

### "¿Por qué dividiste en componentes y páginas?"
> Los **componentes** (`components/`) son piezas reutilizables de UI que se pueden usar en varias páginas. Las **páginas** (`pages/`) son componentes que representan rutas completas. Esta separación hace el código más organizado y mantenible.

### "¿Dónde se reutilizan los componentes?"
> - `MovieCard` → Se usa en **Home.jsx** (modo simple) y en **Cartelera.jsx** (modo con children)
> - `FoodCard` → Se usa en **Alimentos.jsx**
> - `PromoCard` → Se usa en **Otros.jsx**
> - `Header` → Se usa en **App.jsx** (aparece en TODAS las páginas)
> - `Button` → Se usa dentro de MovieCard, FoodCard, PromoCard

### "¿Cómo se comunican los componentes?"
> **Padre → Hijo:** Mediante **props** (datos que se pasan como atributos).
> **Hijo → Padre:** Mediante **callbacks** (funciones del padre pasadas como props).
>
> Ejemplo: `Alimentos.jsx` (padre) pasa `onToggle={() => addToCart(food.id)}` a `FoodCard` (hijo). Cuando el usuario hace click, FoodCard ejecuta `onToggle()`, que realmente es `addToCart` del padre.

### "¿Qué es la prop children?"
> Es todo lo que se coloca ENTRE las etiquetas de un componente. Permite inyectar contenido personalizado. En **Cartelera.jsx**, MovieCard recibe children con favoritos, sinopsis y horarios. En **Home.jsx**, no se pasan children y MovieCard muestra su contenido por defecto.

---

## 2. ESTADO (useState) — Preguntas frecuentes

### "¿Cuántos estados tiene el proyecto?"
> **21 estados** distribuidos así:
> - Header: `isMenuOpen` (1)
> - Home: `peliculas`, `noticias`, `opiniones`, `loadingPeliculas`, `loadingNoticias`, `expandedNews` (6)
> - Cartelera: `movies`, `loading`, `activeTab`, `activeFormat`, `favorites`, `expandedDesc` (6)
> - Alimentos: `foods`, `loading`, `activeCategory`, `cart`, `purchaseSummary` (5)
> - Otros: `promos`, `loading`, `formData`, `submittedData` (4)

### "¿Qué tipos de estado manejas?"
> - **Booleano:** `isMenuOpen`, `loading`
> - **String:** `activeTab`, `activeFormat`, `activeCategory`, `purchaseSummary`
> - **Array:** `peliculas`, `noticias`, `opiniones`, `movies`, `foods`, `promos`, `favorites`, `cart`
> - **Objeto:** `expandedNews`, `expandedDesc`, `formData`, `submittedData`
> - **null:** `purchaseSummary`, `submittedData` (inician como null)

### "¿Por qué usas `prev =>` en los setters?"
> Es la **actualización funcional**. Garantiza que siempre trabajamos con el valor más reciente del estado. Ejemplo:
> ```js
> setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
> ```
> Si usáramos `setFavorites(favorites.filter(...))`, podría haber un bug si React agrupa varias actualizaciones (batching).

### "¿Cómo evitas mutar el estado?"
> **NUNCA** hago `favorites.push(id)` ni `delete expandedDesc[id]`. Siempre creo copias:
> - **Arrays:** `[...prev, nuevoItem]` (spread) o `prev.filter(...)` (filtrar)
> - **Objetos:** `{...prev, [key]: valor}` (spread + computed property)
> - **Resetear:** `setCart([])` (nuevo array vacío) o `setFormData({name: '', email: ''})` (nuevo objeto)

---

## 3. EVENTOS Y FORMULARIOS — Preguntas frecuentes

### "¿Qué eventos usas?"
> - **onClick:** Menú hamburguesa, tabs, filtros, favoritos, expandir sinopsis, agregar al carrito, pagar, leer más noticias
> - **onChange:** Inputs del formulario (nombre y email)
> - **onSubmit:** Envío del formulario de registro

### "¿Qué es un formulario controlado?"
> Es cuando React **controla** el valor de los inputs. Cada input tiene:
> 1. `value={formData.name}` → React dicta qué se muestra
> 2. `onChange={handleInputChange}` → Cada tecla actualiza el estado
>
> Sin esto, el input sería "no controlado" y React no sabría qué contiene.

### "¿Para qué sirve preventDefault()?"
> Por defecto, un `<form>` al enviarse **recarga toda la página** (comportamiento HTML nativo). `e.preventDefault()` cancela eso para que React maneje el envío sin perder el estado de la aplicación.

### "¿Cómo funciona handleInputChange para TODOS los inputs?"
> Usa **computed property names** de ES6:
> ```js
> const { name, value } = e.target;  // name="email", value="hola@mail.com"
> setFormData(prev => ({ ...prev, [name]: value }));
> // Equivale a: { ...prev, email: "hola@mail.com" }
> ```
> El atributo `name` del input (`name="email"`) coincide con la key del estado.

---

## 4. useEffect Y FETCH — Preguntas frecuentes

### "¿Qué hace useEffect?"
> Ejecuta código después de que React renderiza el componente. Lo usamos para **fetch de datos** porque no podemos hacer peticiones asíncronas durante el render.

### "¿Por qué el array de dependencias está vacío []?"
> - `[]` → Se ejecuta **1 vez** al montar el componente
> - `[variable]` → Se ejecuta cada vez que `variable` cambia
> - Sin array → Se ejecuta en **cada** render (peligroso con fetch → loop infinito)

### "¿De dónde vienen los datos?"
> De archivos JSON en la carpeta `public/`:
> | Archivo | Consumido en | Contenido |
> |---------|-------------|-----------|
> | peliculas.json | Home, Cartelera | 5 películas con título, imagen, género, etc. |
> | alimentos.json | Alimentos | 16 items de comida con precio, categoría, etc. |
> | promos.json | Otros | 3 promociones con perks, colores, iconos |
> | noticias.json | Home | 3 noticias con cuerpo expandible |
> | opiniones.json | Home | 4 opiniones con avatar, rating, comentario |

### "¿Por qué usas JSON local y no una API externa?"
> Para el alcance del proyecto, JSON local simula el comportamiento de una API real. El `fetch('/archivo.json')` funciona exactamente igual que una petición a un servidor — devuelve una Promise que resolvemos con `.then()`. Si quisiéramos conectar una API real, solo cambiaríamos la URL.

---

## 5. DISEÑO Y RESPONSIVE — Preguntas frecuentes

### "¿Dónde usas Flexbox?"
> - Header: `display: flex` para alinear logo y nav
> - Filtros: `display: flex` con `gap` para los pills
> - Cards: `flex-direction: column` para apilar contenido
> - Hero: `display: flex` + `align-items: center` para centrar

### "¿Dónde usas Grid?"
> - Home cartelera: `grid-template-columns: repeat(5, 1fr)` → 5 columnas
> - Cartelera: `repeat(auto-fill, minmax(180px, 1fr))` → columnas automáticas
> - Alimentos: `repeat(auto-fill, minmax(160px, 1fr))` → columnas automáticas
> - PromoCard: `200px 1fr` → panel lateral fijo + contenido flexible
> - Destacada: `280px 1fr` → poster fijo + info flexible
> - Noticias/Opiniones: `repeat(auto-fit, minmax(260px, 1fr))` → auto-ajuste

### "¿Cómo funciona el responsive?"
> Media queries en `index.css`:
> - **≤ 900px (Tablet):** Grids cambian a 3 columnas, PromoCard se apila
> - **≤ 600px (Móvil):** Grids a 2 columnas, hero más pequeño, botones apilados, horarios ocultos
> - **≤ 768px:** Header cambia a menú hamburguesa con animación slide-down

---

## 6. FLUJO EVENTO → ESTADO → RE-RENDERIZADO

### Ejemplo 1: Agregar favorito (Cartelera)
```
1. EVENTO:     onClick={() => toggleFavorite(movie.id)}
2. FUNCIÓN:    toggleFavorite → setFavorites(prev => [...prev, id])
3. ESTADO:     favorites cambia de [1] a [1, 3]
4. RE-RENDER:  React detecta cambio → re-renderiza Cartelera
5. UI:         Corazón se pone rojo, contador muestra "2 película(s) favorita(s)"
```

### Ejemplo 2: Formulario controlado (Otros)
```
1. EVENTO:     onChange en input → handleInputChange(e)
2. FUNCIÓN:    setFormData(prev => ({...prev, email: "juan@mail.com"}))
3. ESTADO:     formData cambia de {name: "Juan", email: ""} a {name: "Juan", email: "juan@mail.com"}
4. RE-RENDER:  React re-renderiza → input muestra "juan@mail.com"
5. SUBMIT:     onSubmit → preventDefault() → setSubmittedData(formData)
6. UI:         Formulario desaparece, aparece mensaje "Gracias Juan, enviaremos a juan@mail.com"
```

### Ejemplo 3: Fetch de datos (Home)
```
1. MONTAJE:    React renderiza Home → useEffect se ejecuta
2. FETCH:      fetch('/peliculas.json') → Promise pending
3. ESTADO:     loadingPeliculas = true → muestra spinner
4. RESPUESTA:  .then(data => { setPeliculas(data); setLoadingPeliculas(false) })
5. RE-RENDER:  spinner desaparece, se muestran las 5 MovieCards con datos del JSON
```

### Ejemplo 4: Expandir noticia (Home)
```
1. EVENTO:     onClick → toggleNews(2)
2. FUNCIÓN:    setExpandedNews(prev => ({...prev, 2: true}))
3. ESTADO:     expandedNews cambia de {} a {2: true}
4. RE-RENDER:  La noticia #2 muestra el texto completo, botón dice "MOSTRAR MENOS"
```

---

## RESUMEN RÁPIDO PARA PRESENTACIÓN

| Concepto | Dónde se demuestra |
|----------|-------------------|
| Componentes reutilizables | MovieCard (2 páginas), FoodCard, PromoCard, Button, Header |
| Props padre→hijo | Todas las páginas pasan datos a sus componentes hijos |
| Callbacks hijo→padre | FoodCard.onToggle → Alimentos.addToCart |
| useState con arrays | favorites[], cart[] |
| useState con objetos | expandedNews{}, expandedDesc{}, formData{} |
| useEffect + fetch | 5 archivos JSON consumidos en 4 páginas |
| Formulario controlado | Otros.jsx — value + onChange + onSubmit |
| preventDefault | Otros.jsx — handleSubmit |
| onClick | Todas las páginas (filtros, toggles, botones) |
| onChange | Otros.jsx — handleInputChange |
| onSubmit | Otros.jsx — handleSubmit |
| Renderizado condicional | Ternarios, &&, spinners de carga |
| .map() con key | Listas en todas las páginas |
| CSS Grid | Grids de películas, alimentos, promos, noticias |
| CSS Flexbox | Header, filtros, botones, cards internas |
| Media queries responsive | 3 breakpoints (900px, 768px, 600px) |
| children prop | MovieCard en Cartelera con contenido personalizado |
