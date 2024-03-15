import { app, BrowserWindow, ipcMain, IpcMainEvent, Menu, WebContentsPrintOptions } from 'electron'
import path, { join } from 'node:path'
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
    // Extract device name and other necessary parameters from options
    const deviceName = options.deviceName
    const numCopies = options.copies || 1 // Default to 1 copy if not provided

    // Modify the ZPL code with device name and other parameters
    const zplCode = `
    ^XA 
    ^MMT
    ^PW400
    ^LL800
    ^LS0 
    ^FO50,20
    ^A0N,50,50
    ^FDProduct ${deviceName}^FS 
    ^FO80,30
    ^BQN,2,9
    ^FDMM,AWhats up mother fuckers^FS
    ^FO50,250
    ^A0N,35,35
    ^FDPrice: $19.99^FS 
    ^XZ
  `

    // Create a temporary file to hold the ZPL code
    const tempFile = path.join(__dirname, 'temp_zpl_code.zpl')
    fs.writeFileSync(tempFile, zplCode)

    // Use subprocess to execute PowerShell command to print
    const powershell = spawn('powershell', [
      '-Command',
      `Start-Process -FilePath "${tempFile}" -Verb Print -PassThru | %{sleep 10;$_} | Stop-Process -Force`
    ])

    powershell.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    powershell.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })

    powershell.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
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
