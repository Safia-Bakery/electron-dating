import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PrinterInfo } from 'electron'
import { RootState } from '../rootConfig'
import { Printers } from '../../utils/types'

interface State {
  printers: PrinterInfo[]
  mainPrinter: PrinterInfo | null
  kitchenPrinter: PrinterInfo | null
  barPrinter: PrinterInfo | null
  checkSizes: number[]
  selectedCheck: number
  darkTheme: boolean
  virtualKeyboard: boolean
}

const initialState: State = {
  printers: [],
  checkSizes: [83, 58],
  selectedCheck: 58,
  mainPrinter: null,
  kitchenPrinter: null,
  barPrinter: null,
  darkTheme: false,
  virtualKeyboard: false
}

export const settingsReducer = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    getPrinters: (state: State, { payload }: PayloadAction<PrinterInfo[]>) => {
      state.printers = payload
      if (!state.mainPrinter && payload.length > 0) {
        state.mainPrinter = payload[0]
      }
    },
    setPrinters: (
      state: State,
      { payload }: PayloadAction<{ device: PrinterInfo; printer: Printers }>
    ) => {
      if (payload.printer === Printers.main) state.mainPrinter = payload.device
    },
    setCheckSize: (state: State, { payload }: PayloadAction<number>) => {
      state.selectedCheck = payload
    },
    setTheme: (state: State, { payload }: PayloadAction<boolean>) => {
      state.darkTheme = payload
    }
  }
})

export const { getPrinters, setCheckSize, setPrinters, setTheme } = settingsReducer.actions

export const printerSelector = (state: RootState) => state.settings.printers
export const checkSizesSelector = (state: RootState) => state.settings.checkSizes
export const checkSizeSelector = (state: RootState) => state.settings.selectedCheck
export const mainPrinterSelector = (state: RootState) => state.settings.mainPrinter
export const kitchenPrinterSelector = (state: RootState) => state.settings.kitchenPrinter
export const barPrinterSelector = (state: RootState) => state.settings.barPrinter
export const getAllPrintersSelector = (state: RootState) => {
  return {
    kitchen: state.settings.kitchenPrinter,
    main: state.settings.mainPrinter,
    bar: state.settings.barPrinter
  }
}
export const themeSelector = (state: RootState) => state.settings.darkTheme
export const keyboardSelector = (state: RootState) => state.settings.virtualKeyboard

export default settingsReducer.reducer
