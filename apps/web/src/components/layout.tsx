import Head from 'next/head';
import type { ReactNode } from 'react';

const Layout = function getLayout(page: ReactNode): JSX.Element {
  return (
    <>
      <Head>
        <title>Grof Co</title>
        <meta content="Financing features from SproutAsia" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="bg-[#e0e0f7]">{page}</main>
    </>
  );
};

export default Layout;
