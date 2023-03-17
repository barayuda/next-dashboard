import React from "react";
import Link from "next/link";

// components

import Navbar from "../../components/Navbars/IndexNavbar";
import Footer from "../../components/Footers/Footer";
import Image from "next/image";
import CardProductsCheckout from "../../components/Cards/CardProductsCheckout";
import CardBilling from "../../components/Cards/CardBilling";

const Checkout = () => {
  const cardproductscheckout = {
    images: [
      {
        image:
          "https://demos.creative-tim.com/notus-pro-react/static/media/gucci.df54712f.png",
        title: "Shorts",
        subtitle: "Small",
        price: "$290",
      },
      {
        image:
          "https://demos.creative-tim.com/notus-pro-react/static/media/jacket.132b3c72.png",
        title: "Jacket",
        subtitle: "Medium",
        price: "$1.000",
      },
    ],
    discount: {
      text: "Discount",
      input: {
        placeholder: "Discount code",
        type: "text",
      },
      button: {
        children: "Apply",
        color: "pink",
      },
    },
    details: [
      [
        {
          text: "Subtotal",
          info: "$1.290",
        },
        {
          text: "Shipping",
          info: "$200",
        },
      ],
      [
        {
          text: "Total",
          info: "$1.490",
        },
      ],
    ],
  };

  const cardbilling = {
    title: "Billing address",
    inputs: [
      {
        width: 6,
        label: "First name*",
        input: {
          type: "text",
          placeholder: "E.g. Smith",
        },
      },
      {
        width: 6,
        label: "Last name*",
        input: {
          type: "text",
          placeholder: "E.g. John",
        },
      },
      {
        width: 6,
        label: "Email address*",
        input: {
          type: "email",
          placeholder: "E.g. email@email.email",
        },
      },
      {
        width: 6,
        label: "Phone*",
        input: {
          type: "text",
          placeholder: "E.g. +1 (5417) 543 010",
        },
      },
      {
        width: 8,
        label: "Street address*",
        input: {
          type: "text",
          placeholder: "E.g. 420 Long Beach, CA",
        },
      },
      {
        width: 4,
        label: "Postcode/Zip*",
        input: {
          type: "text",
          placeholder: "E.g. 340112",
        },
      },
      {
        width: 4,
        label: "Apt, suite, etc.",
        input: {
          type: "text",
          placeholder: "E.g. YC7B 3UT",
        },
      },
      {
        width: 4,
        label: "City*",
        input: {
          type: "text",
          placeholder: "E.g. London",
        },
      },
      {
        width: 4,
        label: "Country*",
        select: {
          placeholder: "Select Country",
          items: [
            "Czech Republic",
            "Denmark",
            "Dominican Republic",
            "Iraq",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Madagascar",
            "Malta",
            "Norway",
            "Poland",
            "Portugal",
            "Romania",
            "Russian Federation",
            "Saint Lucia",
            "Samoa",
            "San Marino",
            "Saudi Arabia",
            "Select country",
            "Spain",
            "Swaziland",
            "Sweden",
            "Turkey",
            "Uganda",
            "Ukraine",
            "United Arab Emirates",
            "United Kingdom",
            "United States",
            "Viet Nam",
          ],
        },
      },
    ],
    paymentTitle: "Payment method",
    defaultPaymentOpened: 0,
    paymentOptions: [
      {
        tabName: "Credit Card",
        inputs: [
          {
            width: 12,
            label: "Card Number",
            input: {
              type: "tel",
              inputMode: "numeric",
              pattern: "[0-9s]{13,19}",
              maxLength: "19",
              placeholder: "E.g. 1234 1234 1234 1234",
            },
          },
          {
            width: 7,
            label: "Card holder",
            input: {
              type: "text",
              placeholder: "E.g. SMITH JOHN",
            },
          },
          {
            width: 3,
            label: "Expiration",
            input: {
              type: "text",
              placeholder: "E.g. 01/24",
            },
          },
          {
            width: 2,
            label: "CVC",
            input: {
              type: "text",
              placeholder: "E.g. 123",
            },
          },
        ],
      },
      {
        tabName: "PayPal",
        inputs: [
          {
            width: 12,
            label: "Email",
            input: {
              type: "email",
              placeholder: "E.g. email@email.email",
            },
          },
        ],
      },
    ],
    paymentTabColor: "pink",
    returnButton: {
      color: "light",
      children: "Return to cart",
    },
    orderButton: {
      color: "pink",
      children: "Order now",
    },
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
                <h1 className="text-4xl font-bold leading-tight">Checkout</h1>
                <p className="pt-2 text-lg opacity-75">
                  We’ll show you the checkout page optimization tips that’ll
                  make your visitors want.
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
              <div className="relative w-full px-4 lg:w-4/12">
                <h3 className="mt-0 mb-2 text-4xl font-normal leading-normal text-white">
                  Order summary
                </h3>
                <CardProductsCheckout {...cardproductscheckout} />
              </div>
              <div className="relative w-full px-4 lg:w-8/12">
                {/* <CardBilling {...cardbilling} /> */}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
