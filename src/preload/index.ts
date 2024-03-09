import { IpcRendererEvent, WebContentsPrintOptions, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

type Channels = 'get-printers' | 'ipc-print' | 'notification'

const electronHandler = {
  sendMessage(channel: Channels, args: any) {
    ipcRenderer.send(channel, args)
  },
  print(options: WebContentsPrintOptions) {
    ipcRenderer.send('ipc-print', options)
  },
  notify(options: { title: string; body: string }) {
    ipcRenderer.send('notification', options)
  },

  on(channel: Channels, func: (...args: any) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: any[]) => func(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
  once(channel: Channels, func: (...args: unknown[]) => void) {
    ipcRenderer.once(channel, (_event, ...args) => func(...args))
  },
  getPrinters: () => ipcRenderer.send('get-printers')
}

contextBridge.exposeInMainWorld('contextBridge', electronHandler)
