# Deportech — Sitio estático 

## Resumen general
Deportech es un sitio web estático informativo sobre deportes. Incluye una página principal con **tarjetas** por deporte, vistas internas por cada deporte, una sección "Sobre nosotros" y un **formulario de contacto** que actualmente simula el envío. El proyecto está implementado con HTML, CSS y JavaScript sin necesidad de un entorno de build; opcionalmente usa GSAP (CDN) para animaciones si se necesita.

---

## Estructura de archivos y función de cada uno
- **`index.html`** — Contiene la estructura del sitio: header (logo), navegación, área principal con grid de tarjetas deportivas y secciones internas (ej.: `homePage`, `futbolPage`, `contacto`, `sobre-nosotros`). La navegación está basada en hash routes (p. ej. `#/futbol`) para cambiar de vista sin recargar la página.
- **`style.css`** — Estilos responsivos para layout (header, nav, grid de tarjetas, footer), estados de hover/focus en tarjetas y reglas para mobile/desktop.
- **`script.js`** — Lógica de la aplicación: navegación entre vistas, manejo del historial (back/forward), listeners para accesibilidad (keypress en tarjetas), manejo del formulario de contacto (envío simulado) y animaciones (usa GSAP si está disponible).

---

## Comportamiento y flujo del usuario
1. Al abrir la web se muestra la `homePage` con las tarjetas deportivas.  
2. Al hacer clic en una tarjeta o en el menú, se llama a la función de navegación (p. ej. `showPage()`), que activa la sección correspondiente y actualiza la URL con un hash (`#/nombre-deporte`).  
3. Las tarjetas y elementos interactivos manejan `keypress` para Enter/Space, facilitando navegación por teclado.  
4. El formulario de contacto evita el envío real: muestra feedback (alert/animación) y resetea el formulario. Para envío real hay que integrar un backend o servicio de formularios.  
5. Se utiliza `history` y `popstate` para soportar retroceso/adelante del navegador correctamente.

---

## Deportes incluidos 
- Fútbol  
- Baloncesto  
- Tenis  
- Natación  
- Ciclismo  
- Atletismo  
- Béisbol  
- Boxeo

---

## Dependencias y recursos externos
- **Opcional:** GSAP (y `ScrollTrigger`) cargado desde CDN para animaciones avanzadas.  
- Imágenes: provienen de URLs externas (no están embebidas localmente). Si las URLs fallan, las tarjetas quedarán sin imagen.  
- No requiere Node ni sistema de build para funcionar en desarrollo local — basta abrir `index.html` o servir la carpeta por HTTP.

---

## Accesibilidad y buenas prácticas presentes
- Uso de `role="button"` y `tabindex` en tarjetas para interacción con teclado.  
- Listeners para eventos de teclado (`keypress`) en elementos interactivos.

### Recomendaciones accesibles inmediatas
- Añadir `aria-label` / `aria-labelledby` en nav y regiones importantes.  
- Mejorar estilos `:focus` para alto contraste visual al navegar por teclado.  
- Revisar y completar `alt` descriptivos en todas las imágenes.

---

## Limitaciones actuales
- El formulario es **simulado**: no envía datos a un servidor.  
- Dependencia de imágenes externas.  
- Falta SEO avanzado (meta description, Open Graph).  
- No existe pipeline de build (minificación/optimización) para producción.

---

## Recomendaciones y próximos pasos prácticos
1. Integrar envío real del formulario (Formspree, Netlify Forms, o un endpoint propio y un `fetch()` desde `script.js`).  
2. Reemplazar imágenes por versiones optimizadas y usar `srcset` para responsive images.  
3. Añadir `meta description`, Open Graph y tags para mejorar SEO y preview en redes.  
4. Validar HTML con el validador W3C y corregir errores señalados.  
5. Probar performance y accesibilidad con Lighthouse; corregir issues prioritarios.  
6. Si el proyecto crece: considerar un build (Vite/esbuild) para minificar assets y gestionar dependencias.

---

## Cómo ejecutar en local (rápido y recomendado)
- Opción rápida: abrir `index.html` en el navegador.  
- Opción recomendada (evita problemas con rutas relativas): servir por HTTP:  
  - `python -m http.server 8000` → abrir `http://localhost:8000`  
  - o `npx serve` / Live Server en VSCode.


