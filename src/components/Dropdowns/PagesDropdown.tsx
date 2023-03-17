/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { RefObject } from "react";
import Link from "next/link";
import { createPopper } from "@popperjs/core";
import type { StrictModifiers } from "@popperjs/core";

const PagesDropdown = () => {
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
  return (
    <>
      <Link
        className="lg:hover:text-blueGray-200 text-blueGray-700 flex items-center px-3 py-4 text-xs font-bold uppercase lg:py-2 lg:text-white"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        Demo Pages
      </Link>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "min-w-48 z-50 float-left list-none rounded bg-white py-2 text-left text-base shadow-lg"
        }
      >
        <span
          className={
            "text-blueGray-400 block w-full whitespace-nowrap bg-transparent px-4 pt-2 pb-0 text-sm font-bold"
          }
        >
          Admin Layout
        </span>
        <Link
          href="/admin/dashboard"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/admin/settings"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Settings
        </Link>
        <Link
          href="/admin/tables"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Tables
        </Link>
        <Link
          href="/admin/maps"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Maps
        </Link>
        <div className="border-blueGray-100 mx-4 my-2 h-0 border border-solid" />
        <span
          className={
            "text-blueGray-400 block w-full whitespace-nowrap bg-transparent px-4 pt-2 pb-0 text-sm font-bold"
          }
        >
          Auth Layout
        </span>
        <Link
          href="/auth/login"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Register
        </Link>
        <div className="border-blueGray-100 mx-4 my-2 h-0 border border-solid" />
        <span
          className={
            "text-blueGray-400 block w-full whitespace-nowrap bg-transparent px-4 pt-2 pb-0 text-sm font-bold"
          }
        >
          No Layout
        </span>
        <Link
          href="/landing"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Landing
        </Link>
        <Link
          href="/profile"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Profile
        </Link>
        <Link
          href="/simulator"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Simulator
        </Link>
        <Link
          href="/blog"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Blog
        </Link>
        <Link
          href="/portfolio"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Portfolio
        </Link>
        <Link
          href="/shop"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
        >
          Shop
        </Link>
      </div>
    </>
  );
};

export default PagesDropdown;
