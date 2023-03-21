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
import { xenditSimulatePayment } from '../../services/simulator';

const MANDIRIVAConfirm = () => {
  const router = useRouter();
  const [isError, setIsError] = useState(true);
  const [va, setVa] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [externalID, setExternalID] = useState('');

  useEffect(() => {
    const datava = getLocalStorage('mandiriva');
    if (
      datava?.data?.inquiryStatus !== undefined &&
      datava?.data?.statusCode !== undefined &&
      datava?.data?.accountRef !== undefined &&
      datava?.data?.amount !== undefined &&
      datava?.data?.payinquiryData?.decryptedData?.response?.external_id !==
        undefined &&
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
      setExternalID(
        datava?.data?.payinquiryData?.decryptedData?.response?.external_id
      );
    } else {
      setDescription('ERROR ' + datava?.data?.statusCode);
    }

    console.log('data', datava);
  }, []);

  const pencetKembali = () => {
    removeLocalStorage('mandiriva');
    void router.push('/simulator/mandiriva');
  };

  const pencetBayar = async () => {
    console.log('Pencet bener ');
    const dataReq = {
      amount, //10600,
    };
    console.log('dataReq', dataReq);
    const callApi = await xenditSimulatePayment(dataReq, externalID);
    console.log('response', callApi.data);
    if (!callApi.error) {
      setLocalStorage('mandiriva', callApi.data);
      void router.push('/simulator/mandiriva/payment');
    }
  };

  return (
    <div className="container mx-auto h-screen px-4">
      <div className="flex h-full content-center items-center justify-center">
        <div className="w-full px-4 lg:w-8/12">
          <div className="bg-blueGray-200 relative mb-10 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
            <div className="grid grid-cols-10 rounded-lg bg-slate-600 p-5 text-white">
              <div className="col-span-10 p-5 text-center text-xl text-white">
                MANDIRI VA Simulator
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

export default MANDIRIVAConfirm;
