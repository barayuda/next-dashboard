import React from "react";
import Link from "next/link";
// components

import LogOutDropdown from "../Dropdowns/LogOutDropdown";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="navbar-expand-lg fixed top-0 z-50 flex w-full flex-wrap items-center justify-between bg-white px-2 py-3 shadow"style={{ background: "linear-gradient(135deg,#000, #FFA500 )"}}>
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
            <Link
              href="/"
              className="text-orange-600 mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed"
            >
              Demo Shopping
            </Link>
            <button
              className="block cursaor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars />
            </button>
          </div>
          <div
            className={
              "flex-grow items-center bg-white lg:flex lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
           
            <ul className="flex list-none flex-col lg:ml-auto lg:flex-row">
              <li className="flex items-center">
                <LogOutDropdown />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
