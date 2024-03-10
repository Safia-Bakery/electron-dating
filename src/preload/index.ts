/* eslint-disable @typescript-eslint/no-explicit-any */
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer, IpcRendererEvent, WebContentsPrintOptions } from 'electron'

type Channels = 'get-printers' | 'ipc-print' | 'notification'

export const electronHandler = {
  sendMessage(channel: Channels, args: any) {
    ipcRenderer.send(channel, args)
  },
  print(options: WebContentsPrintOptions) {
    ipcRenderer.send('ipc-print', options)
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
