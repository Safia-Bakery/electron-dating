import { WebContentsPrintOptions } from 'electron'
import { errorToast, warnToast } from '../../utils/toast'

type Props = WebContentsPrintOptions

const usePrint = () => {
  const print = (options: Props) => {
    if (!options.deviceName) return warnToast('Устройство не выбрано!!!')

    try {
      return window.contextBridge.print({
        ...options,
        pageSize: { height: 40000, width: 60000 },
        landscape: false,
        silent: false,
        margins: { marginType: 'none' }
      })
    } catch (error: any) {
      errorToast(error?.message)
    }
  }

  return { print }
}

export default usePrint
