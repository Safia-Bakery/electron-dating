import { ElectronAPI } from '@electron-toolkit/preload'
import { electronHandler } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    contextBridge: typeof electronHandler
  }
}
