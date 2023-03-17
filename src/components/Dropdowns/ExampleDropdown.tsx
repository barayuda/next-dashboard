/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import Link from "next/link";
import React, { RefObject } from "react";
import { createPopper } from "@popperjs/core";
import type { StrictModifiers } from "@popperjs/core";

interface DropdownProps {
  color: string;
}

const Dropdown = (props: DropdownProps) => {
  const { color } = props;
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef() as RefObject<HTMLAnchorElement>;
  const popoverDropdownRef = React.createRef() as RefObject<HTMLDivElement>;
  const openDropdownPopover = () => {
    createPopper<StrictModifiers>(
      btnDropdownRef.current as Element,
      popoverDropdownRef.current as HTMLElement,
      {
        placement: "bottom-start",
      }
    );
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 sm:w-6/12 md:w-4/12">
          <div className="relative inline-flex w-full align-middle">
            <button
              className={
                "mr-1 mb-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none " +
                bgColor
              }
              type="button"
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {color === "white" ? "White Dropdown" : color + " Dropdown"}
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "z-50 float-left mt-1 list-none rounded py-2 text-left text-base shadow-lg"
              }
              style={{ minWidth: "12rem" }}
            >
              <Link
                href="#pablo"
                className={
                  "block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={(e) => e.preventDefault()}
              >
                Action
              </Link>
              <Link
                href="#pablo"
                className={
                  "block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={(e) => e.preventDefault()}
              >
                Another action
              </Link>
              <Link
                href="#pablo"
                className={
                  "block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={(e) => e.preventDefault()}
              >
                Something else here
              </Link>
              <div className="border-blueGray-800 my-2 h-0 border border-t-0 border-solid opacity-25" />
              <Link
                href="#pablo"
                className={
                  "block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={(e) => e.preventDefault()}
              >
                Seprated link
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function ExampleDropdown() {
  return (
    <>
      <div>
        <div className="mt-8">
          <h1 className="mt-8 mb-2 text-3xl font-semibold">React Dropdown</h1>
          <p className="lead text-blueGray-500 text-lg">
            An interactive menu that opens to the bottom of a button using
            React.
          </p>
          <hr className="border-b-1 border-blueGray-200 mt-6 mb-8" />
        </div>
        <h2 className="text-blueGray-700 mb-2 mt-8 text-xl font-semibold">
          Dropdown Examples
        </h2>
        <p className="text-blueGray-600">
          For this component to properly work, you will need to install{" "}
          <code>@popperjs/core</code> into your project. Please run the
          following:
          <br />
          <code className="text-red-500">npm i -E @popperjs/core@2.9.1</code>
        </p>
        <hr className="border-b-1 border-blueGray-200 mt-6 mb-8" />
      </div>
      <Dropdown color="white" />
      <hr className="border-b-1 border-blueGray-200 mt-6 mb-8" />
    </>
  );
}
