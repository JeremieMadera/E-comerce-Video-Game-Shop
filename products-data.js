/**
 * NEXO PLAY - Catálogo de Videojuegos en Memoria (In-Memory Data)
 * Videojuegos reales vinculados con los archivos en Assets/ y Assets/DLC/
 * Plataformas: PC / Windows, PlayStation, Xbox, Nintendo Switch
 */

const PRODUCTS = [
  {
    id: "hollow-knight",
    title: "HOLLOW KNIGHT",
    subtitle: "Edición Corazón del Vacío",
    genre: "Aventura",
    genreFull: "Metroidvania y acción 2D",
    platforms: ["pc", "playstation", "xbox", "nintendo"],
    platform: "PC · Switch · PS4 · Xbox",
    pegi: 7,
    price: 14.99,
    badge: "OBRA MAESTRA",
    hasDlc: true,
    rating: "5,0 / 5",
    edition: "EDICIÓN DIGITAL",
    image: "Assets/hollow-knight.jpg",
    description: "Desciende a la oscuridad y explora las ruinas de Hallownest, un reino subterráneo de insectos y héroes devastado por una extraña infección. Forja tu propio camino a través de cavernas laberínticas, combate con aguijón y domina poderes del alma.",
    compatibility: "Idiomas: español completo · Compatible con mando y teclado",
    dlcs: [
      {
        id: "godmaster",
        title: "Godmaster & Grimm Troupe",
        description: "Incluye las 4 expansiones gratuitas con nuevos jefes, misiones y panteones",
        price: 0.00,
        icon: "⚔"
      }
    ],
    requirements: {
      minimum: {
        sistema: "Windows 7 de 64 bits",
        procesador: "Intel Core 2 Duo E5200",
        memoria: "4 GB RAM",
        graficos: "GeForce 9800GTX+ (1GB)",
        espacio: "9 GB disponibles"
      },
      recommended: {
        sistema: "Windows 10 / 11",
        procesador: "Intel Core i5",
        memoria: "8 GB RAM",
        graficos: "GeForce GTX 560",
        espacio: "9 GB SSD"
      }
    }
  },
  {
    id: "cyberpunk-2077",
    title: "CYBERPUNK 2077",
    subtitle: "Edición Ultimate",
    genre: "Acción",
    genreFull: "RPG de acción en mundo abierto",
    platforms: ["pc", "playstation", "xbox"],
    platform: "PC · PS5 · Xbox Series",
    pegi: 18,
    price: 39.99,
    badge: "CON DLC",
    hasDlc: true,
    rating: "4,8 / 5",
    edition: "EDICIÓN DIGITAL ULTIMATE",
    image: "Assets/cyberpunk-2077.jpg",
    description: "Sumérgete en la megalópolis futurista de Night City como V, un mercenario cyberpunk que busca un implante único que otorga la inmortalidad. Conduce vehículos de alta gama, hackea sistemas y decide el destino de una ciudad obsesionada con el poder y las modificaciones corporales.",
    compatibility: "Idiomas: español e inglés · Audio completo en español · Compatible con mando",
    dlcs: [
      {
        id: "phantom-liberty",
        title: "Phantom Liberty",
        description: "Expansión de suspense y espionaje · 15+ horas · Requiere Cyberpunk 2077",
        price: 29.99,
        icon: "⚡",
        image: "Assets/DLC/cyberpunk-phantom-liberty.jpg"
      }
    ],
    requirements: {
      minimum: {
        sistema: "Windows 10 de 64 bits",
        procesador: "Intel Core i7-6700 / AMD Ryzen 5 1600",
        memoria: "12 GB RAM",
        graficos: "NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580",
        espacio: "70 GB SSD disponibles"
      },
      recommended: {
        sistema: "Windows 11 de 64 bits",
        procesador: "Intel Core i7-12700 / AMD Ryzen 7 7800X3D",
        memoria: "16 GB RAM",
        graficos: "NVIDIA GeForce RTX 2060 Super / Radeon RX 5700 XT",
        espacio: "70 GB SSD disponibles"
      }
    }
  },
  {
    id: "bloodborne",
    title: "BLOODBORNE",
    subtitle: "Game of the Year Edition",
    genre: "Acción",
    genreFull: "Acción RPG gótico / Soulslike",
    platforms: ["playstation"],
    platform: "PlayStation 4 / PS5",
    pegi: 18,
    price: 19.99,
    badge: "CON DLC",
    hasDlc: true,
    rating: "4,9 / 5",
    edition: "EDICIÓN COMPLETA GOTY",
    image: "Assets/bloodborne.jpg",
    description: "Enfréntate a tus miedos en la decadente ciudad de Yharnam, asolada por una extraña plaga endémica. Deberás empuñar armas trucadas para sobrevivir a criaturas grotescas y horrores cósmicos en un combate frenético y despiadado.",
    compatibility: "Idiomas: español e inglés · Audio: doblaje al español · Compatible con DualShock y DualSense",
    dlcs: [
      {
        id: "the-old-hunters",
        title: "The Old Hunters",
        description: "Expansión de historia con nuevas pesadillas, armas y jefes legendarios",
        price: 9.99,
        icon: "⚔",
        image: "Assets/DLC/bloodborne-old-hunters.jpg"
      }
    ],
    requirements: {
      minimum: {
        sistema: "PlayStation 4 / PlayStation 5",
        procesador: "Arquitectura x86-64 personalizada",
        memoria: "8 GB GDDR5",
        graficos: "Motor gráfico optimizado a 1080p",
        espacio: "41 GB disponibles"
      },
      recommended: {
        sistema: "PlayStation 5",
        procesador: "AMD Zen 2 de 8 núcleos a 3.5 GHz",
        memoria: "16 GB GDDR6",
        graficos: "Retrocompatibilidad con mejoras de estabilidad y carga rápida",
        espacio: "41 GB en SSD ultra rápido"
      }
    }
  },
  {
    id: "gta-6",
    title: "GRAND THEFT AUTO VI",
    subtitle: "Edición Reserva Especial",
    genre: "Acción",
    genreFull: "Mundo abierto / Aventura criminal",
    platforms: ["playstation", "xbox"],
    platform: "PlayStation 5 · Xbox Series",
    pegi: 18,
    price: 79.99,
    badge: "RESERVA",
    hasDlc: true,
    rating: "5,0 / 5",
    edition: "EDICIÓN DIGITAL RESERVA",
    image: "Assets/gta-6.jpg",
    description: "Grand Theft Auto VI se dirige al estado de Leonida, hogar de las calles bañadas en neón de Vice City y más allá, en la evolución más grande e inmersiva de la serie Grand Theft Auto hasta la fecha.",
    compatibility: "Idiomas: español completo · Compatible con mandos inalámbricos",
    dlcs: [
      {
        id: "gta-vice-pack",
        title: "Pack de bonificación Vice City",
        description: "Contenido digital exclusivo para el modo historia y bonos de reserva",
        price: 0.00,
        icon: "★"
      }
    ],
    requirements: {
      minimum: {
        sistema: "PlayStation 5 / Xbox Series X|S",
        procesador: "AMD Zen 2 de 8 núcleos",
        memoria: "16 GB GDDR6",
        graficos: "Arquitectura RDNA 2 con Ray Tracing",
        espacio: "150 GB SSD disponibles"
      },
      recommended: {
        sistema: "PlayStation 5 Pro",
        procesador: "AMD Zen 2 optimizado",
        memoria: "16 GB GDDR6",
        graficos: "PlayStation Spectral Super Resolution (PSSR)",
        espacio: "150 GB SSD ultra rápido"
      }
    }
  },
  {
    id: "astro-bot",
    title: "ASTRO BOT",
    subtitle: "Aventura galáctica",
    genre: "Aventura",
    genreFull: "Plataformas y aventura 3D",
    platforms: ["playstation"],
    platform: "PlayStation 5",
    pegi: 7,
    price: 59.99,
    badge: "DESTACADO",
    hasDlc: false,
    rating: "5,0 / 5",
    edition: "EDICIÓN DIGITAL ESTÁNDAR",
    image: "Assets/astro-bot.jpg",
    description: "Únete a Astro en una gigantesca aventura espacial a través de más de 50 planetas llenos de secretos, diversión y cameos de la historia de los videojuegos. Cada habilidad aprovecha al máximo la respuesta háptica y los gatillos adaptativos del mando DualSense.",
    compatibility: "Idiomas: español e inglés · Audio completo en español · Requiere mando DualSense",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "PlayStation 5",
        procesador: "AMD Zen 2 de 8 núcleos",
        memoria: "16 GB GDDR6",
        graficos: "GPU AMD RDNA 2 personalizada",
        espacio: "66 GB disponibles"
      },
      recommended: {
        sistema: "PlayStation 5 / PS5 Pro",
        procesador: "Optimizado para 60 fps estables en 4K dinámico",
        memoria: "16 GB GDDR6",
        graficos: "Respuesta háptica y audio 3D Tempest activados",
        espacio: "66 GB en almacenamiento SSD"
      }
    }
  },
  {
    id: "mario-kart-8-deluxe",
    title: "MARIO KART 8 DELUXE",
    subtitle: "Pase de pistas extras",
    genre: "Carreras",
    genreFull: "Carreras arcade multijugador",
    platforms: ["nintendo"],
    platform: "Nintendo Switch",
    pegi: 3,
    price: 49.99,
    badge: "ARCADE",
    hasDlc: true,
    rating: "4,9 / 5",
    edition: "EDICIÓN DEFINITIVA",
    image: "Assets/mario-kart-world.jpg",
    description: "¡Pisa el acelerador en la entrega definitiva de Mario Kart! Compite en 48 circuitos deslumbrantes por tierra, agua y aire desafiando la gravedad con Mario, Luigi, Bowser y decenas de personajes en multijugador de hasta 12 pilotos.",
    compatibility: "Idiomas: español, inglés, francés y alemán · Hasta 4 jugadores en pantalla dividida y 12 en línea",
    dlcs: [
      {
        id: "booster-course-pass",
        title: "Pase de pistas extras",
        description: "48 circuitos adicionales remasterizados y nuevos personajes icónicos",
        price: 24.99,
        icon: "🏁"
      }
    ],
    requirements: {
      minimum: {
        sistema: "Nintendo Switch / Switch Lite / OLED",
        procesador: "NVIDIA Tegra personalizada",
        memoria: "4 GB LPDDR4",
        graficos: "720p portátil / 1080p en modo TV a 60 fps",
        espacio: "6.7 GB disponibles"
      },
      recommended: {
        sistema: "Nintendo Switch OLED",
        procesador: "Pantalla OLED de 7 pulgadas con colores vibrantes",
        memoria: "4 GB LPDDR4",
        graficos: "Mando Pro de Nintendo Switch y suscripción Online",
        espacio: "6.7 GB + 2.5 GB por DLC"
      }
    }
  },
  {
    id: "zelda-ocarina-of-time",
    title: "THE LEGEND OF ZELDA",
    subtitle: "Ocarina of Time",
    genre: "Aventura",
    genreFull: "Aventura épica y exploración",
    platforms: ["nintendo"],
    platform: "Nintendo Switch",
    pegi: 12,
    price: 49.99,
    badge: "OBRA MAESTRA",
    hasDlc: false,
    rating: "5,0 / 5",
    edition: "EDICIÓN LEGENDARIA",
    image: "Assets/zelda-ocarina-of-time.jpg",
    description: "El legendario juego que revolucionó la historia de los videojuegos. Acompaña al joven Link en un viaje a través del tiempo por el reino de Hyrule, desafía mazmorras icónicas, aprende melodías mágicas con la Ocarina del Tiempo y salva a la Princesa Zelda.",
    compatibility: "Idiomas: español, inglés y japonés · Compatible con mandos Joy-Con y Mando Pro",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "Nintendo Switch",
        procesador: "Procesador NVIDIA Tegra",
        memoria: "4 GB RAM",
        graficos: "Gráficos de alta definición optimizados",
        espacio: "8 GB disponibles"
      },
      recommended: {
        sistema: "Nintendo Switch OLED",
        procesador: "Mando Pro de Nintendo Switch",
        memoria: "4 GB RAM",
        graficos: "Resolución HD nítida con control de cámara fluido",
        espacio: "8 GB disponibles"
      }
    }
  },
  {
    id: "god-of-war-ragnarok",
    title: "GOD OF WAR RAGNARÖK",
    subtitle: "Valhalla Edition",
    genre: "Acción",
    genreFull: "Acción, combate y aventura nórdica",
    platforms: ["playstation", "pc"],
    platform: "PlayStation 5 · PC / Windows",
    pegi: 18,
    price: 59.99,
    badge: "NOVEDAD",
    hasDlc: true,
    rating: "4,9 / 5",
    edition: "EDICIÓN DIGITAL DELUXE",
    image: "Assets/god-of-war-ragnarok.jpg",
    description: "Kratos y Atreus emprenden un viaje mítico en busca de respuestas antes de que llegue el Ragnarök. A través de los Nueve Reinos, padre e hijo desafían a dioses nórdicos y monstruos colosales con el Hacha Leviatán y las Espadas del Caos.",
    compatibility: "Idiomas: español e inglés · Doblaje al español castellano y latino · Compatible con DualSense",
    dlcs: [
      {
        id: "valhalla",
        title: "God of War Ragnarök: Valhalla",
        description: "Modo roguelite de combate infinito y redención personal",
        price: 0.00,
        icon: "🛡"
      }
    ],
    requirements: {
      minimum: {
        sistema: "Windows 10 64-bit",
        procesador: "Intel Core i5-6600K / AMD Ryzen 5 2400G",
        memoria: "8 GB RAM",
        graficos: "NVIDIA GeForce GTX 1060 6GB / AMD RX 5500 XT",
        espacio: "190 GB SSD"
      },
      recommended: {
        sistema: "Windows 11 64-bit",
        procesador: "Intel Core i7-8700 / AMD Ryzen 5 3600X",
        memoria: "16 GB RAM",
        graficos: "NVIDIA GeForce RTX 2070 / AMD RX 5700 XT",
        espacio: "190 GB SSD ultra rápido"
      }
    }
  },
  {
    id: "persona-5-royal",
    title: "PERSONA 5 ROYAL",
    subtitle: "Edición Definitiva",
    genre: "Estrategia",
    genreFull: "JRPG y estrategia por turnos",
    platforms: ["playstation", "xbox", "nintendo", "pc"],
    platform: "PC · PS5 · Xbox · Switch",
    pegi: 16,
    price: 49.99,
    badge: "DESTACADO",
    hasDlc: false,
    rating: "5,0 / 5",
    edition: "EDICIÓN DEFINITIVA",
    image: "Assets/persona-5-royal.jpg",
    description: "Ponte la máscara de Joker y únete a los Ladrones Fantasma de Corazones. Libérate de las cadenas de la sociedad moderna, organiza grandes atracos en los Palacios de los corruptos y forja lazos inolvidables durante tu año escolar en Tokio.",
    compatibility: "Idiomas: textos en español · Audio en japonés e inglés · Compatible con todos los mandos",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "Windows 10 64-bit / Consolas",
        procesador: "Intel Core i7-4790 / AMD Ryzen 5 1500X",
        memoria: "8 GB RAM",
        graficos: "NVIDIA GeForce GTX 650 Ti / Radeon R7 360",
        espacio: "41 GB disponibles"
      },
      recommended: {
        sistema: "Windows 11 64-bit",
        procesador: "Intel Core i7-4790 / AMD Ryzen 5 1500X",
        memoria: "8 GB RAM",
        graficos: "NVIDIA GeForce GTX 760 / Radeon HD 7870",
        espacio: "41 GB SSD"
      }
    }
  },
  {
    id: "dark-souls-3",
    title: "DARK SOULS III",
    subtitle: "The Fire Fades Edition",
    genre: "Acción",
    genreFull: "Acción RPG y desafío oscuro",
    platforms: ["pc", "playstation", "xbox"],
    platform: "PC · PlayStation · Xbox",
    pegi: 16,
    price: 39.99,
    badge: "CLÁSICO",
    hasDlc: true,
    rating: "4,9 / 5",
    edition: "EDICIÓN COMPLETA",
    image: "Assets/dark-souls-3.jpg",
    description: "Cuando las llamas se apagan y el mundo cae en la ruina, emprende un viaje por el sobrecogedor reino de Lothric. Enfréntate a colosales Señores de la Ceniza en un viaje donde cada victoria se siente épica y merecida.",
    compatibility: "Idiomas: español e inglés · Compatible con mandos y tasa de refresco a 60 fps",
    dlcs: [
      {
        id: "season-pass-ds3",
        title: "Ashes of Ariandel & The Ringed City",
        description: "Las dos aclamadas expansiones con nuevas zonas nevadas, ciudades malditas y jefes letales",
        price: 14.99,
        icon: "🔥"
      }
    ],
    requirements: {
      minimum: {
        sistema: "Windows 7 SP1 / 8.1 / 10 64bit",
        procesador: "Intel Core i3-2100 / AMD FX-6300",
        memoria: "4 GB RAM",
        graficos: "NVIDIA GeForce GTX 750 Ti / ATI Radeon HD 7950",
        espacio: "25 GB disponibles"
      },
      recommended: {
        sistema: "Windows 10 / 11 64bit",
        procesador: "Intel Core i7-3770 / AMD FX-8350",
        memoria: "8 GB RAM",
        graficos: "NVIDIA GeForce GTX 970 / ATI Radeon R9 series",
        espacio: "25 GB SSD"
      }
    }
  },
  {
    id: "ff7-rebirth",
    title: "FINAL FANTASY VII REBIRTH",
    subtitle: "Edición Digital Deluxe",
    genre: "Aventura",
    genreFull: "RPG de acción cinematográfico",
    platforms: ["playstation"],
    platform: "PlayStation 5",
    pegi: 16,
    price: 69.99,
    badge: "NOVEDAD",
    hasDlc: false,
    rating: "4,9 / 5",
    edition: "EDICIÓN DIGITAL DELUXE",
    image: "Assets/ff7-rebirth.jpg",
    description: "El viaje hacia lo desconocido continúa. Cloud y sus camaradas escapan de la metrópoli de Midgar y se adentran en el vasto mundo en persecución del legendario espadachín Sefirot, explorando llanuras, costas y montañas.",
    compatibility: "Idiomas: español, inglés y japonés · Audio completo con voces estelares · Compatible con DualSense",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "PlayStation 5",
        procesador: "Arquitectura AMD Zen 2 a 3.5 GHz",
        memoria: "16 GB GDDR6",
        graficos: "GPU AMD RDNA 2 personalizada",
        espacio: "145 GB SSD ultra rápido"
      },
      recommended: {
        sistema: "PlayStation 5 / PS5 Pro",
        procesador: "Modo Rendimiento 60 fps / Modo Resolución 4K",
        memoria: "16 GB GDDR6",
        graficos: "Audio 3D Tempest y gatillos adaptativos",
        espacio: "145 GB SSD"
      }
    }
  },
  {
    id: "persona-3-reload",
    title: "PERSONA 3 RELOAD",
    subtitle: "Remake Definitivo",
    genre: "Estrategia",
    genreFull: "JRPG y estrategia por turnos",
    platforms: ["xbox", "playstation", "pc"],
    platform: "Xbox Series · PS5 · PC",
    pegi: 16,
    price: 59.99,
    badge: "POPULAR",
    hasDlc: true,
    rating: "4,8 / 5",
    edition: "EDICIÓN DIGITAL DELUXE",
    image: "Assets/persona-3-reload.jpg",
    description: "Ponte en la piel de un estudiante transferido empujado a un destino inesperado al entrar en la 'Hora Oscura'. Despierta un poder increíble, investiga la misteriosa torre del Tártaro y lucha por tus amigos.",
    compatibility: "Idiomas: subtítulos en español · Audio en japonés e inglés · Optimizado para mandos",
    dlcs: [
      {
        id: "expansion-pass-p3r",
        title: "Pase de Expansión: Episode Aigis",
        description: "El epílogo final que concluye la historia de Persona 3 con mazmorras y música renovada",
        price: 19.99,
        icon: "🌙"
      }
    ],
    requirements: {
      minimum: {
        sistema: "Windows 10 64-bit / Consolas",
        procesador: "Intel Core i5-2300 / AMD FX-4350",
        memoria: "8 GB RAM",
        graficos: "NVIDIA GeForce GTX 650 Ti / AMD Radeon HD 7850",
        espacio: "30 GB disponibles"
      },
      recommended: {
        sistema: "Windows 11 64-bit",
        procesador: "Intel Core i7-4790 / AMD Ryzen 5 1600",
        memoria: "8 GB RAM",
        graficos: "NVIDIA GeForce GTX 1660 / AMD Radeon RX 590",
        espacio: "30 GB SSD"
      }
    }
  },
  {
    id: "marvels-wolverine",
    title: "MARVEL'S WOLVERINE",
    subtitle: "Edición Reservas",
    genre: "Acción",
    genreFull: "Acción salvaje y combate visceral",
    platforms: ["playstation"],
    platform: "PlayStation 5",
    pegi: 18,
    price: 69.99,
    badge: "PRÓXIMAMENTE",
    hasDlc: false,
    rating: "5,0 / 5",
    edition: "EDICIÓN RESERVA",
    image: "Assets/marvels-wolverine.jpg",
    description: "De la mano de Insomniac Games llega una aventura madura y sanguinaria protagonizada por el mutante más letal de Marvel. Despliega garras de adamantium en combates cuerpo a cuerpo feroces a través de Madripoor y más allá.",
    compatibility: "Idiomas: español completo · Audio y cinemáticas en español · Exclusivo de PS5",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "PlayStation 5",
        procesador: "AMD Zen 2 a 3.5 GHz",
        memoria: "16 GB GDDR6",
        graficos: "Ray Tracing en tiempo real y 60 fps",
        espacio: "90 GB SSD ultra rápido"
      },
      recommended: {
        sistema: "PlayStation 5 Pro",
        procesador: "PlayStation Spectral Super Resolution (PSSR)",
        memoria: "16 GB GDDR6",
        graficos: "Fidelidad visual 4K a 60 fps con Ray Tracing completo",
        espacio: "90 GB SSD"
      }
    }
  },
  {
    id: "phantom-blade-zero",
    title: "PHANTOM BLADE ZERO",
    subtitle: "Kungfupunk Edition",
    genre: "Acción",
    genreFull: "Acción marcial y hack & slash rápido",
    platforms: ["playstation", "pc"],
    platform: "PlayStation 5 · PC / Windows",
    pegi: 18,
    price: 49.99,
    badge: "DESTACADO",
    hasDlc: false,
    rating: "4,7 / 5",
    edition: "EDICIÓN ESTÁNDAR",
    image: "Assets/phantom-blade-zero.jpg",
    description: "Un RPG de acción vertiginoso ambientado en un fascinante universo Kungfupunk donde las artes marciales orientales conviven con autómatas mecánicos y magia oscura. Combate contra asesinos implacables antes de que se agoten tus días.",
    compatibility: "Idiomas: español, inglés y chino mandarín · Compatible con mandos y teclado",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "Windows 10 64-bit",
        procesador: "Intel Core i5-8400 / AMD Ryzen 5 2600",
        memoria: "16 GB RAM",
        graficos: "NVIDIA GeForce RTX 2060 / Radeon RX 5600 XT",
        espacio: "80 GB SSD"
      },
      recommended: {
        sistema: "Windows 11 64-bit",
        procesador: "Intel Core i7-10700 / AMD Ryzen 7 3700X",
        memoria: "16 GB RAM",
        graficos: "NVIDIA GeForce RTX 3070 / Radeon RX 6800",
        espacio: "80 GB SSD NVMe"
      }
    }
  },
  {
    id: "demons-souls",
    title: "DEMON'S SOULS",
    subtitle: "Remake para PS5",
    genre: "Acción",
    genreFull: "Acción RPG y fantasía oscura",
    platforms: ["playstation"],
    platform: "PlayStation 5",
    pegi: 18,
    price: 44.99,
    badge: "CLÁSICO",
    hasDlc: false,
    rating: "4,9 / 5",
    edition: "EDICIÓN REMAKE",
    image: "Assets/demons-souls.jpg",
    description: "Reconstruido desde cero por Bluepoint Games, vive la oscura aventura y el implacable combate del juego que originó el fenómeno Soulslike. Adéntrate en el reino cubierto de niebla de Boletaria y reclama las almas de sus demonios.",
    compatibility: "Idiomas: español completo · Audio y textos en español · Compatible con DualSense",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "PlayStation 5",
        procesador: "AMD Zen 2 de 8 núcleos a 3.5 GHz",
        memoria: "16 GB GDDR6",
        graficos: "Tiempos de carga casi instantáneos y 60 fps",
        espacio: "66 GB disponibles"
      },
      recommended: {
        sistema: "PlayStation 5",
        procesador: "Modo Rendimiento 60 fps / Modo Cinemático 4K nativo",
        memoria: "16 GB GDDR6",
        graficos: "Sonido 3D inmersivo y retroalimentación háptica",
        espacio: "66 GB SSD"
      }
    }
  },
  {
    id: "dark-souls-remastered",
    title: "DARK SOULS REMASTERED",
    subtitle: "Lordran Edition",
    genre: "Acción",
    genreFull: "Acción y aventura Soulslike",
    platforms: ["pc", "playstation", "xbox", "nintendo"],
    platform: "PC · PS4 · Xbox · Switch",
    pegi: 16,
    price: 29.99,
    badge: "CLÁSICO",
    hasDlc: true,
    rating: "4,8 / 5",
    edition: "EDICIÓN REMASTERIZADA",
    image: "Assets/dark-souls-remastered.jpg",
    description: "Vuelve a encender la llama en la remasterización del juego que definió una generación entera. Explora el interconectado reino de Lordran con resolución 4K a 60 fps e incluye el legendario DLC 'Artorias of the Abyss'.",
    compatibility: "Idiomas: español e inglés · Compatible con mandos y pantalla panorámica",
    dlcs: [
      {
        id: "artorias-abyss",
        title: "Artorias of the Abyss",
        description: "Contenido de historia que te transporta al pasado para salvar a Oolacile",
        price: 0.00,
        icon: "⚔"
      }
    ],
    requirements: {
      minimum: {
        sistema: "Windows 7 SP1 64-bit",
        procesador: "Intel Core i5-2300 / AMD FX-6300",
        memoria: "6 GB RAM",
        graficos: "NVIDIA GeForce GTX 460 / ATI Radeon HD 6870",
        espacio: "8 GB disponibles"
      },
      recommended: {
        sistema: "Windows 10 64-bit",
        procesador: "Intel Core i5-4570 / AMD FX-8350",
        memoria: "8 GB RAM",
        graficos: "NVIDIA GeForce GTX 660 / ATI Radeon HD 7870",
        espacio: "8 GB SSD"
      }
    }
  },
  {
    id: "god-of-war",
    title: "GOD OF WAR",
    subtitle: "Edición PC / PS4",
    genre: "Acción",
    genreFull: "Acción y aventura mitológica",
    platforms: ["playstation", "pc"],
    platform: "PlayStation 4/5 · PC / Windows",
    pegi: 18,
    price: 29.99,
    badge: "DESTACADO",
    hasDlc: false,
    rating: "5,0 / 5",
    edition: "EDICIÓN ESTÁNDAR",
    image: "Assets/god-of-war.jpg",
    description: "Viviendo como un mortal lejos de la sombra del Olimpo, Kratos debe adaptarse a tierras nórdicas desconocidas, peligros imprevistos y a una segunda oportunidad de ser padre junto a su hijo Atreus.",
    compatibility: "Idiomas: español completo · Doblaje al español castellano y latino · Soporte ultrawide 21:9",
    dlcs: [],
    requirements: {
      minimum: {
        sistema: "Windows 10 64-bit",
        procesador: "Intel Core i5-2500K / AMD Ryzen 3 1200",
        memoria: "8 GB RAM",
        graficos: "NVIDIA GTX 960 (4 GB) / AMD R9 290X (4 GB)",
        espacio: "70 GB disponibles"
      },
      recommended: {
        sistema: "Windows 10 64-bit",
        procesador: "Intel Core i5-6600K / AMD Ryzen 5 2400G",
        memoria: "8 GB RAM",
        graficos: "NVIDIA GTX 1060 (6 GB) / AMD RX 570 (4 GB)",
        espacio: "70 GB SSD"
      }
    }
  },
  {
    id: "ff7-remake-intergrade",
    title: "FINAL FANTASY VII REMAKE",
    subtitle: "Intergrade",
    genre: "Aventura",
    genreFull: "RPG de acción cinematográfico",
    platforms: ["playstation", "pc"],
    platform: "PlayStation 5 · PC / Windows",
    pegi: 16,
    price: 39.99,
    badge: "CON DLC",
    hasDlc: true,
    rating: "4,8 / 5",
    edition: "EDICIÓN INTERGRADE",
    image: "Assets/ff7-remake-intergrade.jpg",
    description: "La espectacular reinvención del clásico que definió una era. Explora la metrópolis de Midgar con combates en tiempo real y comandos tácticos, además del episodio adicional FF7R EPISODE INTERmission protagonizado por Yuffie Kisaragi.",
    compatibility: "Idiomas: español, inglés y japonés · Audio completo · Compatible con DualSense y mando",
    dlcs: [
      {
        id: "episode-intermission",
        title: "FF7R EPISODE INTERmission",
        description: "Nueva aventura protagonizada por la ninja Yuffie Kisaragi para robar la materia suprema de Shinra",
        price: 19.99,
        icon: "⭐"
      }
    ],
    requirements: {
      minimum: {
        sistema: "Windows 10 64-bit",
        procesador: "Intel Core i5-3330 / AMD FX-8350",
        memoria: "8 GB RAM",
        graficos: "GeForce GTX 780 / Radeon RX 480",
        espacio: "100 GB disponibles"
      },
      recommended: {
        sistema: "Windows 11 64-bit",
        procesador: "Intel Core i7-7700 / AMD Ryzen 3 3100",
        memoria: "16 GB RAM",
        graficos: "GeForce RTX 2060 / Radeon RX 5700",
        espacio: "100 GB SSD"
      }
    }
  },
  {
    id: "dark-souls-2",
    title: "DARK SOULS II",
    subtitle: "Scholar of the First Sin",
    genre: "Acción",
    genreFull: "Acción RPG y fantasía oscura",
    platforms: ["pc", "playstation", "xbox"],
    platform: "PC · PlayStation · Xbox",
    pegi: 16,
    price: 24.99,
    badge: "CLÁSICO",
    hasDlc: true,
    rating: "4,6 / 5",
    edition: "EDICIÓN DEFINITIVA",
    image: "Assets/dark-souls-2.jpg",
    description: "Viaja al reino maldito de Drangleic en busca de una cura para la marca de los no muertos. Esta edición definitiva incluye los tres capítulos de 'Las Coronas Perdidas' y una reubicación desafiante de enemigos y jefes.",
    compatibility: "Idiomas: español e inglés · Compatible con mandos y 60 fps en PC y consolas",
    dlcs: [
      {
        id: "lost-crowns-trilogy",
        title: "Trilogía Las Coronas Perdidas",
        description: "Corona del Rey Hundido, Corona del Viejo Rey de Hierro y Corona del Rey de Marfil",
        price: 0.00,
        icon: "👑"
      }
    ],
    requirements: {
      minimum: {
        sistema: "Windows 7 SP1 / 8.1 / 10 64-bit",
        procesador: "Intel Core i3-2100 / AMD A8 3870K",
        memoria: "4 GB RAM",
        graficos: "NVIDIA GeForce GTX 465 / ATI Radeon HD 6870",
        espacio: "15 GB disponibles"
      },
      recommended: {
        sistema: "Windows 10 64-bit",
        procesador: "Intel Core i7-2600 / AMD FX-8150",
        memoria: "8 GB RAM",
        graficos: "NVIDIA GeForce GTX 750 / ATI Radeon HD 7850",
        espacio: "15 GB SSD"
      }
    }
  }
];

const ALL_PRODUCTS = PRODUCTS;

// Carrito en memoria (respaldado automáticamente en localStorage)
const CART_STORAGE_KEY = "nexo_play_cart";

function getCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      // Estado inicial por defecto con títulos reales
      return [
        { productId: "cyberpunk-2077", hasDlc: true },
        { productId: "bloodborne", hasDlc: true }
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
