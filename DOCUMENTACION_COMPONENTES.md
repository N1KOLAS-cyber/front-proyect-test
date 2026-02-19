# Documentación de Componentes - Proyecto Cinemex

## 📋 Resumen General

Se agregaron **3 componentes principales** al proyecto, con aproximadamente **70 líneas de código** funcional distribuidas estratégicamente para crear una interfaz de usuario modular, reutilizable y fácil de mantener.

---

## 🎯 Componentes Agregados

### 1. **Componente `Header`**

#### ¿Qué es?
Componente funcional que representa el encabezado/navegación superior de la aplicación.

#### Código
```jsx
function Header() {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: 'rgb(255, 0, 0)',
      color: 'white',
    }}>
      <h1>Cinemex</h1>
    </div>
  )
}
```

#### ¿Por qué se eligió?
- **Separación de responsabilidades**: Aisla toda la lógica del encabezado en un componente independiente
- **Reutilizabilidad**: Se puede usar en múltiples páginas sin duplicar código
- **Mantenibilidad**: Si la marca o diseño del encabezado cambia, solo se modifica en un lugar

#### Para qué sirve
- Mostrar la identidad visual de la marca (Cinemex)
- Proporcionar una zona de navegación consistente en toda la aplicación
- Establecer una jerarquía visual clara en la página

#### Características
- Fondo rojo (RGB 255, 0, 0) como color corporativo
- Texto blanco para alto contraste
- Padding de 20px para espaciado interno
- Texto centrado para una presentación profesional

---

### 2. **Componente `Button`**

#### ¿Qué es?
Componente reutilizable de botón personalizado que acepta propiedades dinámicas.

#### Código
```jsx
function Button({ text }){
  return (
    <button 
      style={{
        padding: '10px 20px',
        backgroundColor: 'rgb(100, 96, 96)',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}>
      {text}
    </button>
  )
}
```

#### ¿Por qué se eligió?
- **Abstracción**: Encapsula los estilos de botón en un componente único
- **Props (Propiedades)**: Acepta parámetros dinámicos (`text`) para reutilización sin modificar código
- **Consistencia**: Garantiza que todos los botones tengan el mismo estilo en toda la app
- **DRY (Don't Repeat Yourself)**: Evita copiar y pegar código de estilos

#### Para qué sirve
- Proporcionar un botón estilizado y consistente
- Permitir texto dinámico a través de props
- Mantener un estándar visual de botones en toda la aplicación

#### Características
- Color gris oscuro (RGB 100, 96, 96) para contraste
- Bordes redondeados (5px) para diseño moderno
- Cursor tipo "pointer" para indicar interactividad
- Padding equilibrado para facilidad de clic

---

### 3. **Componente `MovieCard`**

#### ¿Qué es?
Componente que representa una tarjeta individual de película con título y botón de acción.

#### Código
```jsx
function MovieCard({ title }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        margin: "16px",
        borderRadius: "8px",
        maxWidth: "300px"
      }}
    >
      <h3>{title}</h3>
      <Button text="Ver horarios" />
    </div>
  );
}
```

#### ¿Por qué se eligió?
- **Modularidad**: Cada película es una unidad independiente y reutilizable
- **Composición**: Reutiliza el componente `Button` internamente (composición de componentes)
- **Escalabilidad**: Facilita agregar más películas sin modificar el código base
- **Presentación clara**: Cada película tiene su propio espacio visual definido

#### Para qué sirve
- Mostrar información de una película de forma organizada
- Permitir que los usuarios vean opciones de horarios para cada película
- Crear un catálogo visual de películas disponibles

#### Características
- Borde sutil (1px gris claro) para delimitación
- Ancho máximo de 300px para mantener proporciones
- Bordes redondeados (8px) para diseño moderno
- Espaciado interno (padding) y externo (margin) para respiración visual

---

## 🏗️ Estructura de Componentes

```
App (Componente Principal)
├── Header
└── main (Flexbox)
    ├── MovieCard → Button
    ├── MovieCard → Button
    ├── MovieCard → Button
    ├── MovieCard → Button
    └── MovieCard → Button
```

---

## 💡 Ventajas de esta Arquitectura

### 1. **Código Limpio y Legible**
Cada componente tiene una responsabilidad clara y única (Principio de Responsabilidad Única).

### 2. **Reutilización**
- El componente `Button` se reutiliza en `MovieCard`
- El componente `MovieCard` se reutiliza 5 veces en `App`
- El componente `Header` se puede reutilizar en múltiples páginas

### 3. **Fácil Mantenimiento**
Si necesitas cambiar los estilos de un botón, lo haces en un solo lugar y se actualiza automáticamente en todas partes.

### 4. **Escalabilidad**
Agregar nuevas películas es tan simple como:
```jsx
<MovieCard title="Nueva Película" />
```

### 5. **Preparado para Funcionalidad Futura**
Esta estructura permite fácilmente:
- Agregar estado (useState) para interactividad
- Conectar con un backend para datos dinámicos
- Agregar más props para información adicional (imagen, sinopsis, calificación, etc.)

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Componentes creados | 3 (Header, Button, MovieCard) |
| Líneas de código JSX | ~70 |
| Reutilización de Button | 5 veces |
| Reutilización de MovieCard | 5 veces |
| Películas mostradas | 5 |

---

## 🚀 Próximas Mejoras Sugeridas

1. **Agregar datos dinámicos**: Usar un array de películas e iterar con `.map()`
2. **Agregar imágenes**: Incluir posters de películas en MovieCard
3. **Agregar funcionalidad**: Implementar click handlers en los botones
4. **Agregar más información**: Sinopsis, calificación, horarios reales
5. **Styled Components o CSS Modules**: Migrar de estilos inline a archivos CSS separados
6. **Responsive Design**: Hacer que la aplicación se adapte a móviles y tablets

---

## 📚 Conceptos Clave Utilizados

- **Componentes Funcionales**: Funciones JavaScript que retornan JSX
- **Props**: Parámetros que permiten pasar datos a componentes
- **Composición**: Componentes que contienen otros componentes
- **Estilos Inline**: Aplicación de CSS directamente en elementos React
- **Flexbox**: Modelo de caja flexible para distribución de elementos

---

**Documento generado:** Febrero 2026  
**Proyecto:** UX/UI Development - Front Project Test
