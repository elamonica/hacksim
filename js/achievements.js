/* ============================================
   HackSim - Achievement System
   ============================================ */

const Achievements = (() => {
    const list = [
        {
            id: 'hello_world',
            name: 'Hello World',
            description: 'Completa el tutorial',
            icon: '🔓',
            check: () => GameState.isTutorialCompleted()
        },
        {
            id: 'port_hunter',
            name: 'Port Hunter',
            description: 'Escanea 10 servidores',
            icon: '🔍',
            check: () => GameState.getStat('portsScanned') >= 10
        },
        {
            id: 'key_master',
            name: 'Key Master',
            description: 'Crackea 5 passwords',
            icon: '🔑',
            check: () => GameState.getStat('passwordsCracked') >= 5
        },
        {
            id: 'sql_ninja',
            name: 'SQL Ninja',
            description: 'Completa una SQL injection',
            icon: '💉',
            check: () => GameState.getStat('sqlInjections') >= 1
        },
        {
            id: 'social_butterfly',
            name: 'Social Butterfly',
            description: 'Completa la misión de ingeniería social',
            icon: '🎭',
            check: () => GameState.isMissionCompleted('social_engineering')
        },
        {
            id: 'wall_breaker',
            name: 'Wall Breaker',
            description: 'Bypasea 3 firewalls',
            icon: '🛡️',
            check: () => GameState.getStat('firewallsBypassed') >= 3
        },
        {
            id: 'crypto_rich',
            name: 'Crypto Rich',
            description: 'Acumula 5000 ₿TC en total',
            icon: '💰',
            check: () => GameState.getStat('totalCreditsEarned') >= 5000
        },
        {
            id: 'no_hints',
            name: 'Solo Player',
            description: 'Completa 3 misiones sin usar hints',
            icon: '🎯',
            // Tracked via mission completion with hintsUsed counter
            check: () => {
                const completed = GameState.getCompletedMissions();
                return completed.length >= 3 && GameState.getStat('hintsUsed') === 0;
            }
        },
        {
            id: 'ghost',
            name: 'Ghost',
            description: 'Completa 3 misiones con VPN activo',
            icon: '👻',
            check: () => GameState.getStat('vpnMissions') >= 3
        },
        {
            id: 'five_missions',
            name: 'Rising Star',
            description: 'Completa 5 misiones',
            icon: '⭐',
            check: () => GameState.getStat('missionsCompleted') >= 5
        },
        {
            id: 'ten_missions',
            name: 'Veteran Hacker',
            description: 'Completa 10 misiones',
            icon: '🏅',
            check: () => GameState.getStat('missionsCompleted') >= 10
        },
        {
            id: 'elite_hacker',
            name: 'Elite Hacker',
            description: 'Completa todas las misiones',
            icon: '🏆',
            check: () => GameState.getStat('missionsCompleted') >= 15
        },
        {
            id: 'shopaholic',
            name: 'Shopaholic',
            description: 'Compra 5 herramientas',
            icon: '🛒',
            check: () => GameState.getTools().length >= 5
        },
        {
            id: 'fully_loaded',
            name: 'Fully Loaded',
            description: 'Compra 10 herramientas',
            icon: '🎒',
            check: () => GameState.getTools().length >= 10
        },
        {
            id: 'command_master',
            name: 'Command Master',
            description: 'Ejecuta 100 comandos',
            icon: '⌨️',
            check: () => GameState.getStat('commandsExecuted') >= 100
        }
    ];

    return {
        getAll() {
            return list.map(a => ({
                ...a,
                unlocked: GameState.hasAchievement(a.id)
            }));
        },

        // Check all achievements and unlock new ones
        checkAll() {
            const newlyUnlocked = [];
            for (const achievement of list) {
                if (!GameState.hasAchievement(achievement.id) && achievement.check()) {
                    if (GameState.addAchievement(achievement.id)) {
                        newlyUnlocked.push(achievement);
                        UI.showAchievement(achievement.icon, achievement.name);
                        UI.toast(`🏆 Logro: ${achievement.name}`, 'achievement');
                    }
                }
            }
            return newlyUnlocked;
        },

        displayAchievements() {
            const all = this.getAll();
            const lines = [];

            lines.push('');
            lines.push('  ╔══════════════════════════════════════════════════╗');
            lines.push('  ║              🏆  LOGROS  🏆                     ║');
            lines.push('  ╠══════════════════════════════════════════════════╣');

            const unlocked = all.filter(a => a.unlocked);
            const locked = all.filter(a => !a.unlocked);

            if (unlocked.length > 0) {
                lines.push('  ║  DESBLOQUEADOS:                                 ║');
                unlocked.forEach(a => {
                    const name = `${a.icon} ${a.name}`.padEnd(25);
                    lines.push(`  ║  ✅ ${name} ${a.description.substring(0, 22).padEnd(22)}║`);
                });
            }

            if (locked.length > 0) {
                lines.push('  ╠══════════════════════════════════════════════════╣');
                lines.push('  ║  BLOQUEADOS:                                    ║');
                locked.forEach(a => {
                    const name = '???'.padEnd(25);
                    lines.push(`  ║  🔒 ${name} ${a.description.substring(0, 22).padEnd(22)}║`);
                });
            }

            lines.push('  ╠══════════════════════════════════════════════════╣');
            lines.push(`  ║  Progreso: ${unlocked.length}/${all.length} logros desbloqueados`.padEnd(51) + '║');
            lines.push('  ╚══════════════════════════════════════════════════╝');

            return lines;
        }
    };
})();
