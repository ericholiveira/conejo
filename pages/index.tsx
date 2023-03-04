import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'types';
import Navbar from '../components/ui/Navbar';


const Home: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  return (
    <div className="container">
      <Navbar/>
    </div>
  );
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      // Will be passed to the page component as props
    },
  };
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
