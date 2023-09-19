/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { NextPage } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';

import Navbar from '../../components/Navbars/AuthNavbar';
import Footer from '../../components/Footers/Footer';

const FrameComponent: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const loadSimulatorData = async () => {
      try {
        const ROOT_API = process.env.NEXT_PUBLIC_API || 'http://10.14.21.56:4010';
        const url = `${ROOT_API}/simulator/${id}`;
        const response = await axios.get(url);
        console.log('response', response);
        setStatus(response?.data?.data?.status);
      } catch (error) {
        console.error('Error fetching simulator data:', error);
      }
    };

    if (id) {
      loadSimulatorData();
    }
  }, [id]);

  console.log('Test', status);

  const backButton = (
    <Link href="/simulator">
      <a className="text-blue-500 hover:underline mt-4 inline-block">
        Back to Dashboard
      </a>
    </Link>
  );

  if (status === 'paid') {
    return (
      <div className="relative bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-pink-300 via-red-300 to-yellow-200 w-full h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              className="w-[200px] h-[230px] mb-8"
              alt=""
              src="/assets/img/SucessMark-removebg-preview.png"
              width={200}
              height={230}
            />
          </div>
          <h1 className="text-4xl font-medium mb-4">Payment Success</h1>
          <p className="text-lg font-medium">Thank you for your purchase</p>
          {/* {data && <p>ID: {data.id}</p>} */}
          {backButton}
        </div>
      </div>
    );
  } else if (status === 'unpaid') {
    return (
      <div className="relative bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-pink-300 via-red-300 to-yellow-200 w-full h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              className="w-[200px] h-[230px] mb-8"
              alt=""
              src="/assets/img/Xmark-removebg-preview.png"
              width={200}
              height={230}
            /> 
          </div>
          <h1 className="text-4xl font-medium mb-4">Huh Naosawsdsds</h1>
          <p className="text-lg font-medium">Please try again</p>
          {/* {data && <p>ID: {data.id}</p>} */}
          {backButton}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default FrameComponent;
