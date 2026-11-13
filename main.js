/**
 * NEXO PLAY - Script global
 * 1. Carga modular de header.html y footer.html.
 * 2. Renderizado dinámico del catálogo en memoria (index.html).
 * 3. Renderizado dinámico del detalle de producto (product.html).
 * 4. Gestión del carrito en memoria (cart.html).
 */

(function () {
  // =========================================================
  // 1. CARGA MODULAR DE HEADER Y FOOTER
  // =========================================================
  const HEADER_FALLBACK_HTML = `
<header class="navbar">
  <div class="navbar-wrapper">
    <div class="navbar-top">
      <a href="index.html" class="brand-logo">NEXO PLAY</a>

      <div class="navbar-right">
        <div class="search-box">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Busca tu próxima aventura">
          <span class="cmd-badge">&#8984; K</span>
        </div>

        <div class="user-menu">
          <a href="account.html" class="account-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Mi cuenta</span>
          </a>

          <a href="cart.html" class="cart-btn" aria-label="Ver carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span class="cart-count" id="header-cart-badge">3</span>
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-bottom">
      <nav class="nav-links" aria-label="Navegación principal">
        <a href="index.html">Inicio</a>
        <a href="index.html#catalog" class="active">Catálogo</a>
        <a href="index.html#novedades">Novedades</a>
        <a href="index.html#ofertas">Ofertas</a>
      </nav>
      <p class="navbar-tagline">Juegos independientes. Mundos extraordinarios.</p>
    </div>
  </div>
</header>
`;

  const FOOTER_FALLBACK_HTML = `
<section>
  <h2>Menos ruido. Más juego.</h2>
  <p>Los mejores videojuegos seleccionados para PC, PlayStation, Xbox y Nintendo Switch.</p>
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

  function ensureNavBarStyles() {
    if (!document.querySelector('link[href*="nav-bar.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "Features/NavBar/nav-bar.css";
      document.head.appendChild(link);
    }
  }

  function updateHeaderCartCount() {
    const badges = document.querySelectorAll(".cart-count, #header-cart-badge, .account-cart-badge, .car-acount");
    if (badges.length && typeof getCartFromStorage === "function") {
      const cart = getCartFromStorage();
      let count = 0;
      cart.forEach((item) => {
        count += 1;
        if (item.hasDlc) count += 1;
      });
      badges.forEach((b) => (b.textContent = count));
    }
  }

  function syncNavbarHeight() {
    const nav = document.querySelector(".navbar") || document.getElementById("header-container");
    if (nav && nav.offsetHeight > 0) {
      document.documentElement.style.setProperty("--navbar-height", `${nav.offsetHeight}px`);
    }
  }

  function initHeader() {
    ensureNavBarStyles();

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
        updateHeaderCartCount();
        syncNavbarHeight();
      })
      .catch(() => {
        container.innerHTML = HEADER_FALLBACK_HTML;
        updateHeaderCartCount();
        syncNavbarHeight();
      });

    window.addEventListener("resize", syncNavbarHeight);
  }

  function ensureFooterStyles() {
    if (!document.querySelector('link[href*="footer.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "Features/Footer/footer.css";
      document.head.appendChild(link);
    }
  }

  function initFooter() {
    ensureFooterStyles();

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
      .catch(() => {
        container.innerHTML = FOOTER_FALLBACK_HTML;
      });
  }

  // =========================================================
  // 2. CARRUSEL DINÁMICO DE FONDOS CON ANIME.JS (HOMEPAGE)
  // =========================================================
  const CAROUSEL_GAMES = [
    {
      id: "hollow-knight",
      image: "Assets/hero/hollow-knight.jpg",
      shortTitle: "Hollow Knight",
      shortDesc: "Explora las ruinas de Hallownest, un reino subterráneo de insectos y héroes.",
      featName: "HOLLOW KNIGHT",
      featTagline: "Edición Corazón del Vacío",
      featPrice: "14,99 €"
    },
    {
      id: "cyberpunk-2077",
      image: "Assets/hero/cyberpunk-2077.jpg",
      shortTitle: "Cyberpunk 2077",
      shortDesc: "Conviértete en leyenda en las peligrosas calles futuristas de Night City.",
      featName: "CYBERPUNK 2077",
      featTagline: "Edición Ultimate",
      featPrice: "39,99 €"
    },
    {
      id: "gta-6",
      image: "Assets/hero/gta-6.jpg",
      shortTitle: "GTA VI",
      shortDesc: "Regresa a Vice City y el estado de Leonida en la experiencia de mundo abierto más esperada.",
      featName: "GRAND THEFT AUTO VI",
      featTagline: "Edición Reserva Especial",
      featPrice: "79,99 €"
    },
    {
      id: "astro-bot",
      image: "Assets/hero/astro-bot.jpg",
      shortTitle: "Astro Bot",
      shortDesc: "Diversión pura a través de más de 50 mundos mágicos en una aventura galáctica.",
      featName: "ASTRO BOT",
      featTagline: "Aventura galáctica",
      featPrice: "59,99 €"
    },
    {
      id: "god-of-war-ragnarok",
      image: "Assets/hero/god-of-war-ragnarok.jpg",
      shortTitle: "God of War",
      shortDesc: "Kratos y Atreus deben desafiar el destino nórdico ante la llegada del Ragnarök.",
      featName: "GOD OF WAR RAGNARÖK",
      featTagline: "Valhalla Edition",
      featPrice: "59,99 €"
    },
    {
      id: "mario-kart-8-deluxe",
      image: "Assets/hero/mario-kart-world.jpg",
      shortTitle: "Mario Kart 8",
      shortDesc: "Compite a toda velocidad desafiando la gravedad en 48 circuitos vertiginosos.",
      featName: "MARIO KART 8 DELUXE",
      featTagline: "Pase de pistas extras",
      featPrice: "49,99 €"
    }
  ];

  function initHeroCarousel() {
    const carouselEl = document.getElementById("hero-carousel");
    if (!carouselEl) return;

    const bg1 = document.getElementById("carousel-bg-1");
    const bg2 = document.getElementById("carousel-bg-2");
    const gameDescEl = document.getElementById("hero-game-desc");
    const featName = document.getElementById("carousel-feat-name");
    const featTagline = document.getElementById("carousel-feat-tagline");
    const featPrice = document.getElementById("carousel-feat-price");
    const featuredLink = document.getElementById("hero-featured-link");
    const prevBtn = document.getElementById("carousel-prev-btn");
    const nextBtn = document.getElementById("carousel-next-btn");
    const featuredCard = document.getElementById("carousel-featured-card");

    let currentIndex = 0;
    let activeLayerIndex = 1; // 1 = bg1 visible, 2 = bg2 visible
    let isAnimating = false;
    let timer = null;
    let safetyTimeout = null;

    // Inicializar capas de fondo de forma explícita
    if (bg1) {
      bg1.style.backgroundImage = `url("${CAROUSEL_GAMES[0].image}")`;
      bg1.style.opacity = "1";
      bg1.style.zIndex = "1";
    }
    if (bg2) {
      bg2.style.opacity = "0";
      bg2.style.zIndex = "0";
    }

    // Animación de entrada inicial: Efecto suave en los textos del Hero
    if (typeof anime !== "undefined") {
      anime({
        targets: "#hero-static-content > *",
        opacity: [0, 1],
        translateY: [16, 0],
        delay: anime.stagger(60),
        duration: 500,
        easing: "easeOutQuad"
      });

      anime({
        targets: "#carousel-featured-card",
        opacity: [0, 1],
        translateX: [20, 0],
        duration: 600,
        easing: "easeOutBack"
      });
    }

    function finalizeLayers(activeLayer, inactiveLayer) {
      if (typeof anime !== "undefined") {
        anime.remove(activeLayer);
        anime.remove(inactiveLayer);
      }
      if (activeLayer) {
        activeLayer.style.opacity = "1";
        activeLayer.style.zIndex = "1";
      }
      if (inactiveLayer) {
        inactiveLayer.style.opacity = "0";
        inactiveLayer.style.zIndex = "0";
      }
      isAnimating = false;
      if (safetyTimeout) {
        clearTimeout(safetyTimeout);
        safetyTimeout = null;
      }
    }

    // Cambiar diapositiva con transición suave y segura
    function goToSlide(targetIndex) {
      const total = CAROUSEL_GAMES.length;
      const newIndex = ((targetIndex % total) + total) % total;
      if (newIndex === currentIndex) return;

      const currentLayer = activeLayerIndex === 1 ? bg1 : bg2;
      const nextLayer = activeLayerIndex === 1 ? bg2 : bg1;

      // Si había una animación en curso, finalizarla de inmediato para no atascar
      if (isAnimating) {
        finalizeLayers(currentLayer, nextLayer);
      }

      currentIndex = newIndex;
      const nextSlide = CAROUSEL_GAMES[newIndex];

      // 1. Preparar la capa entrante con la nueva imagen
      if (nextLayer) {
        nextLayer.style.backgroundImage = `url("${nextSlide.image}")`;
        nextLayer.style.opacity = "0";
        nextLayer.style.zIndex = "2";
      }
      if (currentLayer) {
        currentLayer.style.zIndex = "1";
      }

      // 2. Actualizar el breve texto descriptivo del juego y la tarjeta destacada
      if (gameDescEl && nextSlide.shortDesc) {
        gameDescEl.textContent = nextSlide.shortDesc;
      }
      if (featName) featName.textContent = nextSlide.featName;
      if (featTagline) featTagline.textContent = nextSlide.featTagline;
      if (featPrice) featPrice.textContent = nextSlide.featPrice;
      if (featuredLink) {
        featuredLink.textContent = `Ver ${nextSlide.shortTitle || nextSlide.featName} →`;
        featuredLink.href = `product.html?id=${nextSlide.id}`;
      }

      isAnimating = true;

      // 3. Transición cruzada fluida con anime.js
      if (typeof anime !== "undefined" && nextLayer && currentLayer) {
        anime({
          targets: nextLayer,
          opacity: [0, 1],
          duration: 600,
          easing: "easeOutQuad",
          complete: function () {
            activeLayerIndex = activeLayerIndex === 1 ? 2 : 1;
            finalizeLayers(nextLayer, currentLayer);
          }
        });

        anime({
          targets: currentLayer,
          opacity: [1, 0],
          duration: 600,
          easing: "easeOutQuad"
        });

        anime({
          targets: ["#hero-game-desc", "#carousel-feat-name", "#carousel-feat-tagline", "#carousel-feat-price"],
          opacity: [0.4, 1],
          duration: 250,
          easing: "easeOutQuad"
        });

        // Seguro contra congelamiento por callbacks no ejecutados
        safetyTimeout = setTimeout(() => {
          if (isAnimating) {
            activeLayerIndex = activeLayerIndex === 1 ? 2 : 1;
            finalizeLayers(nextLayer, currentLayer);
          }
        }, 750);
      } else {
        // Fallback directo sin dependencias
        if (nextLayer) nextLayer.style.opacity = "1";
        if (currentLayer) currentLayer.style.opacity = "0";
        activeLayerIndex = activeLayerIndex === 1 ? 2 : 1;
        finalizeLayers(nextLayer, currentLayer);
      }
    }

    function handleNext() {
      restartTimer();
      goToSlide(currentIndex + 1);
    }

    function handlePrev() {
      restartTimer();
      goToSlide(currentIndex - 1);
    }

    // Flechas de navegación abajo a la derecha
    if (nextBtn) {
      nextBtn.addEventListener("click", handleNext);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", handlePrev);
    }

    // Temporizador automático continuo cada 4 segundos
    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4000);
    }

    function restartTimer() {
      stopTimer();
      startTimer();
    }

    // Pausar auto-avance únicamente si el usuario sitúa el ratón encima de la tarjeta/botones
    if (featuredCard) {
      featuredCard.addEventListener("mouseenter", stopTimer);
      featuredCard.addEventListener("mouseleave", startTimer);
    }

    startTimer();
  }

  // =========================================================
  // 3. CATÁLOGO DINÁMICO EN MEMORIA (index.html)
  // =========================================================
  function formatPrice(val) {
    return val.toFixed(2).replace(".", ",") + " €";
  }

  function createGameCardHTML(game) {
    return `
      <article class="game-card" data-id="${game.id}">
        <div class="game-card-media">
          ${game.badge ? `<span class="game-card-badge">${game.badge}</span>` : ""}
          <img src="${game.image}" alt="Portada de ${game.title}: ${game.subtitle}" class="game-card-img" />
        </div>
        <div class="game-card-info">
          <h3 class="game-card-title">${game.title}</h3>
          <p class="game-card-subtitle">${game.subtitle}</p>
          <div class="game-card-meta">
            <span class="game-card-genre">${game.platform} · ${game.genreFull || game.genre}</span>
            <span class="game-card-pegi">PEGI ${game.pegi}</span>
          </div>
          <p class="game-card-price">${formatPrice(game.price)}</p>
          <a href="product.html?id=${game.id}" class="game-card-detail-link">
            Ver detalle &#8599;
          </a>
          <button type="button" class="btn-add-cart" onclick="window.NexoShop.addToCart('${game.id}')">
            Añadir al carrito &rarr;
          </button>
        </div>
      </article>
    `;
  }

  function initCatalog() {
    const grid = document.getElementById("catalog-grid");
    if (!grid || typeof PRODUCTS === "undefined") return;

    const statusText = document.querySelector(".catalog-status-text");
    const countTop = document.querySelector(".catalog-total-count");
    const priceSlider = document.getElementById("priceRange");
    const priceDisplay = document.querySelector(".filter-price-display");
    const sortSelect = document.getElementById("catalogSort");
    const filtersForm = document.querySelector(".filters-form");

    function getFilteredProducts() {
      // 1. Filtro Plataforma (PC, PlayStation, Xbox, Nintendo)
      const checkedPlatforms = Array.from(
        document.querySelectorAll('input[name="platform"]:checked')
      ).map((cb) => cb.value.toLowerCase());

      // 2. Filtro Género
      const checkedGenres = Array.from(
        document.querySelectorAll('input[name="genre"]:checked')
      ).map((cb) => cb.value.toLowerCase());

      // 3. Filtro Precio máximo
      const maxPrice = priceSlider ? parseFloat(priceSlider.value) : 100;

      // 4. Filtro Con DLC
      const dlcOnly = document.querySelector('input[name="has_dlc"]')?.checked;

      return PRODUCTS.filter((game) => {
        // Plataforma
        if (checkedPlatforms.length > 0) {
          const gamePlatforms = (game.platforms || [game.platform || ""]).map((p) => p.toLowerCase());
          const matchPlatform = checkedPlatforms.some((cp) =>
            gamePlatforms.some((gp) => gp.includes(cp))
          );
          if (!matchPlatform) return false;
        }

        // Género
        if (checkedGenres.length > 0) {
          const match = checkedGenres.some((g) =>
            game.genre.toLowerCase().includes(g) ||
            (game.genreFull && game.genreFull.toLowerCase().includes(g))
          );
          if (!match) return false;
        }

        // Precio
        if (game.price > maxPrice) return false;

        // Con DLC
        if (dlcOnly && !game.hasDlc) return false;

        return true;
      });
    }

    function render() {
      let list = getFilteredProducts();

      // Ordenación
      const sortValue = sortSelect ? sortSelect.value : "featured";
      if (sortValue === "price-asc") {
        list.sort((a, b) => a.price - b.price);
      } else if (sortValue === "price-desc") {
        list.sort((a, b) => b.price - a.price);
      } else if (sortValue === "rating") {
        list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      }

      // Dibujar tarjetas
      if (list.length === 0) {
        grid.innerHTML = `<p class="no-products-msg">No se encontraron juegos con los filtros seleccionados.</p>`;
      } else {
        grid.innerHTML = list.map(createGameCardHTML).join("");
      }

      // Actualizar contadores
      if (statusText) {
        statusText.textContent = `Mostrando ${list.length} de ${PRODUCTS.length} juegos`;
      }
      if (countTop) {
        countTop.textContent = `${list.length} juegos`;
      }
    }

    // Escuchar eventos en los filtros
    if (priceSlider) {
      priceSlider.addEventListener("input", () => {
        if (priceDisplay) priceDisplay.textContent = `0 € — ${priceSlider.value} €`;
        render();
      });
    }

    if (filtersForm) {
      filtersForm.addEventListener("change", render);
      filtersForm.addEventListener("reset", () => {
        setTimeout(() => {
          if (priceSlider) priceSlider.value = priceSlider.max || 80;
          if (priceDisplay) priceDisplay.textContent = `0 € — ${priceSlider.value} €`;
          render();
        }, 10);
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", render);
    }

    // Render inicial
    render();
  }

  // =========================================================
  // 3. DETALLE DE PRODUCTO EN MEMORIA (product.html)
  // =========================================================
  function initProductPage() {
    const mainSection = document.querySelector(".product-hero-section");
    if (!mainSection || typeof PRODUCTS === "undefined") return;

    // Obtener id de la URL (?id=cyberpunk-2077)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = (urlParams.get("id") || "cyberpunk-2077").toLowerCase();

    const catalogList = typeof ALL_PRODUCTS !== "undefined" ? ALL_PRODUCTS : PRODUCTS;
    const product = catalogList.find((p) => p.id === productId) || PRODUCTS[0];

    // Actualizar título del documento
    document.title = `NEXO PLAY - ${product.title}: ${product.subtitle}`;

    // Actualizar Miga de Pan
    const currentBreadcrumb = document.querySelector(".breadcrumb-current");
    if (currentBreadcrumb) currentBreadcrumb.textContent = product.title;

    // Actualizar Portada y Títulos
    const coverImg = document.querySelector(".product-cover-img");
    const coverTitle = document.querySelector(".product-cover-title");
    const coverSubtitle = document.querySelector(".product-cover-edition");
    const titleEl = document.querySelector(".product-title");
    const editionEl = document.querySelector(".product-edition");
    const descEl = document.querySelector(".product-description");
    const ratingEl = document.querySelector(".product-rating");
    const priceEl = document.querySelector(".product-price");
    const editionBadge = document.querySelector(".product-badge-edition");
    const languagesEl = document.querySelector(".product-languages-info");

    if (coverImg && product.image) {
      coverImg.src = product.image;
      coverImg.alt = `Portada de ${product.title}: ${product.subtitle}`;
    }
    if (coverTitle) coverTitle.textContent = product.title;
    if (coverSubtitle) coverSubtitle.textContent = product.subtitle;
    if (titleEl) titleEl.textContent = product.title;
    if (editionEl) editionEl.textContent = product.subtitle;
    if (descEl) descEl.textContent = product.description;
    if (priceEl) priceEl.textContent = formatPrice(product.price);
    if (editionBadge && product.edition) editionBadge.textContent = product.edition;
    if (languagesEl && product.compatibility) languagesEl.textContent = product.compatibility;

    if (ratingEl && product.rating) {
      ratingEl.innerHTML = `<span class="rating-star" aria-hidden="true">&#9733;</span> ${product.rating}`;
    }

    // Botón añadir al carrito
    const buyBtn = document.querySelector(".btn-primary-buy");
    if (buyBtn) {
      buyBtn.onclick = function () {
        window.NexoShop.addToCart(product.id);
      };
    }

    // Actualizar Píldoras de Especificaciones
    const pillsContainer = document.querySelector(".product-spec-pills");
    if (pillsContainer) {
      pillsContainer.innerHTML = `
        <span class="spec-pill">${product.platform || "PC / Windows"}</span>
        <span class="spec-pill">${product.genreFull || product.genre}</span>
        <span class="spec-pill">PEGI ${product.pegi}</span>
        <span class="spec-pill">1 jugador</span>
      `;
    }

    // Actualizar Sección de DLCs
    const dlcSection = document.querySelector(".product-dlc-section");
    const dlcList = document.querySelector(".dlc-items-list");
    if (dlcSection && dlcList) {
      if (product.dlcs && product.dlcs.length > 0) {
        dlcSection.style.display = "";
        dlcList.innerHTML = product.dlcs
          .map(
            (dlc) => `
          <article class="dlc-card">
            <div class="dlc-card-left">
              <div class="dlc-thumb-badge" aria-hidden="true">
                ${dlc.image ? `<img src="${dlc.image}" alt="${dlc.title}" class="dlc-badge-img" />` : `<span>${dlc.icon || "☉"}</span>`}
              </div>
              <div class="dlc-card-info">
                <h3 class="dlc-title">${dlc.title}</h3>
                <p class="dlc-description">${dlc.description}</p>
              </div>
            </div>
            <div class="dlc-card-right">
              <span class="dlc-price">${formatPrice(dlc.price)}</span>
              <button type="button" class="btn-dlc-add" onclick="window.NexoShop.addToCart('${product.id}', true)">
                Agregar
              </button>
            </div>
          </article>
        `
          )
          .join("");
      } else {
        dlcSection.style.display = "none";
      }
    }

    // Actualizar Requisitos
    if (product.requirements) {
      const minCard = document.querySelector(".requirements-card:first-child .requirements-spec-list");
      const recCard = document.querySelector(".requirements-card:last-child .requirements-spec-list");

      function buildReqList(reqObj) {
        if (!reqObj) return "";
        return Object.entries(reqObj)
          .map(
            ([k, v]) => `
            <div class="req-spec-row">
              <dt class="req-label">${k.charAt(0).toUpperCase() + k.slice(1)}</dt>
              <dd class="req-value">${v}</dd>
            </div>
          `
          )
          .join("");
      }

      if (minCard && product.requirements.minimum) {
        minCard.innerHTML = buildReqList(product.requirements.minimum);
      }
      if (recCard && product.requirements.recommended) {
        recCard.innerHTML = buildReqList(product.requirements.recommended);
      }
    }
  }

  // =========================================================
  // 4. CARRITO EN MEMORIA (cart.html)
  // =========================================================
  function initCartPage() {
    const cartContainer = document.getElementById("cart-items-container");
    if (!cartContainer || typeof PRODUCTS === "undefined") return;

    function renderCart() {
      const cart = getCartFromStorage();

      if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="cart-empty-message">Tu carrito está vacío.</p>`;
        updateSummary(0, 0);
        updateHeaderCartCount();
        return;
      }

      let totalGamesPrice = 0;
      let totalDlcPrice = 0;

      const allGames = typeof ALL_PRODUCTS !== "undefined" ? ALL_PRODUCTS : PRODUCTS;
      cartContainer.innerHTML = cart
        .map((item, index) => {
          const game = allGames.find((p) => p.id === item.productId);
          if (!game) return "";

          totalGamesPrice += game.price;

          let dlcHTML = "";
          if (item.hasDlc && game.dlcs && game.dlcs.length > 0) {
            const dlc = game.dlcs[0];
            totalDlcPrice += dlc.price;
            dlcHTML = `
              <div class="cart-item-row cart-item-dlc">
                <div class="cart-dlc-tag">
                  <span class="cart-dlc-arrow">&#8627;</span>
                  DLC PARA ${game.title} · REQUIERE EL JUEGO BASE
                </div>
                <div class="cart-dlc-content">
                  <div class="cart-item-media cart-dlc-media">
                    <div class="cart-dlc-badge" aria-hidden="true">
                      <span>${dlc.icon || "☉"}</span>
                    </div>
                  </div>
                  <div class="cart-item-info">
                    <h3 class="cart-item-title">${dlc.title}</h3>
                    <p class="cart-item-meta">PC · Expansión digital · Cantidad: 1</p>
                    <p class="cart-item-price">${formatPrice(dlc.price)}</p>
                  </div>
                  <div class="cart-item-actions">
                    <button type="button" class="btn-remove-item" onclick="window.NexoShop.removeDlcFromCart(${index})">
                      <span class="remove-icon" aria-hidden="true">&#128465;</span>
                      <span class="remove-text">Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }

          return `
            <article class="cart-card ${item.hasDlc ? "cart-card-bundle" : ""}">
              <div class="cart-item-row cart-item-base">
                <div class="cart-item-media">
                  <img src="${game.image}" alt="Portada de ${game.title}: ${game.subtitle}" class="cart-item-thumb" />
                </div>
                <div class="cart-item-info">
                  <h2 class="cart-item-title">${game.title}</h2>
                  <p class="cart-item-edition">${game.subtitle}</p>
                  <p class="cart-item-meta">Juego base · PC · Cantidad: 1</p>
                  <p class="cart-item-price">${formatPrice(game.price)}</p>
                </div>
                <div class="cart-item-actions">
                  <button type="button" class="btn-remove-item" onclick="window.NexoShop.removeFromCart(${index})">
                    <span class="remove-icon" aria-hidden="true">&#128465;</span>
                    <span class="remove-text">Eliminar</span>
                  </button>
                </div>
              </div>
              ${dlcHTML}
            </article>
          `;
        })
        .join("");

      updateSummary(totalGamesPrice, totalDlcPrice);
      updateHeaderCartCount();
    }

    function updateSummary(gamesTotal, dlcTotal) {
      const subtotal = gamesTotal + dlcTotal;
      const gamesEl = document.getElementById("summary-games-price");
      const dlcEl = document.getElementById("summary-dlc-price");
      const subtotalEl = document.getElementById("summary-subtotal");
      const totalEl = document.getElementById("summary-total-price");
      const subtitleEl = document.getElementById("cart-dynamic-subtitle");

      if (gamesEl) gamesEl.textContent = formatPrice(gamesTotal);
      if (dlcEl) dlcEl.textContent = formatPrice(dlcTotal);
      if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
      if (totalEl) totalEl.textContent = formatPrice(subtotal);

      const cart = getCartFromStorage();
      let gamesCount = cart.length;
      let dlcCount = cart.filter((i) => i.hasDlc).length;
      let totalCount = gamesCount + dlcCount;

      if (subtitleEl) {
        subtitleEl.textContent = `${totalCount} artículos · ${gamesCount} juegos y ${dlcCount} DLC · Entrega digital`;
      }
    }

    window.NexoShop.renderCart = renderCart;
    renderCart();
  }

  // API pública en memoria
  window.NexoShop = {
    addToCart(productId, hasDlc = false) {
      const cart = getCartFromStorage();
      const existing = cart.find((i) => i.productId === productId);
      if (existing) {
        if (hasDlc) existing.hasDlc = true;
      } else {
        cart.push({ productId, hasDlc });
      }
      saveCartToStorage(cart);
      updateHeaderCartCount();
      alert("¡Producto añadido al carrito!");
    },
    removeFromCart(index) {
      const cart = getCartFromStorage();
      cart.splice(index, 1);
      saveCartToStorage(cart);
      if (window.NexoShop.renderCart) window.NexoShop.renderCart();
      updateHeaderCartCount();
    },
    removeDlcFromCart(index) {
      const cart = getCartFromStorage();
      if (cart[index]) {
        cart[index].hasDlc = false;
        saveCartToStorage(cart);
        if (window.NexoShop.renderCart) window.NexoShop.renderCart();
        updateHeaderCartCount();
      }
    }
  };

  // Inicialización al cargar el DOM
  function initAll() {
    initHeader();
    initFooter();
    initHeroCarousel();
    initCatalog();
    initProductPage();
    initCartPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
