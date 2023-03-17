/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { type RefObject } from 'react';
import { createPopper } from '@popperjs/core';
import type { StrictModifiers } from '@popperjs/core';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const UserDropdown = () => {
  const router = useRouter();

  const onLogOut = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    void router.push('/auth/login');
  };

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef() as RefObject<HTMLAnchorElement>;
  const popoverDropdownRef = React.createRef() as RefObject<HTMLDivElement>;
  const openDropdownPopover = () => {
    createPopper<StrictModifiers>(
      btnDropdownRef.current as Element,
      popoverDropdownRef.current as HTMLElement,
      {
        placement: 'bottom-end',
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
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="flex items-center">
          <span className="bg-blueGray-200 inline-flex h-12 w-12 items-center justify-center rounded-full text-sm text-white">
            <Image
              alt="..."
              className="w-full rounded-full border-none align-middle shadow-lg"
              src="/img/team-1-800x800.jpg"
              width={48}
              height={48}
            />
          </span>
        </div>
      </Link>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'min-w-48 z-50 float-left list-none rounded bg-white py-2 text-left text-base shadow-lg'
        }
      >
        <Link
          href="/profile"
          className={
            'text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal'
          }
        >
          Profile
        </Link>
        <Link
          href="#pablo"
          className={
            'text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal'
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action a
        </Link>
        <Link
          href="/admin/settings"
          className={
            'text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal'
          }
        >
          Account Settings
        </Link>
        <Link
          href="/admin/account/change-pass"
          className={
            'text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal'
          }
        >
          Change Password
        </Link>
        <div className="border-blueGray-100 my-2 h-0 border border-solid" />
        <Link
          href="#doavers"
          className={
            'text-blueGray-700 block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal'
          }
          onClick={onLogOut}
        >
          Log Out
        </Link>
      </div>
    </>
  );
};

export default UserDropdown;
