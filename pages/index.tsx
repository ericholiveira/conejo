import { GetServerSidePropsContext } from 'next';

import type { NextPageWithLayout } from 'types';
import { getSession } from 'next-auth/react';

const Home: NextPageWithLayout = () => {
  return (<></>);
};

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const session = await getSession(context)
  const destination = session? '/home':'/auth/login'
  return {
    redirect: {
      destination,
      permanent: false,
    },
    props:{},
  }
}

export default Home;
