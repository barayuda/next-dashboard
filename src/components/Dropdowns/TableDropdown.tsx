/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import Link from "next/link";
import React, { RefObject } from "react";
import { createPopper } from "@popperjs/core";
import type { StrictModifiers } from "@popperjs/core";

const NotificationDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef() as RefObject<HTMLAnchorElement>;
  const popoverDropdownRef = React.createRef() as RefObject<HTMLDivElement>;
  const openDropdownPopover = () => {
    createPopper<StrictModifiers>(
      btnDropdownRef.current as Element,
      popoverDropdownRef.current as HTMLElement,
      {
        placement: "left-start",
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
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </Link>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "min-w-48 z-50 float-left list-none rounded bg-white py-2 text-left text-base shadow-lg"
        }
      >
        <Link
          href="#pablo"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </Link>
        <Link
          href="#pablo"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </Link>
        <Link
          href="#pablo"
          className={
            "text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </Link>
      </div>
    </>
  );
};

export default NotificationDropdown;
