
import { useTranslation } from 'next-i18next';
import ThemeChanger from './ThemeChanger'
import Link from 'next/link';
export default function Navbar() {
  const { t } = useTranslation('common');
  return (
      <div className="container w-full">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href="/">
              <a className="btn-ghost btn text-xl normal-case">{t('app-name')}</a>
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link href="/dashboard">
                  <a>{t('sign-in')}</a>
                </Link>
              </li>
              <li>
                <ThemeChanger/>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    );
}
