import { app, BrowserWindow, ipcMain, IpcMainEvent, Menu, WebContentsPrintOptions } from 'electron'
import { join } from 'node:path'

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    fullscreenable: true,
    simpleFullscreen: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true
    }
  })
  mainWindow.maximize()
  mainWindow.webContents.openDevTools()

  ipcMain.on('get-printers', async (event: IpcMainEvent) => {
    const printers = await mainWindow.webContents.getPrintersAsync()
    event.reply('get-printers', printers)
  })

  ipcMain.on('ipc-print', async (_, options: WebContentsPrintOptions) => {
    mainWindow.webContents.print(
      {
        ...options,
        printBackground: false,
        collate: true
      },
      (isSuccess, error) => {
        if (!isSuccess && error) alert(error)
      }
    )
  })

  // ipcMain.on('print-selected', (event, selectedContent) => {
  //   mainWindow.webContents.printToPDF(
  //     {
  //       printBackground: true,
  //       pageSize: 'A4',
  //       marginsType: 1,
  //       landscape: false,
  //       scaleFactor: 1,
  //       printSelectionOnly: true, // Set this to true to print only the selected content
  //       pageRanges: '1' // Specify the page range you want to print (e.g., '1-3' for pages 1 to 3)
  //     },
  //     (error: any, data: any) => {
  //       if (error) throw error

  //       // Save the PDF to a file or send it to the printer
  //       fs.writeFile('selected_content.pdf', data, (err: any) => {
  //         if (err) throw err
  //         console.log('PDF saved successfully')
  //       })
  //     }
  //   )
  // })

  // and load the index.html of the app.
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
