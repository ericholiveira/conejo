import classNames from 'classnames'
import NextLink from 'next/link'

const NavItem = ({
  href,
  text,
  icon,
  active,
  onClick,
}: {
  href: string
  text: string
  icon: any
  active: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}) => {
  const Icon = icon

  return (
    <NextLink href={href} className={classNames(active ? 'bordered' : '')}>
      <span onClick={onClick}>
        <Icon className="h-5 w-5" />
        {text}
      </span>
    </NextLink>
  )
}

export default NavItem
