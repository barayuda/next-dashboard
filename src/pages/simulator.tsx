import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Footer from '../components/Footers/AuthFooter';
import Navbar from '../components/Navbars/FrontNavbar';
import { setSimulator } from '../../services/simulator';
import { SimulatorTypes } from '../../services/data-types';
// import styles from '../styles/Home.module.css';

const Simulator: NextPage = () => {
  // console.log(
  // 	'My Application IPG_API_KEY',
  // 	process.env.NEXT_PUBLIC_IPG_API_KEY
  // );
  // console.log(
  // 	'My Application IPG_INQUIRY_URL',
  // 	process.env.NEXT_PUBLIC_IPG_INQUIRY_URL
  // );

  const router = useRouter();
  const price = 200;
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);
  const [material, setMaterial] = useState('steel');
  const [paymentSource, setPaymentSource] = useState('megadebit');

  const onSubmit = async () => {
    const data: SimulatorTypes = {
      quantity,
      total,
      material,
      paymentSource,
    };

    if (!quantity || !total) {
      // console.log('Error');
      toast.error('quantity and total are required !!!');
    } else {
      const response = await setSimulator(data);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        toast.success('Transaction Created !!!');
        // const { token } = response.data;
        // const tokenBase64 = btoa(token);
        // Cookies.set('token', tokenBase64, { expires: 1 });
        router.push('/dashboard/simulator');
      }
    }
  };

  useEffect(() => {
    document
      .querySelector('body')
      ?.classList.add('g-sidenav-show', 'g-sidenav-pinned');
  });
  return (
    <>
      <Head>
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
                      <form role="form">
                        <h3 className="mt-lg-0 mt-4">Apple Bundle</h3>
                        <h5 className="mb-0 mt-3">Price</h5>
                        <h3>IDR {price}</h3>
                        <span className="badge badge-success">In Stock</span>
                        <br />
                        <label className="mt-4">Description</label>
                        <ul>
                          <li>
                            The most beautiful curves of this swivel stool adds
                            an elegant touch to any environment
                          </li>
                          <li>
                            Memory swivel seat returns to original seat position
                          </li>
                          <li>
                            Comfortable integrated layered chair seat cushion
                            design
                          </li>
                          <li>Fully assembled! No assembly required</li>
                        </ul>
                        <div className="row mt-4">
                          <div className="col-lg-5 mt-lg-0 mt-2">
                            <label>Frame Material</label>
                            <select
                              className="form-control choices__input"
                              name="material"
                              id="material"
                              data-choice="active"
                              value={material}
                              onChange={(e) => {
                                setMaterial(e.target.value);
                              }}
                            >
                              <option value="">- Select One -</option>
                              <option value="wood">Wood</option>
                              <option value="steel">Steel</option>
                              <option value="carbon">Carbon</option>
                            </select>
                          </div>
                          <div className="col-lg-4">
                            <label>Quantity</label>
                            <input
                              className="form-control"
                              type="number"
                              name="quantity"
                              value={quantity}
                              onChange={(event) => {
                                setQuantity(parseInt(event.target.value));
                                if (parseInt(event.target.value) > 0) {
                                  setTotal(
                                    parseInt(event.target.value) * price
                                  );
                                } else {
                                  setQuantity(1);
                                  setTotal(1 * price);
                                }
                              }}
                            />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-5 mt-lg-0 mt-2">
                            <label>TOTAL</label>
                            <input
                              className="form-control"
                              type="text"
                              name="total"
                              value={total}
                              readOnly={true}
                            />
                          </div>
                          <div className="col-lg-5 mt-lg-0 mt-2">
                            <label>Payment Source</label>
                            <select
                              className="form-control choices__input"
                              name="paymentSource"
                              id="paymentSource"
                              value={paymentSource}
                              onChange={(event) => {
                                setPaymentSource(event.target.value);
                              }}
                            >
                              <option value="">- Select One -</option>
                              <option value="megadebit">Mega Debit Card</option>
                              <option value="megacc">Mega Credit Card</option>
                              <option value="megava">
                                Mega Virtual Account
                              </option>
                              <option value="megaqris">Mega QRIS</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-5">
                            <button
                              className="btn btn-primary mb-0 mt-lg-auto w-100"
                              type="button"
                              name="button"
                              onClick={onSubmit}
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Simulator;
