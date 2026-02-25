/* ============================================
   HackSim - Main Entry Point & Boot Sequence
   ============================================ */

const Main = (() => {
    const BOOT_TEXT = [
        'BIOS v2.4.1 - HackSim Systems Inc.',
        'Checking memory... 16384 MB OK',
        'Detecting drives... SSD 512GB OK',
        'Loading kernel... ████████████████ OK',
        '',
        '  ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██╗███╗   ███╗',
        '  ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██║████╗ ████║',
        '  ███████║███████║██║     █████╔╝ ███████╗██║██╔████╔██║',
        '  ██╔══██║██╔══██║██║     ██╔═██╗ ╚════██║██║██║╚██╔╝██║',
        '  ██║  ██║██║  ██║╚██████╗██║  ██╗███████║██║██║ ╚═╝ ██║',
        '  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝     ╚═╝',
        '',
        '  >> Hacker Simulator v1.0 <<',
        '  >> Aprende ciberseguridad jugando <<',
        '',
        'Initializing network interfaces... OK',
        'Loading hacking modules... OK',
        'Connecting to darknet... OK',
        'Encryption layer active... OK',
        '',
        'System ready. Press any key to continue...'
    ];

    const NAME_ASCII = [
        '    ╔═══════════════════════════════════════╗',
        '    ║     BIENVENIDO A LA RED, HACKER        ║',
        '    ║                                         ║',
        '    ║  Necesitamos un handle para              ║',
        '    ║  identificarte en el underground.        ║',
        '    ╚═══════════════════════════════════════╝'
    ].join('\n');

    async function bootSequence() {
        const bootScreen = document.getElementById('boot-screen');
        const bootText = document.getElementById('boot-text');

        for (let i = 0; i < BOOT_TEXT.length; i++) {
            const line = BOOT_TEXT[i];
            bootText.textContent += line + '\n';
            bootText.scrollTop = bootText.scrollHeight;

            if (i === 0) Sound.bootBeep();
            if (line.includes('OK')) Sound.scanBeep();

            const delay = line.includes('█') ? 40 : line === '' ? 100 : 60;
            await new Promise(r => setTimeout(r, delay));
        }

        // Wait for key press
        await new Promise(resolve => {
            function handler() {
                document.removeEventListener('keydown', handler);
                document.removeEventListener('click', handler);
                resolve();
            }
            document.addEventListener('keydown', handler);
            document.addEventListener('click', handler);
        });

        Sound.commandEnter();
        bootScreen.classList.add('hidden');
    }

    async function nameScreen() {
        const nameScreen = document.getElementById('name-screen');
        const nameAscii = document.getElementById('name-ascii');
        const nameInput = document.getElementById('name-input');

        nameAscii.textContent = NAME_ASCII;
        nameScreen.classList.remove('hidden');
        nameInput.focus();

        return new Promise(resolve => {
            nameInput.addEventListener('keydown', function handler(e) {
                if (e.key === 'Enter') {
                    const name = nameInput.value.trim();
                    if (name.length > 0) {
                        nameInput.removeEventListener('keydown', handler);
                        Sound.commandEnter();
                        resolve(name);
                    }
                }
            });
        });
    }

    function startGame(isNew = true) {
        const nameScreenEl = document.getElementById('name-screen');
        const gameScreen = document.getElementById('game-screen');

        nameScreenEl.classList.add('hidden');
        gameScreen.classList.remove('hidden');

        // Initialize modules
        UI.init();
        Terminal.init((cmd) => Commands.execute(cmd));
        UI.updateHUD();
        Terminal.updatePrompt();
        Terminal.focus();

        // Welcome message
        Terminal.print('', '');
        Terminal.print('  ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██╗███╗   ███╗', 'text-accent');
        Terminal.print('  ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██║████╗ ████║', 'text-accent');
        Terminal.print('  ███████║███████║██║     █████╔╝ ███████╗██║██╔████╔██║', 'text-accent');
        Terminal.print('  ██╔══██║██╔══██║██║     ██╔═██╗ ╚════██║██║██║╚██╔╝██║', 'text-accent');
        Terminal.print('  ██║  ██║██║  ██║╚██████╗██║  ██╗███████║██║██║ ╚═╝ ██║', 'text-accent');
        Terminal.print('  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝     ╚═╝', 'text-accent');
        Terminal.print('', '');

        if (isNew) {
            Terminal.print(`  Bienvenido, ${GameState.getName()}.`, 'text-green');
            Terminal.print('  Tu aventura en el mundo del hacking comienza ahora.', 'text-dim');
            Terminal.print('', '');
            Terminal.print('  Escribe "tutorial" para una guía rápida.', 'text-warning');
            Terminal.print('  Escribe "missions" para ver misiones disponibles.', 'text-warning');
            Terminal.print('  Escribe "help" para ver todos los comandos.', 'text-warning');
            Terminal.print('', '');
            Terminal.print('  💡 Tu primera misión: compra un PortScanner en la "shop"', 'text-accent');
            Terminal.print('     y acepta la misión "tutorial" con: missions accept tutorial', 'text-accent');
        } else {
            Terminal.print(`  Bienvenido de vuelta, ${GameState.getName()}.`, 'text-green');
            Terminal.print(`  Nivel: ${GameState.getLevel()} | Rank: ${GameState.getRank()}`, 'text-dim');
            Terminal.print(`  Misiones completadas: ${GameState.getStat('missionsCompleted')}/15`, 'text-dim');
            Terminal.print('', '');
            Terminal.print('  Escribe "help" para ver comandos disponibles.', 'text-warning');

            const currentMission = GameState.getCurrentMission();
            if (currentMission) {
                const mission = Missions.getById(currentMission);
                Terminal.print(`  Misión activa: ${mission ? mission.name : currentMission}`, 'text-warning');
                Terminal.print('  Usa "missions objectives" para ver tu progreso.', 'text-warning');
            }
        }

        Terminal.print('', '');
        Terminal.printSeparator('═', 60, 'text-dim');
        Terminal.print('', '');
    }

    return {
        async init() {
            // Initialize sound (needs user interaction)
            Sound.init();

            // Initialize matrix rain
            UI.initMatrixRain();

            // Check for existing save
            const existingSave = GameState.load();

            if (existingSave) {
                // Skip boot, go straight to game
                document.getElementById('boot-screen').classList.add('hidden');
                document.getElementById('game-screen').classList.remove('hidden');
                startGame(false);
            } else {
                // Full boot sequence for new game
                await bootSequence();
                const name = await nameScreen();
                GameState.init(name);
                startGame(true);
            }
        }
    };
})();

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Main.init();
});
