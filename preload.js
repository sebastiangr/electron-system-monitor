const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  onData: (callback) => ipcRenderer.on('system-data', (_, data) => callback(data)),
  minimize: () => ipcRenderer.send('window-control', 'minimize'),
  maximize: () => ipcRenderer.send('window-control', 'maximize'),
  close: () => ipcRenderer.send('window-control', 'close'),
});

contextBridge.exposeInMainWorld('appStats', {
  onResourceData: (callback) => {
    ipcRenderer.on('app-resource-data', (_, data) => {
      callback(data);
    });
  }
});
