"use strict";

const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const Menu = require('electron').Menu

/*require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});*/

let win;

function createWindow (){

  win = new BrowserWindow({
    width: 800, 
    height: 600,
    titleBarStyle: 'hiddenInset',
    frame: true,
    transparent: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      preload: './preload.js'
    }
  })

  win.webContents.openDevTools()

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', function () {
    win = null
  })
  
  
  win.webContents.on('did-finish-load', function() {
    win.show();
  });
}

app.on('ready', function(){
  setTimeout(function() {
    createWindow();
  }, 10);
})

var template = [{
    label: "Torrz",
    submenu: [
        { label: "About Torrz", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));

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