/* ============================================
   HackSim - Game State Manager
   ============================================ */

const GameState = (() => {
    const STORAGE_KEY = 'hacksim_save';

    const RANKS = [
        { name: 'Newbie', minLevel: 1 },
        { name: 'Script Kiddie', minLevel: 3 },
        { name: 'Hacker', minLevel: 6 },
        { name: 'Elite Hacker', minLevel: 9 },
        { name: 'Cyber Ghost', minLevel: 12 },
        { name: 'Legendary', minLevel: 15 }
    ];

    const XP_TABLE = [
        0,     // Level 1
        100,   // Level 2
        250,   // Level 3
        450,   // Level 4
        700,   // Level 5
        1000,  // Level 6
        1400,  // Level 7
        1900,  // Level 8
        2500,  // Level 9
        3200,  // Level 10
        4000,  // Level 11
        5000,  // Level 12
        6200,  // Level 13
        7600,  // Level 14
        9999   // Level 15 (max)
    ];

    let state = null;

    function createNewState(name) {
        return {
            name: name || 'guest',
            level: 1,
            xp: 0,
            xpToNext: XP_TABLE[1],
            credits: 50,
            reputation: 0,
            tools: [],
            completedMissions: [],
            currentMission: null,
            missionState: null,
            achievements: [],
            stats: {
                missionsCompleted: 0,
                passwordsCracked: 0,
                systemsHacked: 0,
                portsScanned: 0,
                sqlInjections: 0,
                firewallsBypassed: 0,
                hintsUsed: 0,
                commandsExecuted: 0,
                totalCreditsEarned: 50,
                timePlayed: 0,
                startTime: Date.now()
            },
            connectedTo: null,
            currentPath: '/',
            vpnActive: false,
            unlockedCommands: ['help', 'clear', 'status', 'missions', 'shop', 'inventory', 'achievements', 'connect', 'disconnect', 'tutorial', 'sound', 'reset', 'ls', 'cat', 'cd', 'whoami', 'kids', 'explain'],
            tutorialCompleted: false,
            settings: {
                soundEnabled: true,
                typingEffect: true,
                kidsMode: false
            },
            version: 1
        };
    }

    return {
        init(name) {
            state = createNewState(name);
            this.save();
            return state;
        },

        load() {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    state = JSON.parse(saved);
                    return state;
                }
            } catch (e) {
                console.warn('Failed to load save:', e);
            }
            return null;
        },

        save() {
            if (!state) return;
            try {
                state.stats.timePlayed = Date.now() - state.stats.startTime;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (e) {
                console.warn('Failed to save:', e);
            }
        },

        reset() {
            localStorage.removeItem(STORAGE_KEY);
            state = null;
        },

        hasSave() {
            return localStorage.getItem(STORAGE_KEY) !== null;
        },

        get() {
            return state;
        },

        // Name
        getName() { return state ? state.name : 'guest'; },

        // Credits
        getCredits() { return state ? state.credits : 0; },
        addCredits(amount) {
            if (!state) return;
            state.credits += amount;
            state.stats.totalCreditsEarned += amount;
            this.save();
            if (typeof UI !== 'undefined') UI.updateHUD();
        },
        spendCredits(amount) {
            if (!state || state.credits < amount) return false;
            state.credits -= amount;
            this.save();
            if (typeof UI !== 'undefined') UI.updateHUD();
            return true;
        },

        // XP & Levels
        getLevel() { return state ? state.level : 1; },
        addXP(amount) {
            if (!state) return { leveledUp: false };
            state.xp += amount;
            let leveledUp = false;
            let newLevel = state.level;

            while (state.level < XP_TABLE.length && state.xp >= XP_TABLE[state.level]) {
                state.level++;
                leveledUp = true;
                newLevel = state.level;
            }

            state.xpToNext = state.level < XP_TABLE.length ? XP_TABLE[state.level] : state.xp;
            this.save();
            if (typeof UI !== 'undefined') UI.updateHUD();
            return { leveledUp, newLevel };
        },
        getXPProgress() {
            if (!state) return { current: 0, needed: 100, percent: 0 };
            const prevXP = state.level > 1 ? XP_TABLE[state.level - 1] : 0;
            const nextXP = state.level < XP_TABLE.length ? XP_TABLE[state.level] : state.xp;
            const current = state.xp - prevXP;
            const needed = nextXP - prevXP;
            const percent = needed > 0 ? Math.min(100, (current / needed) * 100) : 100;
            return { current: state.xp, total: nextXP, percent };
        },

        getRank() {
            if (!state) return 'Newbie';
            let rank = RANKS[0].name;
            for (const r of RANKS) {
                if (state.level >= r.minLevel) rank = r.name;
            }
            return rank;
        },

        // Tools
        hasTool(toolId) {
            return state ? state.tools.includes(toolId) : false;
        },
        addTool(toolId) {
            if (!state || state.tools.includes(toolId)) return;
            state.tools.push(toolId);
            this.save();
        },
        getTools() {
            return state ? [...state.tools] : [];
        },

        // Commands
        hasCommand(cmd) {
            return state ? state.unlockedCommands.includes(cmd) : false;
        },
        unlockCommand(cmd) {
            if (!state || state.unlockedCommands.includes(cmd)) return;
            state.unlockedCommands.push(cmd);
            this.save();
        },

        // Missions
        getCurrentMission() { return state ? state.currentMission : null; },
        getMissionState() { return state ? state.missionState : null; },
        setCurrentMission(missionId, missionState) {
            if (!state) return;
            state.currentMission = missionId;
            state.missionState = missionState || {};
            this.save();
            if (typeof UI !== 'undefined') UI.updateHUD();
        },
        updateMissionState(updates) {
            if (!state || !state.missionState) return;
            Object.assign(state.missionState, updates);
            this.save();
        },
        completeMission(missionId) {
            if (!state) return;
            if (!state.completedMissions.includes(missionId)) {
                state.completedMissions.push(missionId);
                state.stats.missionsCompleted++;
            }
            state.currentMission = null;
            state.missionState = null;
            state.connectedTo = null;
            state.currentPath = '/';
            this.save();
            if (typeof UI !== 'undefined') UI.updateHUD();
        },
        isMissionCompleted(missionId) {
            return state ? state.completedMissions.includes(missionId) : false;
        },
        getCompletedMissions() {
            return state ? [...state.completedMissions] : [];
        },

        // Connection
        getConnectedTo() { return state ? state.connectedTo : null; },
        setConnectedTo(ip) {
            if (!state) return;
            state.connectedTo = ip;
            state.currentPath = '/';
            this.save();
        },
        getCurrentPath() { return state ? state.currentPath : '/'; },
        setCurrentPath(path) {
            if (!state) return;
            state.currentPath = path;
            this.save();
        },

        // Kids Mode
        isKidsMode() {
            return state ? (state.settings && state.settings.kidsMode) : false;
        },
        setKidsMode(val) {
            if (!state) return;
            if (!state.settings) state.settings = {};
            state.settings.kidsMode = val;
            this.save();
        },

        // VPN
        isVPNActive() { return state ? state.vpnActive : false; },
        setVPN(active) {
            if (!state) return;
            state.vpnActive = active;
            this.save();
        },

        // Achievements
        hasAchievement(id) {
            return state ? state.achievements.includes(id) : false;
        },
        addAchievement(id) {
            if (!state || state.achievements.includes(id)) return false;
            state.achievements.push(id);
            this.save();
            return true;
        },
        getAchievements() {
            return state ? [...state.achievements] : [];
        },

        // Stats
        incrementStat(stat, amount = 1) {
            if (!state || !state.stats.hasOwnProperty(stat)) return;
            state.stats[stat] += amount;
            this.save();
        },
        getStat(stat) {
            return state && state.stats.hasOwnProperty(stat) ? state.stats[stat] : 0;
        },
        getStats() {
            return state ? { ...state.stats } : {};
        },

        // Tutorial
        isTutorialCompleted() { return state ? state.tutorialCompleted : false; },
        setTutorialCompleted() {
            if (!state) return;
            state.tutorialCompleted = true;
            this.save();
        },

        // Prompt
        getPrompt() {
            if (!state) return 'guest@hacknet:~$ ';
            const name = state.name;
            if (state.connectedTo) {
                return `${name}@${state.connectedTo}:${state.currentPath}$ `;
            }
            return `${name}@hacknet:~$ `;
        }
    };
})();
