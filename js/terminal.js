/* ============================================
   HackSim - Terminal Engine
   ============================================ */

const Terminal = (() => {
    let outputEl = null;
    let inputEl = null;
    let promptEl = null;
    let cursorEl = null;
    let history = [];
    let historyIndex = -1;
    let commandHandler = null;
    let inputLocked = false;
    let typingQueue = [];
    let isTyping = false;

    function scrollToBottom() {
        if (outputEl) {
            outputEl.scrollTop = outputEl.scrollHeight;
        }
    }

    function updateCursorPosition() {
        if (!inputEl || !cursorEl) return;
        const text = inputEl.value;
        const pos = inputEl.selectionStart || 0;
        // Measure text width using a temporary span
        const measure = document.createElement('span');
        measure.style.font = getComputedStyle(inputEl).font;
        measure.style.visibility = 'hidden';
        measure.style.position = 'absolute';
        measure.style.whiteSpace = 'pre';
        measure.textContent = text.substring(0, pos);
        document.body.appendChild(measure);
        const width = measure.offsetWidth;
        document.body.removeChild(measure);
        cursorEl.style.left = width + 'px';
    }

    function processQueue() {
        if (isTyping || typingQueue.length === 0) return;
        const next = typingQueue.shift();
        if (next.type === 'print') {
            addLine(next.text, next.cssClass);
            processQueue();
        } else if (next.type === 'typed') {
            typeText(next.text, next.cssClass, next.speed, () => {
                processQueue();
            });
        } else if (next.type === 'callback') {
            next.fn();
            processQueue();
        } else if (next.type === 'delay') {
            setTimeout(processQueue, next.ms);
        }
    }

    function addLine(text, cssClass = '') {
        const line = document.createElement('div');
        line.className = 'line';
        if (cssClass) {
            // Support HTML if cssClass is '__html__'
            if (cssClass === '__html__') {
                line.innerHTML = text;
            } else {
                line.className = `line ${cssClass}`;
                line.textContent = text;
            }
        } else {
            line.textContent = text;
        }
        outputEl.appendChild(line);
        scrollToBottom();
    }

    function typeText(text, cssClass, speed = 20, callback) {
        isTyping = true;
        inputLocked = true;
        const line = document.createElement('div');
        line.className = cssClass ? `line ${cssClass}` : 'line';
        outputEl.appendChild(line);

        let i = 0;
        function tick() {
            if (i < text.length) {
                line.textContent += text[i];
                i++;
                Sound.typeTick();
                scrollToBottom();
                setTimeout(tick, speed);
            } else {
                isTyping = false;
                inputLocked = false;
                if (callback) callback();
            }
        }
        tick();
    }

    return {
        init(onCommand) {
            outputEl = document.getElementById('terminal-output');
            inputEl = document.getElementById('terminal-input');
            promptEl = document.getElementById('prompt-text');
            cursorEl = document.getElementById('cursor');
            commandHandler = onCommand;

            // Input events
            inputEl.addEventListener('keydown', (e) => {
                if (inputLocked) {
                    e.preventDefault();
                    return;
                }

                if (e.key === 'Enter') {
                    e.preventDefault();
                    const cmd = inputEl.value.trim();
                    if (cmd) {
                        history.push(cmd);
                        historyIndex = history.length;
                        // Echo command
                        Terminal.print(`${GameState.getPrompt()}${cmd}`, 'text-accent');
                        inputEl.value = '';
                        updateCursorPosition();
                        Sound.commandEnter();
                        GameState.incrementStat('commandsExecuted');
                        if (commandHandler) commandHandler(cmd);
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (historyIndex > 0) {
                        historyIndex--;
                        inputEl.value = history[historyIndex];
                        updateCursorPosition();
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (historyIndex < history.length - 1) {
                        historyIndex++;
                        inputEl.value = history[historyIndex];
                    } else {
                        historyIndex = history.length;
                        inputEl.value = '';
                    }
                    updateCursorPosition();
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    // Basic tab completion
                    if (typeof Commands !== 'undefined') {
                        const partial = inputEl.value;
                        const match = Commands.autocomplete(partial);
                        if (match) {
                            inputEl.value = match;
                            updateCursorPosition();
                        }
                    }
                } else {
                    // Key click sound
                    if (e.key.length === 1) Sound.keyClick();
                }
            });

            inputEl.addEventListener('input', updateCursorPosition);
            inputEl.addEventListener('click', updateCursorPosition);

            // Keep focus on input
            document.addEventListener('click', (e) => {
                const gameScreen = document.getElementById('game-screen');
                if (gameScreen && !gameScreen.classList.contains('hidden')) {
                    if (!e.target.closest('#name-input')) {
                        inputEl.focus();
                    }
                }
            });

            updateCursorPosition();
        },

        focus() {
            if (inputEl) inputEl.focus();
        },

        // Print a line immediately
        print(text, cssClass = '') {
            addLine(text, cssClass);
        },

        // Print HTML content
        printHTML(html) {
            addLine(html, '__html__');
        },

        // Print multiple lines
        printLines(lines, cssClass = '') {
            lines.forEach(line => addLine(line, cssClass));
        },

        // Print with typing effect
        typeprint(text, cssClass = '', speed = 20) {
            return new Promise((resolve) => {
                typingQueue.push({ type: 'typed', text, cssClass, speed });
                typingQueue.push({ type: 'callback', fn: resolve });
                processQueue();
            });
        },

        // Queue a delay
        delay(ms) {
            return new Promise((resolve) => {
                typingQueue.push({ type: 'delay', ms });
                typingQueue.push({ type: 'callback', fn: resolve });
                processQueue();
            });
        },

        // Print empty line
        newline() {
            addLine('');
        },

        // Clear terminal
        clear() {
            if (outputEl) outputEl.innerHTML = '';
        },

        // Update prompt text
        updatePrompt() {
            if (promptEl) {
                promptEl.textContent = GameState.getPrompt();
            }
        },

        // Lock/unlock input
        lock() { inputLocked = true; },
        unlock() { inputLocked = false; },
        isLocked() { return inputLocked; },

        // Simulate progressive output (like scan, crack)
        async progressOutput(lines, interval = 100) {
            inputLocked = true;
            for (const line of lines) {
                if (typeof line === 'object') {
                    addLine(line.text, line.css || '');
                    if (line.sound) {
                        if (typeof Sound[line.sound] === 'function') Sound[line.sound]();
                    }
                    await new Promise(r => setTimeout(r, line.delay || interval));
                } else {
                    addLine(line);
                    await new Promise(r => setTimeout(r, interval));
                }
            }
            inputLocked = false;
        },

        // Animated progress bar
        async showProgress(label, duration = 2000, steps = 20) {
            inputLocked = true;
            const line = document.createElement('div');
            line.className = 'line';
            outputEl.appendChild(line);

            for (let i = 0; i <= steps; i++) {
                const pct = Math.round((i / steps) * 100);
                const filled = Math.round((i / steps) * 30);
                const empty = 30 - filled;
                const bar = '█'.repeat(filled) + '░'.repeat(empty);
                line.innerHTML = `<span class="text-dim">${label}</span> <span class="text-green">[${bar}]</span> <span class="text-accent">${pct}%</span>`;
                scrollToBottom();
                Sound.hackTick();
                await new Promise(r => setTimeout(r, duration / steps));
            }
            inputLocked = false;
        },

        // Print ASCII art box
        printBox(title, lines, color = 'text-accent') {
            const maxLen = Math.max(title.length + 4, ...lines.map(l => l.length)) + 4;
            const border = '═'.repeat(maxLen);
            this.print(`╔${border}╗`, color);
            this.print(`║  ${title.padEnd(maxLen - 2)}║`, color);
            this.print(`╠${border}╣`, color);
            lines.forEach(l => {
                this.print(`║  ${l.padEnd(maxLen - 2)}║`, color);
            });
            this.print(`╚${border}╝`, color);
        },

        // Print separator
        printSeparator(char = '─', length = 60, cssClass = 'text-dim') {
            this.print(char.repeat(length), cssClass);
        }
    };
})();
