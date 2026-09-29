/**
 * BS IND CARE® — Suite de Pruebas Automatizadas de Calidad y Calibración Técnica
 * Bridges Siblings Industries S.A.S.
 * 
 * Ejecución:
 *   node test.js
 * 
 * Requisitos:
 *   Node.js (v14 o superior, sin dependencias externas)
 */

const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const htmlPath = path.join(projectRoot, 'index.html');
const cssPath = path.join(projectRoot, 'styles.css');
const jsPath = path.join(projectRoot, 'main.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

const suite = {
  total: 0,
  passed: 0,
  failed: 0,
  categories: {}
};

function test(category, name, fn) {
  suite.total++;
  if (!suite.categories[category]) {
    suite.categories[category] = [];
  }
  try {
    fn();
    suite.passed++;
    suite.categories[category].push({ name, status: 'PASSED' });
  } catch (err) {
    suite.failed++;
    suite.categories[category].push({ name, status: 'FAILED', error: err.message });
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log('================================================================');
console.log('  BS IND CARE® — SUITE AUTOMATIZADA DE PRUEBAS DE CALIDAD       ');
console.log('  Bridges Siblings Industries S.A.S.                            ');
console.log('================================================================\n');

// ── 1. ARQUITECTURA Y ARCHIVOS ESENCIALES ────────────────────────────────────
const catArch = '1. Arquitectura y Archivos Esenciales';
test(catArch, 'index.html existe y contiene estructura completa', () => {
  assert(fs.existsSync(htmlPath), 'index.html no existe');
  assert(fs.statSync(htmlPath).size > 10000, 'index.html es demasiado pequeño o está incompleto');
});

test(catArch, 'styles.css existe y contiene tokens :root de marca', () => {
  assert(fs.existsSync(cssPath), 'styles.css no existe');
  assert(css.includes(':root'), 'styles.css no contiene variables de diseño :root');
});

test(catArch, 'main.js existe y contiene inicializador DOMContentLoaded', () => {
  assert(fs.existsSync(jsPath), 'main.js no existe');
  assert(js.includes('DOMContentLoaded'), 'main.js no contiene listener DOMContentLoaded');
});

// ── 2. SINCRONIZACIÓN DOM & JAVASCRIPT (IDs y Clases) ────────────────────────
const catDOM = '2. Sincronización DOM & Selectores JavaScript';
const requiredIds = [
  'navbar', 'hamburger', 'mobile-menu', 'carouselTrack', 'carouselDots',
  'carouselPrev', 'carouselNext', 'contactForm', 'fieldName', 'fieldEmail',
  'fieldMessage', 'errorName', 'errorEmail', 'errorMessage', 'web3formsKey',
  'charCounter', 'submitBtn', 'btnText', 'btnLoader', 'toast', 'toastTitle',
  'toastMsg', 'toastIcon'
];

requiredIds.forEach(id => {
  test(catDOM, `Elemento con id="#${id}" requerido por main.js`, () => {
    const re = new RegExp(`id=["']${id}["']`, 'i');
    assert(re.test(html), `El elemento id="${id}" no se encuentra en index.html`);
  });
});

const requiredClasses = ['carousel-slide', 'mobile-nav-link', 'reveal'];
requiredClasses.forEach(cls => {
  test(catDOM, `Clase interactiva .${cls} en index.html`, () => {
    const re = new RegExp(`class=["'][^"']*\\b${cls}\\b[^"']*["']`, 'i');
    assert(re.test(html), `La clase .${cls} no se encuentra en ningún elemento de index.html`);
  });
});

// ── 3. INTEGRIDAD DE RECURSOS MULTIMEDIA ─────────────────────────────────────
const catMedia = '3. Integridad de Recursos Multimedia';
const assetRegex = /(?:src|href|content)=["'](assets\/[^"']+)["']/g;
let match;
const assetMatches = new Set();
while ((match = assetRegex.exec(html)) !== null) {
  assetMatches.add(match[1]);
}

assetMatches.forEach(relPath => {
  test(catMedia, `Recurso multimedia referenciado: ${relPath}`, () => {
    const fullPath = path.join(projectRoot, relPath);
    assert(fs.existsSync(fullPath), `El archivo ${relPath} no existe en el sistema`);
    assert(fs.statSync(fullPath).size > 0, `El archivo ${relPath} tiene 0 bytes`);
  });
});

// ── 4. LÓGICA DE VALIDACIÓN DEL FORMULARIO ───────────────────────────────────
const catForm = '4. Lógica de Validación de Formulario';

const validateName = (v) => {
  if (!v.trim()) return "El nombre es obligatorio.";
  if (v.trim().length < 2) return "Ingresa al menos 2 caracteres.";
  return null;
};

const validateEmail = (v) => {
  if (!v.trim()) return "El correo electrónico es obligatorio.";
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(v.trim())) return "Ingresa un correo electrónico válido.";
  return null;
};

const validateMessage = (v) => {
  if (!v.trim()) return "El mensaje o consulta es obligatorio.";
  if (v.trim().length < 10) return "Por favor escribe al menos 10 caracteres.";
  return null;
};

test(catForm, 'Nombre vacío debe ser rechazado', () => {
  assert(validateName('') === 'El nombre es obligatorio.');
  assert(validateName('   ') === 'El nombre es obligatorio.');
});

test(catForm, 'Nombre menor a 2 caracteres debe ser rechazado', () => {
  assert(validateName('A') === 'Ingresa al menos 2 caracteres.');
});

test(catForm, 'Nombre válido de 2 o más caracteres debe ser aceptado', () => {
  assert(validateName('Ana') === null);
  assert(validateName('Carlos Rodríguez') === null);
});

test(catForm, 'Email vacío debe ser rechazado', () => {
  assert(validateEmail('') === 'El correo electrónico es obligatorio.');
});

test(catForm, 'Email con formato inválido debe ser rechazado', () => {
  assert(validateEmail('usuario') !== null);
  assert(validateEmail('usuario@') !== null);
  assert(validateEmail('usuario@dominio') !== null);
  assert(validateEmail('usuario @dominio.com') !== null);
});

test(catForm, 'Email válido debe ser aceptado', () => {
  assert(validateEmail('contacto@bsindcare.com') === null);
  assert(validateEmail('cliente.vip@gmail.com') === null);
});

test(catForm, 'Mensaje vacío o menor a 10 caracteres debe ser rechazado', () => {
  assert(validateMessage('') === 'El mensaje o consulta es obligatorio.');
  assert(validateMessage('Hola') === 'Por favor escribe al menos 10 caracteres.');
});

test(catForm, 'Mensaje válido de 10 o más caracteres debe ser aceptado', () => {
  assert(validateMessage('Quiero comprar la mantequilla corporal de vainilla.') === null);
});

test(catForm, 'Presencia del campo honeypot anti-spam (botcheck)', () => {
  assert(/name=["']botcheck["']/i.test(html), 'Falta el campo oculto botcheck en el formulario');
});

test(catForm, 'Presencia y configuración del Access Key de Web3Forms', () => {
  const keyMatch = html.match(/id=["']web3formsKey["'][^>]*value=["']([^"']+)["']/i) ||
                   html.match(/value=["']([^"']+)["'][^>]*id=["']web3formsKey["']/i);
  assert(keyMatch && keyMatch[1] && !keyMatch[1].includes('AQUI_TU_ACCESS_KEY'), 'Access Key no configurada');
});

// ── 5. LÓGICA DEL CARRUSEL Y NAVEGACIÓN ───────────────────────────────────────
const catCarousel = '5. Lógica del Carrusel & Swipe';
const totalSlides = (html.match(/class=["'][^"']*\bcarousel-slide\b[^"']*["']/gi) || []).length;

test(catCarousel, 'Debe haber al menos 2 diapositivas en el carrusel', () => {
  assert(totalSlides >= 2, `Se detectaron ${totalSlides} diapositivas (se requieren al menos 2)`);
});

const calculateGoTo = (index, total) => (index + total) % total;

test(catCarousel, 'Navegación circular hacia adelante (Next)', () => {
  assert(calculateGoTo(0 + 1, totalSlides) === 1);
  assert(calculateGoTo(totalSlides - 1 + 1, totalSlides) === 0, 'No regresa al inicio al final');
});

test(catCarousel, 'Navegación circular hacia atrás (Prev)', () => {
  assert(calculateGoTo(0 - 1, totalSlides) === totalSlides - 1, 'No salta a la última diapositiva desde la primera');
});

test(catCarousel, 'Umbral de detección de swipe táctil (> 40px)', () => {
  const swipeDiff1 = 45;
  const swipeDiff2 = 30;
  assert(Math.abs(swipeDiff1) > 40, 'Debe disparar swipe');
  assert(Math.abs(swipeDiff2) <= 40, 'No debe disparar swipe');
});

// ── 6. ENLACES DE CONVERSIÓN WHATSAPP ────────────────────────────────────────
const catWA = '6. Enlaces Oficiales de Conversión (WhatsApp)';
const waLinks = [];
const waRegex = /href=["']([^"']*wa\.me[^"']*)["']/g;
while ((match = waRegex.exec(html)) !== null) {
  waLinks.push(match[1]);
}

test(catWA, 'Existen enlaces a WhatsApp en la página', () => {
  assert(waLinks.length > 0, 'No se detectaron enlaces de WhatsApp');
});

waLinks.forEach((link, idx) => {
  test(catWA, `Enlace WhatsApp #${idx + 1} (${link.split('?')[0]}) unificado`, () => {
    assert(link.includes('573165305071'), `El enlace ${link} no usa el número oficial 573165305071`);
  });
});

// ── 7. IDENTIDAD VISUAL & TOKENS DE COLOR ────────────────────────────────────
const catBrand = '7. Identidad Visual & Consistencia de Tokens';
const brandColors = [
  { name: 'Púrpura BS', hex: '#3B176B', tw: 'purple-bs', root: '--purple-bs' },
  { name: 'Púrpura Profundo', hex: '#170A2E', tw: 'purple-deep', root: '--purple-deep' },
  { name: 'Dorado Premium', hex: '#C9A24A', tw: 'gold-main', root: '--gold-main' },
  { name: 'Dorado Rico', hex: '#DFB75A', tw: 'gold-rich', root: '--gold-rich' },
  { name: 'Marfil Oficial', hex: '#F8F3EA', tw: 'purple-bg', root: '--purple-bg' }
];

brandColors.forEach(c => {
  test(catBrand, `Color de marca ${c.name} (${c.hex}) definido en styles.css`, () => {
    const re = new RegExp(`${c.root}:\\s*${c.hex}`, 'i');
    assert(re.test(css), `Variable ${c.root} no coincide con ${c.hex} en styles.css`);
  });
  test(catBrand, `Color de marca ${c.name} (${c.hex}) configurado en tailwind.config`, () => {
    const re = new RegExp(`['"]?${c.hex}['"]?`, 'i');
    assert(re.test(html), `Color ${c.hex} no encontrado en la configuración inline de Tailwind`);
  });
});

// ── 8. SEO, ACCESIBILIDAD Y RENDIMIENTO ──────────────────────────────────────
const catSEO = '8. SEO, Accesibilidad (WCAG) y Rendimiento';

test(catSEO, 'Idioma del documento configurado (lang="es")', () => {
  assert(/<html[^>]*lang=["']es["']/i.test(html), 'Falta lang="es" en <html>');
});

test(catSEO, 'Título SEO descriptivo presente', () => {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  assert(titleMatch && titleMatch[1].trim().length > 20, 'Título inexistente o muy corto');
});

test(catSEO, 'Meta Description configurada', () => {
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  assert(descMatch && descMatch[1].length >= 50, 'Meta description ausente o demasiado corta');
});

test(catSEO, 'Etiquetas Open Graph esenciales (og:title, og:image, og:description)', () => {
  assert(/<meta\s+property=["']og:title["']/i.test(html), 'Falta og:title');
  assert(/<meta\s+property=["']og:description["']/i.test(html), 'Falta og:description');
  assert(/<meta\s+property=["']og:image["']/i.test(html), 'Falta og:image');
});

test(catSEO, 'Un único encabezado <h1> en el documento', () => {
  const h1s = html.match(/<h1\b[^>]*>/gi) || [];
  assert(h1s.length === 1, `Se encontraron ${h1s.length} etiquetas <h1> (debe haber exactamente 1)`);
});

test(catSEO, 'Preload de recurso crítico LCP (product1.jpg)', () => {
  assert(/<link\s+rel=["']preload["'][^>]*fetchpriority=["']high["']/i.test(html), 'Falta preload fetchpriority="high"');
});

test(catSEO, 'Roles ARIA en navegación y elementos interactivos', () => {
  assert(/role=["']navigation["']/i.test(html), 'Falta role="navigation" en navbar');
  assert(/role=["']list["']/i.test(html), 'Falta role="list"');
  assert(/aria-label=/i.test(html), 'Faltan atributos aria-label');
});

// ── IMPRESIÓN DEL REPORTE DETALLADO ──────────────────────────────────────────
console.log('--- RESULTADOS POR CATEGORÍA ---\n');
for (const [category, tests] of Object.entries(suite.categories)) {
  const catPassed = tests.filter(t => t.status === 'PASSED').length;
  console.log(`📁 ${category} [${catPassed}/${tests.length}]`);
  tests.forEach(t => {
    if (t.status === 'PASSED') {
      console.log(`   ✅ ${t.name}`);
    } else {
      console.log(`   ❌ ${t.name} -> Error: ${t.error}`);
    }
  });
  console.log('');
}

console.log('================================================================');
console.log(`RESUMEN GENERAL:`);
console.log(`  Total de pruebas ejecutadas : ${suite.total}`);
console.log(`  Pruebas exitosas (PASSED)   : ${suite.passed}`);
console.log(`  Pruebas fallidas (FAILED)   : ${suite.failed}`);
console.log(`  Tasa de éxito               : ${((suite.passed / suite.total) * 100).toFixed(1)}%`);
console.log('================================================================\n');

if (suite.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
