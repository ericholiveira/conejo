import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from 'types'

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation('common')

  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/">
            <a className="btn-ghost btn text-xl normal-case">SaaA</a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <a>{t('sign-up')}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      // Will be passed to the page component as props
    },
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default Home
