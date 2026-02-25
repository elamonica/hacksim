/* ============================================
   HackSim - Shop System
   ============================================ */

const Shop = (() => {
    const catalog = [
        {
            id: 'portscanner_v1',
            name: 'PortScanner v1.0',
            description: 'Escaneo básico de puertos TCP',
            price: 100,
            levelReq: 1,
            unlocks: ['scan'],
            category: 'recon',
            icon: '🔍'
        },
        {
            id: 'phishdetector',
            name: 'PhishDetector',
            description: 'Analiza emails para detectar phishing',
            price: 150,
            levelReq: 1,
            unlocks: ['phish'],
            category: 'defense',
            icon: '🎣'
        },
        {
            id: 'passcracker',
            name: 'PassCracker v1.0',
            description: 'Ataque de diccionario para crackear passwords',
            price: 200,
            levelReq: 2,
            unlocks: ['crack'],
            category: 'attack',
            icon: '🔑'
        },
        {
            id: 'vpn',
            name: 'ShadowVPN',
            description: 'VPN para anonimato en la red',
            price: 250,
            levelReq: 2,
            unlocks: ['vpn'],
            category: 'stealth',
            icon: '👻'
        },
        {
            id: 'cryptotool',
            name: 'CryptoTool',
            description: 'Descifra archivos (César, Base64, etc.)',
            price: 300,
            levelReq: 3,
            unlocks: ['decrypt'],
            category: 'crypto',
            icon: '🔐'
        },
        {
            id: 'sqlmap',
            name: 'SQLMap Lite',
            description: 'Herramienta de inyección SQL automatizada',
            price: 350,
            levelReq: 3,
            unlocks: ['sqlinject'],
            category: 'attack',
            icon: '💉'
        },
        {
            id: 'exploitkit',
            name: 'ExploitKit v1.0',
            description: 'Exploits para vulnerabilidades conocidas',
            price: 400,
            levelReq: 3,
            unlocks: ['exploit'],
            category: 'attack',
            icon: '💣'
        },
        {
            id: 'portscanner_v2',
            name: 'PortScanner v2.0',
            description: 'Escaneo avanzado con detección de servicios y versiones',
            price: 500,
            levelReq: 4,
            unlocks: [],
            upgrade: 'portscanner_v1',
            category: 'recon',
            icon: '🔎'
        },
        {
            id: 'socialkit',
            name: 'SocialKit',
            description: 'Kit de ingeniería social y OSINT',
            price: 500,
            levelReq: 4,
            unlocks: ['social'],
            category: 'social',
            icon: '🎭'
        },
        {
            id: 'firewallbreaker',
            name: 'FirewallBreaker',
            description: 'Bypasea reglas de firewall',
            price: 600,
            levelReq: 5,
            unlocks: ['firewall'],
            category: 'attack',
            icon: '🛡️'
        },
        {
            id: 'proxychain',
            name: 'ProxyChain',
            description: 'Encadena proxies para máximo anonimato',
            price: 700,
            levelReq: 6,
            unlocks: ['proxy'],
            category: 'stealth',
            icon: '🔗'
        },
        {
            id: 'passcracker_pro',
            name: 'PassCracker Pro',
            description: 'Fuerza bruta avanzada + rainbow tables',
            price: 800,
            levelReq: 6,
            unlocks: [],
            upgrade: 'passcracker',
            category: 'attack',
            icon: '🗝️'
        },
        {
            id: 'botnet',
            name: 'Botnet Access',
            description: 'Control de red de bots para DDoS/distracción',
            price: 1000,
            levelReq: 7,
            unlocks: ['botnet'],
            category: 'attack',
            icon: '🤖'
        },
        {
            id: 'exploitkit_zero',
            name: 'ExploitKit Zero',
            description: 'Exploits 0-day para vulnerabilidades desconocidas',
            price: 1500,
            levelReq: 8,
            unlocks: [],
            upgrade: 'exploitkit',
            category: 'attack',
            icon: '☠️'
        },
        {
            id: 'rootkit',
            name: 'RootKit Master',
            description: 'Herramienta de escalada de privilegios',
            price: 1200,
            levelReq: 7,
            unlocks: ['privesc'],
            category: 'attack',
            icon: '👑'
        }
    ];

    return {
        getCatalog() {
            return catalog;
        },

        getItem(id) {
            return catalog.find(item => item.id === id) || null;
        },

        getAvailableItems() {
            const level = GameState.getLevel();
            const tools = GameState.getTools();
            return catalog.map(item => ({
                ...item,
                owned: tools.includes(item.id),
                canBuy: !tools.includes(item.id) && level >= item.levelReq && GameState.getCredits() >= item.price,
                locked: level < item.levelReq
            }));
        },

        buyItem(itemId) {
            const item = this.getItem(itemId);
            if (!item) return { success: false, msg: 'Herramienta no encontrada.' };

            if (GameState.hasTool(itemId)) return { success: false, msg: 'Ya tienes esta herramienta.' };
            if (GameState.getLevel() < item.levelReq) return { success: false, msg: `Necesitas nivel ${item.levelReq}.` };
            if (GameState.getCredits() < item.price) return { success: false, msg: `Necesitas ${item.price} ₿TC. Tienes ${GameState.getCredits()} ₿TC.` };

            GameState.spendCredits(item.price);
            GameState.addTool(itemId);

            // Unlock associated commands
            item.unlocks.forEach(cmd => {
                GameState.unlockCommand(cmd);
            });

            Sound.purchase();
            return { success: true, msg: `¡${item.name} comprado!`, item };
        },

        displayShop() {
            const items = this.getAvailableItems();
            const lines = [];

            lines.push('');
            lines.push('  ╔══════════════════════════════════════════════════════════════╗');
            lines.push('  ║              🏪  DARKNET MARKET  🏪                         ║');
            lines.push('  ║         "Las mejores herramientas del underground"           ║');
            lines.push('  ╠══════════════════════════════════════════════════════════════╣');
            lines.push('  ║  ID   │ Herramienta          │ Precio  │ Nivel │ Estado     ║');
            lines.push('  ╠══════════════════════════════════════════════════════════════╣');

            items.forEach((item, idx) => {
                const id = String(idx + 1).padStart(2, ' ');
                const name = (item.icon + ' ' + item.name).padEnd(21, ' ');
                const price = (item.price + ' ₿').padStart(8, ' ');
                const level = ('Lvl ' + item.levelReq).padEnd(6, ' ');
                let status;
                if (item.owned) {
                    status = '✅ OWNED ';
                } else if (item.locked) {
                    status = '🔒 LOCKED';
                } else if (item.canBuy) {
                    status = '💰 BUY   ';
                } else {
                    status = '💸 $$$$  ';
                }
                lines.push(`  ║  ${id}  │ ${name}│ ${price}│ ${level}│ ${status} ║`);
            });

            lines.push('  ╚══════════════════════════════════════════════════════════════╝');
            lines.push('');
            lines.push(`  Tu saldo: ${GameState.getCredits()} ₿TC  |  Tu nivel: ${GameState.getLevel()}`);
            lines.push('');
            lines.push('  Usa: shop buy <número> para comprar');
            lines.push('  Usa: shop info <número> para más detalles');

            return lines;
        },

        displayItemInfo(index) {
            const items = this.getAvailableItems();
            const item = items[index];
            if (!item) return ['  Error: Herramienta no encontrada.'];

            const lines = [];
            lines.push('');
            lines.push(`  ${item.icon} ${item.name}`);
            lines.push(`  ${'─'.repeat(40)}`);
            lines.push(`  ${item.description}`);
            lines.push(`  Precio: ${item.price} ₿TC`);
            lines.push(`  Nivel requerido: ${item.levelReq}`);
            lines.push(`  Categoría: ${item.category}`);
            if (item.unlocks.length > 0) {
                lines.push(`  Desbloquea comandos: ${item.unlocks.join(', ')}`);
            }
            if (item.upgrade) {
                lines.push(`  Mejora de: ${item.upgrade}`);
            }
            if (item.owned) {
                lines.push(`  Estado: ✅ Ya la tienes`);
            } else if (item.locked) {
                lines.push(`  Estado: 🔒 Nivel insuficiente`);
            }
            lines.push('');
            return lines;
        }
    };
})();
