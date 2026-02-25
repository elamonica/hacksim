/* ============================================
   HackSim - Sound System (Web Audio API)
   ============================================ */

const Sound = (() => {
    let ctx = null;
    let enabled = true;
    let volume = 0.3;

    function getCtx() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return ctx;
    }

    function playTone(freq, duration, type = 'square', vol = volume) {
        if (!enabled) return;
        try {
            const c = getCtx();
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, c.currentTime);
            gain.gain.setValueAtTime(vol, c.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(c.currentTime);
            osc.stop(c.currentTime + duration);
        } catch (e) { /* silent fail */ }
    }

    function playSequence(notes, interval = 0.1) {
        if (!enabled) return;
        try {
            const c = getCtx();
            notes.forEach((note, i) => {
                const osc = c.createOscillator();
                const gain = c.createGain();
                osc.type = note.type || 'square';
                osc.frequency.setValueAtTime(note.freq, c.currentTime + i * interval);
                gain.gain.setValueAtTime(note.vol || volume, c.currentTime + i * interval);
                gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * interval + (note.dur || 0.1));
                osc.connect(gain);
                gain.connect(c.destination);
                osc.start(c.currentTime + i * interval);
                osc.stop(c.currentTime + i * interval + (note.dur || 0.15));
            });
        } catch (e) { /* silent fail */ }
    }

    return {
        init() {
            // Will be initialized on first user interaction
            document.addEventListener('click', () => getCtx(), { once: true });
            document.addEventListener('keydown', () => getCtx(), { once: true });
        },

        toggle() {
            enabled = !enabled;
            return enabled;
        },

        setVolume(v) {
            volume = Math.max(0, Math.min(1, v));
        },

        // Key press click
        keyClick() {
            playTone(800 + Math.random() * 400, 0.03, 'square', volume * 0.15);
        },

        // Command entered
        commandEnter() {
            playSequence([
                { freq: 600, dur: 0.05 },
                { freq: 900, dur: 0.05 }
            ], 0.06);
        },

        // Hacking progress
        hackTick() {
            playTone(200 + Math.random() * 600, 0.05, 'sawtooth', volume * 0.1);
        },

        // Scan beep
        scanBeep() {
            playTone(1200, 0.08, 'sine', volume * 0.2);
        },

        // Error
        error() {
            playSequence([
                { freq: 300, dur: 0.15, type: 'sawtooth' },
                { freq: 200, dur: 0.2, type: 'sawtooth' }
            ], 0.15);
        },

        // Success / mission complete
        success() {
            playSequence([
                { freq: 523, dur: 0.12, type: 'square' },
                { freq: 659, dur: 0.12, type: 'square' },
                { freq: 784, dur: 0.12, type: 'square' },
                { freq: 1047, dur: 0.25, type: 'square' }
            ], 0.13);
        },

        // Level up
        levelUp() {
            playSequence([
                { freq: 440, dur: 0.1, type: 'square' },
                { freq: 554, dur: 0.1, type: 'square' },
                { freq: 659, dur: 0.1, type: 'square' },
                { freq: 880, dur: 0.1, type: 'square' },
                { freq: 1109, dur: 0.1, type: 'square' },
                { freq: 1319, dur: 0.3, type: 'square' }
            ], 0.1);
        },

        // Achievement unlock
        achievement() {
            playSequence([
                { freq: 880, dur: 0.1, type: 'sine' },
                { freq: 1100, dur: 0.1, type: 'sine' },
                { freq: 1320, dur: 0.2, type: 'sine' },
                { freq: 1760, dur: 0.3, type: 'sine' }
            ], 0.12);
        },

        // Shop purchase
        purchase() {
            playSequence([
                { freq: 600, dur: 0.08, type: 'square' },
                { freq: 800, dur: 0.08, type: 'square' },
                { freq: 1000, dur: 0.15, type: 'square' }
            ], 0.08);
        },

        // Alert / detection warning
        alert() {
            playSequence([
                { freq: 800, dur: 0.15, type: 'sawtooth' },
                { freq: 400, dur: 0.15, type: 'sawtooth' },
                { freq: 800, dur: 0.15, type: 'sawtooth' },
                { freq: 400, dur: 0.15, type: 'sawtooth' }
            ], 0.18);
        },

        // Boot beep
        bootBeep() {
            playTone(1000, 0.15, 'square', volume * 0.3);
        },

        // Connect sound
        connect() {
            playSequence([
                { freq: 400, dur: 0.1, type: 'sine' },
                { freq: 600, dur: 0.1, type: 'sine' },
                { freq: 800, dur: 0.15, type: 'sine' }
            ], 0.1);
        },

        // Disconnect sound
        disconnect() {
            playSequence([
                { freq: 800, dur: 0.1, type: 'sine' },
                { freq: 600, dur: 0.1, type: 'sine' },
                { freq: 400, dur: 0.15, type: 'sine' }
            ], 0.1);
        },

        // Typing effect for boot/narrative
        typeTick() {
            playTone(600 + Math.random() * 200, 0.02, 'square', volume * 0.08);
        }
    };
})();
