import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  KeyIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import useTeam from 'hooks/useTeam'
import { signOut } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import TeamNav from '../interfaces/Team/TeamNav'
import NavItem from './NavItem'

export default function Sidebar() {
  const router = useRouter()
  const { t } = useTranslation('common')

  const slug = router.query.slug as string

  const { team } = useTeam(slug)

  return (
    <>
      <ul className="menu bg-base-100 w-56  ">
        <li>
          <NavItem
            href="/dashboard"
            text="Dashboard"
            icon={HomeIcon}
            active={router.pathname === '/dashboard'}
          />
        </li>
        <li>
          <NavItem
            href="/teams"
            text="Teams"
            icon={UsersIcon}
            active={router.pathname === '/teams'}
          />
        </li>
        {team && (
        <li>
          <NavItem
            href="javascript:void(0);"
            text={team.name}
            icon={UsersIcon}
            active={false}
          />
          <TeamNav slug={slug} />
        </li>
        )}
        <li>
          <NavItem
            href="/settings/account"
            text="Account"
            icon={UserIcon}
            active={router.pathname === '/settings/account'}
          />
        </li>
        <li>
          <NavItem
            href="/settings/password"
            text="Password"
            icon={KeyIcon}
            active={router.pathname === '/settings/password'}
          />
        </li>
        <li>
          <NavItem
            href="/"
            text="Logout"
            icon={ArrowLeftOnRectangleIcon}
            onClick={() => signOut()}
            active={false}
          />
        </li>
      </ul>
    </>
  )
}
