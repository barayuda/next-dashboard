import type { NextPage } from 'next';
import Head from 'next/head';
import { ReactElement, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import Header from '../../components/Headers/Header';
import ApiTable from '../../components/SimulatorContent/ApiTable';
import Admin from '../../layouts/Admin';

function Simulator() {
	useEffect(() => {
		document
			.querySelector('body')
			?.classList.add('g-sidenav-show', 'g-sidenav-pinned');
	});

	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--7" fluid>
				<Row>
					<div className="col mb-5">
						<ApiTable />
					</div>
				</Row>
			</Container>
		</>
	);
}

Simulator.getLayout = function getLayout(page: ReactElement) {
	return <Admin>{page}</Admin>;
};

export default Simulator;
