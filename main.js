/**
 * NEXO PLAY - Script global
 * Carga modular de footer.html en los contenedores correspondientes.
 */

(function () {
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFooter);
  } else {
    initFooter();
  }
})();
