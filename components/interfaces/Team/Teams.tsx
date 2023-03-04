import { Card, Error, LetterAvatar, Loading } from '@/components/ui'
import { getAxiosError } from '@/lib/common'
import { Team } from '@prisma/client'
import axios from 'axios'
import useTeams from 'hooks/useTeams'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Button } from 'react-daisyui'
import toast from 'react-hot-toast'
import { ApiResponse } from 'types'

const Teams = () => {
  const { isLoading, isError, teams, mutateTeams } = useTeams()
  const { t } = useTranslation('common')
  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  const leaveTeam = async (team: Team) => {
    try {
      await axios.put<ApiResponse>(`/api/teams/${team.slug}/members`)
      toast.success(t('leave-team-success'))
      mutateTeams()
    } catch (error: any) {
      toast.error(getAxiosError(error))
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {/* head*/}
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('members')}</th>
            <th>{t('created-at')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
        {teams && teams.map((team) => {
          return (
            <tr key={team.id}>
              <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-8 h-8">
                    <LetterAvatar name={team.name} />
                  </div>
                </div>
                <div>
                <Link href={`/teams/${team.slug}/members`}>
                  <a className="font-bold">{team.name}</a>
                </Link>
                </div>
              </div>
              </td>
              <td>{team._count.members}</td>
              <td>{new Date(team.createdAt).toDateString()}</td>
              <td><Button
                  className="btn-secondary"
                  onClick={() => {
                    leaveTeam(team)
                  }}
                >
                  {t('leave-team')}
                </Button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default Teams
