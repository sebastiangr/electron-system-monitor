const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const si = require('systeminformation');
const pidusage = require('pidusage');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false, // ❌ Sin barra del sistema
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

ipcMain.on('window-control', (event, action) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  if (action === 'minimize') win.minimize();
  else if (action === 'maximize') win.isMaximized() ? win.unmaximize() : win.maximize();
  else if (action === 'close') win.close();
});

app.whenReady().then(() => {
  createWindow();

  setInterval(async () => {
    try {
      const cpu = await si.currentLoad();
      const mem = await si.mem();
      const net = await si.networkStats();

      mainWindow.webContents.send('system-data', {
        cpu: cpu.currentLoad,
        ram: {
          used: mem.used,
          total: mem.total
        },
        swap: {
          used: mem.swapused,
          total: mem.swaptotal
        },
        net: {
          rx: net[0].rx_sec,
          tx: net[0].tx_sec
        }
      });
    } catch (err) {
      console.error("Error al obtener datos del sistema:", err);
    }
  }, 1000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Muestra en la consola el uso de memoria cada 5 segundos
// setInterval(() => {
//   const mem = process.memoryUsage();
//   console.log(`RSS: ${(mem.rss / 1024 / 1024).toFixed(2)} MB`);
// }, 5000);

setInterval(() => {
  pidusage(process.pid)
    .then((stats) => {
      const memMb = (stats.memory / 1024 / 1024).toFixed(1); // RAM usada
      const cpuPercent = stats.cpu.toFixed(1); // CPU %
      const uptimeSec = process.uptime().toFixed(0); // Tiempo desde inicio

      mainWindow.webContents.send('app-resource-data', {
        memMb,
        cpuPercent,
        uptimeSec
      });
    })
    .catch(console.error);
}, 2000);