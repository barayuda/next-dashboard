import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';

import PageChange from '../components/PageChange/PageChange';
import 'react-toastify/dist/ReactToastify.css';

import '../../public/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../public/css/nextjs-argon-dashboard.css';
// import '../../public/css/argon.css';
// import '../../public/scss/nextjs-argon-dashboard.scss';

Router.events.on('routeChangeStart', (url) => {
  // console.log(`Loading: ${url}`);
  document.body.classList.add('body-page-transition');
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById('page-transition')
  );
});
Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(
    document.getElementById('page-transition') as HTMLElement
  );
  document.body.classList.remove('body-page-transition');
});
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(
    document.getElementById('page-transition') as HTMLElement
  );
  document.body.classList.remove('body-page-transition');
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((children) => children);

  return getLayout(
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> */}
      </Head>
      <Script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></Script>
      {/* <Layout> */}
      <Component {...pageProps} />
      {/* </Layout> */}
      <ToastContainer />
    </React.Fragment>
  );
}

export const getStaticProps = async () => {};

export default MyApp;
