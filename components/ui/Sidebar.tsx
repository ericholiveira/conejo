import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  KeyIcon,
  UserIcon,
  UsersIcon,
  CircleStackIcon
} from '@heroicons/react/24/solid'
import useTeam from 'hooks/useTeam'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import TeamNav from '../interfaces/Team/TeamNav'
import NavItem from './NavItem'
import ThemeChanger from './ThemeChanger'

export default function Sidebar() {
  const router = useRouter()

  const slug = router.query.slug as string

  const { team } = useTeam(slug)

  return (
    <>
      <ul className="menu bg-base-100 w-56">
        <li>
          <NavItem
            href="/home"
            text="Home"
            icon={HomeIcon}
            active={router.pathname === '/home'}
          />
        </li>
        <li>
          <NavItem
            href="/connections"
            text="Connections"
            icon={CircleStackIcon}
            active={router.pathname === '/connections'}
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
            onClick={async () => {
              localStorage.clear()
              await signOut()
              router.push("/auth/login")
            }}
            active={false}
          />
        </li>
        <li>
          <ThemeChanger show={true}/>
        </li>
      </ul>
    </>
  )
}
