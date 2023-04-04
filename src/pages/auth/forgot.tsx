/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

// layout for page
import AuthLayout from '../../layouts/AuthLayout';
import { isAuth, setForgotPass } from '../../services/auth';
import { ForgotPassTypes } from '../../services/data-types';

export default function Forgot() {
  const router = useRouter();

  const [focusedEmail, setFocusedEmail] = useState(true);
  const [email, setEmail] = useState('');

  const inputReference = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    const data: ForgotPassTypes = {
      email,
    };

    if (!email) {
      toast.error('Please input required fields !!!');
    } else {
      const response = await setForgotPass(data);
      if (response.error) {
        toast.error('Request forgot password Failed: ' + response.message);
      } else {
        toast.success(
          'Request forgot password Success. Please check your email !!!'
        );
      }
    }
    return;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      console.log('enter press here! ');
      void onSubmit();
    }
  };

  useEffect(() => {
    if (inputReference.current) {
      inputReference.current.focus();
    }
    if (isAuth() && isAuth().role === 'admin') {
      void router.push('/dashboard');
    } else if (isAuth()) {
      void router.push('/');
    }
  }, []);

  return (
    <AuthLayout>
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full content-center items-center justify-center">
          <div className="w-full px-4 lg:w-4/12">
            <div className="bg-blueGray-200 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
              <div className="mb-0 rounded-t px-6 py-6">
                <div className="mb-3 text-center">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Request your new password
                  </h6>
                </div>
                <hr className="border-b-1 border-blueGray-300 mt-6" />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <form>
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Email"
                      ref={inputReference}
                      onChange={(event) => setEmail(event.target.value)}
                      onFocus={() => setFocusedEmail(focusedEmail)}
                      onBlur={() => setFocusedEmail(true)}
                      onKeyDown={(e) => {
                        handleKeyPress(e);
                      }}
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      className="bg-blueGray-800 active:bg-blueGray-600 mr-1 mb-1 w-full rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        void onSubmit();
                      }}
                    >
                      Request New Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="relative mt-6 flex flex-wrap">
              <div className="w-1/2">
                <Link href="/auth/login" className="text-blueGray-200">
                  <small>Already have an account?</small>
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
