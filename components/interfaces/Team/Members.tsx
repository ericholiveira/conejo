import { Error, LetterAvatar, Loading } from '@/components/ui'
import { availableRoles } from '@/lib/roles'
import { isTeamAdmin } from '@/lib/teams'
import { Team, TeamMember } from '@prisma/client'
import axios from 'axios'
import useTeamMembers from 'hooks/useTeamMembers'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Button } from 'react-daisyui'
import toast from 'react-hot-toast'

const Members = ({ team }: { team: Team }) => {
  const { data: session } = useSession()
  const { t } = useTranslation('common')

  const { isLoading, isError, members, mutateTeamMembers } = useTeamMembers(
    team.slug
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !session) {
    return <Error />
  }

  if (!members) {
    return null
  }

  const removeTeamMember = async (member: TeamMember) => {
    await axios.delete(`/api/teams/${team.slug}/members`, {
      data: {
        memberId: member.userId,
      },
    })

    mutateTeamMembers()

    toast.success('Deleted the member successfully.')
  }

  const isAdmin = isTeamAdmin(session.user, members)

  const canUpdateRole = (member: TeamMember) => {
    return session.user.id != member.userId && isAdmin
  }

  const canRemoveMember = (member: TeamMember) => {
    return session.user.id != member.userId && isAdmin
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {/* head*/}
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('email')}</th>
            <th>{t('role')}</th>
            {isAdmin && (
              <th scope="col" className="px-6 py-3">
                {t('action')}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {members?.map((member) => {
            return (
              <tr key={member.id} className="border-b bg-base-200">
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-8 h-8">
                        <LetterAvatar name={member.user.name} />
                      </div>
                    </div>
                    <div>
                      <span>{member.user.name}</span>
                    </div>
                  </div>
                </td>
                <td>{member.user.email}</td>
                <td>
                  {canUpdateRole(member) ? (
                    <UpdateRoleDropdown team={team} member={member} />
                  ) : (
                    <span>{member.role}</span>
                  )}
                </td>
                {canRemoveMember(member) && (
                  <td>
                    <Button
                      onClick={() => {
                        removeTeamMember(member)
                      }}
                    >
                      {t('remove')}
                    </Button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const UpdateRoleDropdown = ({
  team,
  member,
}: {
  team: Team
  member: TeamMember
}) => {
  const updateRole = async (member: TeamMember, role: string) => {
    await axios.patch(`/api/teams/${team.slug}/members`, {
      memberId: member.userId,
      role,
    })

    toast.success('Updated the role successfully.')
  }

  return (
    <select
      className="rounded-md text-sm"
      onChange={(e) => updateRole(member, e.target.value)}
    >
      {availableRoles.map((role) => (
        <option value={role.id} key={role.id} selected={role.id == member.role}>
          {role.id}
        </option>
      ))}
    </select>
  )
}

export default Members
