import { CreateConnections,Connections } from '@/components/interfaces/Connection'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { Button } from 'react-daisyui'
import type { NextPageWithLayout } from 'types'
import { useTranslation } from 'next-i18next'

const AllConnections: NextPageWithLayout = () => {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation('common')
  return (
    <>
      
      <CreateConnections visible={visible} setVisible={setVisible} />
      <Connections />
      <div className="flex items-center justify-between">
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            setVisible(!visible)
          }}
        >
          {t('create-connection')}
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

export default AllConnections
