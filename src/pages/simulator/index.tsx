/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Footer from '../../components/Footers/Footer';
import Navbar from '../../components/Navbars/AuthNavbar';

import axios from 'axios';
import type { SimulatorTypes } from '../../services/data-types';
import { setSimulator } from '../../services/simulator';

const Simulator = () => {
  const router = useRouter();
  const price = 100;
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);
  const [material, setMaterial] = useState('steel');
  const [paymentSourceMethod, setPaymentSourceMethod] = useState('');
  const [paymentSource, setPaymentSource] = useState('');

  async function callInqueryApi() {
    const data: SimulatorTypes = {
      quantity,
      total,
      material,
      paymentSource,
      paymentSourceMethod,
    };

    if (!quantity || !total) {
      // console.log('Error');
      toast.error('quantity and total are required !!!');
    } else {
      const response = await axios.get('/api/simulator');
      const responseData = response.data;
      console.log('responseData', JSON.stringify(responseData));
      if (responseData.error) {
        toast.error('Error bla !!!');
      } else {
        toast.success('Transaction Created !!!');
        // const { token } = response.data;
        // const tokenBase64 = btoa(token);
        // Cookies.set('token', tokenBase64, { expires: 1 });
        // router.push('/dashboard/simulator');
        // window.location.href = response?.data?.urls?.selections;
      }
    }
  }

  const onSubmit = async () => {
    const handleClick = async () => {
      try {
        const requestData = {
          // Your request data here...
        };
        const response = await axios.post('/api/simulator', requestData);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const data: SimulatorTypes = {
      quantity,
      total,
      material,
      paymentSource,
      paymentSourceMethod,
    };

    if (!quantity || !total) {
      // console.log('Error');
      toast.error('quantity and total are required !!!');
    } else {
      const response = await setSimulator(data);
      console.log('response', JSON.stringify(response));
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('Transaction Created !!!');
        // const { token } = response.data;
        // const tokenBase64 = btoa(token);
        // Cookies.set('token', tokenBase64, { expires: 1 });
        // router.push('/dashboard/simulator');
        window.location.href = response?.data?.selectionsUrl;
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
      <Navbar />
      <main>
        <div className="min-h-screen-25 relative flex content-center items-center justify-center pb-32 pt-16">
          <div
            className="absolute top-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="absolute h-full w-full bg-black opacity-75"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-6/12">
                <div className="pr-12">
                  <h1 className="text-5xl font-semibold text-white">
                    Your story starts with us.
                  </h1>
                  <p className="text-blueGray-200 mt-4 text-lg">
                    This is a simple example of a Landing Page you can build.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 top-auto h-16 w-full overflow-hidden"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="bg-blueGray-200 -mt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="mt-24 flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 pt-8 md:w-4/12">
                <div className="bg-blueGray-700 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg shadow-lg">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full rounded-t-lg align-middle"
                    width={336}
                    height={224}
                  />
                  <blockquote className="relative mb-4 p-8">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="h-95-px -top-94-px absolute left-0 block w-full"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-blueGray-700 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services
                    </h4>
                  </blockquote>
                </div>
              </div>

              <div className="ml-auto mr-auto w-full px-4 md:w-5/12">
                <h3 className="mb-2 text-3xl font-semibold leading-normal">
                  Working with us is a pleasure
                </h3>
                <p className="text-blueGray-600 mb-4 mt-4 text-lg font-light leading-relaxed">
                  Don&apos;t let your uses guess by attaching tooltips and
                  popoves to any element. Just make sure you enable them first
                  via JavaScript.
                </p>
                <p className="text-blueGray-600 mb-4 mt-0 text-lg font-light leading-relaxed">
                  The kit comes with three pre-built pages to help you get
                  started faster. You can change the text and images and
                  you&apos;re good to go. Just make sure you enable them first
                  via JavaScript.
                </p>
                <hr />
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      Frame Material
                    </label>
                    <select
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
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
                  <div className="">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      Quantity
                    </label>
                    <input
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      type="number"
                      name="quantity"
                      value={quantity}
                      onChange={(event) => {
                        setQuantity(parseInt(event.target.value));
                        if (parseInt(event.target.value) > 0) {
                          setTotal(parseInt(event.target.value) * price);
                        } else {
                          setQuantity(1);
                          setTotal(1 * price);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      TOTAL
                    </label>
                    <input
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      type="text"
                      name="total"
                      value={total}
                      readOnly={true}
                    />
                  </div>
                  <div className="">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      Payment Source
                    </label>
                    <select
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      name="paymentSource"
                      id="paymentSource"
                      value={paymentSource}
                      onChange={(event) => {
                        setPaymentSource(event.target.value);
                      }}
                    >
                      <option value="">- Select One -</option>
                      <option value="allopay">AlloPay</option>
                      <option value="allopaylater">AlloPaylater</option>
                      <option value="allopoint">AlloPoint</option>
                      <option value="bcava">BCA VA</option>
                      <option value="briva">BRI VA</option>
                      <option value="bniva">BNI VA</option>
                      <option value="mandiriva">Mandiri VA</option>
                      <option value="megava">Mega Virtual Account</option>
                      <option value="megadebit">Mega Debit Card</option>
                      <option value="megacc">Mega Credit Card</option>
                      <option value="megaqris">Mega QRIS</option>
                    </select>
                  </div>
                </div>
                <div className="grid">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      Payment Source Method
                    </label>
                    <select
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      name="paymentSourceMethod"
                      id="paymentSourceMethod"
                      data-choice="active"
                      value={paymentSourceMethod}
                      onChange={(e) => {
                        setPaymentSourceMethod(e.target.value);
                      }}
                    >
                      <option value="">- Keep Empty -</option>
                      <option value="authcapture">authcapture</option>
                    </select>
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <button
                      className="bg-blueGray-800 active:bg-blueGray-600 mb-1 mr-1 w-full rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                      type="button"
                      name="button"
                      onClick={(e) => {
                        e.preventDefault();
                        void onSubmit();
                      }}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4">
            <div className="mt-24 flex flex-wrap items-center">
              <Link
                className="mb-1 mr-1 rounded bg-blue-500 px-6 py-3 text-base font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                href="/simulator/bcava"
              >
                BCA VA
              </Link>
              <Link
                className="mb-1 mr-1 rounded bg-blue-500 px-6 py-3 text-base font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                href="/simulator/mandiriva"
              >
                Mandiri VA
              </Link>
              <Link
                className="mb-1 mr-1 rounded bg-blue-500 px-6 py-3 text-base font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                href="/simulator/bniva"
              >
                BNI VA
              </Link>
              <Link
                className="mb-1 mr-1 rounded bg-blue-500 px-6 py-3 text-base font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                href="/simulator/briva"
              >
                BRI VA
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Simulator;
