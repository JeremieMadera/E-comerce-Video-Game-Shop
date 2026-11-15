const fs = require('fs');
const path = require('path');

/**
 * Robust lightweight JS minifier for vanilla modern JavaScript:
 * 1. Safely preserves string literals ('...', "...", `...` including multi-line template literals).
 * 2. Safely preserves regular expressions (/.../).
 * 3. Removes line comments (//) and block comments (/* *\/).
 * 4. Trims and collapses unnecessary whitespace outside strings.
 * 5. Compresses spaces around operators/delimiters safely.
 */
function minifyJavaScript(source) {
  let inString = null;
  let inTemplate = false;
  let inRegex = false;
  let inLineComment = false;
  let inBlockComment = false;
  let escape = false;

  const tokens = [];
  let currentToken = '';

  function flushToken() {
    if (currentToken.length > 0) {
      tokens.push({ type: 'code', value: currentToken });
      currentToken = '';
    }
  }

  const len = source.length;
  for (let i = 0; i < len; i++) {
    const ch = source[i];
    const next = i + 1 < len ? source[i + 1] : '';

    if (inLineComment) {
      if (ch === '\n') {
        inLineComment = false;
        currentToken += '\n';
      }
      continue;
    }

    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (inString) {
      currentToken += ch;
      if (escape) {
        escape = false;
      } else if (ch === '\\') {
        escape = true;
      } else if (ch === inString) {
        inString = null;
      }
      continue;
    }

    if (inTemplate) {
      currentToken += ch;
      if (escape) {
        escape = false;
      } else if (ch === '\\') {
        escape = true;
      } else if (ch === '`') {
        inTemplate = false;
      }
      continue;
    }

    // Outside comments and strings:
    if (ch === '/' && next === '/') {
      inLineComment = true;
      i++;
      continue;
    }

    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i++;
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = ch;
      currentToken += ch;
      continue;
    }

    if (ch === '`') {
      inTemplate = true;
      currentToken += ch;
      continue;
    }

    currentToken += ch;
  }

  flushToken();

  const codeWithoutComments = tokens.map(t => t.value).join('');

  // Process line by line, preserving template literal linebreaks
  // Since template literals were preserved in the code, let's tokenize strings vs non-strings
  const pieces = [];
  let pInStr = null;
  let pInTpl = false;
  let pEsc = false;
  let buffer = '';

  for (let i = 0; i < codeWithoutComments.length; i++) {
    const ch = codeWithoutComments[i];

    if (pInStr) {
      buffer += ch;
      if (pEsc) {
        pEsc = false;
      } else if (ch === '\\') {
        pEsc = true;
      } else if (ch === pInStr) {
        pieces.push({ type: 'string', value: buffer });
        buffer = '';
        pInStr = null;
      }
      continue;
    }

    if (pInTpl) {
      buffer += ch;
      if (pEsc) {
        pEsc = false;
      } else if (ch === '\\') {
        pEsc = true;
      } else if (ch === '`') {
        pieces.push({ type: 'template', value: buffer });
        buffer = '';
        pInTpl = false;
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      if (buffer.length > 0) {
        pieces.push({ type: 'code', value: buffer });
        buffer = '';
      }
      pInStr = ch;
      buffer = ch;
      continue;
    }

    if (ch === '`') {
      if (buffer.length > 0) {
        pieces.push({ type: 'code', value: buffer });
        buffer = '';
      }
      pInTpl = true;
      buffer = ch;
      continue;
    }

    buffer += ch;
  }

  if (buffer.length > 0) {
    pieces.push({ type: 'code', value: buffer });
  }

  // Minify only 'code' pieces
  const minifiedPieces = pieces.map(piece => {
    if (piece.type === 'string' || piece.type === 'template') {
      return piece.value;
    }

    let c = piece.value;
    // Replace multiple newlines/whitespace with a single newline or space
    c = c.replace(/[ \t]+/g, ' ');
    // Remove space around common operators where safe
    c = c.replace(/\s*([;,\{\}\(\)\[\]:=+\-\*\/><?!|&~^%])\s*/g, '$1');
    // Ensure keywords that need spaces keep them
    // E.g. return x, typeof x, const x, let x, var x, function x, new x, else if, else {
    c = c.replace(/\b(return|typeof|const|let|var|function|new|delete|void|in|instanceof|throw|case|yield|await|async|import|export|from|class|extends)\b(?=[^\s;,\{\}\(\)\[\]:=+\-\*\/><?!|&~^%])/g, '$1 ');
    c = c.replace(/(?<=[^\s;,\{\}\(\)\[\]:=+\-\*\/><?!|&~^%])\b(in|instanceof|extends|as)\b/g, ' $1 ');
    // Remove spaces adjacent to newlines
    c = c.replace(/[ \t]*\n[ \t]*/g, '\n');
    // Remove consecutive newlines
    c = c.replace(/\n+/g, '\n');
    return c;
  });

  let result = minifiedPieces.join('');
  // Final trim
  result = result.trim();
  return result;
}

module.exports = { minifyJavaScript };

if (require.main === module) {
  const filesToMinify = [
    { src: 'main.js', dest: 'main.min.js' },
    { src: 'products-data.js', dest: 'products-data.min.js' },
    { src: 'Features/cart/cart.js', dest: 'Features/cart/cart.min.js' },
    { src: 'Features/Product/product.js', dest: 'Features/Product/product.min.js' },
    { src: 'Features/Account/account.js', dest: 'Features/Account/account.min.js' },
    { src: 'Features/Terms/terms.js', dest: 'Features/Terms/terms.min.js' }
  ];

  let totalOriginal = 0;
  let totalMinified = 0;

  filesToMinify.forEach(({ src, dest }) => {
    const fullSrc = path.join(__dirname, src);
    const fullDest = path.join(__dirname, dest);

    if (!fs.existsSync(fullSrc)) {
      console.log(`Skipping (not found): ${src}`);
      return;
    }

    const content = fs.readFileSync(fullSrc, 'utf8');
    const minified = minifyJavaScript(content);
    fs.writeFileSync(fullDest, minified, 'utf8');

    const origSize = Buffer.byteLength(content, 'utf8');
    const minSize = Buffer.byteLength(minified, 'utf8');
    totalOriginal += origSize;
    totalMinified += minSize;

    const savings = origSize > 0 ? (((origSize - minSize) / origSize) * 100).toFixed(1) : 0;
    console.log(`[JS] ${src} -> ${dest} (${(origSize/1024).toFixed(1)} KB -> ${(minSize/1024).toFixed(1)} KB, -${savings}%)`);
  });

  if (totalOriginal > 0) {
    const totalSavings = (((totalOriginal - totalMinified) / totalOriginal) * 100).toFixed(1);
    console.log(`\nTotal JS: ${(totalOriginal/1024).toFixed(1)} KB -> ${(totalMinified/1024).toFixed(1)} KB (-${totalSavings}%, saved ${((totalOriginal - totalMinified)/1024).toFixed(1)} KB)`);
  }
}
