const { app, BrowserWindow } = require('electron')
var path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600, title: 'WhatsApp Linux (unofficial)', icon: path.join(__dirname, 'icons/logo256x256.png') })

    //Prevent windows title from changing
    win.on('page-title-updated', (evt) => {
        evt.preventDefault();
    });


    //Hide Default menubar
    win.setMenu(null);

    // and load the index.html of the app.
    win.loadURL('https://web.whatsapp.com')
        //win.loadURL('file://' + __dirname+ '/index.html')

    win.setTitle('WhatsApp Linux (unofficial)')

    // Open the DevTools.
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    win.webContents.on('new-window', (event, url) => {
        event.preventDefault()
        require("electron").shell.openExternal(url);
    })
}




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})