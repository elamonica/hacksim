/* ============================================
   HackSim - UI Manager (HUD, Toasts, Overlays)
   ============================================ */

const UI = (() => {
    // DOM elements cache
    let els = {};

    return {
        init() {
            els = {
                hudName: document.getElementById('hud-name'),
                hudLevel: document.getElementById('hud-level'),
                hudRank: document.getElementById('hud-rank'),
                hudCredits: document.getElementById('hud-credits'),
                hudMission: document.getElementById('hud-mission'),
                xpBar: document.getElementById('xp-bar'),
                xpText: document.getElementById('xp-text'),
                toastContainer: document.getElementById('toast-container'),
                levelupOverlay: document.getElementById('levelup-overlay'),
                levelupAscii: document.getElementById('levelup-ascii'),
                levelupInfo: document.getElementById('levelup-info'),
                achievementOverlay: document.getElementById('achievement-overlay'),
                achievementIcon: document.getElementById('achievement-icon'),
                achievementText: document.getElementById('achievement-text')
            };
        },

        updateHUD() {
            const state = GameState.get();
            if (!state) return;

            els.hudName.textContent = state.name;
            els.hudLevel.textContent = state.level;
            els.hudRank.textContent = GameState.getRank();
            els.hudCredits.textContent = `${state.credits.toLocaleString()} ₿TC`;

            // XP bar
            const xp = GameState.getXPProgress();
            els.xpBar.style.width = xp.percent + '%';
            els.xpText.textContent = `${xp.current}/${xp.total}`;

            // Mission status
            if (state.currentMission) {
                const mission = typeof Missions !== 'undefined' ? Missions.getById(state.currentMission) : null;
                els.hudMission.textContent = mission ? `[${mission.name}]` : `[Misión activa]`;
                els.hudMission.className = 'text-warning';
            } else {
                els.hudMission.textContent = 'Sin misión';
                els.hudMission.className = 'text-accent';
            }
        },

        // Toast notifications
        toast(message, type = 'default', duration = 3500) {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            toast.style.animationDuration = `0.3s, 0.3s`;
            toast.style.animationDelay = `0s, ${duration / 1000}s`;
            els.toastContainer.appendChild(toast);
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, duration + 500);
        },

        // Level Up overlay
        showLevelUp(level, rank) {
            const ascii = [
                '  ██╗     ███████╗██╗   ██╗███████╗██╗          ',
                '  ██║     ██╔════╝██║   ██║██╔════╝██║          ',
                '  ██║     █████╗  ██║   ██║█████╗  ██║          ',
                '  ██║     ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║          ',
                '  ███████╗███████╗ ╚████╔╝ ███████╗███████╗     ',
                '  ╚══════╝╚══════╝  ╚═══╝  ╚══════╝╚══════╝     ',
                '       ██╗   ██╗██████╗ ██╗                       ',
                '       ██║   ██║██╔══██╗██║                       ',
                '       ██║   ██║██████╔╝██║                       ',
                '       ██║   ██║██╔═══╝ ╚═╝                       ',
                '       ╚██████╔╝██║     ██╗                       ',
                '        ╚═════╝ ╚═╝     ╚═╝                       '
            ].join('\n');

            els.levelupAscii.textContent = ascii;
            els.levelupInfo.innerHTML = `<span class="text-accent">Nivel ${level}</span> - <span class="text-warning">${rank}</span>`;

            els.levelupOverlay.classList.remove('hidden');

            // Add glitch
            const h2 = els.levelupOverlay.querySelector('h2');
            h2.classList.add('glitch-active');

            Sound.levelUp();

            setTimeout(() => {
                h2.classList.remove('glitch-active');
                els.levelupOverlay.classList.add('hidden');
            }, 3000);
        },

        // Achievement popup
        showAchievement(icon, name) {
            els.achievementIcon.textContent = icon;
            els.achievementText.innerHTML = `LOGRO DESBLOQUEADO: <strong>${name}</strong>`;
            els.achievementOverlay.classList.remove('hidden');

            Sound.achievement();

            setTimeout(() => {
                els.achievementOverlay.classList.add('hidden');
            }, 4000);
        },

        // Matrix rain background
        initMatrixRain() {
            const canvas = document.getElementById('matrix-bg');
            const ctx = canvas.getContext('2d');

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/\\{}[]();:=+-*&^%$#@!';
            const fontSize = 14;
            let columns = Math.floor(canvas.width / fontSize);
            let drops = new Array(columns).fill(1);

            function draw() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#00ff41';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }

                // Recalculate columns on resize
                const newCols = Math.floor(canvas.width / fontSize);
                if (newCols !== columns) {
                    columns = newCols;
                    drops = new Array(columns).fill(1);
                }
            }

            setInterval(draw, 50);
        }
    };
})();
