window.api.onData((data) => {
  // CPU
  document.getElementById('cpu-text').textContent = `${data.cpu.toFixed(1)}%`;
  document.getElementById('cpu-bar').style.width = `${data.cpu}%`;

  // RAM
  const ramPercent = (data.ram.used / data.ram.total) * 100;
  document.getElementById('ram-text').textContent = `${ramPercent.toFixed(1)}%`;
  document.getElementById('ram-bar').style.width = `${ramPercent}%`;

  // Swap
  const swapPercent = data.swap.total > 0
    ? (data.swap.used / data.swap.total) * 100
    : 0;
  document.getElementById('swap-text').textContent = `${swapPercent.toFixed(1)}%`;
  document.getElementById('swap-bar').style.width = `${swapPercent}%`;

  // Red
  document.getElementById('rx').textContent = `${(data.net.rx / 1024).toFixed(1)} KB/s`;
  document.getElementById('tx').textContent = `${(data.net.tx / 1024).toFixed(1)} KB/s`;
});

window.appStats.onResourceData((data) => {
  // Actualizar los recursos de la aplicación
  document.getElementById('app-cpu').textContent = `CPU: ${data.cpuPercent}%`;
  document.getElementById('app-ram').textContent = `RAM: ${data.memMb} MB`;
  document.getElementById('app-uptime').textContent = `Uptime: ${data.uptimeSec}s`;
});
