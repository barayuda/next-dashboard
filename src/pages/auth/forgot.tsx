import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// layout for page

import AuthLayout from '../../layouts/AuthLayout';

export default function Forgot() {
  return (
    <AuthLayout>
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full content-center items-center justify-center">
          <div className="w-full px-4 lg:w-4/12">
            <div className="bg-blueGray-200 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
              <div className="mb-0 rounded-t px-6 py-6">
                <div className="mb-3 text-center">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="active:bg-blueGray-50 text-blueGray-700 mr-2 mb-1 inline-flex items-center rounded bg-white px-4 py-2 text-xs font-bold uppercase shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none"
                    type="button"
                  >
                    <Image
                      alt="..."
                      className="mr-1 w-5"
                      src="/assets/img/github.svg"
                      width={20}
                      height={20}
                    />
                    Github
                  </button>
                  <button
                    className="active:bg-blueGray-50 text-blueGray-700 mr-1 mb-1 inline-flex items-center rounded bg-white px-4 py-2 text-xs font-bold uppercase shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none"
                    type="button"
                  >
                    <Image
                      alt="..."
                      className="mr-1 w-5"
                      src="/assets/img/google.svg"
                      width={20}
                      height={20}
                    />
                    Google
                  </button>
                </div>
                <hr className="border-b-1 border-blueGray-300 mt-6" />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="text-blueGray-400 mb-3 text-center font-bold">
                  <small>Or request your new password</small>
                </div>
                <form>
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Email"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      className="bg-blueGray-800 active:bg-blueGray-600 mr-1 mb-1 w-full rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                      type="button"
                    >
                      Request New Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="relative mt-6 flex flex-wrap">
              <div className="w-1/2">
                <Link href="/auth/forgot" className="text-blueGray-200">
                  <small>Forgot password?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
