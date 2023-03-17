import React from "react";
import Link from "next/link";

// components

import Navbar from "../../../components/Navbars/IndexNavbar";
import Footer from "../../../components/Footers/Footer";
import Image from "next/image";

import { HiHeart } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CardInvoice from "../../../components/Cards/CardInvoice";

const InvoiceList = () => {
  const cardinvoice = {
    image:
      "https://demos.creative-tim.com/notus-pro-react/static/media/ct-logo-text-black.3f86d99c.png",
    address: "St. Independence Embankment, 050105 Bucharest, Romania",
    phone: "tel: +4 (074) 1090873",
    invoice: {
      text: "Invoice no",
      id: "#0453119",
    },
    billing: {
      title: "Billed to:",
      name: "James Thompson",
      address: "Bld Mihail Kogalniceanu, 7652 Bucharest, Romania",
    },
    invoiceDate: {
      text: "Invoice date:",
      date: "06/03/2021",
    },
    dueDate: {
      text: "Due date:",
      date: "11/03/2021",
    },
    footerTitle: "Thank you!",
    footerDescriprion: "If you encounter any issues can contact us",
    contact: [
      {
        type: "email:",
        info: "support@creative-tim.com",
      },
    ],
    totalCount: {
      text: "Total",
      info: "$750",
    },
    tableHead: ["Item", "Qty", "Rate", "Amount"],
    tableBody: [
      ["Premium Support", "1", "$9.00", "$9.00"],
      ["Notus PRO React", "2", "$150.00", "$300.00"],
      ["Parts for service", "1", "$89.00", "$89.00"],
    ],
  };
  return (
    <>
      <Navbar />
      <main>
        <section className="min-h-screen-60 max-h-440-px relative flex items-center pt-32 pb-48">
          <div className="bg-blueGray-900 z-1 absolute left-0 top-0 block h-full w-full opacity-75"></div>
          <div
            className="bg-blueGray-800 bg-50 absolute z-0 h-full w-full bg-cover"
            style={{
              backgroundImage:
                "url('https://demos.creative-tim.com/notus-pro-react/static/media/nathan-dumlao.4d06fca5.jpg')",
            }}
          ></div>
          <div className="z-3 container relative mx-auto mb-16 h-full px-4 text-center text-white">
            <div className="-mx-4 flex flex-wrap justify-center">
              <div className="relative w-full px-4 md:w-8/12 lg:w-6/12">
                <h1 className="text-4xl font-bold leading-tight">Invoice</h1>
                <p className="pt-2 text-lg opacity-75">
                  Everyone’s born confident, and everything’s taken away from
                </p>
              </div>
            </div>
          </div>
          <div className="z-2 absolute bottom-0 w-full">
            {/* <Skew color={skewColor} /> */}
          </div>
        </section>

        <section className="bg-blueGray-100 z-2 relative py-12">
          <div className="container mx-auto -mt-64 px-4">
            <div className="-mx-4 flex flex-wrap">
              <div className="relative mx-auto w-full px-4 lg:w-10/12">
                <CardInvoice {...cardinvoice} />
                <div className="float-right">
                  <button color="pink" onClick={() => window.print()}>
                    <i className="fas fa-print mr-2"></i>
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default InvoiceList;
