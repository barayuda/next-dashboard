import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
// import Footer from '../../components/public/MainContent/Footer';
// import Header from '../../components/public/MainContent/Header';
// import Navbar from '../../components/public/Navbar';
// import { setSimulator } from '../../services/simulator';
// import { SimulatorTypes } from '../../services/data-types';
// import styles from '../styles/Home.module.css';

const Simulator: NextPage = () => {
	console.log(
		'My Application IPG_API_KEY',
		process.env.NEXT_PUBLIC_IPG_API_KEY
	);
	console.log(
		'My Application IPG_INQUIRY_URL',
		process.env.NEXT_PUBLIC_IPG_INQUIRY_URL
	);

	const router = useRouter();
	const price = 135000;
	const [quantity, setQuantity] = useState(1);
	const [total, setTotal] = useState(price);
	const [material, setMaterial] = useState('steel');
	const [paymentSource, setPaymentSource] = useState('megadebit');

	// const onSubmit = async () => {
	// 	const data: SimulatorTypes = {
	// 		quantity,
	// 		total,
	// 		material,
	// 		paymentSource,
	// 	};

	// 	if (!quantity || !total) {
	// 		console.log('Error');
	// 		toast.error('quantity and total are required !!!');
	// 	} else {
	// 		const response = await setSimulator(data);
	// 		if (response.error) {
	// 			toast.error(response.message);
	// 		} else {
	// 			toast.success('Transaction Created !!!');
	// 			// const { token } = response.data;
	// 			// const tokenBase64 = btoa(token);
	// 			// Cookies.set('token', tokenBase64, { expires: 1 });
	// 			router.push('/dashboard/simulator');
	// 		}
	// 	}
	// };

	useEffect(() => {
		document
			.querySelector('body')
			?.classList.add('g-sidenav-show', 'g-sidenav-pinned');
	});
	return (
		<>
			{/* <Head>
				<title>Bank Mega Dashboard</title>
				<meta
					name="description"
					content="Kami menyediakan jutaan cara untuk membantu usaha anda"
				/>
				<meta
					property="og:title"
					content="Bank Mega Payment Gateway Dashboard"
				/>
				<meta
					property="og:description"
					content="Kami menyediakan jutaan cara untuk membantu usaha anda meraih sukses"
				/>
				<meta
					property="og:image"
					content="https://www.bankmega.com/static/img/bank_mega_logo.png"
				/>
				<meta property="og:url" content="https://www.bankmega.com" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<Header />
			<div className="main-content">
				<div className="container-fluid py-4">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="mb-4">Product Details</h5>
									<div className="row">
										<div className="col-xl-5 col-lg-6 text-center">
											<img
												className="w-100 border-radius-lg shadow-lg mx-auto"
												src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb.jpg"
												alt="chair"
											/>
											<div
												className="my-gallery d-flex mt-4 pt-2"
												data-pswp-uid="1"
											>
												<figure className="ms-2 me-3">
													<a
														href="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-1.jpg"
														data-size="500x600"
													>
														<img
															className="w-100 min-height-100 max-height-100 border-radius-lg shadow"
															src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-1.jpg"
															alt="Image description"
														/>
													</a>
												</figure>
												<figure className="me-3">
													<a
														href="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-2.jpg"
														data-size="500x600"
													>
														<img
															className="w-100 min-height-100 max-height-100 border-radius-lg shadow"
															src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-2.jpg"
															alt="Image description"
														/>
													</a>
												</figure>
												<figure className="me-3">
													<a
														href="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-3.jpg"
														data-size="500x600"
													>
														<img
															className="w-100 min-height-100 max-height-100 border-radius-lg shadow"
															src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-3.jpg"
															alt="Image description"
														/>
													</a>
												</figure>
												<figure className="me-3">
													<a
														href="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-4.jpg"
														data-size="500x600"
													>
														<img
															className="w-100 min-height-100 max-height-100 border-radius-lg shadow"
															src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-4.jpg"
															alt="Image description"
														/>
													</a>
												</figure>
												<figure>
													<a
														href="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-5.jpg"
														data-size="500x600"
													>
														<img
															className="w-100 min-height-100 max-height-100 border-radius-lg shadow"
															src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-5.jpg"
															alt="Image description"
														/>
													</a>
												</figure>
											</div>
										</div>
										<div className="col-lg-5 mx-auto">
											<div
												className="alert alert-success alert-dismissible fade show"
												role="alert"
											>
												<span className="alert-icon">
													<i className="ni ni-like-2"></i>
												</span>
												<span className="alert-text">
													<strong>Success!</strong> Thank you for purchasing!
												</span>
												<button
													type="button"
													className="close"
													data-dismiss="alert"
													aria-label="Close"
												>
													<span aria-hidden="true">×</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer /> */}
		</>
	);
};

export default Simulator;
