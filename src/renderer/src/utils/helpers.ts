import { QueryClient } from '@tanstack/react-query'
import useQueryString from '../hooks/custom/useQueryString'

export enum EPresetTimes {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = DAY * 7,
  TEN_DAYS = DAY * 10
}
export const itemsPerPage = 50

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: EPresetTimes.MINUTE * 10,
      staleTime: EPresetTimes.SECOND * 10,
      refetchOnReconnect: true,
      refetchOnMount: true
    }
  }
})

export const handleIdx = (index: number) => {
  const currentPage = Number(useQueryString('page')) || 1
  if (currentPage === 1) return index + 1
  else return index + 1 + itemsPerPage * (currentPage - 1)
}

export const MockCategories = [
  { id: 1, name: 'all' },
  { id: 2, name: 'products' }
]

export const isMobile = window.innerWidth <= 960

export const dateTimeFormat = 'DD.MM.YYYY HH:mm'
export const dateMonthYear = 'DD.MM.YYYY'
export const yearMonthDate = 'YYYY-MM-DD'
