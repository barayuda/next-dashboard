/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { createRoot } from 'react-dom/client';
import Router from 'next/router';
import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import type { Root } from 'react-dom/client';

import { trpc } from '../utils/trpc';

import '../styles/globals.css';
// import '../styles/tailwind.css';
import '../styles/custom.css';

import PageChange from '../components/PageChange/PageChange';
import GlobalContextProvider from '../contexts/GlobalContextProvider';
import type { AppPropsWithLayout } from '../types';

let root: Root;
let container: HTMLElement;

Router.events.on('routeChangeStart', (url: string) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add('body-page-transition');

  if (!root && !container) {
    container = document.getElementById('page-transition') as HTMLElement;
    root = createRoot(container);
    root.render(<PageChange path={url} />);
    // console.log("routeChangeStart1");
  } else {
    root = createRoot(container);
    root.render(<PageChange path={url} />);
    // console.log("routeChangeStart2");
  }
});

Router.events.on('routeChangeComplete', () => {
  if (!root) {
    container = document.getElementById('page-transition') as HTMLElement;
    root = createRoot(container);
    root.unmount();
    // console.log("routeChangeComplete1");
  } else {
    root.unmount();
    // console.log("routeChangeComplete2");
  }
  document.body.classList.remove('body-page-transition');
});

Router.events.on('routeChangeError', () => {
  if (!root) {
    container = document.getElementById('page-transition') as HTMLElement;
    root = createRoot(container);
    root.unmount();
    // console.log("routeChangeError1");
  } else {
    root.unmount();
    // console.log("routeChangeError2");
  }
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}: AppPropsWithLayout) => {
  const { session } = pageProps;
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>EMPIS BANK MEGA</title>
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> */}
      </Head>
      <SessionProvider session={session}>
        <GlobalContextProvider>
          <Toaster />
          <Component {...pageProps} />
        </GlobalContextProvider>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
