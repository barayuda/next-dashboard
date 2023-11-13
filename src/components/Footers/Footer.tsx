import Link from 'next/link';
import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <footer className="bg-blueGray-200 relative pt-8 pb-6">
        <div
          className="pointer-events-none absolute bottom-auto top-0 left-0 right-0 -mt-20 h-20 w-full overflow-hidden"
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
        <div className="container mx-auto px-4">
          <hr className="border-blueGray-300 my-6" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="mx-auto w-full px-4 text-center md:w-4/12">
              <div className="text-blueGray-500 py-1 text-sm font-semibold">
                Copyright © {new Date().getFullYear()} Bank Mega by{' '}
                <Link
                  href="https://www.bankmega.com"
                  className="text-blueGray-500 hover:text-blueGray-800"
                >
                  ITEC - CDS Developer
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
