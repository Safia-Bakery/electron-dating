import { useQuery } from '@tanstack/react-query'
import { tokenSelector } from '../store/reducers/auth'
import { useAppSelector } from '../store/rootConfig'
import apiClient from '../main'
import { ProductTypes } from '../utils/types'

interface Body {
  parent_id?: number
  enabled?: boolean
}

export const useFAQ = ({ enabled, ...params }: Body) => {
  const token = useAppSelector(tokenSelector)
  return useQuery({
    queryKey: ['products', params],
    queryFn: () =>
      apiClient
        .get({ url: '/v1/products', params })
        .then(({ data: response }) => response as ProductTypes),
    enabled: enabled && !!token
  })
}
export default useFAQ
