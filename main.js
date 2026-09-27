// =============================================================================
//  BS IND CARE® — main.js
//  Script principal para interactividad y dinamismo del sitio web
//  Bridges Siblings Industries S.A.S.
// =============================================================================

// ── UTILIDADES DOM ────────────────────────────────────────────────────────────
// Helper abreviado para document.querySelector (selecciona un único elemento)
const qs = (sel, ctx = document) => ctx.querySelector(sel);

// Helper abreviado para document.querySelectorAll (devuelve un array de elementos)
const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// ── 1. NAVBAR (Barra de Navegación) ───────────────────────────────────────────
// Añade o quita la clase '.scrolled' según el desplazamiento vertical de la página
function initNavbar() {
  const navbar = qs("#navbar");
  if (!navbar) return;

  const onScroll = () => {
    // Si el scroll supera 40px, aplica el estilo con fondo/sombra
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  // Escucha el evento de scroll de forma pasiva para optimizar el rendimiento
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // Verificación inicial al cargar la página
}

// ── 2. MENÚ MÓVIL (Hamburguesa) ───────────────────────────────────────────────
// Controla la apertura, cierre y accesibilidad del menú en pantallas móviles
function initMobileMenu() {
  const hamburger = qs("#hamburger");
  const mobileMenu = qs("#mobile-menu");
  const navLinks = qsa(".mobile-nav-link");

  if (!hamburger || !mobileMenu) return;

  let isOpen = false;

  // Alterna el estado del menú (abrir/cerrar) y bloquea el scroll del fondo
  const toggle = () => {
    isOpen = !isOpen;
    hamburger.classList.toggle("open", isOpen);
    mobileMenu.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  // Cierra el menú móvil de manera explícita
  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  // Evento al hacer clic en el botón hamburguesa
  hamburger.addEventListener("click", toggle);

  // Cierra el menú al pulsar sobre cualquiera de los enlaces de navegación
  navLinks.forEach((link) => link.addEventListener("click", close));

  // Cierra el menú si se hace clic fuera del menú o del botón hamburguesa
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (isOpen && !mobileMenu.contains(target) && !hamburger.contains(target)) {
      close();
    }
  });

  // Cierra el menú al presionar la tecla 'Escape'
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// ── 3. CARRUSEL INTERACTIVO (Hero Slider) ─────────────────────────────────────
// Gestiona el carrusel de diapositivas, controles, swipe táctil y reproducción automática
function initCarousel() {
  const track = qs("#carouselTrack");
  const dotsWrap = qs("#carouselDots");
  const prevBtn = qs("#carouselPrev");
  const nextBtn = qs("#carouselNext");
  const slides = qsa(".carousel-slide");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoPlayTimer = 0;
  let startX = 0;
  let isDragging = false;
  const AUTOPLAY_MS = 5000; // Tiempo entre transiciones automáticas (5 segundos)
  const totalSlides = slides.length;

  // Limpiar indicadores (dots) previos en caso de existir
  if (dotsWrap) dotsWrap.innerHTML = "";

  // Generar dinámicamente los botones de paginación (dots) según el número de diapositivas
  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Ir a diapositiva ${i + 1} de ${totalSlides}`);
    dot.addEventListener("click", () => goTo(i));
    if (dotsWrap) dotsWrap.appendChild(dot);
    return dot;
  });

  // Actualiza la posición visual de las diapositivas y el indicador activo
  const updateUI = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
    track.setAttribute("aria-label", `Imagen ${currentIndex + 1} de ${totalSlides}`);
  };

  // Cambia a una diapositiva específica con índice circular
  const goTo = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    updateUI();
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  // Iniciar reproducción automática cíclica
  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimer = window.setInterval(next, AUTOPLAY_MS);
  };

  // Detener reproducción automática
  const stopAutoPlay = () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = 0;
    }
  };

  // Botón Diapositiva Anterior
  prevBtn == null ? void 0 : prevBtn.addEventListener("click", () => {
    prev();
    stopAutoPlay();
    startAutoPlay();
  });

  // Botón Diapositiva Siguiente
  nextBtn == null ? void 0 : nextBtn.addEventListener("click", () => {
    next();
    stopAutoPlay();
    startAutoPlay();
  });

  // Pausar el carrusel cuando el cursor del ratón está encima
  track.addEventListener("mouseenter", stopAutoPlay);
  track.addEventListener("mouseleave", startAutoPlay);

  // --- Soporte para gestos táctiles (Swipe en móviles / tablets) ---
  let startY = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
    stopAutoPlay();
  }, { passive: true });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const diffX = Math.abs(e.touches[0].clientX - startX);
    const diffY = Math.abs(e.touches[0].clientY - startY);
    // Si el desplazamiento es predominantemente horizontal, previene el scroll vertical
    if (diffX > diffY && diffX > 10) {
      e.preventDefault();
    }
  }, { passive: false });

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    // Umbral de 40px para considerar el gesto un deslizamiento válido
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    isDragging = false;
    startAutoPlay();
  }, { passive: true });

  // --- Navegación accesible con teclado (Flechas izquierda y derecha) ---
  document.addEventListener("keydown", (e) => {
    const rect = track.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inViewport) return;

    if (e.key === "ArrowLeft") {
      prev();
      stopAutoPlay();
      startAutoPlay();
    }
    if (e.key === "ArrowRight") {
      next();
      stopAutoPlay();
      startAutoPlay();
    }
  });

  // Inicializar estado visual y temporizador
  updateUI();
  startAutoPlay();
}

// ── 4. FORMULARIO DE CONTACTO & VALIDACIÓN ───────────────────────────────────
// Maneja la validación en tiempo real y el envío asíncrono con la API de Web3Forms
function initContactForm() {
  const form = qs("#contactForm");
  if (!form) return;

  // Reglas de validación para cada campo del formulario
  const fields = [
    {
      el: qs("#fieldName"),
      errorEl: qs("#errorName"),
      validate: (v) => {
        if (!v.trim()) return "El nombre es obligatorio.";
        if (v.trim().length < 2) return "Ingresa al menos 2 caracteres.";
        return null;
      }
    },
    {
      el: qs("#fieldEmail"),
      errorEl: qs("#errorEmail"),
      validate: (v) => {
        if (!v.trim()) return "El correo electrónico es obligatorio.";
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(v.trim())) return "Ingresa un correo electrónico válido.";
        return null;
      }
    },
    {
      el: qs("#fieldMessage"),
      errorEl: qs("#errorMessage"),
      validate: (v) => {
        if (!v.trim()) return "El mensaje o consulta es obligatorio.";
        if (v.trim().length < 10) return "Por favor escribe al menos 10 caracteres.";
        return null;
      }
    }
  ];

  // Valida un campo individual y actualiza las clases/mensajes de error en el DOM
  const validateField = (field) => {
    const error = field.validate(field.el.value);
    if (error) {
      field.el.classList.add("error");
      field.el.classList.remove("valid");
      field.errorEl.textContent = error;
      field.errorEl.classList.add("show");
      return false;
    } else {
      field.el.classList.remove("error");
      field.el.classList.add("valid");
      field.errorEl.classList.remove("show");
      return true;
    }
  };

  // Asignar listeners para validar al desenfocar (blur) o al escribir si ya tenía error
  fields.forEach((field) => {
    field.el.addEventListener("blur", () => validateField(field));
    field.el.addEventListener("input", () => {
      if (field.el.classList.contains("error")) validateField(field);
    });
  });

  const submitBtn = qs("#submitBtn");
  const btnText = qs("#btnText");
  const btnLoader = qs("#btnLoader");
  const accessKeyInput = qs("#web3formsKey");

  // Manejador del evento Submit del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validar todos los campos
    const allValid = fields.every(validateField);
    if (!allValid) {
      const firstError = fields.find((f) => f.el.classList.contains("error"));
      firstError == null ? void 0 : firstError.el.focus();
      return;
    }

    // UI: Cambiar botón a estado de carga
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.style.display = "none";
    if (btnLoader) btnLoader.style.display = "inline-flex";

    try {
      const formData = new FormData(form);
      const key = (accessKeyInput == null ? void 0 : accessKeyInput.value) || "";
      if (!key || key.includes("AQUI_TU_ACCESS_KEY")) {
        console.warn("Web3Forms: Recuerda colocar tu access_key real en el input hidden #web3formsKey.");
      }

      // Envío de datos vía AJAX/Fetch a Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success || response.ok) {
        showToast("¡Mensaje enviado con éxito! Te contactaremos pronto. ✨", false);
        form.reset();
        // Limpiar clases de validación tras el envío exitoso
        fields.forEach((f) => {
          f.el.classList.remove("valid", "error");
          f.errorEl.classList.remove("show");
        });
        const counter = qs("#charCounter");
        if (counter) counter.textContent = "0/500";
      } else {
        showToast(result.message || "Hubo un inconveniente al enviar. Intenta por WhatsApp.", true);
      }
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      showToast("Error de conexión. Puedes escribirnos directamente a WhatsApp.", true);
    } finally {
      // Restaurar estado original del botón
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.style.display = "inline";
      if (btnLoader) btnLoader.style.display = "none";
    }
  });
}

// ── 5. NOTIFICACIONES TOAST (Mensajes emergentes) ─────────────────────────────
// Muestra una notificación temporal flotante de éxito o advertencia/error
function showToast(message, isError = false) {
  const toast = qs("#toast");
  const toastMsg = qs("#toastMsg");
  const toastTitle = qs("#toastTitle");
  const toastIcon = qs("#toastIcon");

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;

  if (isError) {
    toast.classList.add("toast-error");
    if (toastTitle) toastTitle.textContent = "Aviso";
    if (toastIcon) toastIcon.textContent = "⚠️";
  } else {
    toast.classList.remove("toast-error");
    if (toastTitle) toastTitle.textContent = "¡Éxito!";
    if (toastIcon) toastIcon.textContent = "✅";
  }

  toast.classList.add("show");
  // Oculta automáticamente el toast tras 5 segundos
  setTimeout(() => toast.classList.remove("show"), 5000);
}

// ── 6. ANIMACIONES AL HACER SCROLL (Intersection Observer) ────────────────────
// Revela elementos gradualmente con transiciones CSS cuando entran en la vista
function initRevealOnScroll() {
  const elements = qsa(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Dejar de observar una vez que ya es visible
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

  elements.forEach((el) => observer.observe(el));
}

// ── 7. SCROLL SUAVE (Smooth Scroll para enlaces internos) ─────────────────────
// Controla el desplazamiento suave hacia secciones con anclas (#) compensando el navbar
function initSmoothScroll() {
  const links = qsa('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = 75; // Altura aproximada de la barra fija superior
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

// ── 8. CONTADOR DE CARACTERES (Textarea de mensaje) ───────────────────────────
// Actualiza el contador dinámico "X/500" y cambia de color al acercarse al límite
function initCharCounter() {
  const textarea = qs("#fieldMessage");
  const counter = qs("#charCounter");
  if (!textarea || !counter) return;

  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    counter.textContent = `${len}/500`;
    counter.style.color = len > 450 ? "#EF4444" : "#9CA3AF";
  });
}

// ── INICIALIZACIÓN GLOBAL ─────────────────────────────────────────────────────
// Ejecuta todas las funciones interactivas cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initCarousel();
  initContactForm();
  initRevealOnScroll();
  initSmoothScroll();
  initCharCounter();
});
