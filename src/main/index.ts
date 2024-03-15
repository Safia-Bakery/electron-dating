import { app, BrowserWindow, ipcMain, IpcMainEvent, Menu, WebContentsPrintOptions } from 'electron'
import { join } from 'node:path'
import { PythonShell } from 'python-shell'
// import icon from '../../resources/icon.png'

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
    const pyoptions = {
      mode: 'text',
      pythonPath: 'python3', // Path to your Python interpreter
      pythonOptions: ['-u'], // unbuffered stdout
      args: JSON.stringify(options) // Pass parameters as arguments
    }
    PythonShell.runString(
      `
    
    import win32print
    import sys
    
    # Receive parameters passed from JavaScript
    params = sys.argv[1:]
    
    print("Received parameters from JavaScript:", params)
    
    # Your ZPL code 
    zpl_code = """
    ^XA 
    ^MMT
    ^PW400
    ^LL800  // Increased label length to 800 dots
    ^LS0 
    ^FO50,20  // Moved the starting position down to 150 dots
    ^A0N,60,60  // Increased font size to 60 dots
    ^FDProduct ${options.deviceName}^FS 
    ^FO70,20  // Moved down to 250 dots
    ^BQN,2,9  // QR code command. Format 2 specifies QR code, and the data is encoded as ASCII
    ^FDMM,AWhats up mother fuckers^FS  // MM: Mode - A: Alphanumeric. You can adjust the mode based on your data type.
    ^FO50,450  // Moved down to 450 dots
    ^A0N,40,40  // Increased font size to 40 dots
    ^FDPrice: $19.99^FS 
    ^XZ
    """
    
    # Get your Godex printer's EXACT name from Windows settings
    printer_name = "Godex G530"  # Replace with the actual name
    
    # Open the printer
    hPrinter = win32print.OpenPrinter(printer_name)
    try:
        # Start a print job
        hJob = win32print.StartDocPrinter(hPrinter, 1, ("ZPL Label", None, "RAW"))
        try:
            win32print.StartPagePrinter(hPrinter)
            # Write ZPL code to the printer
            win32print.WritePrinter(hPrinter, zpl_code.encode())
            win32print.EndPagePrinter(hPrinter)
            
            # Additional steps to attempt to resolve the issue
            
            # Reset printer
            win32print.SetPrinter(hPrinter, 2, None, 0)
            
            # Calibrate printer (if applicable)
            # Instructions for calibration may vary depending on the printer model
            
        finally:
            # End the print job
            win32print.EndDocPrinter(hPrinter)
    finally:
        # Close the printer
        win32print.ClosePrinter(hPrinter)

    `
    ).then((messages) => {
      // PythonShell.run('./src/main/print.py', pyoptions).then((messages) => {
      // results is an array consisting of messages collected during execution
      console.log('results: %j', messages)
    })
    // mainWindow.webContents.print(
    //   {
    //     ...options
    //   },
    //   (isSuccess, error) => {
    //     if (!isSuccess && error) alert(error)
    //   }
    // )
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
