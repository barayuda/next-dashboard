/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Footer from '../../components/Footers/Footer';
import Navbar from '../../components/Navbars/AuthNavbar';

import axios from 'axios';
import type { SimulatorTypes } from '../../services/data-types';
import { setSimulator } from '../../services/simulator';

const Simulator = () => {
  const router = useRouter();
  // const price = 100;
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);
  const [material, setMaterial] = useState('');
  const [paymentSourceMethod, setPaymentSourceMethod] = useState('');
  const [paymentSource, setPaymentSource] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState('');
  const [authData, setAuthData] = useState('');
  const [name, setName] = useState('');
  const [disablePromo, setDisablePromo] = useState(false);
  const [recurringId, setReccuringId] = useState('');
  const [retryPolicy, setRetryPolicy] = useState('');
  const [orderId, setOrderId] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');


  async function callInqueryApi() {
    const data: SimulatorTypes = {
      quantity,
      total,
      material,
      paymentSource,
      paymentSourceMethod,
      email,
      phoneNumber,
      token,
      authData,
      name,
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
      // try {
      //   const requestData = {
      //     // Your request data here...
      //   };
      //   const response = await axios.post('/api/simulator', requestData);
      //   console.log(response.data);
      // } catch (error) {
      //   console.error('Error:', error);
      // }
    };

    const data: SimulatorTypes = {
      quantity,
      total,
      material,
      paymentSource,
      paymentSourceMethod,
      email,
      authData,
      token,
      phoneNumber,
      name,
      recurringId,
      retryPolicy,
      orderId,
      discountAmount,
      paymentMethod,
      disablePromo
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
      setTotal(quantity * price);
  }, [material, quantity, price]);
  return (
    <>
      <Navbar />
      <main>
        <div className="min-h-screen-25 relative flex content-center items-center justify-center pb-32 pt-16">
          <div
            className="absolute top-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('assets/img/gaktau1.jpg')",
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
              <div>
                <span>

                </span>
              </div>
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 top-auto h-16 w-full overflow-hidden"
            style={{
    transform: 'translateZ(0)',
    backgroundColor: 'linear-gradient(135deg, #000, #FFA500)'
  }}
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
                    src="/assets/img/gaktau4.jpg"
                    className="w-full rounded-t-lg align-middle"
                    width={336}
                    height={224}
                  />

                </div>
              </div>

              <div className="ml-auto mr-auto w-full px-4 md:w-5/12 ">
                <h3 className="mb-2 text-3xl font-semibold leading-normal">
                  Working with us is a pleasure
                </h3>
                <p className="text-blueGray-600 mb-4 mt-4 text-lg font-light leading-relaxed">
                  Don&apos;t let your uses guess by attaching tooltips and
                  popoves to any element. Just make sure you enable them first.
                </p>
                <p className="text-blueGray-600 mb-4 mt-0 text-lg font-light leading-relaxed">
                 Lets check how Mega Ipg works 
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
                      defaultValue={material}
                      onChange={(e) => {
                        if (e.target.value == 'carbon') {
                          setPrice(10000);
                        } else if (e.target.value == 'steel') {
                          setPrice(100);
                        } else {
                          setPrice(1);
                        }
                        setMaterial(e.target.value);
                        setTotal(quantity * price);
                      }}
                    >
                      <option value="">- Select One -</option>
                      <option value="wood">Wood - Rp 1</option>
                      <option value="steel">Steel - Rp 100</option>
                      <option value="carbon">Carbon - Rp 10.000</option>
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
                <div className="grid gap-2">
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
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative mb-3 w-full">
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
                <div className="grid">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      Name
                    </label>
                    <input
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      type="text"
                      name="name"
                      placeholder="Input your name"
                      value={name}
                      onChange={(e)=>{
                        setName(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      Email
                    </label>
                    <input
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      type="email"
                      name="email"
                      placeholder="Input your email"
                      value={email}
                      onChange={(e)=>{
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      Phone
                    </label>
                    <input
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      type="text"
                      name="phone"
                      placeholder="Input your mobile phone"
                      value={phoneNumber}
                      onChange={(e)=>{
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      After Discount
                    </label>
                    <select
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      name="afterDiscount"
                      id="afterDiscount"
                      value={paymentSource}
                      onChange={(event) => {
                        setPaymentSource(event.target.value);
                      }}
                    >
                      <option value="">- Select One -</option>
                      <option value="megacards">megacards</option>
                      <option value="debitmega">debitmega</option>
                      <option value="creditmega">creditmega</option>
                    </select>
                  </div>
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      Token
                    </label>
                    <input
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      type="text"
                      name="token"
                      placeholder="Input your token"
                      value={token}
                      onChange={(e)=>{
                        setToken(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="grid">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      Auth Data
                    </label>
                    <textarea
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      name="authData"
                      placeholder="Input Auth Data"
                      rows={3}
                      value={authData}
                      onChange={(e)=>{
                        setAuthData(e.target.value);
                      }}
                    />
                    
                  </div>
                </div>
                <div className="grid">
                  <div className="relative mb-5 mt-5 w-full">
                    <label className="inline-flex cursor-pointer items-center">
                      <input
                        id="disablePromo"
                        type="checkbox"
                        className="form-checkbox text-blueGray-700 ml-1 h-5 w-5 rounded border-0 transition-all duration-150 ease-linear"
                        checked={disablePromo}
                        onChange={(e)=>{
                          setDisablePromo(e.target.checked);
                        }}
                      />
                      <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                        Disable Promo
                      </span>
                    </label>
                  </div>
                </div>
                {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                <div className="grid grid-cols-2 gap-2">
                <div className="grid">
                  <div className="relative mb-5 mt-5 w-full">
                  <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                        RecurringId
                      </span>
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      <input
                        id="recurringId"
                        type="text"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={recurringId}
                        onChange={(e)=>{
                          setReccuringId(e.target.value)
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="grid">
                  <div className="relative mb-5 mt-5 w-full">
                  <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                       RetryPolicy
                      </span>
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      <input
                        id="retryPolicy"
                        type="text"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={retryPolicy}
                        onChange={(e)=>{setRetryPolicy(e.target.value)}}
                      />
                    </label>
                  </div>
                </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                <div className="grid">
                  <div className="relative mb-5 mt-5 w-full">
                  <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                        OrderId
                      </span>
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      <input
                        id="orderId"
                        type="text"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={orderId}
                        onChange={ (e)=>{
                              setOrderId(e.target.value)
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="grid">
                  <div className="relative mb-5 mt-5 w-full">
                  <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                        Discount Ammount
                      </span>
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      <input
                        id="discountAmmount"
                        type="number"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={discountAmount}
                        onChange={(e) => {
                          setDiscountAmount(parseInt(e.target.value));
                        }}
                      />
                    </label>
                  </div>
                </div>
                </div>
                <div className="grid">
                  <div className="relative mb-5 mt-5 w-full">
                  <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                       Payment Method
                      </span>
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      <input
                        id="paymentMethod"
                        type="text"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={paymentMethod}
                        onChange={(e)=>{
                          setPaymentMethod(e.target.value)}}
                      />
                    </label>
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
              <Link
                className="mb-1 mr-1 rounded bg-blue-500 px-6 py-3 text-base font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                href="/simulator/megava"
              >
                MEGA VA
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
