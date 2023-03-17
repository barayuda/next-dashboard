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
              Bank Mega
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
                  className="lg:hover:text-blueGray-200 text-blueGray-700 flex items-center px-3 py-4 text-xs font-bold uppercase lg:py-2 lg:text-white"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook className="lg:text-blueGray-200 text-blueGray-400 leading-lg text-lg" />
                  <span className="ml-2 inline-block lg:hidden">Share</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  className="lg:hover:text-blueGray-200 text-blueGray-700 flex items-center px-3 py-4 text-xs font-bold uppercase lg:py-2 lg:text-white"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20NextJS%20UI%20Kit%20and%20Admin.%20Let%20Notus%20NextJS%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level."
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter className="lg:text-blueGray-200 text-blueGray-400 leading-lg text-lg" />
                  <span className="ml-2 inline-block lg:hidden">Tweet</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  className="lg:hover:text-blueGray-200 text-blueGray-700 flex items-center px-3 py-4 text-xs font-bold uppercase lg:py-2 lg:text-white"
                  href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-auth-navbar"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-github leading-lg text-lg " />
                  <span className="ml-2 inline-block lg:hidden">Star</span>
                </Link>
              </li>

              <li className="flex items-center">
                <button
                  className="text-blueGray-700 active:bg-blueGray-50 ml-3 mb-3 rounded bg-white px-4 py-2 text-xs font-bold uppercase shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none lg:mr-1 lg:mb-0"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Download
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
