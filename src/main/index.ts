const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    fullscreenable: true,
    simpleFullscreen: true,
    // icon: path.join(__dirname, '../../resources/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true
    }
  })
  mainWindow.maximize()

  ipcMain.on('get-printers', async (event) => {
    const printers = await mainWindow.webContents.getPrintersAsync()
    event.reply('get-printers', printers)
  })

  ipcMain.on('ipc-print', async (_, options) => {
    try {
      // Modify the ZPL code to include device name
      const zplCode = `
        ^XA 
        ^MMT
        ^PW400
        ^LL800  // Increased label length to 800 dots
        ^LS0 
        ^FO50,20  // Moved the starting position down to 150 dots
        ^A0N,50,50  // Increased font size to 60 dots
        ^FDProduct ${options.deviceName}^FS 
        ^FO80,30  // Moved down to 250 dots
        ^BQN,2,9  // QR code command. Format 2 specifies QR code, and the data is encoded as ASCII
        ^FDMM,AWhats up mother fuckers^FS  // MM: Mode - A: Alphanumeric. You can adjust the mode based on your data type.
        ^FO50,250  // Moved down to 450 dots
        ^A0N,35,35  // Increased font size to 40 dots
        ^FDPrice: $19.99^FS 
        ^XZ
      `

      // Write ZPL code to a temporary file
      const tmpFile = path.join(app.getPath('temp'), 'label.zpl')
      fs.writeFileSync(tmpFile, zplCode)

      // Get printer by name
      const printer = options.printers.find((p) => p.name === options.printerName)

      // Create a file stream for printing
      const printStream = fs.createReadStream(tmpFile)

      // Print the file stream
      await mainWindow.webContents.print({
        silent: true,
        printBackground: false,
        deviceName: options.printerName,
        pageSize: { width: printer.paperWidth, height: printer.paperHeight }
        // data: printStream
      })

      console.log('Print job completed successfully.')
    } catch (error) {
      console.error('Error occurred while printing:', error)
    }
  })

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.on('context-menu', () => {
    Menu.buildFromTemplate([
      {
        label: 'Toggle dev tools',
        click: () => {
          mainWindow.webContents.toggleDevTools()
        }
      }
    ]).popup({ window: mainWindow })
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
