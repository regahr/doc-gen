import Head from 'next/head';
import type { ReactNode } from 'react';

const Layout = function getLayout(page: ReactNode): JSX.Element {
  return (
    <>
      <Head>
        <title>Doc Gen</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="bg-[#e0e0f7]">{page}</main>
    </>
  );
};

export default Layout;
