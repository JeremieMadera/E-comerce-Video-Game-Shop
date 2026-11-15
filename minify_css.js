const fs = require('fs');
const path = require('path');

function minifyCSS(css) {
  // 0. Eliminar @import de Google Fonts para evitar cadenas de peticiones críticas (critical request chaining)
  css = css.replace(/@import\s+url\([^)]*fonts\.googleapis\.com[^)]*\);?\s*/gi, '');

  // 1. Proteger cadenas de texto (comillas dobles y simples)
  const strings = [];
  css = css.replace(/("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g, (m) => {
    strings.push(m);
    return `___STR_${strings.length - 1}___`;
  });

  // 2. Proteger expresiones calc() para no romper espacios requeridos en + y -
  const calcs = [];
  css = css.replace(/calc\([^)]+\)/g, (m) => {
    calcs.push(m);
    return `___CALC_${calcs.length - 1}___`;
  });

  // 3. Eliminar comentarios
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // 4. Normalizar espacios en blanco
  css = css.replace(/\s+/g, ' ');

  // 5. Eliminar espacios alrededor de delimitadores clave
  css = css.replace(/\s*([\{\};,>])\s*/g, '$1');
  css = css.replace(/:\s+/g, ':');
  css = css.replace(/\s+:/g, ':');

  // 6. Eliminar punto y coma innecesario antes de cerrar llave
  css = css.replace(/;}/g, '}');

  // 7. Restaurar expresiones calc() y cadenas de texto
  css = css.replace(/___CALC_(\d+)___/g, (_, i) => calcs[Number(i)]);
  css = css.replace(/___STR_(\d+)___/g, (_, i) => strings[Number(i)]);

  return css.trim();
}

const FILES_TO_MINIFY = [
  'main.css',
  'Features/NavBar/nav-bar.css',
  'Features/HomePage/home-page.css',
  'Features/LootBox/lootbox.css',
  'Features/Catalog/catalog.css',
  'Features/Footer/footer.css',
  'Features/cart/cart.css',
  'Features/Product/product.css',
  'Features/Account/account.css',
  'Features/Terms/terms.css'
];

let totalOriginal = 0;
let totalMinified = 0;

for (const relPath of FILES_TO_MINIFY) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) continue;

  const src = fs.readFileSync(fullPath, 'utf8');
  const min = minifyCSS(src);

  totalOriginal += src.length;
  totalMinified += min.length;

  const minPath = fullPath.replace(/\.css$/, '.min.css');
  fs.writeFileSync(minPath, min, 'utf8');

  const savings = src.length - min.length;
  const pct = ((savings / src.length) * 100).toFixed(1);
  console.log(`${relPath} -> ${path.basename(minPath)}: ${src.length} B -> ${min.length} B (-${savings} B, -${pct}%)`);
}

const totalSavings = totalOriginal - totalMinified;
const totalPct = ((totalSavings / totalOriginal) * 100).toFixed(1);
console.log(`\nTOTAL: ${totalOriginal} B -> ${totalMinified} B (Ahorro: -${totalSavings} B, -${totalPct}%)`);

// Generar bundles combinados para optimización máxima de Lighthouse (eliminar cadenas de peticiones y render-blocking)
const criticalFiles = [
  'main.min.css',
  'Features/NavBar/nav-bar.min.css',
  'Features/HomePage/home-page.min.css'
];
const criticalCSS = criticalFiles
  .filter(f => fs.existsSync(path.resolve(f)))
  .map(f => fs.readFileSync(path.resolve(f), 'utf8'))
  .join('\n');
fs.writeFileSync(path.resolve('critical.min.css'), criticalCSS, 'utf8');
console.log(`\nGenerado critical.min.css (${criticalCSS.length} B)`);

const deferredFiles = [
  'Features/LootBox/lootbox.min.css',
  'Features/Catalog/catalog.min.css',
  'Features/Footer/footer.min.css'
];
const deferredCSS = deferredFiles
  .filter(f => fs.existsSync(path.resolve(f)))
  .map(f => fs.readFileSync(path.resolve(f), 'utf8'))
  .join('\n');
fs.writeFileSync(path.resolve('Features/deferred.min.css'), deferredCSS, 'utf8');
console.log(`Generado Features/deferred.min.css (${deferredCSS.length} B)`);

const bundleCSS = criticalCSS + '\n' + deferredCSS;
fs.writeFileSync(path.resolve('bundle.min.css'), bundleCSS, 'utf8');
console.log(`Generado bundle.min.css (${bundleCSS.length} B)`);
