import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import Router from 'next/router';

import PageChange from '../components/PageChange/PageChange';

import '../../public/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../public/css/nextjs-argon-dashboard.css';
import Script from 'next/script';
import { NextPage } from 'next';
// import '../../public/scss/nextjs-argon-dashboard.scss';

Router.events.on('routeChangeStart', (url) => {
	console.log(`Loading: ${url}`);
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
				<title>NextJS Argon Dashboard by Creative Tim</title>
				<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
			</Head>
			{/* <Script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></Script> */}
			{/* <Layout> */}
			<Component {...pageProps} />
			{/* </Layout> */}
		</React.Fragment>
	);
}

export const getStaticProps = async () => {};

export default MyApp;

/* export default class MyApp extends App {
	componentDidMount() {
		let comment = document.createComment(`

=========================================================
* * NextJS Argon Dashboard v1.1.0 based on Argon Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
		document.insertBefore(comment, document.documentElement);
	}

	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}
	render() {
		const { Component, pageProps } = this.props;

		const Layout = Component.layout || (({ children }) => <>{children}</>);

		return (
			<React.Fragment>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<title>NextJS Argon Dashboard by Creative Tim</title>
					<Script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></Script>

					<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</React.Fragment>
		);
	}
} */
