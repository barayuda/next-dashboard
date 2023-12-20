import React from 'react';

import Footer from '../components/Footers/Footer';

const Home = () => {
  return (
    <>
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
              </div>
            </div>
          </div>
        </div>
     
      </section>
      <Footer />
    </>
  );
};

export default Home;
