const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: 'HackSim',
        backgroundColor: '#0a0a0a',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile('index.html');
    win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => app.quit());

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
