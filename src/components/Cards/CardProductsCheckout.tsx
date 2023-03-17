import React from "react";
import PropTypes from "prop-types";
import Input from "../Elements/Input";
import Button from "../Elements/Button";

// components

interface CardProductsCheckoutProps {
  images: { image: string; title: string; subtitle: string; price: string }[];
  discount: { text: string; input: object; button: object };
  details: { text: string; info: string }[][];
}

export default function CardProductsCheckout(props: CardProductsCheckoutProps) {
  const { images, discount, details } = props;

  return (
    <>
      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
        <div className="flex-auto px-4 py-5">
          {images.map(
            (
              prop: {
                image: string;
                title: string;
                subtitle: string;
                price: string;
              },
              key: number
            ) => (
              <div key={key} className="my-4 flex items-center">
                <img src={prop.image} className="mr-4 w-20 p-2" alt="..." />
                <div className="flex-1">
                  <div className="justify-between">
                    <h6 className="mb-1 text-xl font-semibold leading-tight">
                      {prop.title}
                    </h6>
                    <p className="text-blueGray-500 text-xs font-bold uppercase">
                      {prop.subtitle}
                    </p>
                  </div>
                </div>
                <span className="text-blueGray-700">{prop.price}</span>
              </div>
            )
          )}
          {discount && (
            <>
              <hr className="bg-blueGray-300 mt-6 mb-4 ml-0" />
              <div className="relative mb-0 pt-0">
                <label className="text-blueGray-700 mb-2 ml-1 block text-xs font-bold uppercase">
                  {discount.text}
                </label>
                <div className="relative mb-2 flex w-full flex-wrap items-stretch">
                  <div className="mr-2">
                    <Input {...discount.input} />
                    {/* <div className="mb-3 pt-0">
                      <input
                        placeholder="Discount code"
                        type="text"
                        className="border-blueGray-300 placeholder-blueGray-200 text-blueGray-700 focus:ring-lightBlue-500  focus:border-lightBlue-500 relative w-full rounded-md border border-solid bg-white px-3 py-2 text-sm outline-none transition duration-200 focus:ring focus:ring-1 "
                      />
                    </div> */}
                  </div>
                  <div className="mb-0">
                    <Button {...discount.button} />
                    {/* <button className="mr-2 inline-block rounded-md border border-solid border-pink-500 bg-pink-500 px-6 py-2 align-middle text-sm font-bold uppercase  text-white shadow outline-none transition-all duration-150 ease-in-out last:mr-0 hover:shadow-lg focus:outline-none active:border-pink-600 active:bg-pink-600">
                      Apply
                    </button> */}
                  </div>
                </div>
              </div>
            </>
          )}
          {details.map(
            (prop: { text: string; info: string }[], key: number) => (
              <div key={key}>
                <hr className="bg-blueGray-300 mt-4 mb-2 ml-0" />
                {prop.map(
                  (
                    propDetails: { text: string; info: string },
                    propKey: number
                  ) => (
                    <div key={propKey} className="flex justify-between">
                      <h6 className="text-blueGray-700 mt-0 mb-2 leading-normal">
                        {propDetails.text}
                      </h6>
                      <h6 className="mt-0 mb-2 leading-normal">
                        {propDetails.info}
                      </h6>
                    </div>
                  )
                )}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

CardProductsCheckout.defaultProps = {
  images: [],
  details: [],
};

CardProductsCheckout.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      price: PropTypes.string,
    })
  ),
  discount: PropTypes.shape({
    text: PropTypes.string,
    // props to pass to the Input component
    input: PropTypes.object,
    // props to pass to the Button component
    button: PropTypes.object,
  }),
  details: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        info: PropTypes.string,
      })
    )
  ),
};
