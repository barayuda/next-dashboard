/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getLocalStorage, removeLocalStorage } from '../../services/auth';

const BNIVAPayment = () => {
  const router = useRouter();
  const [isError, setIsError] = useState(true);
  const [va, setVa] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('0.00');

  useEffect(() => {
    const data = getLocalStorage('bniva');
    if (
      data?.response?.status !== undefined &&
      data?.response?.status === 'COMPLETED'
    ) {
      setIsError(false);
      setVa(data?.details?.va || 'XXX');
      setDescription('Pembayaran Berhasil');
      setAmount(data?.details?.amount || '0.00');
      setName(data?.details?.name || 'Unknown');
    } else {
      setDescription('Pembayaran Gagal');
    }

    console.log('data', data);
  }, []);

  const pencetKembali = () => {
    removeLocalStorage('bniva');
    void router.push('/simulator/bniva');
  };

  return (
    <div className="container mx-auto h-screen px-4">
      <div className="flex h-full content-center items-center justify-center">
        <div className="w-full px-4 lg:w-8/12">
          <div className="bg-blueGray-200 relative mb-10 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
            <div className="grid grid-cols-10 rounded-lg bg-slate-600 p-5 text-white">
              <div className="col-span-10 p-5 text-center text-xl text-white">
                BNI VA Simulator
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
                      {isError ? 'ERROR' : 'SUKSES'}
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
                    <div className="text-bold mb-2 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div className="col-span-3">&nbsp;</div>
                    <div className="text-bold col-span-2 mb-2 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
                      ---&gt;
                    </div>
                    <div className="text-bold mb-1 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div className="col-span-4">&nbsp;</div>
                    <div className="text-bold mb-1 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
                      ---&gt;
                    </div>
                    <div className="text-bold mb-1 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div className="col-span-3">&nbsp;</div>
                    <div className="text-bold col-span-2 mb-1 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
                      KEMBALI ---&gt;
                    </div>
                    <div className="text-bold mb-2 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div className="col-span-4">&nbsp;</div>
                    <div className="text-bold mb-2 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
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

export default BNIVAPayment;
