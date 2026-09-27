# BS IND CARE® — Landing Page · Resumen de Entrega

## Archivos del Proyecto

| Archivo | Tamaño | Descripción |
|---|---|---|
| [`index.html`](file:///e:/WebDesign/bs_ind_care/index.html) | 46 KB | Landing page completa — HTML5 semántico + Tailwind CDN |
| [`styles.css`](file:///e:/WebDesign/bs_ind_care/styles.css) | 25 KB | Sistema de diseño de marca — tokens, animaciones, componentes |
| [`main.ts`](file:///e:/WebDesign/bs_ind_care/main.ts) | 12 KB | Código fuente TypeScript con tipado completo |
| [`main.js`](file:///e:/WebDesign/bs_ind_care/main.js) | 9 KB | JavaScript compilado via esbuild (ES2017) |
| `assets/images/product1.jpg` | 621 KB | Frasco abierto — hero & carousel slide 1 |
| `assets/images/product2.jpg` | 667 KB | Envase cerrado sobre mármol — carousel slide 2 |
| `assets/images/lifestyle.jpg` | 705 KB | Ritual spa — carousel slide 3 |
| `assets/images/ingredients.jpg` | 820 KB | Ingredientes naturales — carousel slide 4 |

---

## Arquitectura Visual

```
index.html
├── <head>      → SEO, Open Graph, Tailwind CDN, styles.css, font preconnect
├── <nav>       → Navbar fixed + glassmorphism scroll + logo + desktop nav
├── #mobile-menu → Drawer animado (max-height transition)
├── #hero       → 100dvh, gradiente púrpura, imagen flotante + badges
├── #benefits   → Grid 4 cols (sm:2, lg:4) con tarjetas hover premium
├── #product-info → 2 cols: uso step-by-step + ingredientes chips + sellos
├── #gallery    → Carrusel TS completo con touch/swipe/autoplay/dots/arrows
├── #contact    → Split card: sidebar púrpura + formulario validado TS
├── <footer>    → 3 cols: marca+social / navegación / info legal
└── #toast      → Notificación de éxito slide-in
```

---

## Funcionalidades TypeScript

### 1. Navbar Scroll (`initNavbar`)
- Detecta `window.scrollY > 40` para activar glassmorphism
- Passive event listener para performance

### 2. Menú Hamburguesa (`initMobileMenu`)
- Animación de 3 líneas → X via CSS transforms
- `max-height` transition para drawer suave
- Cierre por click externo, tecla ESC, y links internos
- `aria-expanded` actualizado dinámicamente

### 3. Carrusel (`initCarousel`)
- **Touch/swipe** con detección de dirección (solo horizontal)
- **Autoplay** 5 segundos con pausa en hover
- **Teclado** ← → (solo cuando el carrusel está en viewport)
- **Dots** generados dinámicamente con efecto pill activo
- Botones prev/next con glassmorphism
- `aria-live="polite"` para accesibilidad

### 4. Validación de Formulario (`initContactForm`)
- Validación en tiempo real al salir del campo (blur)
- Re-validación mientras se escribe si ya tiene error
- Estados visuales: `.error` (rojo) / `.valid` (verde)
- Simulación de envío asíncrono con spinner
- Focus automático en primer campo con error

### 5. Reveal en Scroll (`initRevealOnScroll`)
- `IntersectionObserver` con threshold 0.12
- Delays escalonados con `.reveal-delay-{1-4}`
- Unobserve tras primera activación (performance)

### 6. Toast (`showToast`)
- Slide-in desde la derecha con CSS transform
- Auto-cierre a los 4.5 segundos

---

## Paleta de Colores

| Token | Valor | Uso |
|---|---|---|
| `--purple-deep` | `#4B1E6D` | Fondo hero, footer, headings |
| `--purple-main` | `#5E2A84` | Primario, botones, borders |
| `--gold-rich` | `#D4AF37` | Acentos, CTA, dots activos |
| `--gold-main` | `#C5A059` | Secondary gold, chips |
| `--cream-white` | `#FAF6FF` | Background general |
| `--purple-bg` | `#F8F4FC` | Background secciones |

---

## SEO Implementado
- ✅ `<title>` descriptivo con palabras clave
- ✅ Meta description optimizada
- ✅ Open Graph (og:title, og:description, og:type, og:image)
- ✅ Un solo `<h1>` en hero
- ✅ Jerarquía de headings correcta (h1 → h2 → h3)
- ✅ HTML5 semántico: `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- ✅ `fetchpriority="high"` en imagen LCP
- ✅ `loading="lazy"` en imágenes below-the-fold
- ✅ `alt` descriptivo en todas las imágenes

## Accesibilidad (a11y)
- ✅ Roles ARIA: `role="navigation"`, `role="list"`, `role="dialog"`, `role="status"`
- ✅ `aria-label` en todos los botones e iconos
- ✅ `aria-required`, `aria-describedby` en formulario
- ✅ `aria-live="polite"` en carousel y mensajes de error
- ✅ `aria-hidden="true"` en elementos decorativos
- ✅ Colores con contraste > 4.5:1
- ✅ `lang="es"` en `<html>`
