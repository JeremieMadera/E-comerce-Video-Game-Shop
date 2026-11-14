/**
 * VEJIGAMES - Script global (Puerto Rico)
 * 1. Carga modular de header.html y footer.html.
 * 2. Renderizado dinámico del catálogo en memoria (index.html).
 * 3. Renderizado dinámico del detalle de producto (product.html).
 * 4. Gestión del carrito en memoria (cart.html).
 */

(function () {
  // =========================================================
  // CONTROL DE INICIO Y RECARGA (SOLO PARA PÁGINA DE INICIO)
  // =========================================================
  const isHomePage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/");

  if (isHomePage) {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    function ensureStartAtInicio() {
      window.scrollTo(0, 0);
      if (window.location.hash && history.replaceState) {
        history.replaceState(null, "", window.location.pathname);
      }
    }

    ensureStartAtInicio();
    window.addEventListener("pageshow", ensureStartAtInicio);
    window.addEventListener("load", ensureStartAtInicio);
    window.addEventListener("beforeunload", () => {
      window.scrollTo(0, 0);
    });
  }

  // =========================================================
  // 1. CARGA MODULAR DE HEADER Y FOOTER
  // =========================================================
  const HEADER_FALLBACK_HTML = `
<header class="navbar">
  <div class="navbar-wrapper">
    <div class="navbar-top">
      <a href="index.html" class="brand-logo">
        <img src="Assets/icons/Vejigante_mask_color.svg" alt="VejiGames Logo" class="brand-logo-img" />
        <span>VEJIGAMES</span>
      </a>

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
        <a href="index.html#hero-carousel" class="active" id="nav-link-inicio">Inicio</a>
        <a href="index.html#ofertas" id="nav-link-ofertas">Ofertas</a>
        <a href="index.html#catalog" id="nav-link-catalog">Catálogo</a>
        <a href="index.html#ruleta" id="nav-link-ruleta">Ruleta</a>
      </nav>
      <p class="navbar-tagline">La tienda #1 de la Isla · Puerto Rico</p>
    </div>
  </div>
</header>
`;

  const FOOTER_FALLBACK_HTML = `
<footer>
  <h2 class="footer-brand-title">
    <img src="Assets/icons/Vejigante_mask_color.svg" alt="VejiGames Logo" class="footer-logo-img" />
    <span>VEJIGAMES</span>
  </h2>
  <p>La tienda #1 de la Isla · San Juan, Puerto Rico.</p>
  <div class="footer-social-icons" aria-label="Comunidad y redes sociales">
    <div class="social-icon-item" title="Instagram">
      <img src="Assets/icons/instagram.png" alt="Instagram" class="social-icon-img" loading="lazy" decoding="async" />
    </div>
    <div class="social-icon-item" title="Discord">
      <img src="Assets/icons/discord.png" alt="Discord" class="social-icon-img" loading="lazy" decoding="async" />
    </div>
    <div class="social-icon-item" title="YouTube">
      <img src="Assets/icons/youtube.png" alt="YouTube" class="social-icon-img" loading="lazy" decoding="async" />
    </div>
  </div>

  <h3>Explora</h3>
  <nav aria-label="Explora">
    <a href="index.html#catalog">Catálogo</a> ·
    <a href="index.html#ofertas">Ofertas</a>
  </nav>

  <h3>Estamos al otro lado</h3>
  <p>apoyo@vejigames.com</p>
  <p>Lun-Vie 9:00 AM - 6:00 PM AST</p>
  <p>Soporte local en Puerto Rico · Paga con ATH Móvil</p>

  <hr>

  <p>&copy; 2026 VEJIGAMES · San Juan, Puerto Rico</p>
  <nav aria-label="Enlaces legales">
    <a href="terms.html#privacidad">Privacidad</a> ·
    <a href="terms.html#aceptacion_de_los_terminos">Términos</a> ·
    <a href="terms.html#cookies">Cookies</a>
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

  function getActiveUser() {
    try {
      const raw = localStorage.getItem("vejigames_user") || localStorage.getItem("isla_gaming_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function updateHeaderUser() {
    try {
      const user = getActiveUser();
      const labels = document.querySelectorAll(".account-btn span, .account-button span");
      labels.forEach((label) => {
        if (label.classList.contains("cart-count")) return;
        if (user && user.name) {
          label.textContent = user.name;
        } else {
          label.textContent = "Mi cuenta";
        }
      });
    } catch (e) {}
  }

  function updateHeaderCartCount(animate = false) {
    const badges = document.querySelectorAll(".cart-count, #header-cart-badge, .account-cart-badge, .car-acount");
    if (badges.length && typeof getCartFromStorage === "function") {
      const cart = getCartFromStorage();
      let count = 0;
      cart.forEach((item) => {
        count += 1;
        if (item.hasDlc) count += 1;
      });
      badges.forEach((b) => {
        const prev = parseInt(b.textContent, 10);
        b.textContent = count;
        b.setAttribute("aria-label", `${count} artículos en el carrito`);
        if (animate || (Number.isFinite(prev) && prev !== count)) {
          b.classList.remove("cart-bump");
          void b.offsetWidth;
          b.classList.add("cart-bump");
          setTimeout(() => b.classList.remove("cart-bump"), 240);
        }
      });
    }
  }

  function syncNavbarHeight() {
    const nav = document.querySelector(".navbar") || document.getElementById("header-container");
    if (nav && nav.offsetHeight > 0) {
      document.documentElement.style.setProperty("--navbar-height", `${nav.offsetHeight}px`);
    }
  }

  function setupNavbarNavigation() {
    const navLinks = document.querySelectorAll(".nav-links a");
    if (!navLinks.length) return;

    function setActiveTab(linkId) {
      navLinks.forEach((link) => {
        if (link.id === linkId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    const isHomePage =
      !window.location.pathname.includes("cart.html") &&
      !window.location.pathname.includes("product.html") &&
      !window.location.pathname.includes("account.html") &&
      !window.location.pathname.includes("terms.html");

    if (isHomePage) {
      // Iniciar siempre en INICIO por defecto
      setActiveTab("nav-link-inicio");

      let isProgrammaticScroll = false;
      let scrollLockTimeout = null;

      function lockScrollSpy() {
        isProgrammaticScroll = true;
        if (scrollLockTimeout) clearTimeout(scrollLockTimeout);
        scrollLockTimeout = setTimeout(() => {
          isProgrammaticScroll = false;
        }, 850);
      }

      // 1. INICIO
      const inicioLink = document.getElementById("nav-link-inicio") || navLinks[0];
      if (inicioLink) {
        inicioLink.addEventListener("click", (e) => {
          e.preventDefault();
          lockScrollSpy();
          setActiveTab("nav-link-inicio");
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (history.pushState) history.pushState(null, "", "index.html");
        });
      }

      // 2. OFERTAS (Productos en oferta bajo el Hero)
      const ofertasLink = document.getElementById("nav-link-ofertas") || navLinks[1];
      if (ofertasLink) {
        ofertasLink.addEventListener("click", (e) => {
          e.preventDefault();
          lockScrollSpy();
          setActiveTab("nav-link-ofertas");
          const ofertasSec = document.getElementById("ofertas");
          if (ofertasSec) {
            ofertasSec.scrollIntoView({ behavior: "smooth" });
          }
          if (history.pushState) history.pushState(null, "", "#ofertas");
        });
      }

      // 3. CATÁLOGO
      const catalogLink = document.getElementById("nav-link-catalog") || navLinks[2];
      if (catalogLink) {
        catalogLink.addEventListener("click", (e) => {
          e.preventDefault();
          lockScrollSpy();
          setActiveTab("nav-link-catalog");
          const catalogSec = document.getElementById("catalog");
          if (catalogSec) {
            catalogSec.scrollIntoView({ behavior: "smooth" });
          }
          if (window.NexoShop && window.NexoShop.resetFilters) {
            window.NexoShop.resetFilters();
          }
          if (history.pushState) history.pushState(null, "", "#catalog");
        });
      }

      // 4. RULETA ARCADE
      const ruletaLink = document.getElementById("nav-link-ruleta") || navLinks[3];
      if (ruletaLink) {
        ruletaLink.addEventListener("click", (e) => {
          e.preventDefault();
          lockScrollSpy();
          setActiveTab("nav-link-ruleta");
          const ruletaSec = document.getElementById("ruleta") || document.getElementById("arcade-lootbox");
          if (ruletaSec) {
            ruletaSec.scrollIntoView({ behavior: "smooth" });
          }
          if (history.pushState) history.pushState(null, "", "#ruleta");
        });
      }

      // 5. ScrollSpy dinámico en tiempo real: INICIO -> OFERTAS -> CATÁLOGO -> RULETA
      let rafId = null;
      function updateScrollSpy() {
        if (isProgrammaticScroll) return;

        const nav = document.querySelector(".navbar");
        const navHeight = nav ? nav.offsetHeight : 100;
        const triggerPoint = navHeight + 80;

        const ruletaSec = document.getElementById("ruleta") || document.getElementById("arcade-lootbox");
        const catalogSec = document.getElementById("catalog");
        const ofertasSec = document.getElementById("ofertas");

        // 1. Sección Ruleta (en la parte inferior)
        if (ruletaSec) {
          const ruletaTop = ruletaSec.getBoundingClientRect().top;
          if (ruletaTop <= triggerPoint + 60) {
            setActiveTab("nav-link-ruleta");
            return;
          }
        }

        // 2. Sección Catálogo
        if (catalogSec) {
          const catalogTop = catalogSec.getBoundingClientRect().top;
          if (catalogTop <= triggerPoint) {
            setActiveTab("nav-link-catalog");
            return;
          }
        }

        // 3. Sección Ofertas (Directamente bajo el Hero)
        if (ofertasSec) {
          const ofertasTop = ofertasSec.getBoundingClientRect().top;
          if (ofertasTop <= triggerPoint) {
            setActiveTab("nav-link-ofertas");
            return;
          }
        }

        // 4. Sección Inicio (Hero en la parte superior)
        setActiveTab("nav-link-inicio");
      }

      window.addEventListener(
        "scroll",
        () => {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(updateScrollSpy);
        },
        { passive: true }
      );

      // Ejecutar una comprobación inicial al cargar la página
      setTimeout(updateScrollSpy, 150);
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
        updateHeaderUser();
        syncNavbarHeight();
        setupNavbarNavigation();
      })
      .catch(() => {
        container.innerHTML = HEADER_FALLBACK_HTML;
        updateHeaderCartCount();
        updateHeaderUser();
        syncNavbarHeight();
        setupNavbarNavigation();
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
      id: "gta-6",
      image: "Assets/hero/gta-6.jpg",
      shortTitle: "GTA VI",
      shortDesc: "Regresa a Vice City y el estado de Leonida en la experiencia de mundo abierto más esperada.",
      featName: "GRAND THEFT AUTO VI",
      featTagline: "Edición Reserva Especial",
      featPrice: "$79.99"
    },
    {
      id: "hollow-knight",
      image: "Assets/hero/hollow-knight.jpg",
      shortTitle: "Hollow Knight",
      shortDesc: "Explora las ruinas de Hallownest, un reino subterráneo de insectos y héroes.",
      featName: "HOLLOW KNIGHT",
      featTagline: "Edición Corazón del Vacío",
      featPrice: "$14.99"
    },
    {
      id: "cyberpunk-2077",
      image: "Assets/hero/cyberpunk-2077.jpg",
      shortTitle: "Cyberpunk 2077",
      shortDesc: "Conviértete en leyenda en las peligrosas calles futuristas de Night City.",
      featName: "CYBERPUNK 2077",
      featTagline: "Edición Ultimate",
      featPrice: "$39.99"
    },
    {
      id: "astro-bot",
      image: "Assets/hero/astro-bot.jpg",
      shortTitle: "Astro Bot",
      shortDesc: "Diversión pura a través de más de 50 mundos mágicos en una aventura galáctica.",
      featName: "ASTRO BOT",
      featTagline: "Aventura galáctica",
      featPrice: "$59.99"
    },
    {
      id: "god-of-war-ragnarok",
      image: "Assets/hero/god-of-war-ragnarok.jpg",
      shortTitle: "God of War",
      shortDesc: "Kratos y Atreus deben desafiar el destino nórdico ante la llegada del Ragnarök.",
      featName: "GOD OF WAR RAGNARÖK",
      featTagline: "Valhalla Edition",
      featPrice: "$59.99"
    },
    {
      id: "mario-kart-8-deluxe",
      image: "Assets/hero/mario-kart-world.jpg",
      shortTitle: "Mario Kart 8",
      shortDesc: "Compite a toda velocidad desafiando la gravedad en 48 circuitos vertiginosos.",
      featName: "MARIO KART 8 DELUXE",
      featTagline: "Pase de pistas extras",
      featPrice: "$49.99"
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

    // Función para reproducir la entrada del Hero e iniciar el temporizador
    function playHeroEntrance() {
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
      startTimer();
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
      }, 5000); // 5 segundos para disfrutar de cada juego
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

    // Iniciar animación y rotación del Hero
    playHeroEntrance();
  }

  // =========================================================
  // 2B. EFECTO MÁQUINA DE ESCRIBIR (HERO TYPEWRITER)
  // =========================================================
  function initHeroTypewriter() {
    const titleEl = document.getElementById("hero-title-text");
    const descEl = document.getElementById("hero-game-desc");
    const actionsEl = document.querySelector(".home-page-actions");
    if (!titleEl) return;

    const fullText = titleEl.getAttribute("data-fulltext") || titleEl.textContent.trim() || "Tu próxima aventura empieza aquí.";
    titleEl.setAttribute("data-fulltext", fullText);
    titleEl.textContent = "";

    // Si el usuario prefiere movimiento reducido, mostrar de inmediato
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      titleEl.textContent = fullText;
      if (descEl) descEl.classList.add("is-visible");
      if (actionsEl) actionsEl.classList.add("is-visible");
      return;
    }

    let typeTimer = null;

    function startTyping() {
      if (typeTimer) clearInterval(typeTimer);
      titleEl.textContent = "";
      if (descEl) descEl.classList.remove("is-visible");
      if (actionsEl) actionsEl.classList.remove("is-visible");

      let i = 0;
      setTimeout(() => {
        typeTimer = setInterval(() => {
          if (i < fullText.length) {
            titleEl.textContent += fullText.charAt(i);
            i++;
          } else {
            clearInterval(typeTimer);
            typeTimer = null;
            // Al culminar el tipeo del título, revelamos suavemente descripción y botones
            setTimeout(() => {
              if (descEl) descEl.classList.add("is-visible");
              if (actionsEl) actionsEl.classList.add("is-visible");
            }, 160);
          }
        }, 42); // 42 ms por carácter para un ritmo fluido y retro
      }, 300);
    }

    startTyping();
  }

  // =========================================================
  // 2C. ANIMACIONES DE ENTRADA AL HACER SCROLL (SCROLL REVEAL)
  // =========================================================
  function initScrollReveals() {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    const targets = [
      document.querySelector(".offers-header"),
      document.querySelector(".catalog-header"),
      document.querySelector(".catalog-filters"),
      document.querySelector(".catalog-toolbar"),
      document.querySelector(".lootbox-cabinet")
    ].filter(Boolean);

    targets.forEach((t) => {
      t.classList.add("reveal-on-scroll");
      scrollObserver.observe(t);
    });
  }

  // =========================================================
  // FONDO INTERACTIVO DE ESTRELLAS (BRILLAN AL MOVER EL MOUSE)
  // =========================================================
  function initStarfield() {
    let canvas = document.getElementById("space-starfield");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "space-starfield";
      canvas.className = "space-starfield-canvas";
      canvas.setAttribute("aria-hidden", "true");
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars = [];
    const INTERACTION_RADIUS = 160;
    const RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;

    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseActive = false;
    let mouseTimeout = null;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const count = Math.min(260, Math.max(70, Math.floor((width * height) / 7000)));
      stars = [];
      for (let i = 0; i < count; i++) {
        const sizeRand = Math.random();
        let baseRadius = 0.85;
        if (sizeRand > 0.88) baseRadius = 1.9;
        else if (sizeRand > 0.55) baseRadius = 1.35;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseRadius,
          isCross: Math.random() < 0.14,
          twinkleSpeed: 0.015 + Math.random() * 0.035,
          twinklePhase: Math.random() * Math.PI * 2,
          baseAlpha: 0.2 + Math.random() * 0.45,
          glow: 0,
          isLime: Math.random() < 0.22
        });
      }
    }

    function handlePointerMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
      if (mouseTimeout) clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseActive = false;
      }, 1200);
    }

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches && e.touches[0]) {
          handlePointerMove(e.touches[0]);
        }
      },
      { passive: true }
    );
    window.addEventListener("mouseleave", () => {
      isMouseActive = false;
    });

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let rafId = null;

    function renderLoop() {
      if (document.hidden) {
        rafId = requestAnimationFrame(renderLoop);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Cálculo de proximidad con el mouse
        let targetGlow = 0;
        if (isMouseActive) {
          const dx = star.x - mouseX;
          const dy = star.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < RADIUS_SQ) {
            const dist = Math.sqrt(distSq);
            const prox = 1 - (dist / INTERACTION_RADIUS);
            targetGlow = prox * prox;
          }
        }

        star.glow += (targetGlow - star.glow) * 0.16;

        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.22;
        const alpha = Math.min(1, Math.max(0.12, star.baseAlpha + twinkle + (star.glow * 0.75)));
        const r = star.baseRadius + (star.glow * 1.5);

        const hasGlow = star.glow > 0.08;
        if (hasGlow) {
          ctx.save();
          ctx.shadowBlur = 10 + (star.glow * 14);
          ctx.shadowColor = star.isLime ? "rgba(213, 255, 82, 0.95)" : "rgba(244, 244, 238, 0.95)";
        }

        if (star.isCross) {
          const arm = r * 2.4;
          const core = r * 0.4;
          ctx.fillStyle = star.glow > 0.2 || star.isLime
            ? `rgba(213, 255, 82, ${alpha})`
            : `rgba(244, 244, 238, ${alpha})`;

          ctx.beginPath();
          ctx.moveTo(star.x, star.y - arm);
          ctx.lineTo(star.x + core, star.y);
          ctx.lineTo(star.x + arm, star.y);
          ctx.lineTo(star.x, star.y + core);
          ctx.lineTo(star.x, star.y + arm);
          ctx.lineTo(star.x - core, star.y);
          ctx.lineTo(star.x - arm, star.y);
          ctx.lineTo(star.x, star.y - core);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, r, 0, Math.PI * 2);
          if (star.glow > 0.2) {
            ctx.fillStyle = star.isLime ? `rgba(213, 255, 82, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
          } else {
            ctx.fillStyle = star.isLime ? `rgba(213, 255, 82, ${alpha})` : `rgba(183, 171, 223, ${alpha})`;
          }
          ctx.fill();
        }

        if (hasGlow) {
          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    }

    rafId = requestAnimationFrame(renderLoop);
  }

  // =========================================================
  // CARRUSEL INFINITO CONTINUO ANIMADO (MARQUEE DE OFERTAS)
  // =========================================================
  function initOffersMarquee() {
    const track = document.getElementById("offers-marquee-track");
    const group1 = document.getElementById("offers-marquee-group-1");
    if (!track || !group1) return;

    // Asegurar que las tarjetas iniciales sean visibles de inmediato
    const initialCards = Array.from(group1.querySelectorAll(".offer-card"));
    initialCards.forEach((c) => c.classList.add("is-revealed"));

    // Duplicar las 4 tarjetas dentro del Grupo 1 para tener 8 tarjetas por ciclo
    initialCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("is-revealed");
      group1.appendChild(clone);
    });

    // Clonar el Grupo 1 como Grupo 2 para el bucle continuo infinito (0% a -100%)
    const group2 = group1.cloneNode(true);
    group2.id = "offers-marquee-group-2";
    group2.setAttribute("aria-hidden", "true");
    track.appendChild(group2);
  }

  // =========================================================
  // 3. CATÁLOGO DINÁMICO EN MEMORIA (index.html)
  // =========================================================
  function formatPrice(val) {
    return "$" + val.toFixed(2);
  }

  const SPECIAL_OFFERS = {
    "bloodborne": { oldPrice: 39.99, discountBadge: "-50% OFF" },
    "cyberpunk-2077": { oldPrice: 59.99, discountBadge: "-33% OFF" },
    "hollow-knight": { oldPrice: 24.99, discountBadge: "-40% OFF" },
    "god-of-war": { oldPrice: 49.99, discountBadge: "-40% OFF" }
  };

  function createGameCardHTML(game) {
    const offer = SPECIAL_OFFERS[game.id];
    const badgeHTML = offer
      ? `<span class="game-card-badge offer-discount-badge">${offer.discountBadge}</span>`
      : game.badge
      ? `<span class="game-card-badge">${game.badge}</span>`
      : "";

    const priceHTML = offer
      ? `<div class="offer-price-row"><span class="offer-old-price">${formatPrice(offer.oldPrice)}</span><p class="game-card-price">${formatPrice(game.price)}</p></div>`
      : `<p class="game-card-price">${formatPrice(game.price)}</p>`;

    return `
      <article class="game-card" data-id="${game.id}" onclick="window.NexoShop.goToProduct('${game.id}', event)" role="link" tabindex="0" aria-label="Ver detalles de ${game.title}: ${game.subtitle}">
        <div class="game-card-media">
          ${badgeHTML}
          <img src="${game.image}" alt="Portada de ${game.title}: ${game.subtitle}" class="game-card-img" loading="lazy" decoding="async" />
        </div>
        <div class="game-card-info">
          <h3 class="game-card-title">${game.title}</h3>
          <p class="game-card-subtitle">${game.subtitle}</p>
          <div class="game-card-meta">
            <span class="game-card-genre">${game.platform} · ${game.genreFull || game.genre}</span>
            <span class="game-card-pegi">PEGI ${game.pegi}</span>
          </div>
          ${priceHTML}
          <button type="button" class="btn-add-cart" onclick="event.stopPropagation(); window.NexoShop.addToCart('${game.id}', false, event)">
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
    let activeFilterNovedades = false;

    const totalCatalogGames = PRODUCTS.length;

    function normalizeText(str) {
      return (str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    }

    function getFilteredProducts() {
      // 1. Filtro Plataforma (PC, PlayStation, Xbox, Nintendo)
      const checkedPlatforms = Array.from(
        document.querySelectorAll('input[name="platform"]:checked')
      ).map((cb) => normalizeText(cb.value));

      // 2. Filtro Género (Aventura, Acción, RPG, Carreras, Estrategia, etc.)
      const checkedGenres = Array.from(
        document.querySelectorAll('input[name="genre"]:checked')
      ).map((cb) => normalizeText(cb.value));

      // 3. Filtro Precio máximo
      const maxPrice = priceSlider ? parseFloat(priceSlider.value) : 100;

      // 4. Filtro Con DLC
      const dlcOnly = document.querySelector('input[name="has_dlc"]')?.checked;

      // 5. Búsqueda por texto (buscador navbar)
      const searchInput = document.querySelector(".search-box input");
      const searchQuery = searchInput ? normalizeText(searchInput.value) : "";

      return PRODUCTS.filter((game) => {
        // Plataforma
        if (checkedPlatforms.length > 0) {
          const gamePlatforms = (game.platforms || [game.platform || ""]).map((p) => normalizeText(p));
          const matchPlatform = checkedPlatforms.some((cp) =>
            gamePlatforms.some((gp) => gp.includes(cp))
          );
          if (!matchPlatform) return false;
        }

        // Género (con soporte para acentos: acción -> accion)
        if (checkedGenres.length > 0) {
          const gameGenreNorm = normalizeText(game.genre);
          const gameGenreFullNorm = normalizeText(game.genreFull);
          const match = checkedGenres.some((g) =>
            gameGenreNorm.includes(g) || gameGenreFullNorm.includes(g)
          );
          if (!match) return false;
        }

        // Precio
        if (game.price > maxPrice) return false;

        // Con DLC
        if (dlcOnly && !game.hasDlc) return false;

        // Búsqueda por texto libre
        if (searchQuery) {
          const matchSearch =
            normalizeText(game.title).includes(searchQuery) ||
            normalizeText(game.subtitle).includes(searchQuery) ||
            normalizeText(game.description).includes(searchQuery) ||
            normalizeText(game.genre).includes(searchQuery) ||
            normalizeText(game.genreFull).includes(searchQuery) ||
            normalizeText(game.platform).includes(searchQuery);
          if (!matchSearch) return false;
        }

        return true;
      });
    }

    function observeCatalogCards() {
      const cards = Array.from(document.querySelectorAll(".catalog-grid .game-card"));
      if (!cards.length) return;

      if (typeof IntersectionObserver === "undefined") {
        cards.forEach((c) => c.classList.add("is-revealed"));
        return;
      }

      const cardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              cardObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -30px 0px"
        }
      );

      // Calcular columnas reales para organizar la animación por filas (de arriba hacia abajo)
      let cols = 3;
      try {
        const computedCols = window.getComputedStyle(grid).gridTemplateColumns.split(" ").length;
        if (computedCols > 0) cols = computedCols;
      } catch (e) {
        cols = window.innerWidth <= 1120 ? 2 : 3;
      }

      // Encontrar la primera fila visible en el viewport
      let firstVisibleRow = -1;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        const rowIndex = Math.floor(index / cols);

        if (inViewport) {
          if (firstVisibleRow === -1) firstVisibleRow = rowIndex;
          // Escalonado por fila: Fila superior (los de arriba) sale primero, luego Fila 1, Fila 2...
          const relativeRow = Math.max(0, rowIndex - firstVisibleRow);
          card.style.transitionDelay = `${0.08 + relativeRow * 0.22}s`;
          card.classList.remove("is-revealed");
          requestAnimationFrame(() => {
            setTimeout(() => card.classList.add("is-revealed"), 40);
          });
        } else {
          // Tarjetas aún no visibles: se revelan suavemente al scrollear
          card.style.transitionDelay = "0.08s";
          card.classList.remove("is-revealed");
          cardObserver.observe(card);
        }
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

      const displayList = list;

      // Dibujar tarjetas con animación visible
      if (displayList.length === 0) {
        grid.innerHTML = `<p class="no-products-msg">No se encontraron juegos con los filtros seleccionados.</p>`;
      } else {
        grid.innerHTML = displayList.map(createGameCardHTML).join("");
        observeCatalogCards();
      }

      // Actualizar contadores
      if (statusText) {
        statusText.textContent = `Mostrando ${displayList.length} de ${totalCatalogGames} juegos`;
      }
      if (countTop) {
        countTop.textContent = `${displayList.length} juegos`;
      }
    }

    // Métodos públicos del catálogo para los enlaces del Navbar
    window.NexoShop.resetFilters = function () {
      activeFilterNovedades = false;
      if (filtersForm) filtersForm.reset();
      if (priceSlider) {
        priceSlider.value = priceSlider.max || 80;
        if (priceDisplay) priceDisplay.textContent = `$0 — $${priceSlider.value}`;
      }
      render();
    };

    // Escuchar eventos en los filtros
    if (priceSlider) {
      priceSlider.addEventListener("input", () => {
        activeFilterNovedades = false;
        if (priceDisplay) priceDisplay.textContent = `$0 — $${priceSlider.value}`;
        render();
      });
    }

    if (filtersForm) {
      filtersForm.addEventListener("change", () => {
        activeFilterNovedades = false;
        render();
      });
      filtersForm.addEventListener("reset", () => {
        activeFilterNovedades = false;
        setTimeout(() => {
          if (priceSlider) priceSlider.value = priceSlider.max || 80;
          if (priceDisplay) priceDisplay.textContent = `$0 — $${priceSlider.value}`;
          render();
        }, 10);
      });
    }

    // Botón móvil para colapsar/desplegar filtros (Guía Figma)
    const toggleFiltersBtn = document.getElementById("btn-toggle-filters");
    if (toggleFiltersBtn && filtersForm) {
      toggleFiltersBtn.addEventListener("click", () => {
        const isOpen = filtersForm.classList.toggle("is-open");
        toggleFiltersBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", render);
    }

    const searchInput = document.querySelector(".search-box input");
    if (searchInput) {
      searchInput.addEventListener("input", render);
    }

    // Navegación accesible por teclado al presionar Enter en una tarjeta
    grid.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest(".game-card");
        if (card && !e.target.closest(".btn-add-cart")) {
          e.preventDefault();
          const gameId = card.getAttribute("data-id");
          if (gameId) window.NexoShop.goToProduct(gameId, e);
        }
      }
    });

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
    document.title = `VEJIGAMES - ${product.title}: ${product.subtitle}`;

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
                ${dlc.image ? `<img src="${dlc.image}" alt="${dlc.title}" class="dlc-badge-img" loading="lazy" decoding="async" />` : `<span>${dlc.icon || "☉"}</span>`}
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
                  <img src="${game.image}" alt="Portada de ${game.title}: ${game.subtitle}" class="cart-item-thumb" loading="lazy" decoding="async" />
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

    let activeDiscount = 0;

    function updateSummary(gamesTotal, dlcTotal) {
      const rawSubtotal = gamesTotal + dlcTotal;
      const gamesEl = document.getElementById("summary-games-price");
      const dlcEl = document.getElementById("summary-dlc-price");
      const subtotalEl = document.getElementById("summary-subtotal");
      const discountsEl = document.getElementById("summary-discounts");
      const totalEl = document.getElementById("summary-total-price");
      const subtitleEl = document.getElementById("cart-dynamic-subtitle");

      if (gamesEl) gamesEl.textContent = formatPrice(gamesTotal);
      if (dlcEl) dlcEl.textContent = formatPrice(dlcTotal);
      if (subtotalEl) subtotalEl.textContent = formatPrice(rawSubtotal);

      // Cálculo de descuentos con cupones de la Mystery Loot Box
      let discountAmount = 0;
      if (window._activeLootCoupon && rawSubtotal > 0) {
        if (window._activeLootCoupon.isFixed) {
          discountAmount = Math.min(rawSubtotal, window._activeLootCoupon.discountVal);
        } else {
          discountAmount = rawSubtotal * window._activeLootCoupon.discountVal;
        }
      }

      if (discountsEl) {
        discountsEl.textContent = discountAmount > 0 ? `-${formatPrice(discountAmount)}` : "$0.00";
        discountsEl.style.color = discountAmount > 0 ? "var(--cart-lime, #d5ff52)" : "";
      }

      const finalTotal = Math.max(0, rawSubtotal - discountAmount);
      if (totalEl) totalEl.textContent = formatPrice(finalTotal);

      const cart = getCartFromStorage();
      let gamesCount = cart.length;
      let dlcCount = cart.filter((i) => i.hasDlc).length;
      let totalCount = gamesCount + dlcCount;

      if (subtitleEl) {
        subtitleEl.textContent = `${totalCount} artículos · ${gamesCount} juegos y ${dlcCount} DLC · Entrega digital`;
      }
    }

    // Manejo de cupón de descuento en carrito
    const couponInput = document.getElementById("cart-coupon-input");
    const applyCouponBtn = document.getElementById("btn-apply-coupon");
    const couponFeedback = document.getElementById("coupon-feedback");

    function applyCoupon() {
      if (!couponInput) return;
      const code = couponInput.value.trim().toUpperCase();
      if (!code) {
        if (couponFeedback) {
          couponFeedback.className = "coupon-feedback error";
          couponFeedback.textContent = "Ingresa un código para canjear.";
        }
        return;
      }

      const cart = getCartFromStorage();
      if (cart.length === 0) {
        if (couponFeedback) {
          couponFeedback.className = "coupon-feedback error";
          couponFeedback.textContent = "Tu carrito está vacío.";
        }
        return;
      }

      let discountVal = 0;
      let label = "";
      if (code === "ISLA5") {
        discountVal = 0.05;
        label = "5% de descuento aplicado";
      } else if (code === "ISLA15" || code === "ISLA15ARCADE") {
        discountVal = 0.15;
        label = "15% de descuento aplicado";
      } else if (code === "ISLA25") {
        discountVal = 0.25;
        label = "25% de descuento aplicado";
      } else if (code === "ISLA50") {
        discountVal = 0.50;
        label = "¡50% DE DESCUENTO JACKPOT APLICADO!";
      } else if (code === "ISLA10") {
        discountVal = 0.10;
        label = "10% de descuento aplicado";
      } else if (code === "LEGENDARIO20") {
        discountVal = 0.20;
        label = "20% de descuento legendario aplicado";
      } else if (code === "GAMER5PR") {
        discountVal = 5.00;
        label = "$5.00 USD de descuento aplicado";
      } else if (code === "GTAVI10PR") {
        discountVal = 10.00;
        label = "$10.00 USD de descuento especial aplicado";
      } else {
        if (couponFeedback) {
          couponFeedback.className = "coupon-feedback error";
          couponFeedback.textContent = "Código no válido o expirado.";
        }
        return;
      }

      window._activeLootCoupon = { code, discountVal, isFixed: typeof discountVal === "number" && discountVal >= 1 };
      if (couponFeedback) {
        couponFeedback.className = "coupon-feedback success";
        couponFeedback.textContent = `¡Código ${code} válido! ${label}.`;
      }
      renderCart();
    }

    if (applyCouponBtn) {
      applyCouponBtn.addEventListener("click", applyCoupon);
    }
    if (couponInput) {
      couponInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          applyCoupon();
        }
      });
    }

    // =========================================================
    // CONTROL DE AUTENTICACIÓN Y PASARELA DE PAGO (ATH MÓVIL)
    // =========================================================
    const authStatusEl = document.getElementById("cart-auth-status");
    const modalAuthRequired = document.getElementById("modal-auth-required");
    const modalGateway = document.getElementById("modal-checkout-gateway");
    const checkoutBtn = document.getElementById("btn-checkout");

    function updateCartAuthStatus() {
      if (!authStatusEl) return;
      const user = getActiveUser();
      if (user && user.name) {
        authStatusEl.className = "cart-auth-status is-logged-in";
        authStatusEl.innerHTML = `🟢 <strong>Sesión activa:</strong> Comprando como <strong>${user.name}</strong> (${user.email || ""})`;
      } else {
        authStatusEl.className = "cart-auth-status is-guest";
        authStatusEl.innerHTML = `🔒 <strong>Acceso requerido:</strong> Debes <a href="account.html?redirect=cart.html#login" style="color:var(--cart-lime); text-decoration:underline;">iniciar sesión</a> o <a href="account.html?redirect=cart.html#register" style="color:#ff007f; text-decoration:underline;">crear cuenta</a> para poder comprar.`;
      }
    }

    function setCheckoutStep(stepNumber) {
      const steps = document.querySelectorAll(".cart-steps .cart-step");
      if (!steps || !steps.length) return;
      steps.forEach((step, idx) => {
        if (idx === stepNumber - 1) {
          step.classList.add("cart-step-active");
        } else {
          step.classList.remove("cart-step-active");
        }
      });
    }

    function openAuthModal() {
      if (modalAuthRequired) {
        modalAuthRequired.hidden = false;
        document.body.style.overflow = "hidden";
      }
    }

    function closeAuthModal() {
      if (modalAuthRequired) {
        modalAuthRequired.hidden = true;
        document.body.style.overflow = "";
      }
    }

    let activePaymentMethod = "ath";
    let currentCartForKeys = [];
    let currentFinalTotal = 0;
    let paymentTimerId = null;

    function openCheckoutModal() {
      const user = getActiveUser();
      if (!user) {
        openAuthModal();
        return;
      }

      const cart = getCartFromStorage();
      if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega juegos para continuar.");
        return;
      }

      currentCartForKeys = [...cart];

      // Calcular montos finales
      const allGames = typeof ALL_PRODUCTS !== "undefined" ? ALL_PRODUCTS : PRODUCTS;
      let rawSubtotal = 0;
      cart.forEach((item) => {
        const game = allGames.find((p) => p.id === item.productId);
        if (game) {
          rawSubtotal += game.price;
          if (item.hasDlc && game.dlcs && game.dlcs.length) {
            rawSubtotal += game.dlcs[0].price;
          }
        }
      });

      let discountAmount = 0;
      if (window._activeLootCoupon && rawSubtotal > 0) {
        if (window._activeLootCoupon.isFixed) {
          discountAmount = Math.min(rawSubtotal, window._activeLootCoupon.discountVal);
        } else {
          discountAmount = rawSubtotal * window._activeLootCoupon.discountVal;
        }
      }
      currentFinalTotal = Math.max(0, rawSubtotal - discountAmount);
      const formattedTotal = formatPrice(currentFinalTotal);

      // Actualizar datos del comprador en el modal
      const buyerNameEl = document.getElementById("gateway-buyer-name");
      const buyerEmailEl = document.getElementById("gateway-buyer-email");
      if (buyerNameEl) buyerNameEl.textContent = user.name || "Jugador";
      if (buyerEmailEl) buyerEmailEl.textContent = `(${user.email || ""})`;

      // Actualizar montos en la pasarela
      const gSubtotalEl = document.getElementById("g-subtotal");
      const gTotalEl = document.getElementById("g-total");
      const payAmountLabels = document.querySelectorAll(".btn-pay-amount");
      if (gSubtotalEl) gSubtotalEl.textContent = formatPrice(rawSubtotal);
      if (gTotalEl) gTotalEl.textContent = formattedTotal;
      payAmountLabels.forEach((el) => {
        el.textContent = formattedTotal;
      });

      // Pre-cargar nombre en tarjeta
      const cardNameInput = document.getElementById("card-name-input");
      if (cardNameInput && user.name) {
        cardNameInput.value = user.name;
      }

      // Pre-cargar preview de items
      const previewEl = document.getElementById("gateway-items-preview");
      if (previewEl) {
        previewEl.innerHTML = cart
          .map((item) => {
            const game = allGames.find((p) => p.id === item.productId);
            if (!game) return "";
            const dlcPart = item.hasDlc && game.dlcs && game.dlcs.length ? ` + DLC ${game.dlcs[0].title}` : "";
            return `
              <div class="gateway-item-row">
                <img src="${game.image}" alt="${game.title}" class="gateway-item-thumb" />
                <div class="gateway-item-meta">
                  <p class="gateway-item-name">${game.title}${dlcPart}</p>
                  <p class="gateway-item-qty">Cantidad: 1 · Digital</p>
                </div>
                <span class="gateway-item-price">${formatPrice(game.price + (item.hasDlc && game.dlcs && game.dlcs.length ? game.dlcs[0].price : 0))}</span>
              </div>
            `;
          })
          .join("");
      }

      // Recompensa de monedas
      const coinsTextEl = document.getElementById("gateway-coins-text");
      if (coinsTextEl) {
        coinsTextEl.textContent = `¡Ganarás +${cart.length} moneda(s) arcade para la Mystery Loot Box!`;
      }

      // Restablecer vistas del modal al paso 1 (pago)
      switchGatewayView("payment");
      setCheckoutStep(2);

      if (modalGateway) {
        modalGateway.hidden = false;
        document.body.style.overflow = "hidden";
      }
    }

    function closeCheckoutModal() {
      if (paymentTimerId) {
        clearTimeout(paymentTimerId);
        paymentTimerId = null;
      }
      if (modalGateway) {
        modalGateway.hidden = true;
        document.body.style.overflow = "";
      }
      setCheckoutStep(1);
    }

    function switchGatewayView(viewName) {
      const viewPayment = document.getElementById("gateway-view-payment");
      const viewProcessing = document.getElementById("gateway-view-processing");
      const viewSuccess = document.getElementById("gateway-view-success");

      if (viewPayment) viewPayment.hidden = viewName !== "payment";
      if (viewProcessing) viewProcessing.hidden = viewName !== "processing";
      if (viewSuccess) viewSuccess.hidden = viewName !== "success";
    }

    // Pestañas de método de pago (ATH Móvil, Tarjeta, PayPal)
    const tabs = document.querySelectorAll(".gateway-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");

        const method = tab.getAttribute("data-method");
        activePaymentMethod = method;

        const panelAth = document.getElementById("panel-pay-ath");
        const panelCard = document.getElementById("panel-pay-card");
        const panelPaypal = document.getElementById("panel-pay-paypal");

        if (panelAth) {
          panelAth.hidden = method !== "ath";
          panelAth.classList.toggle("is-active", method === "ath");
        }
        if (panelCard) {
          panelCard.hidden = method !== "card";
          panelCard.classList.toggle("is-active", method === "card");
        }
        if (panelPaypal) {
          panelPaypal.hidden = method !== "paypal";
          panelPaypal.classList.toggle("is-active", method === "paypal");
        }
      });
    });

    // Formateo automático de teléfono ATH Móvil: (787) 555-0199
    const athPhoneInput = document.getElementById("ath-phone-input");
    if (athPhoneInput) {
      athPhoneInput.addEventListener("input", (e) => {
        let digits = e.target.value.replace(/\D/g, "");
        if (digits.length > 10) digits = digits.slice(0, 10);
        let formatted = "";
        if (digits.length > 0) {
          formatted = "(" + digits.slice(0, 3);
        }
        if (digits.length >= 4) {
          formatted += ") " + digits.slice(3, 6);
        }
        if (digits.length >= 7) {
          formatted += "-" + digits.slice(6, 10);
        }
        e.target.value = formatted;
      });
    }

    // Formateo de número de tarjeta: 4532 0000 0000 0000
    const cardNumberInput = document.getElementById("card-number-input");
    if (cardNumberInput) {
      cardNumberInput.addEventListener("input", (e) => {
        let v = e.target.value.replace(/\D/g, "").slice(0, 16);
        let matches = v.match(/\d{4,16}/g);
        let match = (matches && matches[0]) || "";
        let parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
          parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
          e.target.value = parts.join(" ");
        } else {
          e.target.value = v;
        }
      });
    }

    // Formateo de fecha de expiración: MM/AA
    const cardExpInput = document.getElementById("card-exp-input");
    if (cardExpInput) {
      cardExpInput.addEventListener("input", (e) => {
        let v = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (v.length >= 2) {
          e.target.value = v.slice(0, 2) + "/" + v.slice(2);
        } else {
          e.target.value = v;
        }
      });
    }

    // Ejecución y confirmación del pago
    function executeOrderSuccess() {
      const user = getActiveUser() || { name: "Jugador", email: "jugador@vejigames.com" };
      const baseGamesCount = currentCartForKeys.length;
      const currentCoins = getLootCoins();
      const newCoins = currentCoins + baseGamesCount;
      saveLootCoins(newCoins);

      // Vaciar carrito
      saveCartToStorage([]);
      window._activeLootCoupon = null;
      renderCart();
      updateHeaderCartCount();

      // Generar orden aleatoria y claves digitales
      const orderId = `#VG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderIdEl = document.getElementById("success-order-id");
      const userEmailEl = document.getElementById("success-user-email");
      const coinsTitleEl = document.getElementById("success-coins-title");

      if (orderIdEl) orderIdEl.textContent = orderId;
      if (userEmailEl) userEmailEl.textContent = user.email || "tu correo registrado";
      if (coinsTitleEl) {
        coinsTitleEl.textContent = `¡Has ganado +${baseGamesCount} moneda(s) arcade para la Ruleta!`;
      }

      // Generar claves para cada juego comprado
      const allGames = typeof ALL_PRODUCTS !== "undefined" ? ALL_PRODUCTS : PRODUCTS;
      const keysContainer = document.getElementById("success-keys-list");
      if (keysContainer) {
        keysContainer.innerHTML = currentCartForKeys
          .map((item) => {
            const game = allGames.find((p) => p.id === item.productId);
            const prefix = (game ? game.title.replace(/[^A-Za-z]/g, "").slice(0, 4) : "GAME").toUpperCase();
            const r1 = Math.floor(1000 + Math.random() * 9000);
            const r2 = Math.floor(1000 + Math.random() * 9000);
            const gameKey = `VG-${prefix}-${r1}-${r2}-PR`;

            let dlcKeyHTML = "";
            if (item.hasDlc && game && game.dlcs && game.dlcs.length) {
              const dlc = game.dlcs[0];
              const dlcPrefix = (dlc.title.replace(/[^A-Za-z]/g, "").slice(0, 4) || "DLC").toUpperCase();
              const dlcR1 = Math.floor(1000 + Math.random() * 9000);
              const dlcKey = `VG-DLC-${dlcPrefix}-${dlcR1}-PR`;
              dlcKeyHTML = `
                <div class="key-card-item">
                  <span class="key-game-name">↳ DLC: ${dlc.title}</span>
                  <div class="key-code-wrap">
                    <code class="key-code-display">${dlcKey}</code>
                    <button type="button" class="btn-copy-key" onclick="window.NexoShop.copyKey('${dlcKey}', this)">Copiar</button>
                  </div>
                </div>
              `;
            }

            return `
              <div class="key-card-item">
                <span class="key-game-name">🎮 ${game ? game.title : "Juego Digital"}</span>
                <div class="key-code-wrap">
                  <code class="key-code-display">${gameKey}</code>
                  <button type="button" class="btn-copy-key" onclick="window.NexoShop.copyKey('${gameKey}', this)">Copiar</button>
                </div>
              </div>
              ${dlcKeyHTML}
            `;
          })
          .join("");
      }

      // Mostrar pantalla de éxito
      switchGatewayView("success");
      setCheckoutStep(3);
    }

    function startProcessingPayment(methodName) {
      switchGatewayView("processing");

      const titleEl = document.getElementById("processing-title");
      const descEl = document.getElementById("processing-desc");
      const amountTextEl = document.getElementById("processing-amount-text");
      const formattedTotal = formatPrice(currentFinalTotal);

      if (amountTextEl) amountTextEl.textContent = formattedTotal;

      if (methodName === "ath") {
        if (titleEl) titleEl.textContent = "Esperando autorización de ATH Móvil...";
        if (descEl) {
          descEl.innerHTML = `Revisa tu teléfono móvil. Hemos enviado la solicitud por <strong>${formattedTotal}</strong> a tu app de ATH Móvil para autorizar a <strong>VejiGames Business</strong>.`;
        }
      } else if (methodName === "card") {
        if (titleEl) titleEl.textContent = "Cifrando y verificando tarjeta...";
        if (descEl) {
          descEl.innerHTML = `Conectando con tu banco emisor para autorizar el cargo seguro de <strong>${formattedTotal}</strong>...`;
        }
      } else {
        if (titleEl) titleEl.textContent = "Conectando con pasarela PayPal...";
        if (descEl) {
          descEl.innerHTML = `Autorizando transacción segura por <strong>${formattedTotal}</strong>...`;
        }
      }

      // Simulación automática de confirmación tras 2.8s
      paymentTimerId = setTimeout(() => {
        executeOrderSuccess();
      }, 2800);
    }

    // Botón Pagar con ATH Móvil
    const btnSubmitAth = document.getElementById("btn-submit-ath");
    if (btnSubmitAth) {
      btnSubmitAth.addEventListener("click", () => {
        const phone = (athPhoneInput ? athPhoneInput.value : "").replace(/\D/g, "");
        if (phone.length < 10) {
          alert("Por favor ingresa un número de teléfono válido de Puerto Rico con código de área (787 o 939).");
          if (athPhoneInput) athPhoneInput.focus();
          return;
        }
        startProcessingPayment("ath");
      });
    }

    // Botón Pagar con Tarjeta
    const btnSubmitCard = document.getElementById("btn-submit-card");
    if (btnSubmitCard) {
      btnSubmitCard.addEventListener("click", () => {
        const cardNum = (cardNumberInput ? cardNumberInput.value : "").replace(/\D/g, "");
        if (cardNum.length < 15) {
          alert("Por favor introduce un número de tarjeta válido de 16 dígitos.");
          if (cardNumberInput) cardNumberInput.focus();
          return;
        }
        startProcessingPayment("card");
      });
    }

    // Botón Pagar con PayPal
    const btnSubmitPaypal = document.getElementById("btn-submit-paypal");
    if (btnSubmitPaypal) {
      btnSubmitPaypal.addEventListener("click", () => {
        startProcessingPayment("paypal");
      });
    }

    // Botón de demostración rápida para ATH Móvil
    const btnSimulateAth = document.getElementById("btn-simulate-ath-confirm");
    if (btnSimulateAth) {
      btnSimulateAth.addEventListener("click", () => {
        if (paymentTimerId) clearTimeout(paymentTimerId);
        executeOrderSuccess();
      });
    }

    // Botón principal de checkout del carrito
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        const cart = getCartFromStorage();
        if (cart.length === 0) {
          alert("Tu carrito está vacío. Agrega juegos del catálogo para continuar.");
          return;
        }

        const user = getActiveUser();
        if (!user) {
          openAuthModal();
          return;
        }

        openCheckoutModal();
      });
    }

    // Métodos públicos del checkout
    window.NexoShop.openCheckoutModal = openCheckoutModal;
    window.NexoShop.closeCheckoutModal = closeCheckoutModal;
    window.NexoShop.openAuthModal = openAuthModal;
    window.NexoShop.closeAuthModal = closeAuthModal;
    window.NexoShop.copyKey = function (code, btn) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code);
      }
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = "¡Copiado! ✓";
        btn.style.borderColor = "var(--cart-lime, #d5ff52)";
        btn.style.color = "var(--cart-lime, #d5ff52)";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.borderColor = "";
          btn.style.color = "";
        }, 2200);
      }
    };

    window.NexoShop.renderCart = renderCart;
    renderCart();
    updateCartAuthStatus();
  }

  // =========================================================
  // GESTIÓN DE MONEDAS ARCADE (MYSTERY LOOT BOX)
  // Regla: 1 moneda de regalo inicial. Cada juego comprado otorga +1 moneda.
  // Los DLC no otorgan monedas.
  // =========================================================
  function getLootCoins() {
    try {
      const stored = localStorage.getItem("vejigames_coins") || localStorage.getItem("isla_gaming_coins");
      if (stored === null) {
        localStorage.setItem("vejigames_coins", "1");
        return 1;
      }
      const val = parseInt(stored, 10);
      return Number.isNaN(val) ? 1 : Math.max(0, val);
    } catch (e) {
      return 1;
    }
  }

  function saveLootCoins(count) {
    try {
      localStorage.setItem("vejigames_coins", Math.max(0, count).toString());
    } catch (e) {}
  }

  // Sonidos Retro 8-bit sintetizados con Web Audio API
  function playArcadeAudio(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === "coin") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "tick") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(440 + Math.random() * 200, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "victory") {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.18, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.28);
        });
      }
    } catch (e) {}
  }

  // =========================================================
  // CONTROLADOR DEL MINIJUEGO: MYSTERY LOOT BOX
  // =========================================================
  // RULETA ARCADE DE LA SUERTE & RECOMPENSAS
  // =========================================================
  function initLootBox() {
    const section = document.getElementById("ruleta") || document.getElementById("arcade-lootbox");
    if (!section) return;

    const coinsDisplay = document.getElementById("lootbox-coins");
    const openBtn = document.getElementById("btn-open-lootbox");
    const hintEl = document.getElementById("lootbox-hint");
    const wheelDisc = document.getElementById("ruleta-wheel-disc");
    const pointer = document.getElementById("ruleta-pointer");
    const promptText = document.getElementById("lootbox-prompt");
    const rewardCard = document.getElementById("lootbox-reward");
    const rewardBadge = document.getElementById("reward-type-badge");
    const rewardTitle = document.getElementById("reward-title");
    const rewardDesc = document.getElementById("reward-desc");
    const rewardCodeBox = document.getElementById("reward-code-box");
    const rewardCodeVal = document.getElementById("reward-code-val");
    const copyBtn = document.getElementById("btn-copy-reward");
    const copyMsg = document.getElementById("copy-msg");

    // 8 Sectores en la rueda (45° por sector, Sector 0 centrado a 0° / 12 en punto)
    const WHEEL_SECTORS = [
      {
        index: 0,
        badge: "★ JACKPOT LEGENDARIO · 5% PROB ★",
        title: "50% DE DESCUENTO (MITAD DE PRECIO)",
        desc: "¡PREMIO MÁXIMO! ¡Has sacado el Jackpot del 50%! Paga la mitad exacta en tu próxima compra.",
        code: "ISLA50",
        isCoin: false
      },
      {
        index: 1,
        badge: "DROP COMÚN · 50% PROB",
        title: "5% DE DESCUENTO",
        desc: "¡Buen tiro! Código válido para un 5% de descuento directo en cualquier compra del carrito.",
        code: "ISLA5",
        isCoin: false
      },
      {
        index: 2,
        badge: "DROP RARO · 30% PROB",
        title: "15% DE DESCUENTO",
        desc: "¡Gran premio! Ahorra un 15% en el total de tu orden al canjearlo en el carrito.",
        code: "ISLA15",
        isCoin: false
      },
      {
        index: 3,
        badge: "DROP EXTRA · TIRO GRATIS",
        title: "+1 🪙 MONEDA ARCADE",
        desc: "¡La ruleta te devuelve la suerte! Has ganado +1 moneda para volver a girar.",
        code: "TIRO-GRATIS",
        isCoin: true
      },
      {
        index: 4,
        badge: "DROP ÉPICO · 15% PROB",
        title: "25% DE DESCUENTO",
        desc: "¡Tiro de élite! Un cuarto de descuento (25% OFF) para cualquier videojuego de la tienda.",
        code: "ISLA25",
        isCoin: false
      },
      {
        index: 5,
        badge: "DROP COMÚN · 50% PROB",
        title: "5% DE DESCUENTO",
        desc: "¡Buen tiro! Código válido para un 5% de descuento directo en cualquier compra del carrito.",
        code: "ISLA5",
        isCoin: false
      },
      {
        index: 6,
        badge: "DROP RARO · 30% PROB",
        title: "15% DE DESCUENTO",
        desc: "¡Gran premio! Ahorra un 15% en el total de tu orden al canjearlo en el carrito.",
        code: "ISLA15",
        isCoin: false
      },
      {
        index: 7,
        badge: "DROP EXTRA · TIRO GRATIS",
        title: "+1 🪙 MONEDA ARCADE",
        desc: "¡La ruleta te devuelve la suerte! Has ganado +1 moneda para volver a girar.",
        code: "TIRO-GRATIS",
        isCoin: true
      }
    ];

    let currentRotation = 0;
    let isSpinning = false;

    function updateCoinsUI() {
      const coins = getLootCoins();
      if (coinsDisplay) {
        coinsDisplay.textContent = coins;
        coinsDisplay.classList.remove("coin-bump");
        void coinsDisplay.offsetWidth;
        coinsDisplay.classList.add("coin-bump");
      }

      if (openBtn) {
        if (coins > 0) {
          openBtn.disabled = isSpinning;
          openBtn.innerHTML = `<span class="btn-coin-anim">🪙</span> INSERT COIN · GIRAR RULETA`;
          if (hintEl) {
            hintEl.textContent = `Tienes ${coins} moneda(s). Presiona para usar 1 y girar la ruleta.`;
          }
        } else {
          openBtn.disabled = true;
          openBtn.innerHTML = `🔒 SIN MONEDAS · COMPRA UN JUEGO PARA GANAR +1`;
          if (hintEl) {
            hintEl.textContent = `Ganas +1 moneda por cada juego base comprado (los DLC no generan monedas).`;
          }
        }
      }
    }

    updateCoinsUI();

    if (openBtn) {
      openBtn.addEventListener("click", () => {
        if (isSpinning) return;
        const coins = getLootCoins();
        if (coins <= 0) return;

        isSpinning = true;
        openBtn.disabled = true;

        // Descontar moneda y guardar
        saveLootCoins(coins - 1);
        updateCoinsUI();
        playArcadeAudio("coin");

        if (promptText) {
          promptText.textContent = "🎰 ¡RULETA EN MOVIMIENTO!...";
        }
        if (rewardCard) {
          rewardCard.style.display = "none";
        }
        if (copyMsg) {
          copyMsg.style.display = "none";
        }

        // Selección ponderada de sector
        // 5% Jackpot (Sector 0)
        // 10% Épico 25% (Sector 4)
        // 20% Raro 15% (Sectores 2 o 6)
        // 15% Moneda +1 (Sectores 3 o 7)
        // 50% Común 5% (Sectores 1 o 5)
        const roll = Math.random() * 100;
        let chosenSectorIndex = 1;

        if (roll < 5) {
          chosenSectorIndex = 0; // 50% Jackpot
        } else if (roll < 15) {
          chosenSectorIndex = 4; // 25% Épico
        } else if (roll < 35) {
          chosenSectorIndex = Math.random() < 0.5 ? 2 : 6; // 15% Raro
        } else if (roll < 50) {
          chosenSectorIndex = Math.random() < 0.5 ? 3 : 7; // +1 Moneda
        } else {
          chosenSectorIndex = Math.random() < 0.5 ? 1 : 5; // 5% Común
        }

        const prize = WHEEL_SECTORS[chosenSectorIndex];

        // Cálculo de rotación exacta:
        // Sector S se alinea con el puntero superior (0°) cuando rotación = (360 - S * 45) mod 360
        // Le añadimos un jitter seguro (-10° a +10°) para que se detenga de forma orgánica dentro del sector
        const jitter = (Math.random() - 0.5) * 20;
        const targetSectorAngle = (360 - chosenSectorIndex * 45 + jitter + 360) % 360;

        const currentMod = currentRotation % 360;
        let delta = targetSectorAngle - currentMod;
        if (delta < 0) delta += 360;

        // Dar entre 5 y 6 vueltas completas adicionales
        const fullSpins = (5 + Math.floor(Math.random() * 2)) * 360;
        const nextRotation = currentRotation + fullSpins + delta;
        currentRotation = nextRotation;

        if (wheelDisc) {
          wheelDisc.style.transform = `rotate(${currentRotation}deg)`;
        }

        // Simulación de tics del puntero sonoros y visuales
        let tickTime = 60;
        let tickTimer = null;
        const startTime = Date.now();
        const duration = 4500;

        function runTick() {
          const elapsed = Date.now() - startTime;
          if (elapsed >= duration) return;

          if (pointer) {
            pointer.classList.add("pointer-tick");
            setTimeout(() => pointer.classList.remove("pointer-tick"), 40);
          }
          playArcadeAudio("tick");

          // Reducir la frecuencia del tic conforme la rueda desacelera
          const progress = elapsed / duration;
          tickTime = 60 + Math.pow(progress, 2.5) * 400;
          tickTimer = setTimeout(runTick, tickTime);
        }
        runTick();

        // Fin del giro a los 4.5 segundos
        setTimeout(() => {
          if (tickTimer) clearTimeout(tickTimer);
          isSpinning = false;

          // Si ganó moneda, devolvérsela
          if (prize.isCoin) {
            const currentCoins = getLootCoins();
            saveLootCoins(currentCoins + 1);
            updateCoinsUI();
          }

          if (promptText) {
            promptText.textContent = prize.isCoin ? "¡MONEDA DEVUELTA! ¡SIGUE JUGANDO!" : "¡PREMIO OBTENIDO!";
          }

          if (rewardCard) {
            rewardCard.style.display = "flex";
            if (rewardBadge) rewardBadge.textContent = prize.badge;
            if (rewardTitle) rewardTitle.textContent = prize.title;
            if (rewardDesc) rewardDesc.textContent = prize.desc;

            if (rewardCodeBox) {
              if (prize.isCoin) {
                rewardCodeBox.style.display = "none";
              } else {
                rewardCodeBox.style.display = "flex";
                if (rewardCodeVal) rewardCodeVal.textContent = prize.code;
              }
            }
          }

          playArcadeAudio("victory");
          updateCoinsUI();
        }, 4600);
      });
    }

    if (copyBtn && rewardCodeVal) {
      copyBtn.addEventListener("click", () => {
        const code = rewardCodeVal.textContent.trim();
        if (!code) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(() => {
            copyBtn.textContent = "¡COPIADO! ✓";
            if (copyMsg) copyMsg.style.display = "block";
            setTimeout(() => {
              copyBtn.textContent = "📋 COPIAR";
            }, 2500);
          }).catch(() => {
            fallbackCopy(code);
          });
        } else {
          fallbackCopy(code);
        }
      });
    }

    function fallbackCopy(text) {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      if (copyBtn) copyBtn.textContent = "¡COPIADO! ✓";
      if (copyMsg) copyMsg.style.display = "block";
      setTimeout(() => {
        if (copyBtn) copyBtn.textContent = "📋 COPIAR";
      }, 2500);
    }
  }

  // =========================================================
  // GESTIÓN DE TÉRMINOS Y CONDICIONES (terms.html)
  // Fiel al comportamiento oficial de NexoPlay
  // =========================================================
  function initTermsPage() {
    const sections = Array.from(document.querySelectorAll(".terms-section"));
    if (!sections.length) return;

    const links = Array.from(document.querySelectorAll("[data-spy]"));
    const bar = document.querySelector(".terms-progress span");
    const current = document.querySelector(".terms-current");
    const content = document.querySelector(".terms-content");
    const toTop = document.getElementById("terms-back-to-top") || document.querySelector(".back-to-top");

    let lockUntil = 0;
    function setActive(id, force) {
      if (!force && Date.now() < lockUntil) return;
      links.forEach((a) => a.classList.toggle("is-active", a.dataset.spy === id));
      sections.forEach((s) => s.classList.toggle("is-active", s.id === id));
      const sec = document.getElementById(id);
      if (sec && current) {
        const h2 = sec.querySelector("h2");
        if (h2) current.textContent = h2.textContent;
      }
    }

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) setActive(en.target.id);
          });
        },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      sections.forEach((s) => io.observe(s));
    }

    function progress() {
      if (content && bar) {
        const r = content.getBoundingClientRect();
        const total = r.height - window.innerHeight * 0.5;
        const done = Math.min(Math.max((window.innerHeight * 0.5 - r.top) / total, 0), 1);
        bar.style.transform = `scaleY(${done})`;
      }
      if (toTop) {
        toTop.classList.toggle("is-visible", window.scrollY > 400);
      }
    }

    window.addEventListener("scroll", progress, { passive: true });
    progress();

    // Destacar la sección al llegar desde un enlace o ancla
    function flash(explicitId) {
      const id = explicitId || (window.location.hash ? window.location.hash.slice(1) : "");
      const sec = id && document.getElementById(id);
      if (!sec || !sec.classList.contains("terms-section")) return;
      sec.classList.remove("is-flash");
      void sec.offsetWidth;
      sec.classList.add("is-flash");
      setActive(id, true);
      lockUntil = Date.now() + 1200;
    }

    function navigateToSection(id, smooth = true) {
      if (!id) return;
      const sec = document.getElementById(id);
      if (!sec) return;
      sec.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      flash(id);
    }

    window.addEventListener("hashchange", () => {
      const id = window.location.hash.slice(1);
      if (id) {
        navigateToSection(id, true);
      }
    });

    // Clic en los enlaces del menú de términos
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.dataset.spy || link.getAttribute("href")?.replace("#", "");
        if (!targetId) return;
        const sec = document.getElementById(targetId);
        if (sec) {
          e.preventDefault();
          if (history.pushState) {
            history.pushState(null, "", `#${targetId}`);
          } else {
            window.location.hash = targetId;
          }
          navigateToSection(targetId, true);
        }
      });
    });

    // Si la página se carga con un ancla (#cookies, #privacidad, etc.)
    if (window.location.hash) {
      const hashId = window.location.hash.slice(1);
      flash(hashId);
      setTimeout(() => {
        navigateToSection(hashId, false);
      }, 80);
      setTimeout(() => {
        navigateToSection(hashId, true);
      }, 350);
    }

    // Botón volver arriba
    if (toTop) {
      toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  // =========================================================
  // GESTIÓN DE CUENTA Y REGISTRO (account.html)
  // =========================================================
  function initAccountPage() {
    const card = document.querySelector(".account-card");
    if (!card) return;

    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const viewLogin = document.getElementById("view-login");
    const viewRegister = document.getElementById("view-register");
    const viewProfile = document.getElementById("view-profile");
    const modeTabs = document.querySelector(".account-mode-tabs");

    const linkGoRegister = document.getElementById("link-go-register");
    const linkGoLogin = document.getElementById("link-go-login");

    const heroTitle = document.querySelector(".account-hero-title");
    const heroDesc = document.querySelector(".account-hero-desc");

    const formLogin = document.getElementById("account-login-form");
    const formRegister = document.getElementById("account-register-form");

    const loginAlert = document.getElementById("login-alert");
    const registerAlert = document.getElementById("register-alert");

    const btnLogout = document.getElementById("account-btn-logout");
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const profileAvatar = document.getElementById("profile-avatar");
    const profileCartCount = document.getElementById("profile-cart-count");

    function getSavedUser() {
      try {
        const raw = localStorage.getItem("vejigames_user") || localStorage.getItem("isla_gaming_user");
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    }

    function saveUser(user) {
      try {
        localStorage.setItem("vejigames_user", JSON.stringify(user));
      } catch (e) {}
      updateHeaderUser();
    }

    function clearUser() {
      try {
        localStorage.removeItem("vejigames_user");
        localStorage.removeItem("isla_gaming_user");
      } catch (e) {}
      updateHeaderUser();
    }

    function showAlert(el, msg, type = "error") {
      if (!el) return;
      el.textContent = msg;
      el.className = `account-alert is-${type}`;
      el.hidden = false;
    }

    function clearAlert(el) {
      if (!el) return;
      el.textContent = "";
      el.hidden = true;
    }

    function switchMode(mode) {
      clearAlert(loginAlert);
      clearAlert(registerAlert);

      const currentUser = getSavedUser();
      if (mode === "profile" && currentUser) {
        if (modeTabs) modeTabs.hidden = true;
        if (viewLogin) viewLogin.hidden = true;
        if (viewRegister) viewRegister.hidden = true;
        if (viewProfile) {
          viewProfile.hidden = false;
          if (profileName) profileName.textContent = currentUser.name || "Jugador";
          if (profileEmail) profileEmail.textContent = currentUser.email || "jugador@isla.pr";
          if (profileAvatar) {
            const initials = (currentUser.name || "PR")
              .split(" ")
              .filter(Boolean)
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            profileAvatar.textContent = initials || "PR";
          }
          if (profileCartCount && typeof getCartFromStorage === "function") {
            const cart = getCartFromStorage();
            profileCartCount.textContent = cart.length;
          }
        }
        if (heroTitle) heroTitle.innerHTML = `¡Hola,<br>${currentUser.name || "Jugador"}!`;
        if (heroDesc) heroDesc.textContent = "Accede a tus juegos, claves descargables y pedidos activos en Puerto Rico.";
        return;
      }

      if (modeTabs) modeTabs.hidden = false;
      if (viewProfile) viewProfile.hidden = true;

      if (mode === "register") {
        if (tabRegister) {
          tabRegister.classList.add("is-active");
          tabRegister.setAttribute("aria-selected", "true");
        }
        if (tabLogin) {
          tabLogin.classList.remove("is-active");
          tabLogin.setAttribute("aria-selected", "false");
        }
        if (viewLogin) viewLogin.hidden = true;
        if (viewRegister) viewRegister.hidden = false;
        if (heroTitle) heroTitle.innerHTML = "Empieza tu<br>próxima<br>aventura.";
        if (heroDesc) heroDesc.textContent = "Crea tu cuenta gratis, guarda tus juegos favoritos y recibe ofertas exclusivas en Puerto Rico.";
      } else {
        if (tabLogin) {
          tabLogin.classList.add("is-active");
          tabLogin.setAttribute("aria-selected", "true");
        }
        if (tabRegister) {
          tabRegister.classList.remove("is-active");
          tabRegister.setAttribute("aria-selected", "false");
        }
        if (viewRegister) viewRegister.hidden = true;
        if (viewLogin) viewLogin.hidden = false;
        if (heroTitle) heroTitle.innerHTML = "Vuelve a tu<br>próxima<br>aventura.";
        if (heroDesc) heroDesc.textContent = "Accede a tus juegos, revisa tus pedidos y vuelve a descargar tus claves cuando quieras.";
      }
    }

    // Botones de mostrar / ocultar contraseña
    document.querySelectorAll(".account-toggle-pwd").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) return;
        if (input.type === "password") {
          input.type = "text";
          btn.textContent = "Ocultar";
        } else {
          input.type = "password";
          btn.textContent = "Mostrar";
        }
      });
    });

    // Pestañas
    if (tabLogin) {
      tabLogin.addEventListener("click", () => {
        if (history.replaceState) history.replaceState(null, "", "#login");
        switchMode("login");
      });
    }
    if (tabRegister) {
      tabRegister.addEventListener("click", () => {
        if (history.replaceState) history.replaceState(null, "", "#register");
        switchMode("register");
      });
    }

    // Enlaces inferiores de alternar
    if (linkGoRegister) {
      linkGoRegister.addEventListener("click", (e) => {
        e.preventDefault();
        if (history.replaceState) history.replaceState(null, "", "#register");
        switchMode("register");
      });
    }
    if (linkGoLogin) {
      linkGoLogin.addEventListener("click", (e) => {
        e.preventDefault();
        if (history.replaceState) history.replaceState(null, "", "#login");
        switchMode("login");
      });
    }

    // Envío del formulario de Registro
    if (formRegister) {
      formRegister.addEventListener("submit", (e) => {
        e.preventDefault();
        clearAlert(registerAlert);

        const name = (document.getElementById("register-name")?.value || "").trim();
        const email = (document.getElementById("register-email")?.value || "").trim().toLowerCase();
        const password = document.getElementById("register-password")?.value || "";
        const passwordConfirm = document.getElementById("register-password-confirm")?.value || "";
        const termsChecked = document.getElementById("register-terms")?.checked;

        if (name.length < 2) {
          showAlert(registerAlert, "Por favor escribe tu nombre o Gamertag (mínimo 2 caracteres).");
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showAlert(registerAlert, "Introduce un correo electrónico válido.");
          return;
        }

        if (password.length < 6) {
          showAlert(registerAlert, "La contraseña debe tener al menos 6 caracteres.");
          return;
        }

        if (password !== passwordConfirm) {
          showAlert(registerAlert, "Las contraseñas no coinciden. Verifícalas.");
          return;
        }

        if (!termsChecked) {
          showAlert(registerAlert, "Debes aceptar los términos y condiciones para continuar.");
          return;
        }

        const newUser = {
          name,
          email,
          createdAt: new Date().toISOString()
        };
        saveUser(newUser);

        showAlert(registerAlert, `¡Cuenta creada con éxito! Bienvenido, ${name}.`, "success");

        setTimeout(() => {
          const redirect = new URLSearchParams(window.location.search).get("redirect");
          if (redirect) {
            window.location.href = redirect;
          } else {
            switchMode("profile");
          }
        }, 700);
      });
    }

    // Envío del formulario de Login
    if (formLogin) {
      formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        clearAlert(loginAlert);

        const email = (document.getElementById("account-email")?.value || "").trim().toLowerCase();
        const password = document.getElementById("account-password")?.value || "";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showAlert(loginAlert, "Introduce un correo electrónico válido.");
          return;
        }

        if (!password) {
          showAlert(loginAlert, "Por favor introduce tu contraseña.");
          return;
        }

        let user = getSavedUser();
        if (!user || user.email !== email) {
          const inferredName = email.split("@")[0];
          user = {
            name: inferredName.charAt(0).toUpperCase() + inferredName.slice(1),
            email,
            createdAt: new Date().toISOString()
          };
          saveUser(user);
        }

        showAlert(loginAlert, `¡Sesión iniciada con éxito! Bienvenido de nuevo, ${user.name}.`, "success");

        setTimeout(() => {
          const redirect = new URLSearchParams(window.location.search).get("redirect");
          if (redirect) {
            window.location.href = redirect;
          } else {
            switchMode("profile");
          }
        }, 500);
      });
    }

    // Olvidó contraseña (demo feedback)
    const linkForgot = document.getElementById("account-link-forgot");
    if (linkForgot) {
      linkForgot.addEventListener("click", (e) => {
        e.preventDefault();
        const email = (document.getElementById("account-email")?.value || "").trim();
        if (email) {
          showAlert(loginAlert, `Hemos enviado un enlace de recuperación a ${email}.`, "success");
        } else {
          showAlert(loginAlert, "Escribe tu correo arriba y vuelve a hacer clic para recibir el enlace de recuperación.");
        }
      });
    }

    // Botón Cerrar Sesión
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        clearUser();
        switchMode("login");
      });
    }

    // Inicializar estado según URL hash o sesión activa
    const activeUser = getSavedUser();
    const hash = window.location.hash.toLowerCase();
    if (activeUser && hash !== "#login" && hash !== "#register" && hash !== "#crear-cuenta") {
      switchMode("profile");
    } else if (hash === "#register" || hash === "#crear-cuenta") {
      switchMode("register");
    } else {
      switchMode("login");
    }
  }

  // API pública en memoria
  window.NexoShop = {
    goToProduct(productId, event) {
      if (event && event.target && event.target.closest(".btn-add-cart")) return;
      if (productId) {
        window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
      }
    },
    addToCart(productId, hasDlc = false, event = null) {
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
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
  window.VejiGames = window.NexoShop;
  window.IslaGaming = window.NexoShop;
  window.BorikenShop = window.NexoShop;

  // Inicialización al cargar el DOM
  function initAll() {
    initStarfield();
    initHeader();
    initFooter();
    initHeroCarousel();
    initHeroTypewriter();
    initOffersMarquee();
    initLootBox();
    initCatalog();
    initProductPage();
    initCartPage();
    initTermsPage();
    initAccountPage();
    updateHeaderUser();
    initScrollReveals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
