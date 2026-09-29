# BS IND CARE® — Sitio Web Oficial & Landing Page

> **"La Excelencia Hecha Cuidado"**  
> Sitio web oficial y landing page de conversión para la **Mantequilla Corporal Aroma Vainilla (175 ml / 5.91 fl. oz.)**, desarrollada por **Bridges Siblings Industries S.A.S.**

---

## 📌 Tabla de Contenidos

1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Stack Tecnológico](#-stack-tecnológico)
3. [Estructura del Repositorio](#-estructura-del-repositorio)
4. [Identidad Visual y Sistema de Diseño](#-identidad-visual-y-sistema-de-diseño)
5. [Componentes y Funcionalidades](#-componentes-y-funcionalidades)
6. [Ejecución y Visualización Local](#-ejecución-y-visualización-local)
7. [Integraciones Externas](#-integraciones-externas)
8. [Auditoría y Pruebas Técnicas](#-auditoría-y-pruebas-técnicas)
9. [Directrices de Mantenimiento](#-directrices-de-mantenimiento)
10. [Contacto y Canales Oficiales](#-contacto-y-canales-oficiales)

---

## 📖 Descripción del Proyecto

Este proyecto consiste en una landing page estática de alta gama, orientada a la conversión y presentación de la línea cosmética de **BS IND CARE®**. Ofrece una experiencia inmersiva para el cliente, destacando los beneficios sensoriales, ingredientes naturales (manteca de cacao, karité, vitamina E), modo de uso ritualizado y canales directos de compra vía WhatsApp y correo electrónico.

La web está construida como una **Single Page Application (SPA) estática**, sin dependencias pesadas de compilación, garantizando máxima velocidad de carga, alta fidelidad visual y compatibilidad universal con navegadores de escritorio y dispositivos móviles.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Implementación |
| :--- | :--- | :--- |
| **Estructura** | HTML5 Semántico | `lang="es"`, microformatos SEO, Open Graph y ARIA para accesibilidad. |
| **Estilos Base** | [Tailwind CSS](https://tailwindcss.com/) (CDN) | Cargado vía CDN con configuración de tema inline (`tailwind.config`). |
| **Diseño de Marca** | CSS3 Nativo (`styles.css`) | Variables `:root`, efectos glassmorphism, keyframes, scrollbar personalizada y tokens de marca. |
| **Interactividad** | JavaScript Vanilla (`main.js`) | ES6+ modular, sin frameworks ni bundlers requeridos. |
| **Tipografía** | [Google Fonts](https://fonts.google.com/) | *Playfair Display* (serif titular), *Montserrat* e *Inter* (sans-serif lectura). |
| **Formulario** | [Web3Forms API](https://web3forms.com/) | Envío asíncrono con AJAX/Fetch, protección Honeypot y notificaciones Toast. |

---

## 📂 Estructura del Repositorio

```text
bs_ind_care/
├── index.html                   # Documento principal (~1060 líneas con 10 secciones estructuradas)
├── styles.css                   # Sistema de diseño, tokens de marca, componentes y animaciones
├── main.js                      # Interactividad vanilla JS: navbar, menú móvil, carrusel, form, toast
├── README.md                    # Documentación general del proyecto (este archivo)
├── INFORME_TESTS.md             # Informe técnico detallado de la suite de pruebas (78/78 pruebas)
├── test.js                      # Suite ejecutable de pruebas automatizadas (node test.js)
├── AGENTS.md                    # Guía técnica y directrices de desarrollo para asistentes IA y devs
├── INFORME_PRE_LANZAMIENTO.md   # Auditoría de verificación pre-lanzamiento
├── walkthrough.md               # Resumen de arquitectura y entrega técnica
├── BS_IND_CARE_Manual...docx   # Manual Maestro de Identidad de Marca original
└── assets/
    └── images/                  # Activos multimedia (fotografía de producto, videos y logotipos)
        ├── logo.jpg             # Logotipo corporativo oficial
        ├── product1.jpg         # Frasco abierto (Hero & LCP Preload)
        ├── product2.jpg a 5.jpg # Tomas de catálogo y detalles de producto
        ├── productvideo1.mp4    # Video promocional de la experiencia sensorial
        ├── ingredientes.jpg     # Fotografía de activos naturales
        └── instruccionesuso.jpg # Infografía del ritual de aplicación
```

---

## 🎨 Identidad Visual y Sistema de Diseño

Basado en el **Manual Maestro de Identidad de Marca** de Bridges Siblings Industries S.A.S.:

### Paleta Cromática

| Token CSS | Valor HEX | Uso Principal |
| :--- | :--- | :--- |
| `--purple-bs` / `--purple-main` | `#3B176B` | Púrpura BS institucional: logotipo, titulares y fondos primarios. |
| `--purple-deep` | `#170A2E` | Púrpura Profundo: fondos oscuros de lujo, contrastes y sombras. |
| `--gold-main` | `#C9A24A` | Dorado Premium: bordes, acentos, chips y separadores. |
| `--gold-rich` | `#DFB75A` | Dorado Rico: botones CTA destacados, indicadores de carrusel y detalles. |
| `--purple-bg` / `--cream-white` | `#F8F3EA` | Marfil Oficial: fondo general cálido y tarjetas contrastadas. |
| `--purple-pale` | `#DCCEF0` | Lila Suave: fondos secundarios, acentos de aroma y suavidad. |

### Tipografía

- **Titulares:** `Playfair Display` (serif elegante, proyecta sofisticación cosmética).
- **Cuerpo y lectura:** `Montserrat` e `Inter` (sans-serif legible y moderna).

---

## ⚡ Componentes y Funcionalidades

### 1. Barra de Navegación (`#navbar`)
- Barra fija superior con transición a fondo *glassmorphism* al superar los 40px de scroll vertical.
- Enlaces de salto con compensación de altura (`75px`) para evitar que el navbar tape los títulos de sección.

### 2. Menú Móvil Inteligente (`#hamburger` & `#mobile-menu`)
- Botón hamburguesa con transformación CSS a "X" animada.
- Bloqueo automático del scroll de la página (`body { overflow: hidden }`) mientras el menú está desplegado.
- Cierre automático al hacer clic en un enlace, al pulsar fuera del menú o al presionar la tecla <kbd>Escape</kbd>.

### 3. Carrusel Interactivo de Galería (`#carouselTrack`)
- Navegación bidireccional mediante botones prev/next con estilo frosted glass.
- Indicadores dinámicos (*dots*) generados automáticamente según el número de diapositivas.
- Reproducción automática (*autoplay*) cada 5 segundos con pausa automática al posicionar el cursor (*hover*).
- Soporte para gestos táctiles (*swipe*) en teléfonos móviles y tablets.
- Control por teclado con flechas izquierda (<kbd>←</kbd>) y derecha (<kbd>→</kbd>) cuando el carrusel se encuentra en pantalla.

### 4. Formulario de Contacto & Conversión (`#contactForm`)
- Validación en tiempo real al perder el foco (`blur`) y al escribir (`input`).
- Mensajes de error contextuales con accesibilidad `aria-live`.
- Contador interactivo de caracteres en el área de texto (`0/500`) con alerta visual en rojo al superar los 450 caracteres.
- Protección anti-spam mediante campo señuelo *Honeypot* (`name="botcheck"`).
- Envío sin recarga mediante `fetch` hacia el endpoint de Web3Forms.
- Estado de carga en el botón (`#btnLoader`) con spinner animado y desactivación temporal para evitar envíos dobles.

### 5. Notificaciones Toast Flotantes (`#toast`)
- Notificaciones emergentes con animaciones CSS de entrada y salida (*slide-in*).
- Variante de éxito (verde con ícono ✅) y variante de advertencia/error (rojo con ícono ⚠️).
- Temporizador de auto-cierre a los 5 segundos.

### 6. Animaciones al Scroll (`.reveal`)
- Utiliza la API nativa `IntersectionObserver` para mostrar progresivamente los bloques con desvanecimiento y desplazamiento vertical.
- Delays escalonados para tarjetas contiguas (`.reveal-delay-1`, `.reveal-delay-2`, etc.).

---

## 🚀 Ejecución y Visualización Local

Al ser un proyecto estático sin fase de compilación, no requiere `npm install` ni paquetes Node.js obligatorios.

### Opción 1: Apertura directa
Doble clic en el archivo `index.html` para abrirlo en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).

### Opción 2: Servidor local ligero (Recomendado)
Para una mejor experiencia con solicitudes HTTP y tipografías:

- **VS Code:** Instalar la extensión **Live Server** y hacer clic en *"Go Live"*.
- **Python:**
  ```bash
  python -m http.server 3000
  ```
- **Node.js (npx):**
  ```bash
  npx serve .
  ```
Abrir `http://localhost:3000` en el navegador.

---

## 🔗 Integraciones Externas

- **WhatsApp Oficial de Ventas:** Enlaces `https://wa.me/573165305071` con mensajes preconfigurados para iniciar la compra de forma directa.
- **Web3Forms API:** Endpoint de procesamiento de correos electrónicos (`https://api.web3forms.com/submit`). La clave se encuentra configurada en el campo oculto `#web3formsKey`.
- **Redes Sociales Oficiales:**
  - Instagram: [@bsindcare](https://www.instagram.com/bsindcare)
  - Facebook: [brisindsas](https://www.facebook.com/brisindsas)
  - TikTok: [@bsindcare](https://www.tiktok.com/@bsindcare)

---

## 🧪 Auditoría y Pruebas Técnicas

El repositorio cuenta con una suite automatizada de validación técnica estricta:

- **Suite de Pruebas de Integridad:** Se validan 78 verificaciones automatizadas cubriendo correspondencia DOM IDs, selectores JS, existencia física de archivos multimedia, enlaces internos, enlaces unificados de WhatsApp, tokens de diseño y optimización SEO.
- **Tasa de Aprobación:** 100% (78/78 pruebas aprobadas).
- **Ejecución de las pruebas:**
  ```bash
  node test.js
  ```
- **Informe Completo:** Para conocer el desglose detallado de cada módulo y caso de prueba, consulta el archivo [INFORME_TESTS.md](file:///e:/WebDesign/bs_ind_care/INFORME_TESTS.md).

---

## ⚠️ Directrices de Mantenimiento

1. **Sincronización de Paleta:** Los colores institucionales están definidos en dos lugares:
   - En el script inline `tailwind.config` de `index.html`.
   - En las variables `:root` de `styles.css`.  
   *Cualquier ajuste de color debe aplicarse en ambos archivos simultáneamente.*
2. **Identificadores DOM:** El script `main.js` depende de IDs específicos (`#navbar`, `#hamburger`, `#carouselTrack`, `#contactForm`, etc.). No renombrar ni remover estos IDs en `index.html` sin actualizar `main.js`.
3. **Clases `.reveal`:** Los elementos con la clase `.reveal` inician con `opacity: 0`. Requieren que JavaScript esté activo para agregar la clase `.visible` al entrar en pantalla.

---

## 📞 Contacto y Canales Oficiales

- **Razón Social:** Bridges Siblings Industries S.A.S.
- **Marca:** BS IND CARE®
- **Línea de Atención / WhatsApp:** [+57 316 530 5071](https://wa.me/573165305071)
- **Correo Corporativo:** [bsindcare@gmail.com](mailto:bsindcare@gmail.com)
- **País:** Colombia

---

*© 2026 Bridges Siblings Industries S.A.S. Todos los derechos reservados. BS IND CARE® es una marca registrada.*
