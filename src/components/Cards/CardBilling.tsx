import React from "react";
import Button from "../Elements/Button";
import Input from "../Elements/Input";

interface CardBillingProps {
  title: string;
  inputs: [];
  paymentTitle: string;
  defaultPaymentOpened: string;
  paymentOptions: [];
  // onPaymentChange: any;
  paymentTabColor: string;
  returnButton: object;
  orderButton: object;
}

export default function CardBilling(props: CardBillingProps) {
  const {
    title,
    inputs,
    paymentTitle,
    defaultPaymentOpened,
    paymentOptions,
    // onPaymentChange,
    // paymentTabColor,
    returnButton,
    orderButton,
  } = props;

  const [open, setOpen] = React.useState(defaultPaymentOpened);
  const [oldInTransition, setOldInTransition] = React.useState(false);
  const [newInTransition, setNewInTransition] = React.useState(false);

  type widthOptions = {
    [key: number]: string;
  };
  const widths: widthOptions = {
    1: "lg:w-1/12",
    2: "lg:w-2/12",
    3: "lg:w-3/12",
    4: "lg:w-4/12",
    5: "lg:w-5/12",
    6: "lg:w-6/12",
    7: "lg:w-7/12",
    8: "lg:w-8/12",
    9: "lg:w-9/12",
    10: "lg:w-10/12",
    11: "lg:w-11/12",
    12: "lg:w-12/12",
  };

  return (
    <>
      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
        <div className="flex-auto px-4 py-5">
          <form>
            <div className="container mx-auto px-4">
              <h3 className="mt-4 mb-6 text-3xl font-semibold">{title}</h3>
              <div className="-mx-4 flex flex-wrap">
                {inputs.map(
                  (
                    prop: { label: string; input: object; select: object },
                    key: string | number
                  ) => (
                    <div
                      key={key}
                      className={`"relative " + widths[prop.width] w-full px-4 pb-2`}
                    >
                      <label className="text-blueGray-700 mb-2 ml-1 block text-xs font-bold uppercase">
                        {prop?.label}
                      </label>
                      {prop.input && <Input {...prop.input} />}
                      {/* {prop.input && (
                      <input
                        placeholder={prop.input?.placeholder}
                        type="text"
                        className="border-blueGray-300 placeholder-blueGray-200 text-blueGray-700 focus:ring-lightBlue-500  focus:border-lightBlue-500 relative w-full rounded-md border border-solid bg-white px-3 py-2 text-sm outline-none transition duration-200 focus:ring-1 "
                      ></input>
                    )} */}
                      {/* {prop.select && <Select {...prop.select} />} */}
                      {prop.select && (
                        <div className="relative">
                          <div className="mb-3 pt-0">
                            <input
                              placeholder="Select Country"
                              type="text"
                              className="border-blueGray-300 placeholder-blueGray-200 text-blueGray-700 focus:ring-lightBlue-500  focus:border-lightBlue-500 relative w-full rounded-md border border-solid bg-white px-3 py-2 text-sm outline-none transition duration-200 focus:ring-1 "
                              value=""
                            />
                          </div>
                          <div
                            className="z-50 hidden"
                            data-popper-placement="bottom-start"
                          >
                            <div className=" min-w-48 absolute z-50 float-left origin-top-left scale-95 transform rounded-lg border bg-white p-2 text-left text-base opacity-0 shadow-lg transition-all duration-200 ease-in-out">
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Czech Republic
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Denmark
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Dominican Republic
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Iraq
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Israel
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Italy
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Jamaica
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Japan
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Madagascar
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Malta
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Norway
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Poland
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Portugal
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Romania
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Russian Federation
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Saint Lucia
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Samoa
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                San Marino
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Saudi Arabia
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Select country
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Spain
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Swaziland
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Sweden
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Turkey
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Uganda
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Ukraine
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                United Arab Emirates
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                United Kingdom
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                United States
                              </a>
                              <a
                                href="#pablo"
                                className="hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                              >
                                Viet Nam
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>

              <h3 className="mt-4 mb-6 text-3xl font-semibold">
                {paymentTitle}
              </h3>
              <ul className="mb-0 flex list-none flex-col flex-wrap pl-0 md:flex-row">
                {paymentOptions.map(
                  (prop: { tabName: string }, key: string | number) => (
                    <li
                      key={key}
                      className="-mb-px mr-2 flex-auto text-center last:mr-0"
                    >
                      <a
                        href="#pablo"
                        className={
                          "block rounded px-5 py-3 text-xs font-bold uppercase leading-normal shadow transition-all duration-500 ease-in-out sm:mb-4 md:mb-0"
                          // +
                          // {
                          //   [nonActiveColors[paymentTabColor]]: key !== open,
                          //   [activeColors[paymentTabColor]]: key === open,
                          // }
                        }
                        // onClick={(e) => toggleNew(e, key, prop.tabName)}
                      >
                        {prop.tabName}
                      </a>
                    </li>
                  )
                )}
              </ul>
              <div className="w-full">
                {paymentOptions.map(
                  (prop: { inputs: [] }, key: string | number) => (
                    <div
                      key={key}
                      className={`"my-8 ease-in-out" + { hidden: key
                      !==
                        open, block: key ===
                        open, "scale-0 opacity-0": key
                        === open && oldInTransition, "scale-100 opacity-100": key
                        === open
                          && newInTransition, } transform transition-all
                      duration-500`}
                    >
                      <div className="-mx-4 flex flex-wrap">
                        {prop.inputs.map(
                          (
                            inputProp: { label: string; input: object },
                            inputKey: string | number
                          ) => (
                            <div
                              key={inputKey}
                              className={`"relative " + widths[inputProp.width] w-full
                                px-4`}
                            >
                              <label className="text-blueGray-700 mb-2 ml-1 block text-xs font-bold uppercase">
                                {inputProp.label}
                              </label>
                              {inputProp.input && (
                                <Input {...inputProp.input} />
                              )}
                              {/* {inputProp.input && (
                            <input
                              placeholder={inputProp.input?.placeholder}
                              type="text"
                              className="border-blueGray-300 placeholder-blueGray-200 text-blueGray-700 focus:ring-lightBlue-500  focus:border-lightBlue-500 relative w-full rounded-md border border-solid bg-white px-3 py-2 text-sm outline-none transition duration-200 focus:ring-1 "
                            ></input>
                          )} */}
                              {/* {inputProp.select && <Select {...inputProp.select} />} */}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="mt-12 mb-8 flex justify-between">
                <Button {...returnButton} />
                {/* <button className="text-blueGray-800 bg-blueGray-200 border-blueGray-200 active:bg-blueGray-300 active:border-blueGray-300 mr-2 inline-block rounded-md border border-solid px-6 py-2 align-middle  text-sm font-bold uppercase shadow outline-none transition-all duration-150 ease-in-out last:mr-0 hover:shadow-lg focus:outline-none">
                  Return to cart
                </button> */}
                <Button {...orderButton} />
                {/* <button className="mr-2 inline-block rounded-md border border-solid border-pink-500 bg-pink-500 px-6 py-2 align-middle text-sm font-bold uppercase  text-white shadow outline-none transition-all duration-150 ease-in-out last:mr-0 hover:shadow-lg focus:outline-none active:border-pink-600 active:bg-pink-600">
                  Order now
                </button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
