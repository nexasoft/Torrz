'use strict';

const { app, BrowserWindow } = require('electron')
const path = require('path')

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600, webPreferences: {
    contextIsolation: true,
    webSecurity: true,
    nodeIntegration: true
  }})

  win.webContents.openDevTools()

  win.setMenu(null)

  // and load the index.html of the app.
  win.loadURL("file:///"+__dirname+'/index.html')

  win.on('closed', function () {
    win = null
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})