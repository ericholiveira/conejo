import fetcher from '@/lib/fetcher'
import { DBConnection } from '@prisma/client'
import useSWR, { mutate } from 'swr'
import type { ApiResponse } from 'types'

const useConnections = () => {
  const url = `/api/connections`

  const { data, error, isLoading } = useSWR<ApiResponse<DBConnection[]>>(
    url,
    fetcher
  )

  const mutateConnection = async () => {
    mutate(url)
  }

  return {
    isLoading,
    isError: error,
    connections: data?.data,
    mutateConnection,
  }
}

export default useConnections
