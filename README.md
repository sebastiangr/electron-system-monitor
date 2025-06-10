# Electron System Monitor

A lightweight system monitor for Linux made with Node.js and Electron.
It shows the CPU, RAM, Swap and Net use in realtime.
A personal excersise to learn Electron and Node.js.

![screenshot](./assets/screenshots/preview.png)

## Techs

- [Electron](https://www.electronjs.org/) - Build cross-platform desktop apps with web technologies
- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [systeminformation](https://systeminformation.io/) - A Node.js module to retrieve system and hardware information
- Vanilla JS + HTML + CSS

## Current features

- CPU usage
- RAM usage
- Swap usage
- Net usage (in/out)
- App system CPU, RAM and Usage in realtime.

## Installation

```bash
# Clone the repository
git clone https://github.com/sebastiangr/electron-system-monitor.git
cd electron-system-monitor

# Install dependencies
npm install

# Start the app
npm start
