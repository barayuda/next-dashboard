import React from 'react';
import Link from 'next/link';
// components

import PagesDropdown from '../../components/Dropdowns/PagesDropdown';
import { FaBars, FaFacebook, FaTwitter } from 'react-icons/fa';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="navbar-expand-lg absolute top-0 z-50 flex w-full flex-wrap items-center justify-between px-2 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
            <Link
              href="/"
              className="mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed text-white"
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
        </div>
      </nav>
    </>
  );
}
