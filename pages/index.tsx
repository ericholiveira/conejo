import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import type { NextPageWithLayout } from 'types'

const Home: NextPageWithLayout = () => {
  return <></>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  const destination = session ? '/home' : '/auth/login'
  return {
    redirect: {
      destination,
      permanent: false,
    },
    props: {},
  }
}

export default Home
