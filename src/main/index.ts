import { app, BrowserWindow, ipcMain, IpcMainEvent, Menu, WebContentsPrintOptions } from 'electron'
import path, { join } from 'node:path'
import { exec } from 'child_process'
import { promisify } from 'util'

// import icon from '../../resources/icon.png'
import { spawn } from 'child_process'
import fs from 'fs'

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    fullscreenable: true,
    simpleFullscreen: true,
    // icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true
    }
  })
  mainWindow.maximize()
  // mainWindow.webContents.openDevTools()

  ipcMain.on('get-printers', async (event: IpcMainEvent) => {
    const printers = await mainWindow.webContents.getPrintersAsync()
    event.reply('get-printers', printers)
  })

  ipcMain.on('ipc-print', async (_, options: WebContentsPrintOptions) => {
    const execAsync = promisify(exec)

    async function printZPL(printerName, zplCode, numCopies) {
      try {
        // Open the printer
        const openCommand = `rundll32.exe PRINTUI.DLL,PrintUIEntry /y /n "${printerName}"`
        await execAsync(openCommand)

        // Start print jobs
        for (let i = 0; i < numCopies; i++) {
          const jobName = `ZPL Label - Copy ${i + 1}`
          const startJobCommand = `CMD /C echo ${zplCode} | powershell -Command "& { Out-Printer -Name '${printerName}' }"`
          await execAsync(startJobCommand)
        }

        console.log('Print job completed successfully.')
      } catch (error) {
        console.error('Error occurred while printing:', error)
      }
    }

    // Modify the ZPL code to include device name
    const zplCode = `
^XA 
^MMT
^PW400
^LL800  // Increased label length to 800 dots
^LS0 
^FO50,20  // Moved the starting position down to 150 dots
^A0N,50,50  // Increased font size to 60 dots
^FDProduct ^FS 
^FO80,30  // Moved down to 250 dots
^BQN,2,9  // QR code command. Format 2 specifies QR code, and the data is encoded as ASCII
^FDMM,AWhats up mother fuckers^FS  // MM: Mode - A: Alphanumeric. You can adjust the mode based on your data type.
^FO50,250  // Moved down to 450 dots
^A0N,35,35  // Increased font size to 40 dots
^FDPrice: $19.99^FS 
^XZ
`

    // Get your Godex printer's EXACT name from Windows settings
    const printerName = 'Godex G530' // Replace with the actual name

    // Number of copies to print
    const numCopies = 5

    printZPL(printerName, zplCode, numCopies)
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
