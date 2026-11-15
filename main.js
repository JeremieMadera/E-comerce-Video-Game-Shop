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
      <a href="index.html" class="brand-logo" aria-label="Ir a la página principal de VEJIGAMES">
        <img src="Assets/icons/Vejigante_mask_color.svg" alt="VEJIGAMES Logo" class="brand-logo-img" width="38" height="50" />
        <span>VEJIGAMES</span>
      </a>

      <div class="navbar-right">
        <div class="search-box">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="navbar-search-input" placeholder="Busca tu próxima aventura" aria-label="Buscar videojuegos en la tienda" />
          <span class="cmd-badge" aria-hidden="true">&#8984; K</span>
        </div>

        <div class="user-menu">
          <a href="account.html" class="account-btn" aria-label="Mi cuenta de jugador">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Mi cuenta</span>
          </a>

          <a href="cart.html" class="cart-btn" aria-label="Ver carrito de compras">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span class="cart-count" id="header-cart-badge" aria-label="0 artículos en el carrito">0</span>
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
    <img src="Assets/icons/Vejigante_mask_color.svg" alt="VEJIGAMES Logo" class="footer-logo-img" width="30" height="38" />
    <span>VEJIGAMES</span>
  </h2>
  <p>La tienda #1 de la Isla · San Juan, Puerto Rico.</p>
  <div class="footer-social-icons" aria-label="Comunidad y redes sociales">
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon-item" aria-label="Síguenos en Instagram" title="Instagram">
      <img src="Assets/icons/instagram.png" alt="Instagram" class="social-icon-img" loading="lazy" decoding="async" width="24" height="24" />
    </a>
    <a href="https://discord.com" target="_blank" rel="noopener noreferrer" class="social-icon-item" aria-label="Únete a nuestro servidor de Discord" title="Discord">
      <img src="Assets/icons/discord.png" alt="Discord" class="social-icon-img" loading="lazy" decoding="async" width="24" height="24" />
    </a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-icon-item" aria-label="Visita nuestro canal de YouTube" title="YouTube">
      <img src="Assets/icons/youtube.png" alt="YouTube" class="social-icon-img" loading="lazy" decoding="async" width="24" height="24" />
    </a>
  </div>

  <h3>Explora</h3>
  <nav aria-label="Enlaces de navegación del pie de página">
    <a href="index.html#hero-carousel">Inicio</a> ·
    <a href="index.html#ofertas">Ofertas</a> ·
    <a href="index.html#catalog">Catálogo</a> ·
    <a href="index.html#ruleta">Ruleta</a>
  </nav>

  <h3>Estamos al otro lado</h3>
  <p><a href="mailto:apoyo@vejigames.com" style="color: inherit; text-decoration: none;">apoyo@vejigames.com</a></p>
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
    if (!document.querySelector('link[href*="nav-bar"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "Features/NavBar/nav-bar.min.css";
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

      // 5. ScrollSpy dinámico y eficiente con IntersectionObserver (0 forced reflows)
      const navLinks = {
        "hero-carousel": "nav-link-inicio",
        "ofertas": "nav-link-ofertas",
        "catalog": "nav-link-catalog",
        "ruleta": "nav-link-ruleta",
        "arcade-lootbox": "nav-link-ruleta"
      };

      const spySections = [
        document.getElementById("hero-carousel"),
        document.getElementById("ofertas"),
        document.getElementById("catalog"),
        document.getElementById("ruleta") || document.getElementById("arcade-lootbox")
      ].filter(Boolean);

      if ("IntersectionObserver" in window && spySections.length) {
        const spyObserver = new IntersectionObserver(
          (entries) => {
            if (isProgrammaticScroll) return;
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const linkId = navLinks[entry.target.id];
                if (linkId) setActiveTab(linkId);
              }
            });
          },
          { rootMargin: "-25% 0px -65% 0px" }
        );
        spySections.forEach((s) => spyObserver.observe(s));
      }
    }
  }

  function initHeader() {
    ensureNavBarStyles();

    const container =
      document.getElementById("header-container") ||
      document.getElementById("header-placeholder") ||
      document.querySelector("[data-include-header]");

    if (!container) return;

    if (container.firstElementChild) {
      updateHeaderCartCount();
      updateHeaderUser();
      syncNavbarHeight();
      setupNavbarNavigation();
    } else {
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
    }

    let navResizeTimer = null;
    window.addEventListener("resize", () => {
      if (navResizeTimer) cancelAnimationFrame(navResizeTimer);
      navResizeTimer = requestAnimationFrame(syncNavbarHeight);
    }, { passive: true });
  }

  function ensureFooterStyles() {
    if (!document.querySelector('link[href*="footer"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "Features/Footer/footer.min.css";
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

    if (container.firstElementChild) return;

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
      mobileImage: "Assets/hero/gta-6.jpg",
      shortTitle: "GTA VI",
      shortDesc: "Regresa a Vice City y el estado de Leonida en la experiencia de mundo abierto más esperada.",
      featName: "GRAND THEFT AUTO VI",
      featTagline: "Edición Reserva Especial",
      featPrice: "$79.99"
    },
    {
      id: "hollow-knight",
      image: "Assets/hero/hollow-knight.jpg",
      mobileImage: "Assets/hollow-knight.jpg",
      shortTitle: "Hollow Knight",
      shortDesc: "Explora las ruinas de Hallownest, un reino subterráneo de insectos y héroes.",
      featName: "HOLLOW KNIGHT",
      featTagline: "Edición Corazón del Vacío",
      featPrice: "$14.99"
    },
    {
      id: "cyberpunk-2077",
      image: "Assets/hero/cyberpunk-2077.jpg",
      mobileImage: "Assets/cyberpunk-2077.jpg",
      shortTitle: "Cyberpunk 2077",
      shortDesc: "Conviértete en leyenda en las peligrosas calles futuristas de Night City.",
      featName: "CYBERPUNK 2077",
      featTagline: "Edición Ultimate",
      featPrice: "$39.99"
    },
    {
      id: "astro-bot",
      image: "Assets/hero/astro-bot.jpg",
      mobileImage: "Assets/hero/astro-bot.jpg",
      shortTitle: "Astro Bot",
      shortDesc: "Diversión pura a través de más de 50 mundos mágicos en una aventura galáctica.",
      featName: "ASTRO BOT",
      featTagline: "Aventura galáctica",
      featPrice: "$59.99"
    },
    {
      id: "god-of-war-ragnarok",
      image: "Assets/hero/god-of-war-ragnarok.jpg",
      mobileImage: "Assets/god-of-war-ragnarok.jpg",
      shortTitle: "God of War",
      shortDesc: "Kratos y Atreus deben desafiar el destino nórdico ante la llegada del Ragnarök.",
      featName: "GOD OF WAR RAGNARÖK",
      featTagline: "Valhalla Edition",
      featPrice: "$59.99"
    },
    {
      id: "mario-kart-8-deluxe",
      image: "Assets/hero/mario-kart-world.jpg",
      mobileImage: "Assets/hero/mario-kart-world.jpg",
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
    let activeLayer = bg1;
    let inactiveLayer = bg2;
    let timer = null;

    function getSlideImage(slide) {
      const isMobile = window.innerWidth <= 900;
      return (isMobile && slide.mobileImage) ? slide.mobileImage : slide.image;
    }

    // Inicializar capas de fondo sin estilos inline conflictivos
    if (bg1) {
      bg1.style.opacity = "";
      bg1.style.zIndex = "";
      bg1.style.backgroundImage = `url("${getSlideImage(CAROUSEL_GAMES[0])}")`;
      bg1.classList.add("active");
    }
    if (bg2) {
      bg2.style.opacity = "";
      bg2.style.zIndex = "";
      bg2.classList.remove("active");
    }

    // Cambiar diapositiva con aceleración por hardware (GPU)
    function goToSlide(targetIndex) {
      const total = CAROUSEL_GAMES.length;
      const newIndex = ((targetIndex % total) + total) % total;
      if (newIndex === currentIndex) return;

      currentIndex = newIndex;
      const nextSlide = CAROUSEL_GAMES[newIndex];

      // 1. Asignar imagen a la capa inactiva antes de mostrarla y alternar clases activas
      if (inactiveLayer) {
        inactiveLayer.style.backgroundImage = `url("${getSlideImage(nextSlide)}")`;
        inactiveLayer.classList.add("active");
      }
      if (activeLayer) {
        activeLayer.classList.remove("active");
      }

      // Intercambiar referencias de capas
      const temp = activeLayer;
      activeLayer = inactiveLayer;
      inactiveLayer = temp;

      // 2. Transición suave de los textos de la tarjeta
      const textEls = [gameDescEl, featName, featTagline, featPrice, featuredLink].filter(Boolean);
      textEls.forEach((el) => {
        el.style.transition = "opacity 0.25s ease";
        el.style.opacity = "0.35";
      });

      setTimeout(() => {
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
        textEls.forEach((el) => {
          el.style.opacity = "1";
        });
      }, 180);
    }

    function handleNext() {
      restartTimer();
      goToSlide(currentIndex + 1);
    }

    function handlePrev() {
      restartTimer();
      goToSlide(currentIndex - 1);
    }

    // Flechas de navegación
    if (nextBtn) {
      nextBtn.addEventListener("click", handleNext);
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", handlePrev);
    }

    // Reajustar imagen si el usuario gira el teléfono o cambia el tamaño de ventana
    window.addEventListener("resize", () => {
      if (activeLayer) {
        activeLayer.style.backgroundImage = `url("${getSlideImage(CAROUSEL_GAMES[currentIndex])}")`;
      }
    });

    // Soporte táctil / deslizamiento para teléfonos móviles
    let touchStartX = 0;
    let touchEndX = 0;
    carouselEl.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselEl.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }, { passive: true });

    // Temporizador automático continuo cada 5 segundos
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
      }, 5000);
    }

    function restartTimer() {
      stopTimer();
      startTimer();
    }

    // Pausar si el ratón está encima de la tarjeta destacada
    if (featuredCard) {
      featuredCard.addEventListener("mouseenter", stopTimer);
      featuredCard.addEventListener("mouseleave", startTimer);
    }

    startTimer();
  }

  // =========================================================
  // 2B. TITULAR HERO INMEDIATO (0 IMPACTO EN HILO PRINCIPAL)
  // =========================================================
  function initHeroTypewriter() {
    const titleEl = document.getElementById("hero-title-text");
    const descEl = document.getElementById("hero-game-desc");
    const actionsEl = document.querySelector(".home-page-actions");
    if (!titleEl) return;

    const fullText = titleEl.getAttribute("data-fulltext") || titleEl.textContent.trim() || "Tu próxima aventura empieza aquí.";
    titleEl.textContent = fullText;
    if (descEl) descEl.classList.add("is-visible");
    if (actionsEl) actionsEl.classList.add("is-visible");
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
  // Optimizado para 0 impacto en el hilo principal (Main Thread)
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

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let stars = [];
    const INTERACTION_RADIUS = 140;
    const RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;

    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseActive = false;
    let mouseTimeout = null;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // 80-90 estrellas: rendimiento óptimo con estética idéntica
      const count = Math.min(90, Math.max(45, Math.floor((width * height) / 16000)));
      stars = [];
      for (let i = 0; i < count; i++) {
        const sizeRand = Math.random();
        let baseRadius = 0.85;
        if (sizeRand > 0.88) baseRadius = 1.7;
        else if (sizeRand > 0.6) baseRadius = 1.25;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseRadius,
          isCross: Math.random() < 0.12,
          twinkleSpeed: 0.015 + Math.random() * 0.03,
          twinklePhase: Math.random() * Math.PI * 2,
          baseAlpha: 0.25 + Math.random() * 0.45,
          glow: 0,
          isLime: Math.random() < 0.22
        });
      }
    }

    function renderStatic() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = star.isLime ? "rgba(213, 255, 82, 0.6)" : "rgba(183, 171, 223, 0.5)";
        ctx.fill();
      }
    }

    function handlePointerMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
      if (mouseTimeout) clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseActive = false;
      }, 1000);
      startLoop();
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

    let resizeTimer = null;
    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (prefersReducedMotion) renderStatic();
      }, 150);
    }

    resize();
    window.addEventListener("resize", onResize, { passive: true });

    if (prefersReducedMotion) {
      renderStatic();
      return;
    }

    let rafId = null;
    let isRunning = false;
    let lastRenderTime = 0;

    function renderLoop(now) {
      if (document.hidden) {
        isRunning = false;
        rafId = null;
        return;
      }

      // En reposo corre a 24 FPS (~42ms) reduciendo el uso de CPU/GPU un 60%;
      // a 60 FPS fluidos solo cuando el cursor está en movimiento.
      const interval = isMouseActive ? 16 : 42;
      if (now - lastRenderTime < interval) {
        rafId = requestAnimationFrame(renderLoop);
        return;
      }
      lastRenderTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

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

        star.glow += (targetGlow - star.glow) * 0.2;
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.2;
        const alpha = Math.min(1, Math.max(0.12, star.baseAlpha + twinkle + (star.glow * 0.75)));
        const r = star.baseRadius + (star.glow * 1.5);

        // shadowBlur SOLO si hay glow activo bajo el cursor para evitar Gaussian Blur en CPU
        const hasGlow = star.glow > 0.35;
        if (hasGlow) {
          ctx.save();
          ctx.shadowBlur = 8 + (star.glow * 12);
          ctx.shadowColor = star.isLime ? "rgba(213, 255, 82, 0.9)" : "rgba(244, 244, 238, 0.9)";
        }

        if (star.isCross) {
          const arm = r * 2.2;
          const core = r * 0.4;
          ctx.fillStyle = star.glow > 0.2 || star.isLime
            ? "rgba(213, 255, 82, " + alpha + ")"
            : "rgba(244, 244, 238, " + alpha + ")";

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
            ctx.fillStyle = star.isLime ? "rgba(213, 255, 82, " + alpha + ")" : "rgba(255, 255, 255, " + alpha + ")";
          } else {
            ctx.fillStyle = star.isLime ? "rgba(213, 255, 82, " + alpha + ")" : "rgba(183, 171, 223, " + alpha + ")";
          }
          ctx.fill();
        }

        if (hasGlow) {
          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    }

    function startLoop() {
      if (!isRunning && !document.hidden && !prefersReducedMotion) {
        isRunning = true;
        rafId = requestAnimationFrame(renderLoop);
      }
    }

    function stopLoop() {
      isRunning = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    });

    // Renderizado estático inicial inmediato; activación diferida cuando el navegador esté libre
    renderStatic();
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => startLoop(), { timeout: 1200 });
    } else {
      setTimeout(startLoop, 600);
    }
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
    group2.setAttribute("inert", "");

    // Desactivar foco y teclado en elementos duplicados visuales (cumplimiento WCAG 2.1 / axe-core)
    group2.querySelectorAll("button, a, input, select, textarea, [tabindex]").forEach((el) => {
      el.setAttribute("tabindex", "-1");
      if (el.tagName === "BUTTON") {
        el.setAttribute("disabled", "true");
        el.removeAttribute("onclick");
      }
      if (el.hasAttribute("role")) {
        el.removeAttribute("role");
      }
    });

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

  function createGameCardHTML(game, index = 0) {
    const offer = SPECIAL_OFFERS[game.id];
    const badgeHTML = offer
      ? `<span class="game-card-badge offer-discount-badge">${offer.discountBadge}</span>`
      : game.badge
      ? `<span class="game-card-badge">${game.badge}</span>`
      : "";

    const priceHTML = offer
      ? `<div class="offer-price-row"><span class="offer-old-price">${formatPrice(offer.oldPrice)}</span><p class="game-card-price">${formatPrice(game.price)}</p></div>`
      : `<p class="game-card-price">${formatPrice(game.price)}</p>`;

    const lazyAttr = index < 5 ? "" : 'loading="lazy"';

    return `
      <article class="game-card" data-id="${game.id}" onclick="window.NexoShop.goToProduct('${game.id}', event)" role="link" tabindex="0" aria-label="Ver detalles de ${game.title}: ${game.subtitle}">
        <div class="game-card-media">
          ${badgeHTML}
          <img src="${game.image}" alt="Portada de ${game.title}: ${game.subtitle}" class="game-card-img" ${lazyAttr} decoding="async" />
        </div>
        <div class="game-card-info">
          <h3 class="game-card-title">${game.title}</h3>
          <p class="game-card-subtitle">${game.subtitle}</p>
          <div class="game-card-meta">
            <span class="game-card-genre">${game.platform} · ${game.genreFull || game.genre}</span>
            <span class="game-card-pegi">PEGI ${game.pegi}</span>
          </div>
          ${priceHTML}
          <button type="button" class="btn-add-cart" onclick="event.stopPropagation(); window.NexoShop.addToCart('${game.id}', false, event)" aria-label="Añadir ${game.title} al carrito">
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
          threshold: 0.05,
          rootMargin: "60px 0px"
        }
      );

      // Animación suave y escalonada por columna sin forzar recálculo de layout (0 layout thrashing)
      cards.forEach((card, index) => {
        card.style.transitionDelay = `${(index % 3) * 0.08}s`;
        card.classList.remove("is-revealed");
        cardObserver.observe(card);
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
        grid.innerHTML = displayList.map((g, idx) => createGameCardHTML(g, idx)).join("");
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

    // Generador de códigos aleatorios únicos para la ruleta
    function generateRandomCoupon(discountPercent) {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let rand = "";
      for (let i = 0; i < 4; i++) {
        rand += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const code = `VEJI${discountPercent}-${rand}`;

      try {
        const stored = JSON.parse(localStorage.getItem("vejigames_coupons") || "{}");
        stored[code] = {
          discountVal: discountPercent / 100,
          label: `${discountPercent}% de descuento aplicado`,
          used: false,
          createdAt: Date.now()
        };
        localStorage.setItem("vejigames_coupons", JSON.stringify(stored));
      } catch (e) {}

      return code;
    }

    // 8 Sectores en la rueda (45° por sector, Sector 0 centrado a 0° / 12 en punto)
    const WHEEL_SECTORS = [
      {
        index: 0,
        badge: "★ JACKPOT LEGENDARIO · 5% PROB ★",
        title: "50% DE DESCUENTO (MITAD DE PRECIO)",
        desc: "¡PREMIO MÁXIMO! ¡Has sacado el Jackpot del 50%! Paga la mitad exacta en tu próxima compra.",
        discountPercent: 50,
        isCoin: false
      },
      {
        index: 1,
        badge: "DROP COMÚN · 50% PROB",
        title: "5% DE DESCUENTO",
        desc: "¡Buen tiro! Código válido para un 5% de descuento directo en cualquier compra del carrito.",
        discountPercent: 5,
        isCoin: false
      },
      {
        index: 2,
        badge: "DROP RARO · 30% PROB",
        title: "15% DE DESCUENTO",
        desc: "¡Gran premio! Ahorra un 15% en el total de tu orden al canjearlo en el carrito.",
        discountPercent: 15,
        isCoin: false
      },
      {
        index: 3,
        badge: "DROP EXTRA · TIRO GRATIS",
        title: "+1 🪙 MONEDA ARCADE",
        desc: "¡La ruleta te devuelve la suerte! Has ganado +1 moneda para volver a girar.",
        discountPercent: 0,
        isCoin: true
      },
      {
        index: 4,
        badge: "DROP ÉPICO · 15% PROB",
        title: "25% DE DESCUENTO",
        desc: "¡Tiro de élite! Un cuarto de descuento (25% OFF) para cualquier videojuego de la tienda.",
        discountPercent: 25,
        isCoin: false
      },
      {
        index: 5,
        badge: "DROP COMÚN · 50% PROB",
        title: "5% DE DESCUENTO",
        desc: "¡Buen tiro! Código válido para un 5% de descuento directo en cualquier compra del carrito.",
        discountPercent: 5,
        isCoin: false
      },
      {
        index: 6,
        badge: "DROP RARO · 30% PROB",
        title: "15% DE DESCUENTO",
        desc: "¡Gran premio! Ahorra un 15% en el total de tu orden al canjearlo en el carrito.",
        discountPercent: 15,
        isCoin: false
      },
      {
        index: 7,
        badge: "DROP EXTRA · TIRO GRATIS",
        title: "+1 🪙 MONEDA ARCADE",
        desc: "¡La ruleta te devuelve la suerte! Has ganado +1 moneda para volver a girar.",
        discountPercent: 0,
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
                const freshCode = generateRandomCoupon(prize.discountPercent);
                if (rewardCodeVal) rewardCodeVal.textContent = freshCode;
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
  // API PÚBLICA Y AYUDANTES COMPARTIDOS
  // =========================================================
  window.NexoShop = window.NexoShop || {};
  Object.assign(window.NexoShop, {
    goToProduct(productId, event) {
      if (event && event.target && event.target.closest(".btn-add-cart")) return;
      if (productId) {
        window.location.href = "product.html?id=" + encodeURIComponent(productId);
      }
    },
    addToCart(productId, hasDlc = false, event = null) {
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
      const cart = typeof getCartFromStorage === "function" ? getCartFromStorage() : [];
      const existing = cart.find((i) => i.productId === productId);
      if (existing) {
        if (hasDlc) existing.hasDlc = true;
      } else {
        cart.push({ productId, hasDlc });
      }
      if (typeof saveCartToStorage === "function") {
        saveCartToStorage(cart);
      }
      updateHeaderCartCount();
      alert("¡Producto añadido al carrito!");
    },
    removeFromCart(index) {
      const cart = typeof getCartFromStorage === "function" ? getCartFromStorage() : [];
      cart.splice(index, 1);
      if (typeof saveCartToStorage === "function") {
        saveCartToStorage(cart);
      }
      if (window.NexoShop.renderCart) window.NexoShop.renderCart();
      updateHeaderCartCount();
    },
    removeDlcFromCart(index) {
      const cart = typeof getCartFromStorage === "function" ? getCartFromStorage() : [];
      if (cart[index]) {
        cart[index].hasDlc = false;
        if (typeof saveCartToStorage === "function") {
          saveCartToStorage(cart);
        }
        if (window.NexoShop.renderCart) window.NexoShop.renderCart();
        updateHeaderCartCount();
      }
    },
    updateHeaderCartCount,
    updateHeaderUser,
    getActiveUser,
    getLootCoins,
    saveLootCoins,
    playArcadeAudio,
    formatPrice
  });

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
    if (typeof initProductPage === "function") initProductPage();
    if (typeof initCartPage === "function") initCartPage();
    if (typeof initTermsPage === "function") initTermsPage();
    if (typeof initAccountPage === "function") initAccountPage();
    updateHeaderUser();
    initScrollReveals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
