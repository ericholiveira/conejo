import { Card, Error, LetterAvatar, Loading } from '@/components/ui'
import { getAxiosError } from '@/lib/common'
import { DBConnection } from '@prisma/client'
import axios from 'axios'
import useConnections from 'hooks/useConnections'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Button } from 'react-daisyui'
import toast from 'react-hot-toast'
import { ApiResponse } from 'types'

const Connections = () => {
  const { isLoading, isError, connections, mutateConnection } = useConnections()
  const { t } = useTranslation('common')
  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  const removeConnection = async (connection: DBConnection) => {
    try {
      await axios.delete<ApiResponse>(`/api/connections/${connection.id}`)
      toast.success(t('delete-success'))
      mutateConnection()
    } catch (error: any) {
      toast.error(getAxiosError(error))
    }
  }

  return (
    <Card heading="Your Connections">
      <Card.Body>
        <table className="w-full table table-zebra table-fixed text-left text-sm ">
          <thead className="text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t('id')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('host')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('database')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('actions')}
              </th>
              </tr>
          </thead>
          <tbody>
            {connections &&
              connections.map((connection) => {
                return (
                  <tr
                    key={connection.id}
                    className="border-b hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-3">
                      {connection.id}
                    </td>
                    <td className="px-6 py-3">{connection.host}</td>
                    <td className="px-6 py-3">
                      {connection.database}
                    </td>
                    <td className="px-6 py-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          removeConnection(connection)
                        }}
                      >
                        {t('remove-connection')}
                      </Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  )
}

export default Connections
