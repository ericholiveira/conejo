import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { NextPageWithLayout } from 'types'

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const { t } = useTranslation('common')

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{`${t('hi')}, ${
            session?.user.name
          }`}</h1>
          <p className="py-6">{t('welcome-back')}</p>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  }
}

export default Home
