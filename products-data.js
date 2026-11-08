/**
 * NEXO PLAY - Base de datos en memoria (In-Memory Data)
 * Para añadir un nuevo producto, simplemente añade un nuevo objeto a este Array.
 */

const PRODUCTS = [
  {
    id: "astra",
    title: "ASTRA",
    subtitle: "Ecos del vacío",
    genre: "Aventura",
    genreFull: "Aventura espacial",
    platform: "PC / Windows",
    pegi: 12,
    price: 39.99,
    badge: "CON DLC",
    hasDlc: true,
    rating: "4,9 / 5",
    edition: "EDICIÓN DIGITAL",
    image: "Features/HomePage/images/hollow knight.jpg",
    description: "Una señal imposible atraviesa el silencio. Explora lunas olvidadas, descifra una civilización perdida y descubre qué merece volver a casa. Una aventura narrativa para perderte entre las estrellas.",
    compatibility: "Idiomas: español e inglés · Audio: inglés · Compatible con mando",
    dlcs: [
      {
        id: "orbita-perdida",
        title: "Órbita perdida",
        description: "Nueva campaña · 5 horas · Requiere ASTRA",
        price: 12.99,
        icon: "☉"
      },
      {
        id: "archivo-sonoro",
        title: "Archivo sonoro",
        description: "Banda sonora digital · 24 pistas · Requiere ASTRA",
        price: 4.99,
        icon: "♪"
      }
    ],
    requirements: {
      minimum: {
        sistema: "Windows 10",
        procesador: "Intel i5-4460 / Ryzen 3 1200",
        memoria: "8 GB RAM",
        graficos: "GTX 960 / RX 470",
        espacio: "30 GB disponibles"
      },
      recommended: {
        sistema: "Windows 11",
        procesador: "Intel i7-8700 / Ryzen 5 3600",
        memoria: "16 GB RAM",
        graficos: "RTX 2060 / RX 5600 XT",
        espacio: "30 GB + 8 GB por DLC"
      }
    }
  },
  {
    id: "bosque",
    title: "BOSQUE",
    subtitle: "de bruma",
    genre: "Puzles",
    genreFull: "Exploración y puzles",
    platform: "PC / Windows",
    pegi: 7,
    price: 24.99,
    badge: "SIN DLC",
    hasDlc: false,
    rating: "4,8 / 5",
    edition: "EDICIÓN ESTÁNDAR",
    image: "Features/HomePage/images/hollow knight.jpg",
    description: "Adéntrate en un bosque antiguo habitado por espíritus y secretos olvidados. Resuelve acertijos ambientales y guía a tu compañero místico a través de senderos envueltos en bruma.",
    compatibility: "Idiomas: español, inglés y francés · Audio: atmosférico · Compatible con mando",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "Windows 10",
        procesador: "Intel i3-3220 / AMD FX-6300",
        memoria: "4 GB RAM",
        graficos: "GTX 660 / Radeon HD 7850",
        espacio: "15 GB disponibles"
      },
      recommended: {
        sistema: "Windows 10 / 11",
        procesador: "Intel i5-6600K / Ryzen 5 1600",
        memoria: "8 GB RAM",
        graficos: "GTX 1060 / RX 580",
        espacio: "15 GB SSD disponibles"
      }
    }
  },
  {
    id: "neon",
    title: "NEON",
    subtitle: "Drift",
    genre: "Carreras",
    genreFull: "Carreras arcade",
    platform: "PC / Windows",
    pegi: 3,
    price: 29.99,
    badge: "ARCADE",
    hasDlc: false,
    rating: "4,7 / 5",
    edition: "EDICIÓN DIGITAL",
    image: "Features/HomePage/images/hollow knight.jpg",
    description: "Quema neumáticos bajo las luces de neón en una metrópolis futurista. Domina curvas imposibles al ritmo de sintetizadores y compite por el liderato callejero definitivo.",
    compatibility: "Idiomas: español e inglés · Compatible con volantes y mando",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "Windows 10",
        procesador: "Intel i5-2500K / AMD FX-8350",
        memoria: "8 GB RAM",
        graficos: "GTX 970 / R9 290X",
        espacio: "25 GB disponibles"
      },
      recommended: {
        sistema: "Windows 11",
        procesador: "Intel i7-7700K / Ryzen 7 2700X",
        memoria: "16 GB RAM",
        graficos: "GTX 1080 / RX 5700",
        espacio: "25 GB SSD disponibles"
      }
    }
  },
  {
    id: "marea",
    title: "MAREA",
    subtitle: "de acero",
    genre: "Estrategia",
    genreFull: "Acción y estrategia",
    platform: "PC / Windows",
    pegi: 16,
    price: 34.99,
    badge: "ESTRATEGIA",
    hasDlc: false,
    rating: "4,6 / 5",
    edition: "EDICIÓN TÁCTICA",
    image: "Features/HomePage/images/hollow knight.jpg",
    description: "Comanda una flota de acorazados en los mares más despiadados. Planifica tácticas en tiempo real, administra suministros y conquista las rutas marítimas en batallas navales de alta escala.",
    compatibility: "Idiomas: español, inglés y alemán · Optimizado para teclado y ratón",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "Windows 10",
        procesador: "Intel i5-4460",
        memoria: "8 GB RAM",
        graficos: "GTX 1050 Ti",
        espacio: "40 GB disponibles"
      },
      recommended: {
        sistema: "Windows 11",
        procesador: "Intel i7-9700K",
        memoria: "16 GB RAM",
        graficos: "RTX 2070",
        espacio: "40 GB SSD disponibles"
      }
    }
  },
  {
    id: "solstice",
    title: "SOLSTICE",
    subtitle: "El último verano",
    genre: "Aventura",
    genreFull: "Aventura narrativa",
    platform: "PC / Windows",
    pegi: 12,
    price: 19.99,
    badge: "NARRATIVA",
    hasDlc: false,
    rating: "4,9 / 5",
    edition: "EDICIÓN DIGITAL",
    image: "Features/HomePage/images/hollow knight.jpg",
    description: "Un relato nostálgico sobre la amistad, los recuerdos de juventud y el fin de una era en un pintoresco pueblo costero bañado por el sol.",
    compatibility: "Idiomas: español e inglés · Audio: español e inglés · Compatible con mando",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "Windows 10",
        procesador: "Intel Core i3",
        memoria: "4 GB RAM",
        graficos: "Gráficos integrados Intel HD 4000",
        espacio: "10 GB disponibles"
      },
      recommended: {
        sistema: "Windows 10 / 11",
        procesador: "Intel Core i5",
        memoria: "8 GB RAM",
        graficos: "GTX 1050",
        espacio: "10 GB SSD disponibles"
      }
    }
  },
  {
    id: "circuit",
    title: "CIRCUIT",
    subtitle: "Breakers",
    genre: "Acción",
    genreFull: "Acción cooperativa",
    platform: "PC / Windows",
    pegi: 7,
    price: 14.99,
    badge: "COOPERATIVO",
    hasDlc: false,
    rating: "4,5 / 5",
    edition: "EDICIÓN COOP",
    image: "Features/HomePage/images/hollow knight.jpg",
    description: "Caos robótico para hasta 4 jugadores. Hackea sistemas rebeldes, sincroniza combos energéticos y salva la red en misiones cooperativas frenéticas.",
    compatibility: "Idiomas: español e inglés · Cooperativo local y en línea · Compatible con mando",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "Windows 10",
        procesador: "Intel Core 2 Duo",
        memoria: "4 GB RAM",
        graficos: "GTX 750",
        espacio: "8 GB disponibles"
      },
      recommended: {
        sistema: "Windows 11",
        procesador: "Intel Core i5",
        memoria: "8 GB RAM",
        graficos: "GTX 1060",
        espacio: "8 GB disponibles"
      }
    }
  }
];

// Carrito en memoria (respaldado automáticamente en localStorage)
const CART_STORAGE_KEY = "nexo_play_cart";

function getCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      // Estado inicial por defecto de la maqueta
      return [
        { productId: "astra", hasDlc: true },
        { productId: "bosque", hasDlc: false }
      ];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveCartToStorage(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Error guardando en localStorage:", e);
  }
}

