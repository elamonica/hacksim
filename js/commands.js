/* ============================================
   HackSim - Command System
   ============================================ */

const Commands = (() => {
    const registry = {};

    // ═══════════════════════════════════════
    // KIDS MODE: Descripciones simplificadas
    // ═══════════════════════════════════════
    const KIDS_DESCRIPTIONS = {
        'help':              '📖 Ver qué cosas podés hacer',
        'clear':             '🧹 Borrar todo lo que está escrito',
        'status':            '👤 Ver tu perfil de Ciber Detective',
        'missions':          '🗺️ Ver las aventuras disponibles',
        'shop':              '🏪 Ir a la tienda a comprar herramientas',
        'inventory':         '🎒 Ver qué herramientas tenés',
        'achievements':      '🏆 Ver tus premios y medallas',
        'connect <ip>':      '🔌 Conectarte a otra computadora',
        'disconnect':        '🔌 Desconectarte de la computadora',
        'ls':                '📂 Ver qué archivos y carpetas hay',
        'cd <dir>':          '🚶 Entrar a una carpeta',
        'cat <file>':        '📄 Leer lo que dice un archivo',
        'whoami':            '🤔 Ver quién sos en el sistema',
        'scan <ip>':         '🔍 Revisar qué puertas tiene una compu',
        'crack <ip>':        '🔑 Adivinar la contraseña secreta',
        'exploit <ip>':      '🐛 Usar un error del sistema para entrar',
        'decrypt <file>':    '🔓 Descifrar un mensaje secreto',
        'sqlinject <ip>':    '💉 Engañar a una base de datos',
        'phish analyze <f>': '🎣 Ver si un email es trampa o real',
        'vpn <on/off>':      '🥷 Ponerte invisible en la red',
        'firewall bypass <ip>':'🧱 Saltar un muro de protección',
        'social <user>':     '🎭 Convencer a alguien de darte info',
        'privesc <ip>':      '👑 Conseguir permisos de jefe',
        'sound':             '🔊 Prender o apagar el sonido',
        'reset':             '🔄 Empezar el juego de nuevo',
        'kids':              '👦 Cambiar entre modo normal y niños',
        'explain <cmd>':     '❓ Explicación detallada de un comando'
    };

    const KIDS_EXPLANATIONS = {
        'scan': [
            '🔍 SCAN - Revisar una computadora',
            '',
            'Imaginate que una computadora es como una casa. 🏠',
            'Las "puertas" (puertos) son las ventanas y puertas de esa casa.',
            'Cuando hacés SCAN, es como caminar alrededor de la casa',
            'y ver cuáles puertas están abiertas y cuáles cerradas.',
            '',
            'Si una puerta está abierta, podemos entrar por ahí.',
            'Los hackers buenos (¡como vos!) revisan las puertas',
            'para ayudar al dueño a cerrar las que no debería',
            'dejar abiertas. 🔐',
            '',
            '👉 Cómo usarlo: scan <dirección>',
            '👉 Ejemplo: scan 192.168.1.50'
        ],
        'crack': [
            '🔑 CRACK - Adivinar contraseñas',
            '',
            'Es como intentar adivinar el código de un candado. 🔒',
            'El programa prueba muchas contraseñas comunes muy rápido:',
            '"123456", "password", "admin"...',
            '',
            '¡Por eso es tan importante tener contraseñas DIFÍCILES!',
            'Una buena contraseña es larga y tiene letras, números',
            'y símbolos: como "MiPerro#Come3Galletitas!" 🐕',
            '',
            '💡 Tip: Nunca uses tu nombre o fecha de cumpleaños',
            '   como contraseña. ¡Son las primeras que prueban!',
            '',
            '👉 Cómo usarlo: crack <dirección>',
            '👉 Ejemplo: crack 172.16.0.10'
        ],
        'connect': [
            '🔌 CONNECT - Conectarte a otra computadora',
            '',
            'Es como hacer una llamada telefónica a otra computadora. 📞',
            'Usás su "dirección IP" que es como su número de teléfono.',
            'Los números se ven así: 192.168.1.50',
            '',
            'Cuando te conectás, es como si estuvieras sentado',
            'frente a esa otra computadora, ¡aunque esté lejos!',
            '',
            '👉 Cómo usarlo: connect <dirección>',
            '👉 Ejemplo: connect 10.0.0.1'
        ],
        'disconnect': [
            '🔌 DISCONNECT - Desconectarte',
            '',
            'Es como colgar el teléfono. 📴',
            'Cuando terminás de revisar una computadora,',
            'te desconectás para volver a tu computadora.',
            '',
            '👉 Solo escribí: disconnect'
        ],
        'ls': [
            '📂 LS - Listar archivos',
            '',
            'Es como abrir un cajón y ver qué hay adentro. 🗄️',
            'Te muestra las carpetas (📁) y archivos (📄)',
            'que hay en el lugar donde estás.',
            '',
            'Las carpetas tienen "/" al final del nombre.',
            'Podés entrar a las carpetas con el comando "cd".',
            '',
            '👉 Solo escribí: ls'
        ],
        'cd': [
            '🚶 CD - Cambiar de directorio (carpeta)',
            '',
            'Es como caminar por los pasillos de una casa. 🏠',
            'Cada carpeta es como una habitación.',
            '"cd cocina" = entrás a la cocina.',
            '"cd .." = volvés para atrás.',
            '"cd /" = volvés a la entrada principal.',
            '',
            '👉 Ejemplo: cd home',
            '👉 Para volver: cd ..'
        ],
        'cat': [
            '📄 CAT - Leer un archivo',
            '',
            'Es como abrir un papel y leerlo. 📜',
            'Te muestra todo lo que dice un archivo de texto.',
            '¡Muchas veces las pistas están escondidas en archivos!',
            '',
            '👉 Ejemplo: cat readme.txt',
            '👉 Ejemplo: cat notes.txt'
        ],
        'exploit': [
            '🐛 EXPLOIT - Usar un error para entrar',
            '',
            'A veces los programas tienen errores (bugs 🐞).',
            'Un exploit es como encontrar una ventana rota',
            'en una casa y poder entrar por ahí.',
            '',
            'Los hackers buenos encuentran estos errores',
            'y le avisan al dueño para que los arregle.',
            '¡Eso se llama "hacking ético"! 🦸',
            '',
            '👉 Cómo usarlo: exploit <dirección>',
            '👉 Ejemplo: exploit 10.10.10.50'
        ],
        'decrypt': [
            '🔓 DECRYPT - Descifrar mensajes secretos',
            '',
            '¿Alguna vez escribiste un mensaje en código secreto? 🤫',
            'Descifrar es lo contrario: convertir el mensaje',
            'de código secreto a texto normal.',
            '',
            'Hay muchos tipos de códigos:',
            '• César: cada letra se mueve 3 posiciones (A→D, B→E)',
            '• Base64: un código que usan las computadoras',
            '',
            '👉 Cómo usarlo: decrypt <archivo>',
            '👉 Ejemplo: decrypt secret_message.enc'
        ],
        'sqlinject': [
            '💉 SQLINJECT - Inyección SQL',
            '',
            'Las bases de datos guardan información (como una agenda 📒).',
            'SQL es el idioma para hablar con bases de datos.',
            '',
            'SQL Injection es como si en vez de decir tu nombre',
            'en la puerta, dijeras una frase mágica que confunde',
            'al guardia y te deja pasar. 🎩✨',
            '',
            'Los programadores deben proteger sus bases de datos',
            'para que nadie pueda hacer este truco.',
            '',
            '👉 Cómo usarlo: sqlinject <dirección>'
        ],
        'phish': [
            '🎣 PHISH ANALYZE - Detectar emails trampa',
            '',
            'El phishing es como la pesca, ¡pero de personas! 🐟',
            'Los malos mandan emails falsos que parecen reales',
            'para que hagas clic en links peligrosos.',
            '',
            'Cómo detectarlos:',
            '• Fijate si el email viene de una dirección RARA',
            '• ¿Dice "URGENTE" o te mete miedo? 🚩 Sospechoso!',
            '• ¿Tiene links con nombres raros? ¡No hagas clic!',
            '',
            '👉 Cómo usarlo: phish analyze <archivo>'
        ],
        'vpn': [
            '🥷 VPN - Hacerte invisible',
            '',
            'Una VPN es como un túnel secreto. 🕳️',
            'Cuando la activás, nadie puede ver',
            'lo que hacés en internet.',
            '',
            'Es como usar una capa de invisibilidad',
            'para que nadie sepa que estás ahí. 🧙',
            '',
            '👉 Activar: vpn on',
            '👉 Desactivar: vpn off'
        ],
        'firewall': [
            '🧱 FIREWALL BYPASS - Saltar un muro',
            '',
            'Un firewall es como un muro alrededor de un castillo. 🏰',
            'Bloquea a los que no deberían entrar.',
            'Pero a veces el muro tiene grietas...',
            '',
            'Encontrar esas grietas es tu trabajo',
            'como Ciber Detective, para que el dueño',
            'las pueda arreglar.',
            '',
            '👉 Cómo usarlo: firewall bypass <dirección>'
        ],
        'social': [
            '🎭 SOCIAL - Ingeniería social',
            '',
            'A veces para conseguir información no necesitás',
            'ningún programa... ¡solo hablar! 🗣️',
            '',
            'Los malos se hacen pasar por otras personas',
            '(como el jefe, un técnico, etc.) para que',
            'les des tu contraseña o información secreta.',
            '',
            '⚠️ REGLA DE ORO: Nunca le des tu contraseña',
            '   a nadie, ni siquiera si dice ser tu jefe.',
            '',
            '👉 Cómo usarlo: social <usuario>'
        ],
        'privesc': [
            '👑 PRIVESC - Escalar privilegios',
            '',
            'En una computadora hay diferentes niveles: 📊',
            '• Usuario normal: puede hacer pocas cosas',
            '• Administrador (root): puede hacer TODO',
            '',
            'Escalar privilegios es como ser un empleado',
            'y encontrar la forma de conseguir las llaves',
            'del jefe. 🔑',
            '',
            'Los hackers buenos buscan estas fallas para',
            'que los administradores las corrijan.',
            '',
            '👉 Cómo usarlo: privesc <dirección>'
        ],
        'missions': [
            '🗺️ MISSIONS - Tus aventuras',
            '',
            'Acá ves todas las misiones (aventuras) disponibles.',
            '',
            'Comandos útiles:',
            '• missions → ver la lista de aventuras',
            '• missions accept <nombre> → empezar una aventura',
            '• missions objectives → ver qué tenés que hacer',
            '• missions hint <número> → pedir una pista (cuesta 10 ₿TC)',
            '',
            '¡Completá aventuras para ganar monedas y experiencia! 🎮'
        ],
        'shop': [
            '🏪 SHOP - La tienda',
            '',
            'En la tienda podés comprar herramientas',
            'con las monedas (₿TC) que ganás en las misiones.',
            '',
            'Cada herramienta te da nuevos poderes:',
            '• PortScanner → poder usar "scan"',
            '• PassCracker → poder usar "crack"',
            '• Y muchas más...',
            '',
            '• shop → ver la tienda',
            '• shop buy <número> → comprar',
            '• shop info <número> → ver detalles'
        ]
    };

    function register(name, fn, description = '') {
        registry[name] = { fn, description };
    }

    function checkMissionObjective(objectiveId) {
        const missionId = GameState.getCurrentMission();
        if (!missionId) return;

        const allDone = Missions.completeObjective(objectiveId);
        if (allDone) {
            setTimeout(() => {
                const result = Missions.finishMission();
                if (result) {
                    Terminal.newline();
                    Terminal.print('╔══════════════════════════════════════════════╗', 'text-success');
                    Terminal.print('║        🎉 ¡MISIÓN COMPLETADA! 🎉            ║', 'text-success');
                    Terminal.print('╠══════════════════════════════════════════════╣', 'text-success');
                    Terminal.print(`║  ${result.mission.name.padEnd(42)}║`, 'text-success');
                    Terminal.print(`║  +${result.credits} ₿TC  |  +${result.xp} XP${' '.repeat(Math.max(0, 26 - String(result.credits).length - String(result.xp).length))}║`, 'text-success');
                    Terminal.print('╚══════════════════════════════════════════════╝', 'text-success');

                    Sound.success();
                    UI.toast(`¡Misión completada! +${result.credits} ₿TC +${result.xp} XP`, 'accent');

                    if (result.leveledUp) {
                        setTimeout(() => {
                            UI.showLevelUp(result.newLevel, GameState.getRank());
                        }, 1000);
                    }

                    // Show education (kids or normal)
                    setTimeout(() => {
                        const isKids = GameState.isKidsMode();
                        const kidsEdu = result.mission.kids && result.mission.kids.education;
                        const edu = (isKids && kidsEdu) ? kidsEdu : result.mission.education;
                        Terminal.newline();
                        Terminal.print(edu.title, 'text-accent');
                        Terminal.printSeparator('─', 55, 'text-accent');
                        edu.content.forEach(line => Terminal.print(line, 'text-white'));
                        Terminal.printSeparator('─', 55, 'text-accent');
                        Terminal.newline();
                    }, result.leveledUp ? 4500 : 1500);

                    Terminal.updatePrompt();
                    UI.updateHUD();
                }
            }, 300);
        } else {
            // Show progress notification
            const objectives = Missions.getCurrentObjectives();
            const done = objectives.filter(o => o.completed).length;
            UI.toast(`Objetivo completado (${done}/${objectives.length})`, 'default');
        }
    }

    // ═══════════════════════════════════════
    // REGISTER ALL COMMANDS
    // ═══════════════════════════════════════

    // HELP
    register('help', (args) => {
        const unlocked = GameState.get().unlockedCommands;
        const isKids = GameState.isKidsMode();
        Terminal.newline();

        if (isKids) {
            Terminal.print('  ╔═══════════════════════════════════════════════════════════╗', 'text-accent');
            Terminal.print('  ║     👦 COMANDOS - MODO NIÑOS 👧                            ║', 'text-accent');
            Terminal.print('  ║     (explicaciones fáciles para aprender)                   ║', 'text-accent');
            Terminal.print('  ╠═══════════════════════════════════════════════════════════╣', 'text-accent');
        } else {
            Terminal.print('  ╔═══════════════════════════════════════════════════════════╗', 'text-accent');
            Terminal.print('  ║          COMANDOS DISPONIBLES                               ║', 'text-accent');
            Terminal.print('  ╠═══════════════════════════════════════════════════════════╣', 'text-accent');
        }

        const cmds = [
            ['help', 'Muestra esta ayuda'],
            ['clear', 'Limpia la terminal'],
            ['status', 'Tu perfil de hacker'],
            ['missions', 'Lista de misiones'],
            ['shop', 'Tienda de herramientas'],
            ['inventory', 'Tus herramientas'],
            ['achievements', 'Logros desbloqueados'],
            ['connect <ip>', 'Conectar a servidor'],
            ['disconnect', 'Desconectar'],
            ['ls', 'Listar archivos'],
            ['cd <dir>', 'Cambiar directorio'],
            ['cat <file>', 'Leer archivo'],
            ['whoami', 'Usuario actual'],
            ['scan <ip>', 'Escanear puertos (PortScanner)'],
            ['crack <ip>', 'Crackear password (PassCracker)'],
            ['exploit <ip>', 'Explotar vulnerabilidad (ExploitKit)'],
            ['decrypt <file>', 'Descifrar archivo (CryptoTool)'],
            ['sqlinject <ip>', 'SQL Injection (SQLMap)'],
            ['phish analyze <f>', 'Analizar email (PhishDetector)'],
            ['vpn <on/off>', 'Toggle VPN (ShadowVPN)'],
            ['firewall bypass <ip>', 'Bypass firewall (FirewallBreaker)'],
            ['social <user>', 'Social engineering (SocialKit)'],
            ['privesc <ip>', 'Escalar privilegios (RootKit)'],
            ['sound', 'Toggle sonido'],
            ['kids', 'Toggle modo niños'],
            ['explain <cmd>', 'Explicar un comando (modo niños)'],
            ['reset', 'Resetear juego']
        ];

        cmds.forEach(([cmd, normalDesc]) => {
            const isUnlocked = unlocked.some(u => cmd.startsWith(u));
            const tag = isUnlocked ? '  ✓' : '  🔒';
            const desc = isKids ? (KIDS_DESCRIPTIONS[cmd] || normalDesc) : normalDesc;
            const color = isUnlocked ? 'text-green' : 'text-dark';

            if (isKids) {
                const padded = cmd.padEnd(22);
                Terminal.print(`  ║ ${tag} ${padded} ${desc.substring(0, 35)}║`, color);
            } else {
                const padded = cmd.padEnd(22);
                Terminal.print(`  ║ ${tag} ${padded} ${desc.substring(0, 35)}║`, color);
            }
        });

        Terminal.print('  ╚═══════════════════════════════════════════════════════════╝', 'text-accent');

        if (isKids) {
            Terminal.newline();
            Terminal.print('  💡 Tip: Escribí "explain <comando>" para una explicación detallada', 'text-warning');
            Terminal.print('  💡 Ejemplo: explain scan', 'text-warning');
            Terminal.print('  💡 Escribí "kids" para volver al modo hacker normal', 'text-dim');
        }

        Terminal.newline();
    }, 'Muestra ayuda');

    // CLEAR
    register('clear', () => {
        Terminal.clear();
    }, 'Limpia la terminal');

    // STATUS
    register('status', () => {
        const s = GameState.get();
        const xp = GameState.getXPProgress();
        Terminal.newline();
        Terminal.print('  ╔══════════════════════════════════════════════╗', 'text-accent');
        Terminal.print('  ║            PERFIL DE HACKER                  ║', 'text-accent');
        Terminal.print('  ╠══════════════════════════════════════════════╣', 'text-accent');
        Terminal.print(`  ║  Handle:    ${s.name.padEnd(33)}║`, 'text-green');
        Terminal.print(`  ║  Nivel:     ${String(s.level).padEnd(33)}║`, 'text-green');
        Terminal.print(`  ║  Rank:      ${GameState.getRank().padEnd(33)}║`, 'text-warning');
        Terminal.print(`  ║  XP:        ${(xp.current + '/' + xp.total).padEnd(33)}║`, 'text-green');
        Terminal.print(`  ║  Créditos:  ${(s.credits + ' ₿TC').padEnd(33)}║`, 'text-warning');
        Terminal.print('  ╠══════════════════════════════════════════════╣', 'text-accent');
        Terminal.print(`  ║  Misiones:  ${(s.stats.missionsCompleted + '/15').padEnd(33)}║`, 'text-dim');
        Terminal.print(`  ║  Sistemas:  ${(s.stats.systemsHacked + ' hackeados').padEnd(33)}║`, 'text-dim');
        Terminal.print(`  ║  Comandos:  ${(s.stats.commandsExecuted + ' ejecutados').padEnd(33)}║`, 'text-dim');
        Terminal.print(`  ║  Tools:     ${(s.tools.length + ' adquiridas').padEnd(33)}║`, 'text-dim');
        Terminal.print(`  ║  Logros:    ${(s.achievements.length + '/' + Achievements.getAll().length).padEnd(33)}║`, 'text-dim');
        Terminal.print(`  ║  VPN:       ${(s.vpnActive ? '🟢 ACTIVO' : '🔴 INACTIVO').padEnd(33)}║`, 'text-dim');
        Terminal.print('  ╚══════════════════════════════════════════════╝', 'text-accent');
        Terminal.newline();
    }, 'Muestra tu perfil');

    // MISSIONS
    register('missions', (args) => {
        if (!args || args.length === 0) {
            const lines = Missions.displayMissions();
            lines.forEach(l => Terminal.print(l));
            return;
        }

        const sub = args[0];
        if (sub === 'accept' && args[1]) {
            if (GameState.getCurrentMission()) {
                Terminal.print('[!] Ya tienes una misión activa. Usa "missions objectives" para ver progreso.', 'text-warning');
                return;
            }
            const result = Missions.startMission(args[1]);
            if (result.success) {
                Sound.connect();
                Terminal.newline();
                // Show kids story or normal briefing
                if (GameState.isKidsMode() && result.mission.kids && result.mission.kids.story) {
                    result.mission.kids.story.forEach(l => Terminal.print(l, 'text-accent'));
                } else {
                    result.mission.briefing.forEach(l => Terminal.print(l, 'text-accent'));
                }
                Terminal.newline();
                Terminal.print('[*] Misión aceptada. Revisa los objetivos con "missions objectives".', 'text-success');
                UI.toast(`Misión aceptada: ${result.mission.name}`, 'accent');
                UI.updateHUD();
            } else {
                Terminal.print(`[!] ${result.msg}`, 'text-error');
                Sound.error();
            }
        } else if (sub === 'info' && args[1]) {
            const lines = Missions.displayMissionInfo(args[1]);
            lines.forEach(l => Terminal.print(l, 'text-accent'));
        } else if (sub === 'objectives') {
            const currentId = GameState.getCurrentMission();
            if (!currentId) {
                Terminal.print('[!] No tienes misión activa.', 'text-warning');
                return;
            }
            const mission = Missions.getById(currentId);
            const objectives = Missions.getCurrentObjectives();
            Terminal.newline();
            Terminal.print(`  Misión: ${mission.name}`, 'text-accent');
            Terminal.printSeparator('─', 50);
            objectives.forEach((obj, i) => {
                const check = obj.completed ? '✅' : '⬜';
                Terminal.print(`  ${check} ${i + 1}. ${obj.desc}`, obj.completed ? 'text-dim' : 'text-green');
            });
            Terminal.newline();
        } else if (sub === 'hint' && args[1]) {
            const idx = parseInt(args[1]) - 1;
            const hint = Missions.getHint(idx);
            if (hint) {
                Terminal.print(`[💡] Pista: ${hint}`, 'text-warning');
                UI.toast('Pista usada (-10 ₿TC)', 'warning');
            } else {
                Terminal.print('[!] Número de objetivo inválido.', 'text-error');
            }
        } else {
            Terminal.print('[!] Uso: missions [accept|info|objectives|hint] [id/número]', 'text-warning');
        }
    }, 'Gestión de misiones');

    // SHOP
    register('shop', (args) => {
        if (!args || args.length === 0) {
            const lines = Shop.displayShop();
            lines.forEach(l => Terminal.print(l));
            return;
        }

        const sub = args[0];
        if (sub === 'buy' && args[1]) {
            const idx = parseInt(args[1]) - 1;
            const catalog = Shop.getCatalog();
            if (idx < 0 || idx >= catalog.length) {
                Terminal.print('[!] Número inválido.', 'text-error');
                return;
            }
            const result = Shop.buyItem(catalog[idx].id);
            if (result.success) {
                Terminal.print(`[+] ${result.msg}`, 'text-success');
                if (result.item.unlocks.length > 0) {
                    Terminal.print(`[+] Nuevos comandos desbloqueados: ${result.item.unlocks.join(', ')}`, 'text-accent');
                }
                UI.toast(`${result.item.icon} ${result.item.name} adquirido!`, 'accent');
                Achievements.checkAll();
            } else {
                Terminal.print(`[!] ${result.msg}`, 'text-error');
                Sound.error();
            }
        } else if (sub === 'info' && args[1]) {
            const idx = parseInt(args[1]) - 1;
            const lines = Shop.displayItemInfo(idx);
            lines.forEach(l => Terminal.print(l, 'text-accent'));
        } else {
            Terminal.print('[!] Uso: shop [buy|info] <número>', 'text-warning');
        }
    }, 'Tienda de herramientas');

    // INVENTORY
    register('inventory', () => {
        const tools = GameState.getTools();
        if (tools.length === 0) {
            Terminal.print('[*] Tu inventario está vacío. Visita la "shop" para comprar herramientas.', 'text-warning');
            return;
        }
        Terminal.newline();
        Terminal.print('  🎒 INVENTARIO:', 'text-accent');
        Terminal.printSeparator('─', 40);
        tools.forEach(toolId => {
            const item = Shop.getItem(toolId);
            if (item) {
                Terminal.print(`  ${item.icon} ${item.name} - ${item.description}`, 'text-green');
            }
        });
        Terminal.newline();
    }, 'Muestra tus herramientas');

    // ACHIEVEMENTS
    register('achievements', () => {
        const lines = Achievements.displayAchievements();
        lines.forEach(l => Terminal.print(l));
    }, 'Muestra logros');

    // CONNECT
    register('connect', async (args) => {
        if (!args || args.length === 0) {
            Terminal.print('[!] Uso: connect <ip>', 'text-error');
            return;
        }

        const ip = args[0];
        const server = Network.getServer(ip);
        if (!server) {
            Terminal.print(`[!] No se puede conectar a ${ip}: Host no encontrado.`, 'text-error');
            Sound.error();
            return;
        }

        if (GameState.getConnectedTo()) {
            Terminal.print('[!] Ya estás conectado. Usa "disconnect" primero.', 'text-warning');
            return;
        }

        Sound.connect();
        await Terminal.showProgress(`Conectando a ${ip}`, 1500, 15);
        Terminal.print(`[+] Conectado a ${ip} (${server.name})`, 'text-success');
        Terminal.print(`[*] OS: ${server.os}`, 'text-dim');

        GameState.setConnectedTo(ip);
        Terminal.updatePrompt();

        checkMissionObjective('connect');
    }, 'Conectar a servidor');

    // DISCONNECT
    register('disconnect', () => {
        if (!GameState.getConnectedTo()) {
            Terminal.print('[!] No estás conectado a ningún servidor.', 'text-warning');
            return;
        }

        Sound.disconnect();
        Terminal.print(`[*] Desconectado de ${GameState.getConnectedTo()}.`, 'text-dim');
        GameState.setConnectedTo(null);
        Terminal.updatePrompt();

        checkMissionObjective('disconnect');
    }, 'Desconectar del servidor');

    // LS
    register('ls', (args) => {
        const ip = GameState.getConnectedTo();
        if (!ip) {
            Terminal.print('[!] No estás conectado a un servidor. Usa "connect <ip>".', 'text-warning');
            return;
        }

        const currentPath = GameState.getCurrentPath();
        const contents = Network.listDirectory(ip, currentPath);
        if (!contents) {
            Terminal.print(`[!] No se puede listar ${currentPath}`, 'text-error');
            return;
        }

        Terminal.print(`${currentPath}:`, 'text-dim');
        contents.forEach(item => {
            const fullPath = (currentPath === '/' ? '' : currentPath) + '/' + item;
            if (Network.isDirectory(ip, fullPath)) {
                Terminal.print(`  📁 ${item}/`, 'text-accent');
            } else {
                Terminal.print(`  📄 ${item}`, 'text-green');
            }
        });

        checkMissionObjective('ls_root');
    }, 'Listar archivos');

    // CD
    register('cd', (args) => {
        const ip = GameState.getConnectedTo();
        if (!ip) {
            Terminal.print('[!] No estás conectado.', 'text-warning');
            return;
        }

        if (!args || args.length === 0) {
            GameState.setCurrentPath('/');
            Terminal.updatePrompt();
            return;
        }

        const target = args[0];
        const newPath = Network.resolvePath(GameState.getCurrentPath(), target);

        if (Network.isDirectory(ip, newPath)) {
            GameState.setCurrentPath(newPath);
            Terminal.updatePrompt();
        } else {
            Terminal.print(`[!] Directorio no encontrado: ${target}`, 'text-error');
        }
    }, 'Cambiar directorio');

    // CAT
    register('cat', (args) => {
        const ip = GameState.getConnectedTo();
        if (!ip) {
            Terminal.print('[!] No estás conectado.', 'text-warning');
            return;
        }

        if (!args || args.length === 0) {
            Terminal.print('[!] Uso: cat <archivo>', 'text-error');
            return;
        }

        const filename = args[0];
        const currentPath = GameState.getCurrentPath();
        const fullPath = currentPath === '/' ? '/' + filename : currentPath + '/' + filename;

        const content = Network.readFile(ip, fullPath);
        if (content === null) {
            Terminal.print(`[!] Archivo no encontrado: ${filename}`, 'text-error');
            return;
        }

        Terminal.print(`── ${filename} ${'─'.repeat(Math.max(0, 40 - filename.length))}`, 'text-dim');
        content.split('\n').forEach(line => {
            Terminal.print(line, 'text-white');
        });
        Terminal.print('─'.repeat(45), 'text-dim');

        // Check various mission objectives based on what was read
        if (filename === 'readme.txt') checkMissionObjective('read_readme');
        if (filename === 'notes.txt') checkMissionObjective('read_notes');
        if (filename === 'robots.txt') checkMissionObjective('find_robots');
        if (filename === '.bash_history') checkMissionObjective('find_history');
        if (filename === 'passwords.txt') checkMissionObjective('find_passwords');
        if (filename === 'todo.txt') checkMissionObjective('find_todo');
        if (filename === 'hint.txt') checkMissionObjective('read_hint');
        if (filename === 'config.php' || filename === 'config.yml' || filename === 'app.conf') checkMissionObjective('find_config');
        if (filename === 'db_dump.sql') checkMissionObjective('find_dump');
        if (filename === 'directory.txt') checkMissionObjective('find_directory');
        if (filename === 'it_policy.txt') checkMissionObjective('find_policy');
        if (filename === 'rules.conf') checkMissionObjective('find_rules');
        if (filename === 'sudoers') checkMissionObjective('find_sudoers');
        if (filename === 'crontab') checkMissionObjective('find_crontab');
        if (filename === 'flag.txt') checkMissionObjective('find_flag');
        if (filename === 'arp_table.txt') checkMissionObjective('find_arp');
        if (filename === 'traffic.log') checkMissionObjective('find_traffic');
        if (filename === 'server.crt') checkMissionObjective('find_cert');
        if (filename === 'topology.txt') checkMissionObjective('find_topology');
        if (filename === 'credentials.txt') checkMissionObjective('find_credentials');
        if (filename === 'CHANGELOG.md') checkMissionObjective('find_changelog');
        if (filename === 'upload.py') checkMissionObjective('find_vuln');
        if (filename === 'auth.py') checkMissionObjective('find_backdoor');
        if (filename === 'README_DECRYPT.txt') checkMissionObjective('find_ransom');
        if (filename === 'payload.exe.analysis' || filename === 'ransom_analysis.txt') checkMissionObjective('find_analysis');
        if (filename === 'kill_switch.txt') checkMissionObjective('find_killswitch');
        if (filename === 'decryption_key.txt') checkMissionObjective('find_key');
        if (filename === 'restore_instructions.txt') checkMissionObjective('find_backup');
        if (filename === 'vulnerabilities.txt') checkMissionObjective('find_vulns');
        if (filename === 'master_key.txt') checkMissionObjective('find_master_key');
        if (filename === 'illegal_operations.txt' || filename === 'project_phoenix.txt' || filename === 'financial_fraud.csv') checkMissionObjective('find_evidence');
        if (filename === 'whistleblower_report.txt') checkMissionObjective('find_whistleblower');
        if (filename.startsWith('email_')) {
            // Track reading emails
            const mState = GameState.getMissionState();
            if (mState) {
                if (!mState.emailsRead) mState.emailsRead = [];
                if (!mState.emailsRead.includes(filename)) {
                    mState.emailsRead.push(filename);
                    GameState.updateMissionState({ emailsRead: mState.emailsRead });
                }
                if (mState.emailsRead.length >= 3) {
                    checkMissionObjective('read_emails');
                }
            }
        }
        if (fullPath.includes('confidential')) checkMissionObjective('find_data');
    }, 'Leer archivo');

    // WHOAMI
    register('whoami', () => {
        Terminal.print(GameState.getName(), 'text-accent');
    }, 'Muestra tu usuario');

    // SCAN
    register('scan', async (args) => {
        if (!GameState.hasTool('portscanner_v1') && !GameState.hasTool('portscanner_v2')) {
            Terminal.print('[!] Necesitas PortScanner. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }

        if (!args || args.length === 0) {
            Terminal.print('[!] Uso: scan <ip>', 'text-error');
            return;
        }

        const ip = args[0];
        const server = Network.getServer(ip);
        if (!server) {
            Terminal.print(`[!] Host ${ip} no responde.`, 'text-error');
            Sound.error();
            return;
        }

        const hasV2 = GameState.hasTool('portscanner_v2');
        const duration = hasV2 ? 1500 : 2500;

        Terminal.print(`[*] Iniciando escaneo de ${ip}...`, 'text-dim');
        await Terminal.showProgress('Escaneando puertos', duration);

        const ports = Network.getAllPorts(ip);
        Terminal.newline();
        Terminal.print(`[+] Resultados para ${ip} (${server.name}):`, 'text-success');
        Terminal.print(`[*] OS: ${server.os}`, 'text-dim');
        Terminal.print(`[*] ${ports.length} puertos encontrados:`, 'text-dim');
        Terminal.newline();

        ports.forEach(p => {
            let icon, color;
            if (p.state === 'open') {
                icon = '[+]';
                color = 'text-success';
            } else if (p.state === 'filtered') {
                icon = '[-]';
                color = 'text-warning';
            } else {
                icon = '[x]';
                color = 'text-error';
            }

            let line = `  ${icon} Puerto ${p.port}/${p.service} - ${p.state.toUpperCase()}`;
            if (hasV2 && p.version) {
                line += ` (${p.version})`;
            }
            Terminal.print(line, color);
            Sound.scanBeep();
        });

        if (Network.hasFirewall(ip)) {
            Terminal.newline();
            Terminal.print('[!] FIREWALL DETECTADO - Algunos puertos filtrados', 'text-warning');
        }

        Terminal.newline();
        GameState.incrementStat('portsScanned');
        checkMissionObjective('scan');
        Achievements.checkAll();
    }, 'Escanear puertos');

    // CRACK
    register('crack', async (args) => {
        if (!GameState.hasTool('passcracker') && !GameState.hasTool('passcracker_pro')) {
            Terminal.print('[!] Necesitas PassCracker. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }

        if (!args || args.length === 0) {
            Terminal.print('[!] Uso: crack <ip>', 'text-error');
            return;
        }

        const ip = args[0];
        const server = Network.getServer(ip);
        if (!server || !server.credentials || !server.credentials.pass) {
            Terminal.print(`[!] No se puede crackear ${ip}.`, 'text-error');
            return;
        }

        const hasPro = GameState.hasTool('passcracker_pro');
        Terminal.print(`[*] Iniciando ataque de ${hasPro ? 'fuerza bruta avanzada' : 'diccionario'}...`, 'text-dim');

        const fakePasswords = ['123456', 'password', 'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'qwerty'];
        for (const fake of fakePasswords) {
            Terminal.print(`  [-] Probando: ${fake}...`, 'text-dim');
            Sound.hackTick();
            await new Promise(r => setTimeout(r, hasPro ? 150 : 300));
        }

        await Terminal.showProgress('Crackeando', hasPro ? 1000 : 2000);

        Terminal.print(`  [+] ¡PASSWORD ENCONTRADO!`, 'text-success');
        Terminal.print(`  [+] Usuario: ${server.credentials.user}`, 'text-accent');
        Terminal.print(`  [+] Password: ${server.credentials.pass}`, 'text-accent');
        Terminal.newline();

        Sound.success();
        GameState.incrementStat('passwordsCracked');
        checkMissionObjective('crack');
        Achievements.checkAll();
    }, 'Crackear password');

    // EXPLOIT
    register('exploit', async (args) => {
        if (!GameState.hasTool('exploitkit') && !GameState.hasTool('exploitkit_zero')) {
            Terminal.print('[!] Necesitas ExploitKit. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }

        if (!args || args.length === 0) {
            Terminal.print('[!] Uso: exploit <ip>', 'text-error');
            return;
        }

        const ip = args[0];
        const server = Network.getServer(ip);
        if (!server) {
            Terminal.print(`[!] Host ${ip} no responde.`, 'text-error');
            return;
        }

        const hasZero = GameState.hasTool('exploitkit_zero');
        Terminal.print(`[*] Buscando vulnerabilidades en ${ip}...`, 'text-dim');
        await Terminal.showProgress('Analizando servicios', 2000);

        if (server.vulnerability) {
            Terminal.print(`[+] Vulnerabilidad encontrada: ${server.vulnerability}`, 'text-success');
            Terminal.print(`[*] Preparando exploit...`, 'text-dim');
            await Terminal.showProgress('Ejecutando exploit', 2500);
            Terminal.print(`[+] ¡Exploit ejecutado exitosamente!`, 'text-success');
            Terminal.print(`[+] Acceso obtenido al sistema.`, 'text-accent');
            Sound.success();
        } else {
            Terminal.print(`[-] No se encontraron vulnerabilidades explotables.`, 'text-warning');
        }

        checkMissionObjective('exploit');
    }, 'Explotar vulnerabilidad');

    // DECRYPT
    register('decrypt', async (args) => {
        if (!GameState.hasTool('cryptotool')) {
            Terminal.print('[!] Necesitas CryptoTool. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }

        if (!args || args.length === 0) {
            Terminal.print('[!] Uso: decrypt <archivo>', 'text-error');
            return;
        }

        const ip = GameState.getConnectedTo();
        if (!ip) {
            Terminal.print('[!] Debes estar conectado a un servidor.', 'text-warning');
            return;
        }

        const filename = args[0];
        const currentPath = GameState.getCurrentPath();
        const fullPath = currentPath === '/' ? '/' + filename : currentPath + '/' + filename;
        const content = Network.readFile(ip, fullPath);

        if (!content) {
            Terminal.print(`[!] Archivo no encontrado: ${filename}`, 'text-error');
            return;
        }

        Terminal.print(`[*] Analizando cifrado de ${filename}...`, 'text-dim');
        await Terminal.showProgress('Descifrando', 2000);

        // Caesar cipher decode
        if (filename === 'secret_message.enc') {
            const decoded = content.split('').map(c => {
                if (c >= 'A' && c <= 'Z') return String.fromCharCode(((c.charCodeAt(0) - 65 - 3 + 26) % 26) + 65);
                if (c >= 'a' && c <= 'z') return String.fromCharCode(((c.charCodeAt(0) - 97 - 3 + 26) % 26) + 97);
                return c;
            }).join('');
            Terminal.print(`[+] Cifrado detectado: César (desplazamiento 3)`, 'text-accent');
            Terminal.print(`[+] Mensaje descifrado:`, 'text-success');
            Terminal.print(`    ${decoded}`, 'text-white');
            Sound.success();
            checkMissionObjective('decrypt_caesar');
        }
        // Base64 decode
        else if (filename === 'archive.enc') {
            try {
                const decoded = atob(content);
                Terminal.print(`[+] Codificación detectada: Base64`, 'text-accent');
                Terminal.print(`[+] Contenido decodificado:`, 'text-success');
                Terminal.print(`    ${decoded}`, 'text-white');
                Sound.success();
                checkMissionObjective('decrypt_base64');
            } catch (e) {
                Terminal.print(`[!] Error al decodificar.`, 'text-error');
            }
        }
        // Credentials.txt Base64
        else if (filename === 'credentials.txt') {
            const b64Match = content.match(/([A-Za-z0-9+/=]{20,})/);
            if (b64Match) {
                try {
                    const decoded = atob(b64Match[1]);
                    Terminal.print(`[+] Parte cifrada detectada: Base64`, 'text-accent');
                    Terminal.print(`[+] Descifrado: ${decoded}`, 'text-success');
                    Sound.success();
                } catch (e) {
                    Terminal.print(`[!] Error al descifrar.`, 'text-error');
                }
            }
        }
        else {
            Terminal.print(`[-] No se detectó cifrado conocido en este archivo.`, 'text-warning');
        }
    }, 'Descifrar archivo');

    // SQLINJECT
    register('sqlinject', async (args) => {
        if (!GameState.hasTool('sqlmap')) {
            Terminal.print('[!] Necesitas SQLMap Lite. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }

        if (!args || args.length === 0) {
            Terminal.print('[!] Uso: sqlinject <ip>', 'text-error');
            return;
        }

        const ip = args[0];
        const server = Network.getServer(ip);
        if (!server) {
            Terminal.print(`[!] Host ${ip} no responde.`, 'text-error');
            return;
        }

        Terminal.print(`[*] SQLMap Lite - Iniciando análisis de ${ip}...`, 'text-dim');
        await Terminal.showProgress('Buscando puntos de inyección', 1500);

        const lines = [
            { text: '[*] Analizando formulario de login...', css: 'text-dim', delay: 500 },
            { text: '[+] Parámetro vulnerable encontrado: user', css: 'text-success', delay: 300 },
            { text: '[*] Probando: \' OR 1=1 --', css: 'text-dim', delay: 400 },
            { text: '[+] ¡SQL INJECTION CONFIRMADA!', css: 'text-success', sound: 'success', delay: 300 },
            { text: '[+] Tipo: Boolean-based blind', css: 'text-accent', delay: 200 },
            { text: '[+] Base de datos: MySQL 8.0', css: 'text-accent', delay: 200 },
            { text: '[*] Extrayendo tablas...', css: 'text-dim', delay: 500 },
            { text: '[+] Tabla encontrada: users (3 registros)', css: 'text-success', delay: 200 },
            { text: '[+] Acceso como admin obtenido', css: 'text-success', delay: 200 }
        ];

        await Terminal.progressOutput(lines);
        Terminal.newline();

        GameState.incrementStat('sqlInjections');
        checkMissionObjective('sqlinject');
        Achievements.checkAll();
    }, 'SQL Injection');

    // PHISH
    register('phish', async (args) => {
        if (!GameState.hasTool('phishdetector')) {
            Terminal.print('[!] Necesitas PhishDetector. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }

        if (!args || args.length < 2 || args[0] !== 'analyze') {
            Terminal.print('[!] Uso: phish analyze <archivo_email>', 'text-error');
            return;
        }

        const ip = GameState.getConnectedTo();
        if (!ip) {
            Terminal.print('[!] Debes estar conectado a un servidor.', 'text-warning');
            return;
        }

        const filename = args[1];
        const currentPath = GameState.getCurrentPath();
        const fullPath = currentPath === '/' ? '/' + filename : currentPath + '/' + filename;
        const content = Network.readFile(ip, fullPath);

        if (!content) {
            Terminal.print(`[!] Archivo no encontrado: ${filename}`, 'text-error');
            return;
        }

        Terminal.print(`[*] PhishDetector - Analizando ${filename}...`, 'text-dim');
        await Terminal.showProgress('Analizando headers y contenido', 1500);

        if (filename === 'email_1.txt') {
            Terminal.print('[🚨] ¡PHISHING DETECTADO!', 'text-error');
            Terminal.print('  Señales de alerta:', 'text-warning');
            Terminal.print('  ⚠️ Dominio falso: g00gle-support.com (ceros en vez de "o")', 'text-warning');
            Terminal.print('  ⚠️ Lenguaje urgente: "URGENTE: Su cuenta será suspendida"', 'text-warning');
            Terminal.print('  ⚠️ Link sospechoso con parámetros', 'text-warning');
            Terminal.print('  Veredicto: PHISHING (99% confianza)', 'text-error');
        } else if (filename === 'email_2.txt') {
            Terminal.print('[✅] Email legítimo', 'text-success');
            Terminal.print('  Análisis:', 'text-dim');
            Terminal.print('  ✓ Dominio correcto: empresa.com', 'text-success');
            Terminal.print('  ✓ Sin urgencia excesiva', 'text-success');
            Terminal.print('  ✓ Referencia a portal interno (no link externo)', 'text-success');
            Terminal.print('  Veredicto: LEGÍTIMO (95% confianza)', 'text-success');
        } else if (filename === 'email_3.txt') {
            Terminal.print('[🚨] ¡PHISHING DETECTADO!', 'text-error');
            Terminal.print('  Señales de alerta:', 'text-warning');
            Terminal.print('  ⚠️ Dominio falso: paypa1.com ("1" en vez de "l")', 'text-warning');
            Terminal.print('  ⚠️ Urgencia: "INMEDIATAMENTE"', 'text-warning');
            Terminal.print('  ⚠️ Monto específico para generar pánico', 'text-warning');
            Terminal.print('  Veredicto: PHISHING (99% confianza)', 'text-error');
        } else {
            Terminal.print('[-] No se encontraron indicadores claros de phishing.', 'text-dim');
        }

        Terminal.newline();
        Sound.success();
        checkMissionObjective('analyze_phish');
    }, 'Analizar phishing');

    // VPN
    register('vpn', (args) => {
        if (!GameState.hasTool('vpn')) {
            Terminal.print('[!] Necesitas ShadowVPN. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }

        if (!args || args.length === 0) {
            const status = GameState.isVPNActive() ? 'ACTIVO' : 'INACTIVO';
            Terminal.print(`[*] VPN está ${status}. Usa: vpn on/off`, 'text-dim');
            return;
        }

        if (args[0] === 'on') {
            GameState.setVPN(true);
            Terminal.print('[+] 👻 ShadowVPN ACTIVADO - Tráfico cifrado y anónimo', 'text-success');
            Terminal.print('[*] Tu IP real está oculta detrás de múltiples proxies.', 'text-dim');
            UI.toast('🔒 VPN Activado', 'accent');
            Sound.connect();
        } else if (args[0] === 'off') {
            GameState.setVPN(false);
            Terminal.print('[-] ShadowVPN DESACTIVADO', 'text-warning');
            UI.toast('VPN Desactivado', 'warning');
            Sound.disconnect();
        }
    }, 'Toggle VPN');

    // FIREWALL BYPASS
    register('firewall', async (args) => {
        if (!GameState.hasTool('firewallbreaker')) {
            Terminal.print('[!] Necesitas FirewallBreaker. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }

        if (!args || args.length < 2 || args[0] !== 'bypass') {
            Terminal.print('[!] Uso: firewall bypass <ip>', 'text-error');
            return;
        }

        const ip = args[1];
        const server = Network.getServer(ip);
        if (!server) {
            Terminal.print(`[!] Host ${ip} no responde.`, 'text-error');
            return;
        }

        Terminal.print(`[*] FirewallBreaker - Analizando reglas de ${ip}...`, 'text-dim');
        await Terminal.showProgress('Analizando firewall', 2000);

        if (Network.hasFirewall(ip)) {
            const rules = Network.getFirewallRules(ip);
            Terminal.print('[+] Firewall detectado. Reglas encontradas:', 'text-warning');
            rules.forEach(r => Terminal.print(`    ${r}`, 'text-dim'));
            Terminal.newline();

            await Terminal.showProgress('Bypaseando firewall', 2500);
            Terminal.print('[+] ¡Firewall bypaseado exitosamente!', 'text-success');
            Terminal.print('[+] Acceso a puertos filtrados obtenido.', 'text-accent');
            Sound.success();
            GameState.incrementStat('firewallsBypassed');
        } else {
            Terminal.print('[-] Este servidor no tiene firewall activo.', 'text-dim');
        }

        checkMissionObjective('firewall_bypass');
        Achievements.checkAll();
    }, 'Bypass de firewall');

    // SOCIAL
    register('social', async (args) => {
        if (!GameState.hasTool('socialkit')) {
            Terminal.print('[!] Necesitas SocialKit. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }

        if (!args || args.length === 0) {
            Terminal.print('[!] Uso: social <usuario_target>', 'text-error');
            return;
        }

        const target = args[0];
        Terminal.print(`[*] SocialKit - Iniciando ataque de ingeniería social contra: ${target}`, 'text-dim');
        await Terminal.showProgress('Recopilando OSINT', 1500);

        const lines = [
            { text: `[*] Perfil de ${target} encontrado en redes sociales...`, css: 'text-dim', delay: 400 },
            { text: `[*] Preparando pretexto: "Soporte IT - reseteo de password"`, css: 'text-dim', delay: 500 },
            { text: `[*] Contactando a ${target}...`, css: 'text-dim', delay: 800 },
            { text: `[+] ${target} respondió al pretexto`, css: 'text-success', delay: 500 },
            { text: `[+] Credenciales obtenidas mediante social engineering`, css: 'text-success', sound: 'success', delay: 300 }
        ];

        await Terminal.progressOutput(lines);

        const ip = GameState.getConnectedTo();
        if (ip) {
            const server = Network.getServer(ip);
            if (server && server.credentials) {
                Terminal.print(`[+] Usuario: ${server.credentials.user}`, 'text-accent');
                Terminal.print(`[+] Password: ${server.credentials.pass}`, 'text-accent');
            }
        }

        Terminal.newline();
        checkMissionObjective('social');
    }, 'Ingeniería social');

    // PRIVESC
    register('privesc', async (args) => {
        if (!GameState.hasTool('rootkit')) {
            Terminal.print('[!] Necesitas RootKit Master. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }

        if (!args || args.length === 0) {
            Terminal.print('[!] Uso: privesc <ip>', 'text-error');
            return;
        }

        const ip = args[0];
        Terminal.print(`[*] RootKit Master - Buscando vectores de escalada...`, 'text-dim');
        await Terminal.showProgress('Analizando permisos', 2000);

        const lines = [
            { text: '[*] Analizando sudo permissions...', css: 'text-dim', delay: 400 },
            { text: '[+] sudo NOPASSWD encontrado para: vim, find', css: 'text-warning', delay: 300 },
            { text: '[*] Analizando cron jobs...', css: 'text-dim', delay: 400 },
            { text: '[+] Cron job vulnerable: /tmp/backup.sh (world-writable, runs as root)', css: 'text-warning', delay: 300 },
            { text: '[*] Explotando via sudo vim...', css: 'text-dim', delay: 600 },
            { text: '[+] Ejecutando: sudo vim -c ":!bash"', css: 'text-accent', delay: 400 },
            { text: '[+] ¡ACCESO ROOT OBTENIDO!', css: 'text-success', sound: 'success', delay: 200 },
            { text: '[+] uid=0(root) gid=0(root) groups=0(root)', css: 'text-success', delay: 200 }
        ];

        await Terminal.progressOutput(lines);
        Terminal.newline();
        checkMissionObjective('privesc');
    }, 'Escalar privilegios');

    // SOUND
    register('sound', () => {
        const enabled = Sound.toggle();
        Terminal.print(`[*] Sonido: ${enabled ? 'ACTIVADO' : 'DESACTIVADO'}`, 'text-dim');
    }, 'Toggle sonido');

    // TUTORIAL
    register('tutorial', () => {
        Terminal.newline();
        Terminal.print('  === TUTORIAL RÁPIDO ===', 'text-accent');
        Terminal.print('', '');
        Terminal.print('  1. Escribe "missions" para ver misiones disponibles', 'text-green');
        Terminal.print('  2. Escribe "missions accept <id>" para aceptar una misión', 'text-green');
        Terminal.print('  3. Escribe "missions objectives" para ver qué hacer', 'text-green');
        Terminal.print('  4. Escribe "shop" para comprar herramientas', 'text-green');
        Terminal.print('  5. Escribe "connect <ip>" para conectarte a un servidor', 'text-green');
        Terminal.print('  6. Una vez conectado, usa "ls", "cd", "cat" para navegar', 'text-green');
        Terminal.print('  7. Usa tus herramientas: scan, crack, exploit, etc.', 'text-green');
        Terminal.print('  8. Completa todos los objetivos para ganar ₿TC y XP', 'text-green');
        Terminal.print('', '');
        Terminal.print('  Tip: Usa "missions hint <#>" si te trabas (cuesta 10 ₿TC)', 'text-warning');
        Terminal.newline();
    }, 'Muestra el tutorial');

    // RESET
    register('reset', () => {
        Terminal.print('[!] ¿Seguro que quieres resetear? Escribe "reset confirm" para confirmar.', 'text-warning');
        // Handled in execute
    }, 'Resetear juego');

    // PROXY (stub)
    register('proxy', () => {
        if (!GameState.hasTool('proxychain')) {
            Terminal.print('[!] Necesitas ProxyChain. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }
        Terminal.print('[+] ProxyChain activado: tu tráfico pasa por 5 proxies anónimos.', 'text-success');
        Terminal.print('[*] Ruta: TU_PC → Suiza → Islandia → Panamá → Japón → Target', 'text-dim');
    }, 'Cadena de proxies');

    // BOTNET (stub)
    register('botnet', () => {
        if (!GameState.hasTool('botnet')) {
            Terminal.print('[!] Necesitas Botnet Access. Cómpralo en la "shop".', 'text-error');
            Sound.error();
            return;
        }
        Terminal.print('[+] Botnet activa: 10,000 bots disponibles.', 'text-success');
        Terminal.print('[*] Uso: DDoS para distracción durante misiones avanzadas.', 'text-dim');
    }, 'Control de botnet');

    // ═══════════════════════════════════════
    // KIDS MODE TOGGLE
    // ═══════════════════════════════════════
    register('kids', () => {
        const current = GameState.isKidsMode();
        GameState.setKidsMode(!current);
        if (!current) {
            Terminal.newline();
            Terminal.print('  ╔══════════════════════════════════════════════╗', 'text-accent');
            Terminal.print('  ║     👦👧 ¡MODO NIÑOS ACTIVADO! 👧👦          ║', 'text-accent');
            Terminal.print('  ╚══════════════════════════════════════════════╝', 'text-accent');
            Terminal.newline();
            Terminal.print('  🎉 ¡Ahora sos un Ciber Detective!', 'text-green');
            Terminal.print('  Los comandos tienen explicaciones más fáciles.', 'text-green');
            Terminal.print('  Las misiones tienen historias de aventuras.', 'text-green');
            Terminal.newline();
            Terminal.print('  💡 Escribí "help" para ver los comandos explicados.', 'text-warning');
            Terminal.print('  💡 Escribí "explain scan" para aprender sobre un comando.', 'text-warning');
            Terminal.print('  💡 Escribí "kids" de nuevo para volver al modo hacker.', 'text-dim');
            Terminal.newline();
            Sound.success();
        } else {
            Terminal.newline();
            Terminal.print('  [*] Modo hacker restaurado. 💀', 'text-green');
            Terminal.print('  Las explicaciones vuelven al modo técnico.', 'text-dim');
            Terminal.newline();
        }
    }, 'Toggle modo niños');

    // ═══════════════════════════════════════
    // EXPLAIN COMMAND (kids mode)
    // ═══════════════════════════════════════
    register('explain', (args) => {
        if (!GameState.isKidsMode()) {
            Terminal.print('[*] El comando "explain" solo funciona en modo niños.', 'text-warning');
            Terminal.print('[*] Escribí "kids" para activar el modo niños.', 'text-dim');
            return;
        }

        if (!args || args.length === 0) {
            Terminal.print('[?] ¿Qué comando querés que te explique?', 'text-warning');
            Terminal.print('    Ejemplo: explain scan', 'text-dim');
            Terminal.print('    Ejemplo: explain crack', 'text-dim');
            Terminal.print('    Ejemplo: explain connect', 'text-dim');
            Terminal.print('', '');
            Terminal.print('    Comandos con explicación:', 'text-accent');
            Terminal.print('    scan, crack, connect, disconnect, ls, cd, cat,', 'text-dim');
            Terminal.print('    exploit, decrypt, sqlinject, phish, vpn,', 'text-dim');
            Terminal.print('    firewall, social, privesc, missions, shop', 'text-dim');
            return;
        }

        const cmd = args[0].toLowerCase();
        const explanation = KIDS_EXPLANATIONS[cmd];
        if (explanation) {
            Terminal.newline();
            Terminal.print('  ╔══════════════════════════════════════════════════╗', 'text-accent');
            explanation.forEach(line => {
                Terminal.print('  ║  ' + line, 'text-white');
            });
            Terminal.print('  ╚══════════════════════════════════════════════════╝', 'text-accent');
            Terminal.newline();
        } else {
            Terminal.print(`[?] No tengo explicación especial para "${cmd}".`, 'text-warning');
            Terminal.print('    Probá con: scan, crack, connect, exploit, ls, cat, decrypt...', 'text-dim');
        }
    }, 'Explicar un comando (modo niños)');

    return {
        execute(input) {
            const parts = input.trim().split(/\s+/);
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            // Special case: reset confirm
            if (cmd === 'reset' && args[0] === 'confirm') {
                GameState.reset();
                Terminal.clear();
                Terminal.print('[*] Juego reseteado. Recarga la página para empezar de nuevo.', 'text-warning');
                setTimeout(() => location.reload(), 2000);
                return;
            }

            // Check if command exists
            if (!registry[cmd]) {
                Terminal.print(`[!] Comando no reconocido: ${cmd}. Escribe "help" para ver comandos.`, 'text-error');
                Sound.error();
                return;
            }

            // Check if command is unlocked
            if (!GameState.hasCommand(cmd)) {
                Terminal.print(`[🔒] Comando "${cmd}" bloqueado. Compra la herramienta necesaria en la "shop".`, 'text-warning');
                Sound.error();
                return;
            }

            // Execute
            registry[cmd].fn(args);
        },

        autocomplete(partial) {
            const unlocked = GameState.get().unlockedCommands;
            const matches = unlocked.filter(cmd => cmd.startsWith(partial.toLowerCase()));
            if (matches.length === 1) return matches[0];
            return null;
        }
    };
})();
