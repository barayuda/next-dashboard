/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import NotificationDropdown from '../../components/Dropdowns/NotificationDropdown';
import UserDropdown from '../../components/Dropdowns/UserDropdown';
import {
  FaBars,
  FaCalculator,
  FaHome,
  FaMapMarked,
  FaPuzzlePiece,
  FaSass,
  FaTable,
  FaTools,
  FaTv,
  FaUsers,
} from 'react-icons/fa';
import { env } from '../../env/client.mjs';

interface SidebarProps {
  setSidebarOpen?: any;
  sidebarOpen?: boolean;
}

export default function Sidebar(props: SidebarProps) {
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  // const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { sidebarOpen, setSidebarOpen } = props;
  const [submenuOpen, setSubmenuOpen] = React.useState(false);
  const [activeSubmenu, setActiveSubmenu] = React.useState('');
  const router = useRouter();
  return (
    <>
      <nav
        className={`relative z-10 flex flex-wrap items-center justify-between bg-white py-4 pl-4 pr-0 shadow-xl md:fixed md:left-0 md:top-0 md:bottom-0 md:block md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto ${
          sidebarOpen ? 'md:w-64' : 'md:w-[90px]'
        }`}
      >
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          {/* Toggler */}
          <button
            className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <FaBars />
          </button>
          {/* Brand */}
          <div className="flex justify-between">
            <Link
              href="/"
              className={`text-blueGray-600 mr-0 ml-3 whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:pb-2 ${
                sidebarOpen ? 'inline-block' : 'hidden'
              }`}
            >
              Bank Mega
            </Link>
            <button
              className="hidden cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:block"
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>
          </div>
          {/* User */}
          <ul className="flex list-none flex-wrap items-center md:hidden">
            <li className="relative inline-block">
              <NotificationDropdown />
            </li>
            <li className="relative inline-block">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'absolute top-0 left-0 right-0 z-40 ml-3 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="border-blueGray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="#pablo"
                    className="text-blueGray-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                  >
                    Bank Mega
                  </Link>
                </div>
                <div className="flex w-6/12 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 h-12 w-full rounded border border-solid bg-white px-3 py-2 text-base font-normal leading-snug shadow-none outline-none focus:outline-none"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
              {sidebarOpen ? 'Admin Layout Pages' : ''}
            </h6>
            {/* Navigation */}

            <ul className="flex list-none flex-col md:min-w-full md:flex-col">
              <li className="items-center">
                <Link
                  href="/admin/dashboard"
                  className={
                    'flex items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/admin/dashboard') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/dashboard') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-500') +
                      (sidebarOpen ? '' : ' flex-1')
                    }
                  >
                    <FaHome />
                  </i>{' '}
                  {sidebarOpen ? 'Dashboard' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/monitoring"
                  className={
                    'flex items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/admin/monitoring') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/monitoring') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-500') +
                      (sidebarOpen ? '' : ' flex-1')
                    }
                  >
                    <FaTv />
                  </i>{' '}
                  {sidebarOpen ? 'Monitoring' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/simulator"
                  className={
                    'flex items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/admin/simulator') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/simulator') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-500') +
                      (sidebarOpen ? '' : ' flex-1')
                    }
                  >
                    <FaCalculator />
                  </i>{' '}
                  {sidebarOpen ? 'Simulator' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/webhook"
                  className={
                    'flex items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/admin/webhook') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/webhook') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-500') +
                      (sidebarOpen ? '' : ' flex-1')
                    }
                  >
                    <FaCalculator />
                  </i>{' '}
                  {sidebarOpen ? 'Webhook' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/user"
                  className={
                    'flex items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/admin/user') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/user') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-500') +
                      (sidebarOpen ? '' : ' flex-1')
                    }
                  >
                    <FaUsers />
                  </i>{' '}
                  {sidebarOpen ? 'Users' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/components"
                  className={
                    'flex items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/admin/components') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-puzzle-piece mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/components') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-500') +
                      (sidebarOpen ? '' : ' flex-1')
                    }
                  >
                    <FaPuzzlePiece />
                  </i>{' '}
                  {sidebarOpen ? 'Components' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/settings"
                  className={
                    'flex items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/admin/settings') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-tools mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/settings') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-500') +
                      (sidebarOpen ? '' : ' flex-1')
                    }
                  >
                    <FaTools />
                  </i>{' '}
                  {sidebarOpen ? 'Settings' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/tables"
                  className={
                    'flex items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/admin/tables') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-table mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/tables') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-500') +
                      (sidebarOpen ? '' : ' flex-1')
                    }
                  >
                    <FaTable />
                  </i>{' '}
                  {sidebarOpen ? 'Tables' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/admin/maps"
                  className={
                    'flex items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/admin/maps') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-map-marked mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/maps') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-500') +
                      (sidebarOpen ? '' : ' flex-1')
                    }
                  >
                    <FaMapMarked />
                  </i>{' '}
                  {sidebarOpen ? 'Maps' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!submenuOpen) {
                      setActiveSubmenu('sales');
                      console.log('activeSubmenu sales');
                    } else {
                      setActiveSubmenu('');
                      console.log('activeSubmenu null');
                    }
                    setSubmenuOpen(!submenuOpen);
                    console.log('submenu', !submenuOpen);
                  }}
                  className={
                    'group flex w-full items-center py-3 text-xs font-bold uppercase transition duration-75 ' +
                    (router.pathname.indexOf('/admin/sales') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/sales') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-500') +
                      (sidebarOpen ? '' : ' flex-1')
                    }
                  >
                    <FaSass />
                  </i>{' '}
                  <span className="ml-1 flex-1 whitespace-nowrap text-left">
                    {sidebarOpen ? 'Sales' : ''}
                  </span>
                  <span
                    className={
                      'text-sm ' +
                      (sidebarOpen && activeSubmenu === 'sales'
                        ? 'rotate-180'
                        : 'rotate-0') +
                      (!sidebarOpen ? ' hidden' : '')
                    }
                  >
                    <svg
                      className={'h-6 w-6 '}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                    </svg>
                  </span>
                </Link>

                <ul
                  id="dropdown-example"
                  className={
                    'item-center -mt-2 space-y-0 py-1' +
                    (activeSubmenu !== 'sales' ? ' hidden' : '') +
                    (sidebarOpen ? ' pl-5' : ' pl-3')
                  }
                >
                  <li>
                    <Link
                      href="#"
                      className={
                        'text-blueGray-700 hover:text-blueGray-500 block py-2 text-xs font-bold uppercase' +
                        (sidebarOpen ? ' ml-2' : ' ml-1')
                      }
                    >
                      {sidebarOpen ? 'Products' : 'P'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className={
                        'text-blueGray-700 hover:text-blueGray-500 block py-2 text-xs font-bold uppercase' +
                        (sidebarOpen ? ' ml-2' : ' ml-1')
                      }
                    >
                      {sidebarOpen ? 'Billing' : 'B'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/invoice"
                      className={
                        'text-blueGray-700 hover:text-blueGray-500 block py-2 text-xs font-bold uppercase' +
                        (sidebarOpen ? ' ml-2' : ' ml-1')
                      }
                    >
                      {sidebarOpen ? 'Invoice' : 'I'}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
              {sidebarOpen ? 'Auth Layout Pages' : ''}
            </h6>
            {/* Navigation */}

            <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
              <li className="items-center">
                <Link
                  href="/auth/login"
                  className="text-blueGray-700 hover:text-blueGray-500 block items-center py-3 text-xs font-bold uppercase"
                >
                  <i
                    className={
                      `fas fa-fingerprint text-blueGray-400 mr-2 text-sm` +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>{' '}
                  {sidebarOpen ? 'Login' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/auth/register"
                  className="text-blueGray-700 hover:text-blueGray-500 block items-center py-3 text-xs font-bold uppercase"
                >
                  <i
                    className={
                      `fas fa-clipboard-list text-blueGray-300 mr-2 text-sm` +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>{' '}
                  {sidebarOpen ? 'Register' : ''}
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
              {sidebarOpen ? 'No Layout Pages' : ''}
            </h6>
            {/* Navigation */}

            <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
              <li className="items-center">
                <Link
                  href="/landing"
                  className="text-blueGray-700 hover:text-blueGray-500 block items-center py-3 text-xs font-bold uppercase"
                >
                  <i
                    className={
                      `fas fa-newspaper text-blueGray-400 mr-2 text-sm` +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>{' '}
                  {sidebarOpen ? 'Landing Page' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/profile"
                  className="text-blueGray-700 hover:text-blueGray-500 block items-center py-3 text-xs font-bold uppercase"
                >
                  <i
                    className={
                      `fas fa-user-circle text-blueGray-400 mr-2 text-sm` +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>{' '}
                  {sidebarOpen ? 'Profile Page' : ''}
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/simulator"
                  className={
                    'block items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/simulator') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-shopping-bag mr-2 text-sm ' +
                      (router.pathname.indexOf('/simulator') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-300') +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>{' '}
                  {sidebarOpen ? 'Simulator' : ''}
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/blog"
                  className={
                    'block items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/blog') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-blog mr-2 text-sm ' +
                      (router.pathname.indexOf('/blog') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-300') +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>{' '}
                  {sidebarOpen ? 'Blog' : ''}
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/portfolio"
                  className={
                    'block items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/portfolio') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-user-circle mr-2 text-sm ' +
                      (router.pathname.indexOf('/portfolio') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-300') +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>{' '}
                  {sidebarOpen ? 'Portfolio' : ''}
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/shop"
                  className={
                    'block items-center py-3 text-xs font-bold uppercase ' +
                    (router.pathname.indexOf('/shop') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                >
                  <i
                    className={
                      'fas fa-shop mr-2 text-sm ' +
                      (router.pathname.indexOf('/shop') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-300') +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>{' '}
                  {sidebarOpen ? 'Shop' : ''}
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
              {sidebarOpen ? 'Documentation' : ''}
            </h6>
            {/* Navigation */}
            <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
              <li className="inline-flex">
                <Link
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/colors/notus"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline"
                >
                  <i
                    className={
                      `fas fa-paint-brush text-blueGray-300 mr-2 text-base` +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>
                  {sidebarOpen ? 'Styles' : ''}
                </Link>
              </li>

              <li className="inline-flex">
                <Link
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline"
                >
                  <i
                    className={
                      `fab fa-css3-alt text-blueGray-300 mr-2 text-base` +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>
                  {sidebarOpen ? 'CSS Components' : ''}
                </Link>
              </li>

              <li className="inline-flex">
                <Link
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline"
                >
                  <i
                    className={
                      `fab fa-react text-blueGray-300 mr-2 text-base` +
                      (sidebarOpen ? '' : ' ml-3 flex-1')
                    }
                  ></i>
                  {sidebarOpen ? 'NextJS' : ''}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
