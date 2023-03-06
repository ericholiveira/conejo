import { CreateTeam, Teams } from '@/components/interfaces/Team'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { Button } from 'react-daisyui'
import type { NextPageWithLayout } from 'types'

const AllTeams: NextPageWithLayout = () => {
  const [visible, setVisible] = useState(false)

  const { t } = useTranslation('common')

  return (
    <>
      <CreateTeam visible={visible} setVisible={setVisible} />
      <Teams />
      <div className="flex items-center justify-between">
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            setVisible(!visible)
          }}
        >
          {t('create-team')}
        </Button>
      </div>
    </>
  )
}

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  }
}

export default AllTeams
