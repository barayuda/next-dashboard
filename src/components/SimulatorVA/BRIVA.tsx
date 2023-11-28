import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { setLocalStorage } from '../../services/auth';
import { brivaInquiry } from '../../services/simulator';
import { findByAccRef } from '../../services/mega-ipg';

const BRIVA = () => {
  const router = useRouter();
  const [va, setVa] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pencetBenar = async () => {
    setIsLoading(true);
    try {
    console.log('Pencet bener ');
    const dataFindByAccRef = {
      trxType: 'getby.account_ref',
      accountRef: va,
    };
    
    console.log('dataFindByAccRef', dataFindByAccRef);
    const callApiSpring = await findByAccRef(dataFindByAccRef);
    console.log('response', callApiSpring.data);
    if (!callApiSpring.error) {
      // if (callApiSpring?.data?.statusCode === '00') {
      // }
      setLocalStorage('briva', callApiSpring.data);
      void router.push('/simulator/briva/confirm');
    }
  }catch(error){
    throw error
  }
  finally {
    setIsLoading(false); // Stop loading
  }
  };
  return (
    <div className="container mx-auto h-screen px-4">
      <div className="flex h-full content-center items-center justify-center">
        <div className="w-full px-4 lg:w-8/12">
          <div className="bg-blueGray-200 relative mb-10 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
            <div className="grid grid-cols-10 rounded-lg bg-slate-600 p-5 text-white">
              <div className="col-span-10 p-5 text-center text-xl text-white">
                BRI VA Simulator
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
                  <div className="grid grid-cols-4">
                    <div className="col-span-4 p-5">
                      SILAHKAN MEMASUKKAN NOMOR VIRTUAL ACCOUNT ANDA
                    </div>
                    <div>&nbsp;</div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        name="va_nbr"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Nomor VA"
                        value={va}
                        onChange={(event) => setVa(event.target.value)}
                      />
                    </div>
                    <div>&nbsp;</div>
                    <div className="text-bold mb-2 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div className="col-span-2">&nbsp;</div>
                    <div className="text-bold mb-2 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
                      ---&gt;
                    </div>
                    <div className="text-bold mb-1 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div className="col-span-2">&nbsp;</div>
                    <div className="text-bold mb-1 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
                      BENAR ---&gt;
                    </div>
                    <div className="text-bold mb-1 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div className="text-bold mb-1 inline-block h-10 py-2 pr-5 text-right align-middle font-extrabold">
                      SALAH ---&gt;
                    </div>
                    <div className="text-bold mb-2 inline-block h-10 py-2 pl-5 text-left align-middle font-extrabold">
                      &lt;---
                    </div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
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
                        void pencetBenar();
                      }}
                      className="h-10 w-16 bg-white hover:bg-orange-400"
                    ></button>
                  </div>
                  <div>
                    <button className="h-10 w-16 bg-white hover:bg-orange-400"></button>
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

export default BRIVA;
