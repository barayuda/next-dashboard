import type { NextPage } from 'next';
import React from 'react';
import Router from 'next/router';

const Home: NextPage = () => {
	React.useEffect(() => {
		Router.push('/admin/dashboard');
	});

	return <div />;
};

export default Home;
