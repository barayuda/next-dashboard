/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Footer from '../../components/Footers/Footer';
import Navbar from '../../components/Navbars/SimpleNavbar';

import type { AlloTypes, SimulatorTypes } from '../../services/data-types';
import { setSimulator, alloAction } from '../../services/simulator';

import { getServerSideProps } from '../index';
const Simulator = () => {
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
  const [name, setName] = useState('John Doe');
  const [disablePromo, setDisablePromo] = useState(false);
  const [recurringId, setReccuringId] = useState('');
  const [retryPolicy, setRetryPolicy] = useState('');
  const [orderId, setOrderId] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [point, setPoint] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [alloStatus, setAlloStatus] = useState('');

  const onSubmit = async () => {
    
    setLoading(true);
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
      toast.error('quantity and total are required !!!');
    } else if(!phoneNumber){
      toast.error('phone number are required !!!');
    } else {
      debugger;
      const response = await setSimulator(data);
      console.log('response', JSON.stringify(response));
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('Transaction Created !!!');
        window.location.href = response?.data;
      }
    }
  };

  const addPoint = async () => {
    const data: AlloTypes = {
     phoneNumber,
     point
    };

    if(!phoneNumber && !point){
      toast.error('phone number are required !!!');
    } else {
      const response = await alloAction(data);
      if (!response.error) {
        setAlloStatus('Successfully added a data point.');
      }
    }
  };

  const deductPoint = async () => {
    const data: AlloTypes = {
     phoneNumber,
     point
    };

    if(!phoneNumber && !point){
      toast.error('phone number are required !!!');
    } else {
      const response = await alloAction(data);
      if (response) {
        setAlloStatus('Success to add point');
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
        <div className="min-h-screen-25 relative flex content-center items-center justify-center pb-18 pt-16">
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
                <h3 className="mb-2 text-3xl font-semibold leading-normal mt-10">
                  Working with us is a pleasure
                </h3>
                <p className="text-blueGray-600 mb-4 mt-4 text-lg font-light leading-relaxed">
                  This page is a simulation of data inputted during the inquiry process to the mega payment gateway. 
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

                  <div className="relative mb-3 mt-6 w-full">
                  <button
                      className="bg-blueGray-800 active:bg-blueGray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(true)}
                    > Add/Deduction Point
                    </button>
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
                <div className="hidden">
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
                        Discount Amount
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
                    {/* <button
                      className="bg-blueGray-800 active:bg-blueGray-600 mb-1 mr-1 w-full rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                      type="button"
                      name="button"
                      onClick={(e) => {
                        e.preventDefault();
                        void onSubmit();
                      }}
                    >
                         <svg  className="ml-40 animate-spin" width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                            </path>
                        </svg>
                      {isLoading ? 'Checkout....' : 'Checkout'}
                    </button> */}

                    <button type="button" 
                        className="py-3 px-12 flex justify-center items-center bg-blueGray-800 hover:shadow-lg text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                        name="button"
                        onClick={(e) => {
                          e.preventDefault();
                          void onSubmit();
                        }}>
                        {isLoading ?  
                        <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                            </path>
                        </svg> : null}
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


      {/* modal to add or deduction point */}
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="font-semibold">
                    Add/Deduction Point
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="relative mb-3 w-full">
                    <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                      Point
                    </label>
                    <input
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      type="number"
                      name="point"
                      placeholder="Input point"
                      value={point}
                      onChange={(e)=>{
                        setPoint(e.target.value);
                      }}
                    />
                  </div>

                  <p className='text-xs text-red-500'>
                    {alloStatus}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blueGray-800 active:bg-blueGray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      void addPoint();
                    }}
                  >
                    Add Point
                  </button>
                  <button
                    className="bg-blueGray-800 active:bg-blueGray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      void deductPoint();
                    }}
                  >
                    Point Deduction
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export { getServerSideProps };

export default Simulator;
