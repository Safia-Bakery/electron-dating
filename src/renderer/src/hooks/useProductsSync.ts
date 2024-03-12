import { useQuery } from '@tanstack/react-query'
import apiClient from '../main'
import { tokenSelector } from '../store/reducers/auth'
import { useAppSelector } from '../store/rootConfig'

interface Body {
  enabled?: boolean
}

export const useProductsSync = ({ enabled, ...params }: Body) => {
  const token = useAppSelector(tokenSelector)
  return useQuery({
    queryKey: ['products_sync', params],
    queryFn: () =>
      apiClient.get({ url: '/v1/products/synch' }).then(({ data: response }) => response),
    enabled: enabled && !!token
  })
}
export default useProductsSync
