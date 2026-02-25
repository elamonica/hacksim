/* ============================================
   HackSim - Mission System (15 Missions)
   ============================================ */

const Missions = (() => {
    const missionList = [
        // ═══════════════════════════════════════════
        // TIER 1 - NEWBIE
        // ═══════════════════════════════════════════
        {
            id: 'tutorial',
            name: 'Primeros Pasos',
            tier: 'Newbie',
            difficulty: 1,
            description: 'Aprende los comandos básicos de la terminal.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MENSAJE DE LA RED                             ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Bienvenido, novato.                              ║',
                '║  Antes de salir al mundo real, necesitas           ║',
                '║  aprender lo básico.                              ║',
                '║                                                    ║',
                '║  Conéctate al servidor de práctica y               ║',
                '║  explora el sistema de archivos.                   ║',
                '║                                                    ║',
                '║  Target: 10.0.0.1                                  ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '10.0.0.1',
            reward: { credits: 100, xp: 50 },
            levelReq: 1,
            toolsReq: [],
            objectives: [
                { id: 'connect', desc: 'Conectar al servidor 10.0.0.1', hint: 'Usa: connect 10.0.0.1' },
                { id: 'ls_root', desc: 'Listar archivos del directorio raíz', hint: 'Usa: ls' },
                { id: 'read_readme', desc: 'Leer el archivo readme.txt', hint: 'Navega a /home/user y usa: cat readme.txt' },
                { id: 'read_notes', desc: 'Encontrar el password en notes.txt', hint: 'Usa: cat notes.txt en /home/user' },
                { id: 'disconnect', desc: 'Desconectarse del servidor', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Comandos Básicos de Terminal',
                content: [
                    'En ciberseguridad, la terminal es tu herramienta principal.',
                    '',
                    'Conceptos aprendidos:',
                    '• ls - Listar archivos y directorios',
                    '• cat - Leer contenido de archivos',
                    '• cd - Cambiar de directorio',
                    '• connect/disconnect - Conectar/desconectar de servidores',
                    '',
                    'En la vida real:',
                    '• Los administradores de sistemas usan estos comandos a diario',
                    '• La navegación por terminal es más rápida que interfaces gráficas',
                    '• Muchos servidores solo tienen acceso por línea de comandos',
                    '',
                    '⚠️ NOTA: Nunca guardes passwords en archivos de texto plano!'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🖥️ AVENTURA: ¡Tu Primera Computadora Secreta!    ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  ¡Hola, Ciber Detective! 🕵️                       ║',
                    '  ║  Hoy es tu primer día en la Agencia de             ║',
                    '  ║  Ciber Detectives. ¡Felicitaciones! 🎉            ║',
                    '  ║                                                    ║',
                    '  ║  Te dieron una computadora especial para           ║',
                    '  ║  practicar. Es como tu primer laboratorio          ║',
                    '  ║  secreto. 🔬                                      ║',
                    '  ║                                                    ║',
                    '  ║  Aprendé a moverte por sus carpetas y archivos     ║',
                    '  ║  como un detective busca pistas en una casa. 🏠   ║',
                    '  ║                                                    ║',
                    '  ║  📍 Misión: Explorá la computadora en 10.0.0.1    ║',
                    '  ║     y encontrá el mensaje secreto escondido.       ║',
                    '  ║                                                    ║',
                    '  ║  💡 Tip: Usá "explain ls" para aprender más       ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Genial! Completaste tu primera aventura. 🌟',
                        '',
                        'Aprendiste a:',
                        '📂 ls → Ver qué hay adentro (como abrir un cajón)',
                        '📄 cat → Leer un archivo (como leer una carta)',
                        '🚶 cd → Caminar a otra carpeta (como ir a otra habitación)',
                        '🔌 connect → Llamar a otra computadora',
                        '',
                        '💡 Dato curioso:',
                        'Los expertos en computadoras usan estos comandos',
                        'TODOS los días. ¡Ya sabés lo mismo que ellos! 😎',
                        '',
                        '⚠️ Regla importante:',
                        '¡Nunca guardes contraseñas en archivos de texto!',
                        'Es como dejar la llave de tu casa debajo del felpudo. 🔑'
                    ]
                }
            }
        },

        {
            id: 'recon',
            name: 'Reconocimiento',
            tier: 'Newbie',
            difficulty: 2,
            description: 'Escanea un servidor y descubre sus servicios.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 NUEVA MISIÓN                                  ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Un cliente sospecha que su servidor web           ║',
                '║  tiene servicios expuestos innecesariamente.       ║',
                '║                                                    ║',
                '║  Tu tarea: hacer un reconocimiento completo        ║',
                '║  del servidor y encontrar servicios vulnerables.   ║',
                '║                                                    ║',
                '║  Target: 192.168.1.50                              ║',
                '║  Requiere: PortScanner v1.0                        ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '192.168.1.50',
            reward: { credits: 150, xp: 75 },
            levelReq: 1,
            toolsReq: ['portscanner_v1'],
            objectives: [
                { id: 'scan', desc: 'Escanear los puertos del servidor', hint: 'Usa: scan 192.168.1.50' },
                { id: 'connect', desc: 'Conectarse al servidor', hint: 'Usa: connect 192.168.1.50' },
                { id: 'find_robots', desc: 'Encontrar el archivo robots.txt', hint: 'Navega a /www/html y lee robots.txt' },
                { id: 'find_history', desc: 'Revisar el historial de bash', hint: 'Busca en /home/admin/.bash_history' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Reconocimiento y Escaneo de Puertos',
                content: [
                    'El reconocimiento es la primera fase de cualquier pentest.',
                    '',
                    'Conceptos aprendidos:',
                    '• Escaneo de puertos: descubrir qué servicios están abiertos',
                    '• Cada puerto abierto es una potencial superficie de ataque',
                    '• robots.txt puede revelar directorios ocultos',
                    '• .bash_history guarda comandos ejecutados anteriormente',
                    '',
                    'Herramientas reales:',
                    '• Nmap: El escáner de puertos más usado del mundo',
                    '• Masscan: Escaneo ultrarrápido de puertos',
                    '• Shodan: Motor de búsqueda de dispositivos conectados',
                    '',
                    '⚠️ NUNCA escanees servidores sin autorización explícita.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🗺️ AVENTURA: ¡El Mapa del Tesoro Digital!       ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  Un amigo tiene una computadora y cree que         ║',
                    '  ║  alguien dejó una puerta abierta sin querer. 🚪   ║',
                    '  ║                                                    ║',
                    '  ║  Tu trabajo como Ciber Detective es caminar        ║',
                    '  ║  alrededor de la "casa digital" y anotar todas     ║',
                    '  ║  las puertas (puertos) que encontrés abiertas. 📝 ║',
                    '  ║                                                    ║',
                    '  ║  ¡Es como hacer un mapa del tesoro, pero de       ║',
                    '  ║  una computadora! 🏴‍☠️                              ║',
                    '  ║                                                    ║',
                    '  ║  📍 Escaneá 192.168.1.50 y descubrí sus secretos  ║',
                    '  ║  🔍 Necesitás: PortScanner (compralo en la tienda)║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Excelente trabajo, detective! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '🚪 Puertos → Son como las puertas de una casa',
                        '   Cada puerta tiene un número (80, 443, 22...)',
                        '🔍 Escanear → Revisar cuáles puertas están abiertas',
                        '📜 robots.txt → Un archivo que dice qué se puede ver',
                        '📋 bash_history → Un diario de todo lo que se escribió',
                        '',
                        '💡 Dato curioso:',
                        'Una computadora tiene 65,535 puertas posibles.',
                        '¡Eso es como un edificio gigantísimo! 🏢',
                        '',
                        '⚠️ Regla importante:',
                        'Nunca revises las puertas de una computadora',
                        'que no sea tuya sin pedir permiso primero. 🙋'
                    ]
                }
            }
        },

        {
            id: 'weak_password',
            name: 'Password Débil',
            tier: 'Newbie',
            difficulty: 2,
            description: 'Crackea un password débil para acceder al sistema.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: PASSWORD DÉBIL                        ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Un servidor legacy tiene un password muy débil.   ║',
                '║  Tu misión: demostrar lo fácil que es crackearlo   ║',
                '║  y acceder a datos sensibles.                     ║',
                '║                                                    ║',
                '║  Target: 172.16.0.10                               ║',
                '║  Requiere: PassCracker v1.0                        ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '172.16.0.10',
            reward: { credits: 200, xp: 100 },
            levelReq: 2,
            toolsReq: ['passcracker'],
            objectives: [
                { id: 'scan', desc: 'Escanear el servidor', hint: 'Usa: scan 172.16.0.10' },
                { id: 'crack', desc: 'Crackear el password del servidor', hint: 'Usa: crack 172.16.0.10' },
                { id: 'connect', desc: 'Conectarse con las credenciales', hint: 'Usa: connect 172.16.0.10' },
                { id: 'find_passwords', desc: 'Encontrar el archivo de passwords', hint: 'Busca en /Users/Administrator/Desktop' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Seguridad de Contraseñas',
                content: [
                    'Las contraseñas débiles son la vulnerabilidad #1 del mundo.',
                    '',
                    'Conceptos aprendidos:',
                    '• Ataques de diccionario: prueban passwords comunes',
                    '• "password123" es uno de los passwords más usados del mundo',
                    '• Un password débil se crackea en segundos',
                    '',
                    'Buenas prácticas:',
                    '• Usa passwords de mínimo 12 caracteres',
                    '• Combina mayúsculas, minúsculas, números y símbolos',
                    '• Nunca reutilices passwords entre servicios',
                    '• Usa un gestor de passwords (Bitwarden, 1Password)',
                    '• Activa MFA (Multi-Factor Authentication) siempre que puedas',
                    '',
                    '⚠️ El 81% de las brechas de datos involucran passwords débiles.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🔐 AVENTURA: ¡La Cerradura Floja!               ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  ¡Oh no! Una computadora vieja tiene una           ║',
                    '  ║  contraseña MUY fácil de adivinar... 🤦           ║',
                    '  ║  Es como ponerle "1234" a tu candado.             ║',
                    '  ║                                                    ║',
                    '  ║  Un villano digital podría entrar fácilmente.     ║',
                    '  ║  Tu misión: demostrar que la contraseña           ║',
                    '  ║  es débil para que el dueño la cambie             ║',
                    '  ║  por una más fuerte. 💪                           ║',
                    '  ║                                                    ║',
                    '  ║  📍 Probá crackear 172.16.0.10                    ║',
                    '  ║  💡 Recordá: ¡una buena contraseña es como        ║',
                    '  ║     una receta secreta de cocina! 🍪              ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Buenísimo! Demostraste lo fácil que es adivinar',
                        'una contraseña débil. 🌟',
                        '',
                        'Aprendiste sobre:',
                        '🔑 Contraseñas débiles → Fáciles de adivinar',
                        '   "123456" y "password" son las peores',
                        '🔒 Contraseñas fuertes → Difíciles de adivinar',
                        '   Ejemplo: "MiGato#Come3Pizzas!" 🍕🐱',
                        '',
                        '✅ Tips para una SÚPER contraseña:',
                        '• Que sea larga (más de 12 letras)',
                        '• Mezclá mayúsculas, minúsculas, números y símbolos',
                        '• ¡Nunca uses tu nombre o cumpleaños!',
                        '• Usá una contraseña diferente para cada cosa',
                        '',
                        '⚠️ Regla importante:',
                        'Si alguien te pide tu contraseña, ¡NUNCA la des!',
                        'Ni siquiera si dice ser tu amigo. 🙅'
                    ]
                }
            }
        },

        {
            id: 'phishing',
            name: 'El Email Sospechoso',
            tier: 'Newbie',
            difficulty: 2,
            description: 'Analiza emails y detecta cuáles son phishing.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: DETECCIÓN DE PHISHING                 ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Un usuario reportó emails sospechosos.           ║',
                '║  Analiza su bandeja y determina cuáles son         ║',
                '║  phishing y cuáles son legítimos.                  ║',
                '║                                                    ║',
                '║  Target: 10.0.1.25 (Mail Server)                   ║',
                '║  Requiere: PhishDetector                           ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '10.0.1.25',
            reward: { credits: 200, xp: 100 },
            levelReq: 2,
            toolsReq: ['phishdetector'],
            objectives: [
                { id: 'connect', desc: 'Conectarse al mail server', hint: 'Usa: connect 10.0.1.25' },
                { id: 'read_emails', desc: 'Leer los 3 emails', hint: 'Navega a /mail/inbox y lee cada email' },
                { id: 'analyze_phish', desc: 'Analizar emails con PhishDetector', hint: 'Usa: phish analyze email_1.txt y email_3.txt' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Phishing y Ingeniería Social',
                content: [
                    'El phishing es el ataque más común en el mundo.',
                    '',
                    'Señales de phishing detectadas:',
                    '• Dominios falsos: g00gle-support.com (con ceros en vez de "o")',
                    '• paypa1.com (con "1" en vez de "l")',
                    '• Urgencia: "URGENTE", "Su cuenta será suspendida"',
                    '• Links sospechosos con parámetros extraños',
                    '• El email 2 era legítimo (dominio correcto, sin urgencia)',
                    '',
                    'Cómo protegerte:',
                    '• Verifica siempre el dominio del remitente',
                    '• No hagas clic en links de emails sospechosos',
                    '• Los servicios legítimos NUNCA piden tu password por email',
                    '• Ante la duda, ve directamente al sitio web oficial',
                    '',
                    '⚠️ El 90% de los ciberataques comienzan con un email de phishing.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🎣 AVENTURA: ¡Cuidado con los Emails Trampa!    ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  ¡ALERTA! Alguien está mandando emails falsos     ║',
                    '  ║  haciéndose pasar por empresas conocidas. 🪤      ║',
                    '  ║                                                    ║',
                    '  ║  Es como cuando alguien se disfraza de cartero    ║',
                    '  ║  para que le abras la puerta de tu casa. 📬       ║',
                    '  ║                                                    ║',
                    '  ║  Tu misión: revisar 3 emails y descubrir          ║',
                    '  ║  cuáles son TRAMPAS y cuál es de verdad.          ║',
                    '  ║                                                    ║',
                    '  ║  📍 Conectate a 10.0.1.25 y analizá los emails   ║',
                    '  ║  🔍 Fijate bien en QUIÉN los manda...            ║',
                    '  ║     Los tramposos cambian letras para engañarte!  ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Sos un experto detectando trampas! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '🎣 Phishing → Emails falsos que parecen reales',
                        '🔍 Trucos de los tramposos:',
                        '   • Cambian letras: "g00gle" (con ceros en vez de o)',
                        '   • "paypa1" (con el número 1 en vez de la L)',
                        '   • Dicen "URGENTE" para que no pienses bien',
                        '',
                        '✅ Cómo protegerte:',
                        '• Siempre mirá QUIÉN manda el email',
                        '• Si dice "URGENTE" → ¡sospechá! 🚩',
                        '• Nunca hagas clic en links raros',
                        '• Si dudás, preguntale a un adulto',
                        '',
                        '⚠️ Regla importante:',
                        'Si un email te pide tu contraseña,',
                        '¡SIEMPRE es una trampa! Ninguna empresa',
                        'real te pide tu contraseña por email. 📧🚫'
                    ]
                }
            }
        },

        // ═══════════════════════════════════════════
        // TIER 2 - SCRIPT KIDDIE
        // ═══════════════════════════════════════════
        {
            id: 'sql_injection',
            name: 'Inyección Letal',
            tier: 'Script Kiddie',
            difficulty: 3,
            description: 'Explota una vulnerabilidad SQL Injection.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: SQL INJECTION                         ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Una tienda online tiene una vulnerabilidad        ║',
                '║  crítica en su sistema de login.                   ║',
                '║  Demuestra el riesgo con SQL injection.            ║',
                '║                                                    ║',
                '║  Target: 192.168.10.100 (ShopMax)                  ║',
                '║  Requiere: SQLMap Lite                              ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '192.168.10.100',
            reward: { credits: 350, xp: 175 },
            levelReq: 3,
            toolsReq: ['sqlmap'],
            objectives: [
                { id: 'scan', desc: 'Escanear el servidor', hint: 'Usa: scan 192.168.10.100' },
                { id: 'sqlinject', desc: 'Ejecutar SQL injection', hint: 'Usa: sqlinject 192.168.10.100' },
                { id: 'connect', desc: 'Conectarse al servidor', hint: 'Usa: connect 192.168.10.100' },
                { id: 'find_config', desc: 'Encontrar credenciales en config.php', hint: 'Navega a /var/www/html y lee config.php' },
                { id: 'find_dump', desc: 'Encontrar el dump de la base de datos', hint: 'Lee db_dump.sql en /var/www/html' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: SQL Injection',
                content: [
                    'SQL Injection es una de las vulnerabilidades web más peligrosas.',
                    '',
                    'Cómo funciona:',
                    '• El atacante inyecta código SQL en campos de entrada',
                    '• Ejemplo: en el campo usuario escribir: \' OR 1=1 --',
                    '• Esto modifica la consulta SQL y bypasea la autenticación',
                    '• Se puede extraer toda la base de datos',
                    '',
                    'Prevención:',
                    '• NUNCA concatenar input del usuario en consultas SQL',
                    '• Usar prepared statements / parameterized queries',
                    '• Validar y sanitizar TODOS los inputs del usuario',
                    '• Usar un ORM (Object-Relational Mapping)',
                    '• Principio de mínimo privilegio en la base de datos',
                    '',
                    '⚠️ SQL Injection está en el OWASP Top 10 desde hace 20 años.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🎩 AVENTURA: ¡El Truco Mágico de la Base!       ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  Una tienda online tiene un error en su sistema.   ║',
                    '  ║  🛒 Es como si en la puerta de un club            ║',
                    '  ║  preguntaran "¿Cuál es la contraseña?" y vos      ║',
                    '  ║  pudieras decir una frase mágica que confunde     ║',
                    '  ║  al guardia... ¡y te deja pasar igual! 🎩✨      ║',
                    '  ║                                                    ║',
                    '  ║  ¡Hay que encontrar el error para que             ║',
                    '  ║  lo arreglen y nadie pueda hacer el truco!        ║',
                    '  ║                                                    ║',
                    '  ║  📍 Investigá 192.168.10.100 (Tienda ShopMax)     ║',
                    '  ║  💉 Necesitás: SQLMap Lite                        ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Encontraste el truco mágico! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '💉 SQL Injection → Un truco para engañar bases de datos',
                        '📒 Base de datos → Como una agenda gigante que guarda info',
                        '',
                        '¿Cómo funciona el truco?',
                        'Imaginate que el guardia pregunta tu nombre y vos decís:',
                        '"Soy Juan O soy cualquier persona" 🤯',
                        '¡Y el guardia se confunde y te deja pasar!',
                        '',
                        '✅ Cómo se arregla:',
                        'Los programadores tienen que revisar lo que escribís',
                        'y no dejarse engañar por frases raras.',
                        '',
                        '💡 Dato curioso:',
                        'Este error existe hace más de 20 años',
                        'y TODAVÍA hay sitios web que lo tienen. 😱'
                    ]
                }
            }
        },

        {
            id: 'outdated_server',
            name: 'El Servidor Olvidado',
            tier: 'Script Kiddie',
            difficulty: 3,
            description: 'Explota servicios desactualizados con CVEs conocidos.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: SERVIDOR DESACTUALIZADO                ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Un servidor de archivos no se actualiza           ║',
                '║  desde 2020. Tiene múltiples CVEs sin parchear.    ║',
                '║  Demuestra los riesgos del software obsoleto.      ║',
                '║                                                    ║',
                '║  Target: 10.10.10.50                               ║',
                '║  Requiere: ExploitKit v1.0                         ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '10.10.10.50',
            reward: { credits: 400, xp: 200 },
            levelReq: 3,
            toolsReq: ['exploitkit'],
            objectives: [
                { id: 'scan', desc: 'Escanear y encontrar servicios vulnerables', hint: 'Usa: scan 10.10.10.50 - busca versiones viejas' },
                { id: 'exploit', desc: 'Explotar la vulnerabilidad de Samba', hint: 'Usa: exploit 10.10.10.50' },
                { id: 'connect', desc: 'Conectarse al servidor', hint: 'Usa: connect 10.10.10.50' },
                { id: 'find_todo', desc: 'Leer la lista de tareas del sysadmin', hint: 'Busca en /home/sysadmin/todo.txt' },
                { id: 'find_data', desc: 'Acceder a datos confidenciales', hint: 'Busca en /shares/confidential/' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Vulnerabilidades y Patching',
                content: [
                    'El software desactualizado es una puerta abierta a los atacantes.',
                    '',
                    'Conceptos aprendidos:',
                    '• CVE: Common Vulnerabilities and Exposures - base de datos pública',
                    '• Los exploits para CVEs conocidos están disponibles públicamente',
                    '• Un servidor sin parchear de 2020 tiene cientos de vulnerabilidades',
                    '',
                    'Buenas prácticas:',
                    '• Actualizar software regularmente (patch management)',
                    '• Suscribirse a alertas de seguridad de los fabricantes',
                    '• Usar herramientas de escaneo de vulnerabilidades',
                    '• Tener un plan de actualización y testing',
                    '• NO usar software EOL (End of Life)',
                    '',
                    '⚠️ El 60% de las brechas involucran vulnerabilidades sin parchear.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🏚️ AVENTURA: ¡La Computadora que Nadie Cuida!   ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  Hay un servidor viejo que nadie actualiza         ║',
                    '  ║  desde hace AÑOS. 📅                              ║',
                    '  ║                                                    ║',
                    '  ║  Es como una casa abandonada con las ventanas     ║',
                    '  ║  rotas y la puerta sin llave. 🏠💨                ║',
                    '  ║  ¡Cualquiera podría entrar!                       ║',
                    '  ║                                                    ║',
                    '  ║  Tu misión como Ciber Detective:                   ║',
                    '  ║  Demostrar lo peligroso que es NO actualizar      ║',
                    '  ║  los programas de una computadora. 🔄             ║',
                    '  ║                                                    ║',
                    '  ║  📍 Explorá 10.10.10.50                           ║',
                    '  ║  🐛 Necesitás: ExploitKit v1.0                    ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Demostraste por qué hay que actualizar! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '🔄 Actualizaciones → Son como vacunas para tu compu',
                        '   Si no la vacunás, se puede enfermar',
                        '🐛 Bugs → Errores en los programas',
                        '   Los malos usan esos errores para entrar',
                        '',
                        '¿Sabías que...?',
                        'Cuando tu celular o compu dice "Hay una actualización",',
                        '¡no es para molestarte! Es para protegerte. 🛡️',
                        '',
                        '✅ Consejos:',
                        '• Siempre aceptá las actualizaciones',
                        '• No uses programas muy viejos',
                        '• Pedile a tus papás que actualicen el WiFi también',
                        '',
                        '⚠️ Regla importante:',
                        'Una computadora sin actualizar es como',
                        'una casa con la puerta abierta de par en par. 🚪'
                    ]
                }
            }
        },

        {
            id: 'crypto',
            name: 'Criptografía 101',
            tier: 'Script Kiddie',
            difficulty: 3,
            description: 'Descifra mensajes con distintos métodos criptográficos.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: CRIPTOGRAFÍA                          ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Un servidor con datos cifrados necesita ser        ║',
                '║  analizado. Los archivos usan diferentes            ║',
                '║  métodos de cifrado. Descifra los mensajes.         ║',
                '║                                                    ║',
                '║  Target: 172.16.5.5                                ║',
                '║  Requiere: CryptoTool                               ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '172.16.5.5',
            reward: { credits: 400, xp: 200 },
            levelReq: 3,
            toolsReq: ['cryptotool'],
            objectives: [
                { id: 'connect', desc: 'Conectarse al crypto-vault', hint: 'Usa: connect 172.16.5.5' },
                { id: 'read_hint', desc: 'Leer la pista', hint: 'Usa: cat hint.txt en /vault' },
                { id: 'decrypt_caesar', desc: 'Descifrar el mensaje cifrado con César', hint: 'Usa: decrypt secret_message.enc (es César +3)' },
                { id: 'decrypt_base64', desc: 'Descifrar el archivo Base64', hint: 'Usa: decrypt archive.enc' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Criptografía Básica',
                content: [
                    'La criptografía es la base de la seguridad digital.',
                    '',
                    'Métodos vistos:',
                    '• Cifrado César: desplaza cada letra N posiciones (muy débil)',
                    '• Base64: codificación (NO es cifrado, es reversible)',
                    '• Hashing: función unidireccional (MD5, SHA-256)',
                    '',
                    'Criptografía moderna:',
                    '• AES-256: cifrado simétrico estándar',
                    '• RSA: cifrado asimétrico (clave pública/privada)',
                    '• TLS/SSL: protege las comunicaciones web (HTTPS)',
                    '',
                    'Importante:',
                    '• Base64 NO es seguro para ocultar datos',
                    '• MD5 y SHA-1 están rotos, usar SHA-256 o bcrypt',
                    '• La seguridad depende de la gestión de las claves',
                    '',
                    '⚠️ Nunca inventes tu propia criptografía. Usa estándares probados.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🔮 AVENTURA: ¡El Club de Mensajes Secretos!     ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  ¡Hay mensajes cifrados esperándote! 📜            ║',
                    '  ║                                                    ║',
                    '  ║  Uno usa el código de Julio César, un emperador    ║',
                    '  ║  romano que cambiaba las letras de lugar para      ║',
                    '  ║  esconder sus mensajes. 👑                        ║',
                    '  ║  (La A se convierte en D, la B en E...)           ║',
                    '  ║                                                    ║',
                    '  ║  Otro está en un código de computadoras            ║',
                    '  ║  llamado Base64. 💻                               ║',
                    '  ║                                                    ║',
                    '  ║  ¡Sos un descifrador de códigos! 🕵️               ║',
                    '  ║                                                    ║',
                    '  ║  📍 Conectate a 172.16.5.5 y descifralos          ║',
                    '  ║  🔐 Necesitás: CryptoTool                         ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Descifraste los mensajes secretos! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '🔤 Cifrado César → Mover cada letra unas posiciones',
                        '   A→D, B→E, C→F... (movemos 3 posiciones)',
                        '   Es como un código secreto entre amigos',
                        '💻 Base64 → Un código que usan las computadoras',
                        '   Las letras se convierten en otros símbolos raros',
                        '',
                        '💡 Dato curioso:',
                        'Julio César usaba este código hace más de',
                        '2000 años para mandar mensajes a sus soldados.',
                        '¡Y vos lo descifraste! 🏛️',
                        '',
                        '✅ En la vida real:',
                        'Cuando ves un candadito 🔒 en el navegador,',
                        'significa que tus mensajes viajan cifrados',
                        'y nadie puede leerlos en el camino.',
                        '',
                        '⚠️ Regla: Base64 NO es seguro.',
                        'Es como escribir al revés: cualquiera puede descifrarlo.'
                    ]
                }
            }
        },

        {
            id: 'social_engineering',
            name: 'Ingeniería Social',
            tier: 'Script Kiddie',
            difficulty: 4,
            description: 'Usa OSINT e ingeniería social para obtener acceso.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: INGENIERÍA SOCIAL                     ║',
                '╠════════════════════════════════════════════════════╣',
                '║  MegaCorp necesita un pentest de ingeniería         ║',
                '║  social. Recopila info pública de empleados         ║',
                '║  y encuentra una forma de acceder al sistema.       ║',
                '║                                                    ║',
                '║  Target: 192.168.50.1 (Corporate Portal)            ║',
                '║  Requiere: SocialKit                                ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '192.168.50.1',
            reward: { credits: 500, xp: 250 },
            levelReq: 4,
            toolsReq: ['socialkit'],
            objectives: [
                { id: 'connect', desc: 'Conectarse al portal corporativo', hint: 'Usa: connect 192.168.50.1' },
                { id: 'find_directory', desc: 'Encontrar el directorio de empleados', hint: 'Busca en /employees/directory.txt' },
                { id: 'find_policy', desc: 'Leer la política de IT', hint: 'Lee /intranet/it_policy.txt para saber el formato de usuarios' },
                { id: 'social', desc: 'Usar ingeniería social con el IT admin', hint: 'Usa: social rsilva' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Ingeniería Social y OSINT',
                content: [
                    'El eslabón más débil de la seguridad siempre es el humano.',
                    '',
                    'OSINT (Open Source Intelligence):',
                    '• Información pública disponible en redes, sitios web, etc.',
                    '• LinkedIn, organigramas, directorios de empleados',
                    '• Se usa para construir perfiles y pretextos creíbles',
                    '',
                    'Técnicas de ingeniería social:',
                    '• Pretexting: crear una identidad/historia falsa',
                    '• Phishing: emails engañosos',
                    '• Vishing: llamadas telefónicas fraudulentas',
                    '• Tailgating: seguir a alguien para entrar a un edificio',
                    '',
                    'Defensa:',
                    '• Entrenar empleados en seguridad (security awareness)',
                    '• Verificar identidad antes de dar información',
                    '• El help desk NUNCA debe pedir/dar passwords',
                    '',
                    '⚠️ Kevin Mitnick dijo: "El ataque más efectivo no usa código".'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🕵️ AVENTURA: ¡El Espía de la Oficina!           ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  A veces los "hackers malos" no usan programas... ║',
                    '  ║  ¡Usan TRUCOS para engañar a las personas! 🎭    ║',
                    '  ║                                                    ║',
                    '  ║  Es como cuando alguien llama por teléfono         ║',
                    '  ║  y dice "soy del banco" para sacarte              ║',
                    '  ║  información secreta. 📞😈                       ║',
                    '  ║                                                    ║',
                    '  ║  Tu misión: encontrar info pública de una          ║',
                    '  ║  empresa y mostrar cómo un malo podría usarla.    ║',
                    '  ║                                                    ║',
                    '  ║  📍 Investigá 192.168.50.1 (MegaCorp)             ║',
                    '  ║  ⚠️ Recordá: ¡nunca le des tu contraseña a nadie!║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Descubriste los trucos de los espías! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '🎭 Ingeniería Social → Engañar personas para sacar info',
                        '🔍 OSINT → Buscar info que la gente publica sin darse cuenta',
                        '',
                        'Trucos que usan los malos:',
                        '📞 "Hola, soy del soporte técnico" (¡mentira!)',
                        '📧 "Necesito tu contraseña para arreglar tu cuenta" (¡trampa!)',
                        '🤝 "Soy amigo de tu jefe" (¡falso!)',
                        '',
                        '✅ Cómo protegerte:',
                        '• NUNCA des tu contraseña a nadie (ni a tu mejor amigo)',
                        '• Si alguien te llama pidiendo datos, ¡colgá!',
                        '• Preguntale a un adulto si dudás',
                        '• No publiques información personal en internet',
                        '',
                        '⚠️ Regla de oro:',
                        'Si alguien te pide información y te apura,',
                        '¡es casi seguro una trampa! Tomá tu tiempo. ⏰'
                    ]
                }
            }
        },

        // ═══════════════════════════════════════════
        // TIER 3 - HACKER
        // ═══════════════════════════════════════════
        {
            id: 'firewall',
            name: 'Detrás del Firewall',
            tier: 'Hacker',
            difficulty: 5,
            description: 'Bypasea un firewall mal configurado.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: BYPASS DE FIREWALL                    ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Un servidor "seguro" tiene un firewall...          ║',
                '║  pero está mal configurado. Encuentra la            ║',
                '║  debilidad y accede al sistema.                     ║',
                '║                                                    ║',
                '║  Target: 10.20.30.40                               ║',
                '║  Requiere: FirewallBreaker                          ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '10.20.30.40',
            reward: { credits: 600, xp: 300 },
            levelReq: 5,
            toolsReq: ['firewallbreaker'],
            objectives: [
                { id: 'scan', desc: 'Escanear y encontrar el puerto no filtrado', hint: 'Usa: scan 10.20.30.40 - busca puertos open vs filtered' },
                { id: 'firewall_bypass', desc: 'Bypasear el firewall', hint: 'Usa: firewall bypass 10.20.30.40' },
                { id: 'connect', desc: 'Conectarse al servidor', hint: 'Usa: connect 10.20.30.40' },
                { id: 'find_rules', desc: 'Encontrar las reglas del firewall', hint: 'Busca en /var/firewall/rules.conf' },
                { id: 'find_config', desc: 'Encontrar el token de admin', hint: 'Lee /opt/app/config.yml' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Firewalls y Configuración',
                content: [
                    'Un firewall mal configurado es peor que no tener firewall.',
                    '',
                    'Conceptos:',
                    '• Firewalls filtran tráfico por puertos, IPs, protocolos',
                    '• "Filtered" = el firewall bloquea el puerto',
                    '• "Open" = el puerto es accesible',
                    '• Una mala regla puede dejar todo expuesto',
                    '',
                    'Error común encontrado:',
                    '• Puerto 8443 abierto a todos (debería estar filtrado)',
                    '• Reglas permisivas que no cubren todos los puertos',
                    '',
                    'Buenas prácticas:',
                    '• Principio de deny-by-default (bloquear todo, permitir lo necesario)',
                    '• Auditar reglas de firewall periódicamente',
                    '• Segmentar la red con VLANs y firewalls internos',
                    '',
                    '⚠️ El 95% de las brechas de firewall son por mala configuración.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🧱 AVENTURA: ¡El Muro que Tiene un Agujero!     ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  Un servidor tiene un "firewall" - es como un      ║',
                    '  ║  muro GIGANTE que protege una fortaleza. 🏰       ║',
                    '  ║                                                    ║',
                    '  ║  Pero alguien construyó el muro con un agujero... ║',
                    '  ║  ¡Y los malos podrían entrar por ahí! 😱          ║',
                    '  ║                                                    ║',
                    '  ║  Tu misión como Ciber Detective:                   ║',
                    '  ║  Encontrar el agujero en el muro para que          ║',
                    '  ║  el dueño pueda taparlo. 🔧                       ║',
                    '  ║                                                    ║',
                    '  ║  📍 Escaneá 10.20.30.40 y buscá la falla          ║',
                    '  ║  🛡️ Necesitás: FirewallBreaker                    ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Encontraste el agujero en el muro! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '🧱 Firewall → Un muro digital que protege computadoras',
                        '   Solo deja pasar a los que tienen permiso',
                        '🚪 Puertos filtrados → Puertas que el muro bloquea',
                        '🔓 Puertos abiertos → Puertas que el muro NO bloquea',
                        '',
                        'El error que encontraste:',
                        'El muro tenía una puerta que no debería estar abierta.',
                        '¡Es como construir un muro altísimo pero dejar',
                        'una puerta trasera sin llave! 🚪🔓',
                        '',
                        '✅ Lección:',
                        'Un muro solo sirve si NO tiene agujeros.',
                        'Hay que revisar las reglas del firewall seguido.',
                        '',
                        '💡 En tu casa:',
                        'Tu WiFi tiene un firewall. ¡Pedile a tus papás',
                        'que se aseguren de que esté bien configurado! 📶'
                    ]
                }
            }
        },

        {
            id: 'privesc',
            name: 'Escalada de Privilegios',
            tier: 'Hacker',
            difficulty: 5,
            description: 'Escala privilegios de usuario normal a root.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: PRIVILEGE ESCALATION                  ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Tienes acceso como "developer" a un servidor.     ║',
                '║  Tu objetivo: escalar a root y obtener acceso      ║',
                '║  total al sistema.                                 ║',
                '║                                                    ║',
                '║  Target: 172.16.100.10                             ║',
                '║  Requiere: RootKit Master                           ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '172.16.100.10',
            reward: { credits: 700, xp: 350 },
            levelReq: 5,
            toolsReq: ['rootkit'],
            objectives: [
                { id: 'connect', desc: 'Conectarse como developer', hint: 'Usa: connect 172.16.100.10' },
                { id: 'find_notes', desc: 'Leer las notas del developer', hint: 'Lee /home/developer/notes.txt' },
                { id: 'find_sudoers', desc: 'Revisar permisos sudo', hint: 'Lee /etc/sudoers' },
                { id: 'find_crontab', desc: 'Revisar cron jobs', hint: 'Lee /etc/crontab - busca scripts que corren como root' },
                { id: 'privesc', desc: 'Escalar privilegios a root', hint: 'Usa: privesc 172.16.100.10' },
                { id: 'find_flag', desc: 'Leer la flag de root', hint: 'Lee /root/flag.txt' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Escalada de Privilegios',
                content: [
                    'La escalada de privilegios es obtener más permisos de los asignados.',
                    '',
                    'Vectores de escalada encontrados:',
                    '• sudo sin password para vim y find (ambos permiten escape a shell)',
                    '• Cron job ejecutando script como root desde /tmp (world-writable)',
                    '• Un atacante puede modificar el script y obtener root',
                    '',
                    'Tipos de escalada:',
                    '• Vertical: usuario normal → root/admin',
                    '• Horizontal: usuario A → usuario B (mismo nivel)',
                    '',
                    'Prevención:',
                    '• Principio de mínimo privilegio',
                    '• No dar sudo a editores de texto o herramientas con escape',
                    '• Cron jobs no deben ejecutar scripts en /tmp',
                    '• Auditar permisos de archivos regularmente',
                    '',
                    '⚠️ "sudo vim" te da acceso root completo (:!bash).'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  👑 AVENTURA: ¡De Visitante a Rey del Castillo!  ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  Entraste a una computadora como un usuario        ║',
                    '  ║  normal (como un visitante en un castillo). 🏰    ║',
                    '  ║                                                    ║',
                    '  ║  Pero descubriste que hay formas de convertirte   ║',
                    '  ║  en el REY (el administrador que manda en todo).  ║',
                    '  ║  ¡Es como encontrar un pasadizo secreto           ║',
                    '  ║  directo al trono! 🚪👑                          ║',
                    '  ║                                                    ║',
                    '  ║  Tu misión: demostrar que un visitante             ║',
                    '  ║  puede llegar a ser rey.                           ║',
                    '  ║                                                    ║',
                    '  ║  📍 Conectate a 172.16.100.10                     ║',
                    '  ║  👑 Necesitás: RootKit Master                     ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Llegaste de visitante a rey! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '👤 Usuario normal → Puede hacer pocas cosas (como un visitante)',
                        '👑 Administrador (root) → Puede hacer TODO (como el rey)',
                        '📈 Escalar privilegios → Pasar de visitante a rey',
                        '',
                        '¿Cómo lo lograste?',
                        'Encontraste que el "rey" le dio permisos de más',
                        'al visitante sin darse cuenta.',
                        'Es como si el rey dejara su corona en un banco',
                        'del parque. ¡Cualquiera podría agarrarla! 👑',
                        '',
                        '✅ Lección:',
                        'Cada persona debería tener SOLO los permisos',
                        'que necesita. Ni más, ni menos.',
                        '',
                        '💡 En tu casa:',
                        'Por eso tu compu tiene usuarios diferentes.',
                        '¡La cuenta de admin no es para usar todos los días!'
                    ]
                }
            }
        },

        {
            id: 'mitm',
            name: 'Man in the Middle',
            tier: 'Hacker',
            difficulty: 6,
            description: 'Intercepta tráfico de red entre dispositivos.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: MAN IN THE MIDDLE                     ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Analiza el tráfico de una red local para           ║',
                '║  demostrar los peligros de conexiones no            ║',
                '║  cifradas y certificados autofirmados.              ║',
                '║                                                    ║',
                '║  Target: 192.168.1.1 (Gateway Router)               ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '192.168.1.1',
            reward: { credits: 800, xp: 400 },
            levelReq: 6,
            toolsReq: ['proxychain'],
            objectives: [
                { id: 'scan', desc: 'Escanear el router', hint: 'Usa: scan 192.168.1.1' },
                { id: 'connect', desc: 'Conectarse al router', hint: 'Usa: connect 192.168.1.1' },
                { id: 'find_arp', desc: 'Revisar la tabla ARP', hint: 'Lee /config/arp_table.txt' },
                { id: 'find_traffic', desc: 'Analizar el tráfico', hint: 'Lee /logs/traffic.log - busca conexiones HTTP (sin S)' },
                { id: 'find_cert', desc: 'Analizar certificados', hint: 'Lee /certs/server.crt - busca self-signed' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Ataques Man in the Middle',
                content: [
                    'Un ataque MITM intercepta comunicaciones entre dos partes.',
                    '',
                    'Conceptos:',
                    '• ARP Spoofing: el atacante se hace pasar por el gateway',
                    '• Todo el tráfico pasa a través del atacante',
                    '• HTTP (sin S) = tráfico en texto plano = fácil de leer',
                    '• HTTPS protege con cifrado, PERO...',
                    '• Certificados autofirmados pueden ser suplantados',
                    '',
                    'Lo que descubrimos:',
                    '• Tráfico HTTP sin cifrar (social.example.com, shop)',
                    '• Certificado self-signed en el router (no confiable)',
                    '• Datos bancarios viajando por HTTPS (protegido)',
                    '',
                    'Protección:',
                    '• Siempre verificar HTTPS y el candado en el navegador',
                    '• No ignorar advertencias de certificados',
                    '• Usar VPN en redes WiFi públicas',
                    '',
                    '⚠️ En WiFi público, CUALQUIERA puede hacer un ataque MITM.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  👂 AVENTURA: ¡El Espía en el Medio!             ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  Imaginate que le mandás una carta a tu amigo...  ║',
                    '  ║  💌 pero alguien en el camino la abre, la lee,    ║',
                    '  ║  y la vuelve a cerrar sin que nadie se entere.    ║',
                    '  ║                                                    ║',
                    '  ║  ¡Eso es un ataque "Man in the Middle"!           ║',
                    '  ║  (Hombre en el Medio) 🕵️                         ║',
                    '  ║                                                    ║',
                    '  ║  Tu misión: encontrar comunicaciones que no       ║',
                    '  ║  están protegidas en una red.                      ║',
                    '  ║                                                    ║',
                    '  ║  📍 Investigá el router 192.168.1.1               ║',
                    '  ║  🔒 El candadito HTTPS protege, ¡pero HTTP no!   ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Descubriste al espía en el medio! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '👂 Man in the Middle → Alguien espía tus mensajes',
                        '   en el camino entre vos y tu amigo',
                        '🔒 HTTPS (con candadito) → Tus mensajes viajan en una',
                        '   caja fuerte. ¡Nadie puede leerlos! ✅',
                        '🔓 HTTP (sin candadito) → Tus mensajes viajan',
                        '   como una carta abierta. ¡Cualquiera los lee! ❌',
                        '',
                        '✅ Cómo protegerte:',
                        '• Siempre buscá el candadito 🔒 en el navegador',
                        '• Si no hay candadito, ¡no escribas datos personales!',
                        '• En WiFi público (café, aeropuerto) hay más riesgo',
                        '',
                        '💡 Tip:',
                        'Cuando ves "https://" la S significa SEGURO.',
                        'Si solo dice "http://" (sin S), ¡no es seguro! 🚫'
                    ]
                }
            }
        },

        {
            id: 'corporate',
            name: 'La Red Corporativa',
            tier: 'Hacker',
            difficulty: 6,
            description: 'Pivotea a través de una red corporativa segmentada.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: MOVIMIENTO LATERAL                    ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Una corporación tiene su red segmentada           ║',
                '║  en VLANs. Encuentra la forma de moverte            ║',
                '║  lateralmente entre segmentos.                      ║',
                '║                                                    ║',
                '║  Target: 10.50.0.1 (Corp Gateway)                   ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '10.50.0.1',
            reward: { credits: 900, xp: 450 },
            levelReq: 6,
            toolsReq: ['firewallbreaker'],
            objectives: [
                { id: 'scan', desc: 'Escanear el gateway', hint: 'Usa: scan 10.50.0.1' },
                { id: 'firewall_bypass', desc: 'Bypasear el firewall', hint: 'Usa: firewall bypass 10.50.0.1' },
                { id: 'connect', desc: 'Conectarse', hint: 'Usa: connect 10.50.0.1' },
                { id: 'find_topology', desc: 'Encontrar el mapa de red', hint: 'Lee /network_map/topology.txt' },
                { id: 'find_credentials', desc: 'Encontrar credenciales cifradas', hint: 'Lee /network_map/credentials.txt y descifra el Base64' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Segmentación de Red y Movimiento Lateral',
                content: [
                    'Las redes corporativas se segmentan para contener brechas.',
                    '',
                    'Conceptos:',
                    '• VLANs: separan la red en segmentos lógicos',
                    '• DMZ: zona desmilitarizada para servicios públicos',
                    '• Pivoting: usar un sistema comprometido para acceder a otros',
                    '• Lateral movement: moverse entre sistemas del mismo nivel',
                    '',
                    'Segmentación típica:',
                    '• Empleados: acceso limitado a internet y apps internas',
                    '• Servidores: aislados, acceso solo desde VLAN autorizada',
                    '• DMZ: expuesta a internet, aislada de la red interna',
                    '• Management: acceso a dispositivos de red (switches, routers)',
                    '',
                    'Defensa:',
                    '• Microsegmentación con firewalls internos',
                    '• Zero Trust: no confiar en nada dentro de la red',
                    '• Monitoreo de tráfico lateral (EDR, NDR)',
                    '',
                    '⚠️ Si un atacante entra a un segmento, la segmentación lo contiene.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🏢 AVENTURA: ¡El Laberinto de la Empresa!       ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  Una empresa grande dividió su red en "cuartos"   ║',
                    '  ║  separados (como habitaciones de un edificio). 🏗️║',
                    '  ║                                                    ║',
                    '  ║  Cada cuarto tiene su propia cerradura.            ║',
                    '  ║  La cocina no puede ver el dormitorio,             ║',
                    '  ║  y el garage no puede entrar a la oficina. 🚪🔒  ║',
                    '  ║                                                    ║',
                    '  ║  Tu misión: moverte entre los cuartos y           ║',
                    '  ║  encontrar el mapa completo del "edificio". 🗺️   ║',
                    '  ║                                                    ║',
                    '  ║  📍 Explorá 10.50.0.1 (la puerta principal)       ║',
                    '  ║  🛡️ Necesitás: FirewallBreaker                    ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Mapeaste todo el edificio digital! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '🏢 Red corporativa → Como un edificio con muchos cuartos',
                        '🚪 Segmentación → Separar los cuartos con puertas con llave',
                        '🗺️ Mapa de red → Ver cómo se conectan los cuartos',
                        '',
                        '¿Por qué se separan los cuartos?',
                        'Si un ladrón entra a la cocina,',
                        '¡no puede llegar al dormitorio! 🛏️🔒',
                        'Así se contiene el daño.',
                        '',
                        '✅ Lección:',
                        'Las empresas separan sus computadoras en grupos',
                        'para que si un malo entra a una parte,',
                        'no pueda llegar a todas las demás.',
                        '',
                        '💡 En tu casa:',
                        'Tu WiFi es como un cuarto grande donde todas',
                        'las cosas están juntas. ¡Por eso hay que',
                        'protegerlo con una buena contraseña! 📶🔑'
                    ]
                }
            }
        },

        // ═══════════════════════════════════════════
        // TIER 4 - ELITE HACKER
        // ═══════════════════════════════════════════
        {
            id: 'zeroday',
            name: 'Zero Day',
            tier: 'Elite Hacker',
            difficulty: 7,
            description: 'Encuentra y explota una vulnerabilidad 0-day.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  📡 MISIÓN: ZERO DAY                              ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Una webapp tiene vulnerabilidades desconocidas.    ║',
                '║  Encuentra el 0-day: un debug console expuesto     ║',
                '║  y un upload sin validación.                       ║',
                '║                                                    ║',
                '║  Target: 203.0.113.50                              ║',
                '║  Requiere: ExploitKit Zero                          ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '203.0.113.50',
            reward: { credits: 1200, xp: 600 },
            levelReq: 8,
            toolsReq: ['exploitkit_zero'],
            objectives: [
                { id: 'scan', desc: 'Escanear y encontrar el puerto de debug', hint: 'Usa: scan 203.0.113.50 - busca puertos no estándar' },
                { id: 'exploit', desc: 'Explotar la vulnerabilidad', hint: 'Usa: exploit 203.0.113.50' },
                { id: 'connect', desc: 'Conectarse', hint: 'Usa: connect 203.0.113.50' },
                { id: 'find_changelog', desc: 'Leer el changelog', hint: 'Lee /app/CHANGELOG.md' },
                { id: 'find_vuln', desc: 'Encontrar el código vulnerable', hint: 'Lee /app/src/upload.py' },
                { id: 'find_backdoor', desc: 'Encontrar el backdoor en auth', hint: 'Lee /app/src/auth.py' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Vulnerabilidades Zero-Day',
                content: [
                    'Un 0-day es una vulnerabilidad desconocida por el fabricante.',
                    '',
                    'Vulnerabilidades encontradas:',
                    '• Debug console expuesta en producción (puerto 9090)',
                    '• Upload de archivos sin validación (ejecución remota)',
                    '• Backdoor en código de autenticación',
                    '',
                    'Responsible Disclosure:',
                    '• Al encontrar un 0-day, reportarlo al fabricante',
                    '• Dar tiempo razonable para parchear (90 días típico)',
                    '• NO publicar ni explotar la vulnerabilidad',
                    '• Programas de Bug Bounty recompensan por reportar',
                    '',
                    'Protección:',
                    '• Nunca dejar debug habilitado en producción',
                    '• Code review y testing de seguridad',
                    '• WAF (Web Application Firewall)',
                    '',
                    '⚠️ Los 0-days se venden por millones en el mercado negro.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🔬 AVENTURA: ¡El Error que Nadie Conoce!        ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  Una aplicación web tiene un error SECRETO que     ║',
                    '  ║  ni siquiera sus creadores conocen. 🤫            ║',
                    '  ║                                                    ║',
                    '  ║  Es como encontrar una puerta secreta en un       ║',
                    '  ║  videojuego que NADIE descubrió antes.            ║',
                    '  ║  ¡Se llama "Zero Day" (Día Cero)! 🎮🔍          ║',
                    '  ║                                                    ║',
                    '  ║  Tu misión: encontrarlo y REPORTARLO              ║',
                    '  ║  para que lo arreglen.                             ║',
                    '  ║  ¡Eso hacen los hackers buenos! 🦸               ║',
                    '  ║                                                    ║',
                    '  ║  📍 Investigá 203.0.113.50                        ║',
                    '  ║  ☠️ Necesitás: ExploitKit Zero                    ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Encontraste el error secreto! 🌟',
                        '',
                        'Aprendiste sobre:',
                        '🔬 Zero Day → Un error que NADIE conoce todavía',
                        '   Se llama "Día Cero" porque los creadores',
                        '   tienen CERO días para arreglarlo',
                        '🦸 Hacker Ético → El bueno que encuentra errores',
                        '   y los reporta para que los arreglen',
                        '😈 Hacker Malo → El que usa los errores para hacer daño',
                        '',
                        'Lo que encontraste:',
                        '• Una puerta de "debug" que no debería estar abierta',
                        '• Un lugar para subir archivos sin control',
                        '• Un código secreto escondido (backdoor)',
                        '',
                        '✅ Los hackers buenos:',
                        'Cuando encuentran un error, lo reportan al dueño',
                        'y le dan tiempo para arreglarlo.',
                        '¡Muchas empresas hasta les pagan por encontrarlos! 💰',
                        '',
                        '⚠️ Regla: Siempre reportá, nunca hackees para hacer daño.'
                    ]
                }
            }
        },

        {
            id: 'ransomware',
            name: 'El Ransomware',
            tier: 'Elite Hacker',
            difficulty: 8,
            description: 'Analiza y neutraliza un ataque de ransomware.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  🚨 MISIÓN URGENTE: RANSOMWARE                    ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Un servidor ha sido infectado con ransomware!      ║',
                '║  Tu misión: analizar el malware, encontrar el      ║',
                '║  kill switch y recuperar los datos.                ║',
                '║                                                    ║',
                '║  Target: 192.168.200.10 (Infected Server)           ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '192.168.200.10',
            reward: { credits: 1500, xp: 750 },
            levelReq: 8,
            toolsReq: ['cryptotool'],
            objectives: [
                { id: 'connect', desc: 'Conectarse al servidor infectado', hint: 'Usa: connect 192.168.200.10' },
                { id: 'find_ransom', desc: 'Leer la nota de rescate', hint: 'Lee /Users/admin/Desktop/README_DECRYPT.txt' },
                { id: 'find_analysis', desc: 'Analizar el ransomware', hint: 'Lee en /Ransomware/payload.exe.analysis' },
                { id: 'find_killswitch', desc: 'Encontrar el kill switch', hint: 'Lee /Ransomware/kill_switch.txt' },
                { id: 'find_key', desc: 'Encontrar la clave de descifrado', hint: 'Lee /Ransomware/decryption_key.txt' },
                { id: 'find_backup', desc: 'Verificar los backups', hint: 'Lee /Backup/restore_instructions.txt' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección: Ransomware',
                content: [
                    'El ransomware es una de las amenazas más devastadoras.',
                    '',
                    'Cómo funciona:',
                    '• Cifra todos los archivos del sistema',
                    '• Pide un rescate en criptomonedas',
                    '• Vector común: email phishing con archivo adjunto',
                    '• Se propaga lateralmente por la red',
                    '',
                    'Respuesta a incidentes:',
                    '• Aislar el sistema infectado INMEDIATAMENTE',
                    '• NO pagar el rescate (no garantiza recuperación)',
                    '• Buscar kill switches o herramientas de descifrado',
                    '• Restaurar desde backups limpios',
                    '',
                    'Prevención (Regla 3-2-1):',
                    '• 3 copias de los datos',
                    '• 2 tipos de medios diferentes',
                    '• 1 copia offsite (fuera del sitio)',
                    '',
                    '⚠️ El costo promedio de un ataque de ransomware es $4.5M USD.'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🦠 AVENTURA: ¡Rescate en el Mundo Digital!      ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  🚨 ¡EMERGENCIA! 🚨                              ║',
                    '  ║                                                    ║',
                    '  ║  Un virus malvado cifró TODOS los archivos        ║',
                    '  ║  de un servidor. 😱                               ║',
                    '  ║                                                    ║',
                    '  ║  Es como si un villano pusiera un candado a       ║',
                    '  ║  todos tus juguetes y pidiera plata para          ║',
                    '  ║  abrirlo. 🔐💰                                   ║',
                    '  ║                                                    ║',
                    '  ║  Tu misión: encontrar la forma de vencer al       ║',
                    '  ║  virus y recuperar los archivos                    ║',
                    '  ║  SIN PAGAR EL RESCATE. 💪                        ║',
                    '  ║                                                    ║',
                    '  ║  📍 Salvá el servidor 192.168.200.10              ║',
                    '  ║  💪 ¡Los Ciber Detectives nunca pagan rescates!  ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓 ¡Lo que aprendiste, Ciber Detective!',
                    content: [
                        '¡Venciste al virus malvado! 🌟🦸',
                        '',
                        'Aprendiste sobre:',
                        '🦠 Ransomware → Un virus que "secuestra" tus archivos',
                        '   Los cifra (les pone candado) y pide dinero',
                        '🔑 Kill Switch → Un "botón secreto" para parar el virus',
                        '💾 Backups → Copias de seguridad de tus archivos',
                        '',
                        '¿Qué hacer si te pasa?',
                        '1. ¡NO pagues! No te devuelven los archivos siempre',
                        '2. Desconectá la compu del WiFi (para que no se extienda)',
                        '3. Avisá a un adulto que sepa de computadoras',
                        '4. Restaurá desde un backup (copia de seguridad)',
                        '',
                        '✅ La regla 3-2-1 de backups:',
                        '• 3 copias de tus archivos importantes',
                        '• 2 lugares diferentes (compu + nube)',
                        '• 1 copia fuera de tu casa',
                        '',
                        '💡 Tip: ¡Hacé backup de tus fotos y archivos',
                        'importantes ahora mismo! Pedile ayuda a tus papás. 📱'
                    ]
                }
            }
        },

        {
            id: 'final',
            name: 'Operación Final: Nexus Corp',
            tier: 'Elite Hacker',
            difficulty: 10,
            description: 'Misión multi-fase: infiltra la corporación más protegida.',
            briefing: [
                '╔════════════════════════════════════════════════════╗',
                '║  🎯 MISIÓN FINAL: OPERACIÓN NEXUS                 ║',
                '╠════════════════════════════════════════════════════╣',
                '║  Nexus Corp está involucrada en operaciones         ║',
                '║  ilegales. Tu misión: infiltrar sus sistemas,       ║',
                '║  recopilar evidencia y exponer sus crímenes.        ║',
                '║                                                    ║',
                '║  Esta misión combina TODO lo que aprendiste.        ║',
                '║  Buena suerte, hacker.                             ║',
                '║                                                    ║',
                '║  Target: 10.99.0.1 (Nexus Corp Main Server)         ║',
                '╚════════════════════════════════════════════════════╝'
            ],
            targetIP: '10.99.0.1',
            reward: { credits: 3000, xp: 1500 },
            levelReq: 9,
            toolsReq: ['exploitkit_zero', 'firewallbreaker'],
            objectives: [
                { id: 'scan', desc: 'Escanear Nexus Corp', hint: 'Usa: scan 10.99.0.1' },
                { id: 'firewall_bypass', desc: 'Bypasear el firewall', hint: 'Usa: firewall bypass 10.99.0.1' },
                { id: 'exploit', desc: 'Explotar vulnerabilidades del API', hint: 'Usa: exploit 10.99.0.1' },
                { id: 'connect', desc: 'Conectarse al servidor principal', hint: 'Usa: connect 10.99.0.1' },
                { id: 'find_vulns', desc: 'Encontrar la lista de vulnerabilidades', hint: 'Lee /nexus/app/vulnerabilities.txt' },
                { id: 'find_master_key', desc: 'Obtener la master key', hint: 'Lee /nexus/admin/master_key.txt' },
                { id: 'find_evidence', desc: 'Recopilar evidencia de crímenes', hint: 'Lee en /secrets/ y /evidence/' },
                { id: 'find_whistleblower', desc: 'Leer el reporte final', hint: 'Lee /evidence/whistleblower_report.txt' },
                { id: 'disconnect', desc: 'Desconectarse', hint: 'Usa: disconnect' }
            ],
            education: {
                title: '📚 Lección Final: Ética Hacker y Ciberseguridad',
                content: [
                    '¡FELICIDADES! Has completado HackSim.',
                    '',
                    'Resumen de lo aprendido:',
                    '• Reconocimiento y escaneo de puertos',
                    '• Seguridad de contraseñas y cracking',
                    '• Phishing y detección de emails maliciosos',
                    '• SQL Injection y seguridad web',
                    '• Gestión de vulnerabilidades y patching',
                    '• Criptografía básica y moderna',
                    '• Ingeniería social y OSINT',
                    '• Firewalls y configuración de red',
                    '• Escalada de privilegios',
                    '• Ataques Man-in-the-Middle',
                    '• Segmentación de red y movimiento lateral',
                    '• Vulnerabilidades Zero-Day',
                    '• Ransomware y respuesta a incidentes',
                    '',
                    'El código de ética hacker:',
                    '• NUNCA hackear sin autorización explícita',
                    '• Reportar vulnerabilidades de forma responsable',
                    '• Proteger la privacidad de los datos',
                    '• Compartir conocimiento para hacer internet más seguro',
                    '',
                    '🎓 "Con gran poder viene gran responsabilidad."',
                    '',
                    '¡Gracias por jugar HackSim!'
                ]
            },
            kids: {
                story: [
                    '  ╔════════════════════════════════════════════════════╗',
                    '  ║  🌟 AVENTURA FINAL: ¡Operación Justicia Digital! ║',
                    '  ╠════════════════════════════════════════════════════╣',
                    '  ║                                                    ║',
                    '  ║  Una empresa malvada llamada Nexus Corp            ║',
                    '  ║  está haciendo cosas ilegales con datos            ║',
                    '  ║  de personas inocentes. 😈                        ║',
                    '  ║                                                    ║',
                    '  ║  ¡Necesitamos al Ciber Detective más valiente      ║',
                    '  ║  para entrar a sus sistemas, encontrar las         ║',
                    '  ║  pruebas y enviarlas a las autoridades! 🚔        ║',
                    '  ║                                                    ║',
                    '  ║  ¡Esta misión usa TODO lo que aprendiste!          ║',
                    '  ║  Escaneo, hacking, exploits, firewalls...         ║',
                    '  ║  ¡Tu aventura más grande! 🎯                     ║',
                    '  ║                                                    ║',
                    '  ║  📍 Target: 10.99.0.1 (Nexus Corp)               ║',
                    '  ║  🎯 ¡Tu aventura más grande comienza AHORA!      ║',
                    '  ╚════════════════════════════════════════════════════╝'
                ],
                education: {
                    title: '🎓🏆 ¡FELICITACIONES, CIBER DETECTIVE! 🏆🎓',
                    content: [
                        '🌟🌟🌟 ¡COMPLETASTE TODAS LAS AVENTURAS! 🌟🌟🌟',
                        '',
                        '¡Sos un verdadero Ciber Detective! 🕵️🦸',
                        '',
                        'Todo lo que aprendiste:',
                        '📂 Moverte por computadoras (ls, cd, cat)',
                        '🔍 Escanear puertas (puertos)',
                        '🔑 La importancia de las contraseñas fuertes',
                        '🎣 Detectar emails trampa (phishing)',
                        '💉 El truco de SQL Injection',
                        '🔄 Por qué hay que actualizar los programas',
                        '🔐 Códigos secretos (criptografía)',
                        '🎭 Los trucos de ingeniería social',
                        '🧱 Firewalls (muros digitales)',
                        '👑 Permisos y privilegios',
                        '👂 Espías en el medio (MITM)',
                        '🏢 Redes corporativas',
                        '🔬 Errores Zero Day',
                        '🦠 Virus ransomware',
                        '',
                        '⭐ El código del Ciber Detective:',
                        '1. NUNCA hackees sin permiso',
                        '2. Si encontrás un error, reportalo',
                        '3. Protegé tu información y la de los demás',
                        '4. Compartí lo que sabés para ayudar a otros',
                        '',
                        '🎮 ¡Gracias por jugar HackSim!',
                        '¡Seguí aprendiendo sobre ciberseguridad! 🚀'
                    ]
                }
            }
        }
    ];

    return {
        getAll() {
            return missionList;
        },

        getById(id) {
            return missionList.find(m => m.id === id) || null;
        },

        getAvailable() {
            const level = GameState.getLevel();
            const tools = GameState.getTools();
            const completed = GameState.getCompletedMissions();

            return missionList.map(m => {
                const hasLevel = level >= m.levelReq;
                const hasTools = m.toolsReq.every(t => tools.includes(t));
                const isCompleted = completed.includes(m.id);

                return {
                    ...m,
                    available: hasLevel && hasTools && !isCompleted,
                    completed: isCompleted,
                    locked: !hasLevel,
                    missingTools: m.toolsReq.filter(t => !tools.includes(t))
                };
            });
        },

        startMission(missionId) {
            const mission = this.getById(missionId);
            if (!mission) return { success: false, msg: 'Misión no encontrada.' };

            const level = GameState.getLevel();
            if (level < mission.levelReq) return { success: false, msg: `Necesitas nivel ${mission.levelReq}.` };

            const tools = GameState.getTools();
            const missing = mission.toolsReq.filter(t => !tools.includes(t));
            if (missing.length > 0) {
                const names = missing.map(t => {
                    const item = Shop.getItem(t);
                    return item ? item.name : t;
                }).join(', ');
                return { success: false, msg: `Te faltan herramientas: ${names}` };
            }

            if (GameState.isMissionCompleted(missionId)) {
                return { success: false, msg: 'Ya completaste esta misión.' };
            }

            // Initialize mission state
            const objectives = {};
            mission.objectives.forEach(obj => {
                objectives[obj.id] = false;
            });

            GameState.setCurrentMission(missionId, {
                objectives,
                startTime: Date.now(),
                hintsUsed: 0
            });

            return { success: true, mission };
        },

        completeObjective(objectiveId) {
            const missionId = GameState.getCurrentMission();
            if (!missionId) return false;

            const mState = GameState.getMissionState();
            if (!mState || !mState.objectives.hasOwnProperty(objectiveId)) return false;

            if (mState.objectives[objectiveId]) return false; // Already done

            mState.objectives[objectiveId] = true;
            GameState.updateMissionState({ objectives: mState.objectives });

            // Check if all objectives complete
            const allDone = Object.values(mState.objectives).every(v => v);
            return allDone;
        },

        isObjectiveComplete(objectiveId) {
            const mState = GameState.getMissionState();
            if (!mState) return false;
            return mState.objectives[objectiveId] === true;
        },

        getCurrentObjectives() {
            const missionId = GameState.getCurrentMission();
            if (!missionId) return [];
            const mission = this.getById(missionId);
            const mState = GameState.getMissionState();
            if (!mission || !mState) return [];

            return mission.objectives.map(obj => ({
                ...obj,
                completed: mState.objectives[obj.id] === true
            }));
        },

        finishMission() {
            const missionId = GameState.getCurrentMission();
            if (!missionId) return null;
            const mission = this.getById(missionId);
            if (!mission) return null;

            // Award rewards
            GameState.addCredits(mission.reward.credits);
            const xpResult = GameState.addXP(mission.reward.xp);
            GameState.incrementStat('systemsHacked');

            if (GameState.isVPNActive()) {
                GameState.incrementStat('vpnMissions');
            }

            // Mark complete
            GameState.completeMission(missionId);

            if (missionId === 'tutorial') {
                GameState.setTutorialCompleted();
            }

            // Check achievements
            setTimeout(() => Achievements.checkAll(), 500);

            return {
                mission,
                credits: mission.reward.credits,
                xp: mission.reward.xp,
                leveledUp: xpResult.leveledUp,
                newLevel: xpResult.newLevel
            };
        },

        getHint(objectiveIndex) {
            const missionId = GameState.getCurrentMission();
            if (!missionId) return null;
            const mission = this.getById(missionId);
            if (!mission || objectiveIndex >= mission.objectives.length) return null;

            GameState.incrementStat('hintsUsed');

            // Hints cost 10 credits
            if (GameState.getCredits() >= 10) {
                GameState.spendCredits(10);
            }

            const mState = GameState.getMissionState();
            if (mState) {
                mState.hintsUsed = (mState.hintsUsed || 0) + 1;
                GameState.updateMissionState({ hintsUsed: mState.hintsUsed });
            }

            return mission.objectives[objectiveIndex].hint;
        },

        displayMissions() {
            const missions = this.getAvailable();
            const currentId = GameState.getCurrentMission();
            const lines = [];

            lines.push('');
            lines.push('  ╔══════════════════════════════════════════════════════════════╗');
            lines.push('  ║              🎯  MISIONES  🎯                               ║');
            lines.push('  ╠══════════════════════════════════════════════════════════════╣');

            const tiers = ['Newbie', 'Script Kiddie', 'Hacker', 'Elite Hacker'];
            for (const tier of tiers) {
                const tierMissions = missions.filter(m => m.tier === tier);
                if (tierMissions.length === 0) continue;

                lines.push(`  ║  ═══ ${tier.toUpperCase()} ${'═'.repeat(50 - tier.length)}║`);

                tierMissions.forEach((m, idx) => {
                    let status;
                    const isCurrent = m.id === currentId;
                    if (m.completed) {
                        status = '✅ DONE';
                    } else if (isCurrent) {
                        status = '▶️ ACTIVA';
                    } else if (m.available) {
                        status = '🟢 DISP';
                    } else if (m.locked) {
                        status = '🔒 Lvl ' + m.levelReq;
                    } else {
                        status = '🔧 TOOLS';
                    }

                    const name = m.name.substring(0, 28).padEnd(28);
                    const diff = '★'.repeat(Math.min(m.difficulty, 10)).padEnd(10);
                    lines.push(`  ║  ${m.id.padEnd(18)} ${name} ${status.padEnd(10)}║`);
                });
            }

            lines.push('  ╠══════════════════════════════════════════════════════════════╣');
            lines.push('  ║  missions accept <id>  - Aceptar misión                     ║');
            lines.push('  ║  missions info <id>    - Info detallada                      ║');
            lines.push('  ║  missions objectives   - Objetivos actuales                  ║');
            lines.push('  ║  missions hint <#>     - Pista (cuesta 10 ₿TC)              ║');
            lines.push('  ╚══════════════════════════════════════════════════════════════╝');

            return lines;
        },

        displayMissionInfo(missionId) {
            const mission = this.getById(missionId);
            if (!mission) return ['  Misión no encontrada. Usa "missions" para ver la lista.'];

            const lines = [];
            lines.push('');
            lines.push(`  ═══ ${mission.name} ═══`);
            lines.push(`  Tier: ${mission.tier} | Dificultad: ${'★'.repeat(mission.difficulty)}`);
            lines.push(`  ${mission.description}`);
            lines.push(`  Recompensa: ${mission.reward.credits} ₿TC + ${mission.reward.xp} XP`);
            lines.push(`  Nivel requerido: ${mission.levelReq}`);
            if (mission.toolsReq.length > 0) {
                const toolNames = mission.toolsReq.map(t => {
                    const item = Shop.getItem(t);
                    return item ? item.name : t;
                }).join(', ');
                lines.push(`  Herramientas: ${toolNames}`);
            }
            lines.push(`  Target: ${mission.targetIP}`);
            lines.push('');
            return lines;
        }
    };
})();
