/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Footer from '../../components/Footers/Footer';
import Navbar from '../../components/Navbars/SimpleNavbar';
import ReCAPTCHA from 'react-google-recaptcha';
import  React from 'react';

import type { AlloTypes, SimulatorTypes } from '../../services/data-types';
import {
  setSimulator,
  alloAction,
  alloBalancePoint,
  transactionList,
  transactionStatuses,
} from '../../services/simulator';

import { getServerSideProps } from '../index';
import { TransactionTypes } from '../api/transactionRepo';
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
  const [pointCurrent, setPointCurrent] = useState(0);

  const [alloLoading, setAlloLoading] = useState(false);  
  const [alloStatus, setAlloStatus] = useState('');

  const [captcha, setCaptcha] = useState<string | null>();
  const recaptchaRef: any = React.createRef();
  const [transactions, setTransactions] = useState([]);

  
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<any>();
  const [transactionStatusLoading, setTransactionStatusLoading] = useState(false);  

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
      disablePromo,
    };
    if (!captcha) {
      toast.error('captcha not verified !!!');
    } else if (!quantity || !total) {
      toast.error('quantity and total are required !!!');
    } else {
      const response = await setSimulator(data);
      console.log('response', JSON.stringify(response));
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('Transaction Created !!!');
        window.location.href = response?.data;
      }
    }
    setLoading(false);
  };

  const allo = async (actionType: string) => {
    const data: AlloTypes = {
      phoneNumber,
      point,
      actionType,
    };

    setAlloLoading(true);
    setAlloStatus('');
    if (!phoneNumber && !point) {
      toast.error('phone number are required !!!');
    } else {
      const response = await alloAction(data);
      if (!response.error) {
        setPointCurrent(response.data);
        setAlloStatus(
          actionType === 'add'
            ? 'Successfully added a data point.'
            : 'Successfully deducted a data point.'
        );
      }
    }
    setAlloLoading(false);
  };

  const getPoint = async () => {
    const data: AlloTypes = {
      phoneNumber,
    };
    const response = await alloBalancePoint(data);
    setPointCurrent(response.data);
  };

  const getTransactionStatus = async (id: string) => {
    setTransactionStatus('');
    setTransactionStatusLoading(true);
    const response = await transactionStatuses(id);

    setTransactionStatus(
      response.data
        .slice(0, 1)
        .map((element: any) => {
          return (
            <div key={element.reqId}>
              <div className="mb-1 md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                    Order Id
                  </label>
                </div>
                <div className="md:w-2/3">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold">
                    : {id}
                  </label>
                </div>
              </div>

              <div className="mb-1 md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                    Type
                  </label>
                </div>
                <div className="md:w-2/3">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold">
                    : {element.type}
                  </label>
                </div>
              </div>

              <div className="mb-1 md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                    Status
                  </label>
                </div>
                <div className="md:w-2/3">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold">
                    : {element.status}
                  </label>
                </div>
              </div>

              <div className="mb-1 md:flex md:items-center">
                <div className="md:w-1/3">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                    Amount
                  </label>
                </div>
                <div className="md:w-2/3">
                  <label className="text-blueGray-600 mb-2 block text-xs font-bold">
                    : {element.amount}
                  </label>
                </div>
              </div>
            </div>
          );
      })
    );

    setTransactionStatusLoading(false);

    getTransactions();

  };

  const getTransactions = async () => {
    const response = await transactionList();
    setTransactions(
      response.data
        .sort((a: TransactionTypes, b: TransactionTypes) => a.response.data.createdTime > b.response.data.createdTime ? -1 : 1)
        .filter((trx: TransactionTypes) => {
          return new Date(trx.response.data.createdTime).setHours(0,0,0,0) == new Date().setHours(0,0,0,0);
        })
        .slice(0, 5)
        .map((element: TransactionTypes) => {
          return (
            <li key={element.reqId}>
              {element.response.data.createdTime} - {element.orderRefId} - {element.trxType} - {element.trxStatus} - {element.requestData.customer.name} - {element.requestData.amount} -
              <a href={element.selectionsUrl} target="_blank" rel="noreferrer"
                className='text-blue-600 hover:text-blue-800 visited:text-purple-600'> Go to Page</a>
              <a href="#" 
                id = {element.reqId}
                onClick={() => {
                  void getTransactionStatus(element.reqId);
                  setShowTransactionModal(true);
                }}
                className='text-blue-600 hover:text-blue-800 visited:text-purple-600'> Check Status</a>  
            </li>
          );
      })
    );
  };


  useEffect(() => {
    document
      .querySelector('body')
      ?.classList.add('g-sidenav-show', 'g-sidenav-pinned');
    setTotal(quantity * price);

    getTransactions();
  }, [material, quantity, price]);

  return (
    <>
      <Navbar />
      <main>
        <div className="min-h-screen-25 pb-18 relative flex content-center items-center justify-center pt-16"></div>
        <section className="bg-blueGray-200 -mt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="mt-24 flex flex-wrap items-center">
            
              <div className="ml-auto mr-auto w-full md:w-5/12">
                <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Transaction Logs:</h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  {transactions}
                </ul>
              </div>

              <div className="ml-auto mr-auto w-full px-4 md:w-5/12 ">
                <h3 className="mb-2 mt-10 text-3xl font-semibold leading-normal">
                  Working with us is a pleasure
                </h3>
                <p className="text-blueGray-600 mb-4 mt-4 text-lg font-light leading-relaxed">
                  This page is a simulation of data inputted during the inquiry
                  process to the mega payment gateway.
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
                      onChange={(e) => {
                        setName(e.target.value);
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
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </div>

                  <div className="relative mb-3 mt-6 w-full">
                    <button
                      className="bg-blueGray-800 active:bg-blueGray-600 mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={() => {
                        void getPoint();
                        setShowModal(true);
                      }}
                    >
                      {' '}
                      Add/Deduction Point
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
                      onChange={(e) => {
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
                      onChange={(e) => {
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
                      onChange={(e) => {
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
                        onChange={(e) => {
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
                          onChange={(e) => {
                            setReccuringId(e.target.value);
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
                          onChange={(e) => {
                            setRetryPolicy(e.target.value);
                          }}
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
                          onChange={(e) => {
                            setOrderId(e.target.value);
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
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid">
                  <div className="relative mb-5 mt-5 w-full">
                    <ReCAPTCHA size='normal' sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} className='mx-auto' onChange={setCaptcha}
                      ref={recaptchaRef}/>
                  </div>
                </div>

                <div className="">
                  <div className="">
                    <button
                      type="button"
                      className="bg-blueGray-800 flex w-full items-center justify-center rounded-lg px-12 py-3 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:shadow-lg focus:outline-none focus:ring-2  focus:ring-offset-2"
                      name="button"
                      onClick={(e) => {
                        e.preventDefault();
                        void onSubmit();
                      }}
                    >
                      {isLoading ? (
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="mr-2 animate-spin"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                        </svg>
                      ) : null}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                  <h3 className="font-semibold">Add/Deduction Point</h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <div className="mb-1 md:flex md:items-center">
                    <div className="md:w-1/3">
                      <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                        Phone Number
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                        : {phoneNumber}
                      </label>
                    </div>
                  </div>

                  <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                      <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                        Current Point
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                        : {pointCurrent}
                      </label>
                    </div>
                  </div>

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
                      onChange={(e) => {
                        setPoint(e.target.value);
                      }}
                    />
                  </div>


                  { alloLoading ?     
                  <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="mr-2 animate-spin"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                    </svg> : null }

                  <p className="text-xs text-red-500">{alloStatus}</p>
                </div>
                {/*footer*/}
                <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => {
                      setPoint('');
                      setAlloStatus('');
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blueGray-800 active:bg-blueGray-600 mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      void allo('add');
                    }}
                  >
                    Add Point
                  </button>
                  <button
                    className="bg-blueGray-800 active:bg-blueGray-600 mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      void allo('deduct');
                    }}
                  >
                    Point Deduction
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}


      {showTransactionModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                  <h3 className="font-semibold">Transaction Status</h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowTransactionModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  {transactionStatus}

                  { transactionStatusLoading ?     
                    <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="mr-2 animate-spin"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                      </svg> : null }
                </div>    
                <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowTransactionModal(false)}
                    >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export { getServerSideProps };

export default Simulator;
