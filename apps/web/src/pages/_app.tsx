import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import '../styles/index.css';
import 'ui/styles.css';

export type NextPageLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: NextPageLayout;
};

export default function Page({ Component, pageProps }: Props): JSX.Element {
  const getLayout = Component.getLayout || ((page) => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}
