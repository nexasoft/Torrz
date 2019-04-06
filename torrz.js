"use strict";

const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

require(path.join(__dirname, 'server.js'))

let win;

function createWindow (){
  win = new BrowserWindow({
    backgroundColor: '#FFFFFF',
    width: 800, 
    height: 600,
    titleBarStyle: 'hiddenInset',
    frame: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: './preload.js'
  }})

  win.webContents.openDevTools()

  win.setMenu(null)

  win.loadURL(url.format({
    /* pathname: path.join(__dirname, 'index.html'), */
    pathname: 'localhost:1922/index.html',
    protocol: 'http:',
    slashes: true
  }))

  win.on('closed', function () {
    win = null
  })
  
  win.once('ready-to-show', () => {
    win.show()
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