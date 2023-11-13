import React from 'react';
import Link from 'next/link';

import IndexNavbar from '../components/Navbars/IndexNavbar';
import Footer from '../components/Footers/Footer';



const Home = () => {
  return (
    <>
      <IndexNavbar />
      <section className="header max-h-860-px relative flex h-screen items-center pt-16">
      <style>
          {`
            body {
              background-image: url(/assets/img/gaktau2.jpg);
              background-size: cover;
              background-repeat: no-repeat;
            }
          `}
        </style>
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="w-full px-4 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="pt-32 sm:pt-0">
              <h2 className="text-blueGray-600 text-4xl font-semibold">
                Mega IPG - Bank Mega <br />
                Internet Payment Gateway for <br />
                Trans Corp and Special Merchants.
              </h2>
              <p className="text-blueGray-500 mt-4 text-lg leading-relaxed">
              Mega IPG: The payment gateway of the future. Seamlessly secure and lightning-fast, it transforms payments into pure magic, ensuring your financial journey is swift and secure.
               
              </p>
              <div className="mt-12">
                <a
                  href="/simulator"
                  target="_blank"
                  rel="noreferrer"
                  className="get-started bg-blueGray-400 active:bg-blueGray-500 mr-1 mb-1 rounded px-6 py-4 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                >
                 IPG Simulator
                </a>
                <a
                  href="/admin/dashboard"
                  className="github-star bg-blueGray-700 active:bg-blueGray-600 ml-1 mr-1 mb-1 rounded px-6 py-4 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none"
                  target="_blank"
                  rel="noreferrer"
                >
                 IPG Admin Menu
                </a>
              </div>
            </div>
          </div>
          {/* <img
          className="b-auto max-h-860-px absolute top-0 right-0 -mt-48 w-10/12 pt-16 sm:mt-0 sm:w-6/12"
          src="/assets/img/gaktau1.jpg"
          alt="..."
        /> */}
        </div>
     
      </section>
      <Footer />
    </>
  );
};

export default Home;
