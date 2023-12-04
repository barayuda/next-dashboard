/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../../services/auth';
import { vaMega, xenditSimulatePayment } from '../../services/simulator';
import Cookies from 'js-cookie';
import axios from 'axios';

const MEGAVAConfirm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);
  const [va, setVa] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [amount1, setAmount1] = useState(0);
  const [externalID, setExternalID] = useState('');
  const [billAmount,setBillAmount] = useState('');
  const [billAmount2,setBillAmount2] = useState('');
//   const [cardNum,setCardNum] = useState('');
  const [time,setTime] = useState('');
  const [billStatus,setBillStatus] = useState('');
  const [operation,setOperation] = useState('');
  const [customerID,setCustomerID] = useState('');
  const [processingCode,setProcessingCode] = useState('');
  const [d1,setD1] = useState('');
  const [date,setDate] = useState('');
  const [d2,setD2] =useState('');
  const [descRepeat,setDescRepeat] = useState('');
  const [d3,setD3] = useState('');
  const [tranceNum,setTraceNum] = useState('');
  const [instCode,setInstCode] = useState('');
  const [accCredit,setAccCredit] = useState('');
  const [terminalID,setTerminalID] = useState('');
  const [accDebit,setAccDebit] = useState('');
  const [datePlus,setDatePlus] = useState('');
  const [customerName,setCustomerName] = useState('');
  const [amountRepeating,setAmountRepeating] = useState('');

  useEffect(() => {
    const datava = getLocalStorage('megava');
    if (
      datava?.data?.inquiryStatus !== undefined &&
      datava?.data?.statusCode !== undefined &&
      datava?.data?.accountRef !== undefined &&
      datava?.data?.amount !== undefined &&
    //   datava?.data?.payinquiryData?.decryptedData(?.response?.external_id !==
    //     undefined &&
      datava?.data?.statusCode === '00'
    ) {
      setIsError(false);
      setVa(datava?.data?.accountRef);
      setDescription(
        'Pembayaran : ' +
          datava?.data?.configData?.merchantData?.merchantName ||
          'Unknown Merchant'
      );
      setAmount(datava?.data?.amount);
      setName(
        datava?.data?.payinquiryData?.decryptedData?.response?.name ||
          'Unknown Name'
      );
    //   setExternalID(
    //     datava?.data?.payinquiryData?.decryptedData?.response?.external_id
    //   );
    // setBillAmount("0");
    // setCardNum(datava?.data?.);
    // setBillAmount(amount);
    // setBillAmount2(amount);
    // setTime(datava?.data?.createdAt);
    // setBillStatus(datava?.data?.payinquiryData?.decryptedData?.response?.RC);
    // setOperation("payment");
    setCustomerID(datava?.data?.payinquiryData?.decryptedData?.response?.vacctno);
    // setProcessingCode("171000");
    // setD1("00000000000000000000IDRA");
    // setDate("");
    // setD2("010190012001081++++++++++++++++++++");
    // setDescRepeat("03");
    // setD3("010190011555550++++++++++++++++++++");
    setTraceNum(datava?.data?.payinquiryData?.decryptedData?.response?.billing_id);
    // setInstCode("VA");
    // setAccCredit("010190012001081");
    // setTerminalID("9481");
    // setAccDebit("010740021014062");
    // setDatePlus("0715");
    setCustomerName(datava?.data?.payinquiryData?.decryptedData?.request?.name);
    // setAmountRepeating("02");
    } else {
      setDescription('ERROR ' + datava?.data?.statusCode);
    }

    console.log('data', datava);
  }, []);

  const pencetKembali = () => {
    removeLocalStorage('megava');
    void router.push('/simulator/megava');
  };

  const pencetBayar = async () => {
    setIsLoading(true);
    const dataReq = {
      amount,
      customerID,     
      tranceNum,
    };
    const tokenss = Cookies.get('tokenss');
    const parsedAmount = parseFloat(amount);
    setAmount1(parsedAmount)
    try{

      const callApi = await axios.post("/api/vaMega", {
        customerID,     
        tranceNum,
        parsedAmount,
        tokenss
      });
      const responseData: string = callApi.data;
  
      const parsedData = JSON.parse(responseData);
      console.log("Gru",parsedData);
  
      if (parsedData) {
        setLocalStorage('megava', {
          ...parsedData.Data,
          details: { va, amount, name },
        });
        void router.push('/simulator/megava/payment');
      }
  

    }catch(error){
      throw error
    }
    finally {
      setIsLoading(false); // Stop loading
    }
   
   
    // console.log("callApi",callApi)

    //   setLocalStorage('megava',{
    //     details: { va, amount, name },
    //   })
    //   void router.push('/simulator/megava/payment');

  }
   
  //   if (!callApi.error) {
  //     setLocalStorage('megava', {
  //       ...callApi,
  //       details: { va, amount, name },
  //     });
  //     void router.push('/simulator/megava/payment');
  //   }
  //   console.log("Gak sabi Suhu")
  // };

  return (
    <div className="container mx-auto h-screen px-4">
      <div className="flex h-full content-center items-center justify-center">
        <div className="w-full px-4 lg:w-8/12">
          <div className="bg-blueGray-200 relative mb-10 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
            <div className="grid grid-cols-10 rounded-lg bg-slate-600 p-5 text-white">
              <div className="col-span-10 p-5 text-center text-xl text-white">
                MEGA VA Simulator
              </div>
              <div className="relative h-full">
                <div className="absolute bottom-0 right-0 mr-5 grid grid-flow-col grid-rows-4 justify-items-end">
                  <div>
                    <button className="h-10 w-16 bg-white hover:bg-orange-400"></button>
                  </div>
                  <div>
                    <button className="h-10 w-16 bg-white hover:bg-orange-400"></button>
                  </div>
                  <div>
                    <button className="h-10 w-16 bg-white hover:bg-orange-400"></button>
                  </div>
                  <div>
                    <button className="h-10 w-16 bg-white hover:bg-orange-400"></button>
                  </div>
                </div>
              </div>
              <div className="col-span-8 ">
              <div className="col-center">
                  {isLoading ? (
                    <div>Loading Please Wait....</div>
                  ) : (
                    <div>
                      {/* Your regular component content */}
                    </div>
                  )}
                </div>
                <div className="rounded-md bg-blue-500 text-center text-white">
                  <div className="grid grid-cols-6">
                    <div className="col-span-6 p-5">
                      {isError ? 'ERROR' : 'BERIKUT DETAIL TRANSAKSI ANDA'}
                    </div>
                    <div>&nbsp;</div>
                    <div className="col-span-4 p-5">
                      {description}
                      {va.length > 0 && (
                        <div className="grid grid-cols-2">
                          <div className="text-left">Name</div>
                          <div className="text-left">: {name}</div>
                          <div className="text-left">VA No</div>
                          <div className="text-left">: {va}</div>
                          <div className="text-left">Amount</div>
                          <div className="text-left">: {amount}</div>
                        </div>
                      )}
                    </div>
                    <div>&nbsp;</div>
                  </div>
                  <div className="grid grid-cols-6">
                    <div className="text-bold col-span-2 mb-2 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div className="col-span-2">&nbsp;</div>
                    <div className="text-bold col-span-2 mb-2 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
                      ---&gt;
                    </div>
                    <div className="text-bold col-span-2 mb-1 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div className="col-span-2">&nbsp;</div>
                    <div className="text-bold col-span-2 mb-1 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
                      BAYAR ---&gt;
                    </div>
                    <div className="text-bold col-span-2 mb-1 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div className="text-bold col-span-2 mb-1 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
                      KEMBALI ---&gt;
                    </div>
                    <div className="text-bold col-span-2 mb-2 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div className="text-bold col-span-2 mb-2 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
                      ---&gt;
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-full">
                <div className="absolute bottom-0 left-0 ml-5 grid grid-flow-col grid-rows-4 justify-items-end">
                  <div>
                    <button className="h-10 w-16 bg-white hover:bg-orange-400"></button>
                  </div>
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        void pencetBayar();
                      }}
                      className="h-10 w-16 bg-white hover:bg-orange-400"
                    ></button>
                  </div>
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        void pencetKembali();
                      }}
                      className="h-10 w-16 bg-white hover:bg-orange-400"
                    ></button>
                  </div>
                  <div>
                    <button className="h-10 w-16 bg-white hover:bg-orange-400"></button>
                  </div>
                </div>
              </div>
              <div className="col-span-10 p-5 text-center text-xl text-white">
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MEGAVAConfirm;
