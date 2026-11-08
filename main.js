/**
 * NEXO PLAY - Script global
 * Carga modular de header.html y footer.html en los contenedores correspondientes.
 */

(function () {
  const HEADER_FALLBACK_HTML = `
<header>
  <div>
    <a href="index.html">
      <h2>NEXO PLAY</h2>
    </a>

    <form role="search">
      <label for="site-search">&#128269;</label>
      <input type="search" id="site-search" name="q" placeholder="Busca tu próxima aventura">
      <kbd>&#8984; K</kbd>
    </form>

    <nav aria-label="Acciones de usuario">
      <a href="account.html">
        <span>&#128100;</span> Mi cuenta
      </a>
      <a href="cart.html" aria-label="Ver carrito">
        <span>&#128092;</span> <span>3</span>
      </a>
    </nav>
  </div>

  <hr>

  <div>
    <nav aria-label="Navegación principal">
      <a href="index.html">Inicio</a>
      <a href="index.html#catalog">Catálogo</a>
      <a href="index.html#novedades">Novedades</a>
      <a href="index.html#ofertas">Ofertas</a>
    </nav>

    <p>Juegos independientes. Mundos extraordinarios.</p>
  </div>

  <hr>
</header>
`;

  const FOOTER_FALLBACK_HTML = `
<section>
  <h2>Menos ruido. Más juego.</h2>
  <p>Sin catálogos infinitos: seis juegos con identidad, elegidos para que encuentres algo que de verdad te mueva.</p>
</section>

<hr>

<footer>
  <h2>NEXO PLAY</h2>
  <p>Juegos independientes. Mundos extraordinarios.</p>
  <nav aria-label="Redes sociales">
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram &#8599;</a>
    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord &#8599;</a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube &#8599;</a>
  </nav>

  <h3>Explora</h3>
  <nav aria-label="Explora">
    <a href="index.html#catalog">Catálogo</a> ·
    <a href="index.html#novedades">Novedades</a>
    <br>
    <a href="index.html#sobre">Sobre NEXO</a> ·
    <a href="index.html#faq">Preguntas frecuentes</a>
  </nav>

  <h3>Estamos al otro lado</h3>
  <p><a href="mailto:hola@nexoplay.es">hola@nexoplay.es</a></p>
  <p>Lun-vie 9:00-18:00 CET</p>
  <p>Respuesta en menos de 24 h</p>

  <hr>

  <p>&copy; 2026 NEXO PLAY · Catálogo conceptual</p>
  <nav aria-label="Enlaces legales">
    <a href="terms.html">Privacidad</a> ·
    <a href="terms.html">Términos</a> ·
    <a href="terms.html">Cookies</a> ·
    <a href="terms.html">Accesibilidad</a>
  </nav>
</footer>
`;

  function initHeader() {
    const container =
      document.getElementById("header-container") ||
      document.getElementById("header-placeholder") ||
      document.querySelector("[data-include-header]");

    if (!container) return;

    fetch("header.html")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.text();
      })
      .then((html) => {
        container.innerHTML = html;
      })
      .catch((err) => {
        console.warn("Cargando header local:", err.message);
        container.innerHTML = HEADER_FALLBACK_HTML;
      });
  }

  function initFooter() {
    const container =
      document.getElementById("footer-container") ||
      document.getElementById("footer-placeholder") ||
      document.querySelector("[data-include-footer]");

    if (!container) return;

    fetch("footer.html")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.text();
      })
      .then((html) => {
        container.innerHTML = html;
      })
      .catch((err) => {
        console.warn("Cargando footer local:", err.message);
        container.innerHTML = FOOTER_FALLBACK_HTML;
      });
  }

  function init() {
    initHeader();
    initFooter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
