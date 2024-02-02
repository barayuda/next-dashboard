import React from 'react';
import Link from 'next/link';
import { FaBars, FaFacebook, FaTwitter } from 'react-icons/fa';
// components

export default function SimulatorNavbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="navbar-expand-lg absolute top-0 z-50 flex w-full flex-wrap items-center justify-between px-2 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
            <Link
              href="/"
              className="mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed text-black"
            >
              Demo Shopping
            </Link>
            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars className="text-white" />
            </button>
          </div>
          <div
            className={
              'flex-grow items-center bg-white lg:flex lg:bg-opacity-0 lg:shadow-none' +
              (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
            }
            id="example-navbar-warning"
          >
            <ul className="mr-auto flex list-none flex-col lg:flex-row"></ul>
            <ul className="flex list-none flex-col lg:ml-auto lg:flex-row">
  
              <li className="flex items-center">
                <Link
                  href={'/simulator'}
                  className="text-blueGray-700 active:bg-blueGray-50 ml-3 mb-3 rounded bg-white px-4 py-2 text-xs font-bold uppercase shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none lg:mr-1 lg:mb-0"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Simulator
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
