/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { getSession, signIn } from 'next-auth/react';
import CryptoJS from 'crypto-js';

// layout for page
import AuthLayout from '../../layouts/AuthLayout';

export default function Login() {
  const router = useRouter();

  const [focusedEmail, setFocusedEmail] = React.useState(true);
  const [focusedPassword, setFocusedPassword] = React.useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputReference = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    await signIn('credentials', {
      email: email,
      password: CryptoJS.MD5(password).toString(),
      redirect: false,
      callbackUrl: '/',
    }).then(async (res) => {
      if (res) {
        if (!res.ok && res.error !== undefined) {
          Cookies.remove('token');
          Cookies.remove('refreshToken');
          toast.error('Email/Password Anda Salah');
          
        } else {
          const session = await getSession();
          if (session) {
            const accessToken = session.user?.token?.accessToken;

            if (typeof accessToken === 'string') {
              //Cookies.set('token', accessToken, { secure: true });
              Cookies.set('token', accessToken, { secure: true });
            }

            const refreshToken = session.user?.token?.refreshToken;
            if (typeof refreshToken === 'string') {
              Cookies.set('refreshToken', refreshToken, { secure: true });
            }

            const role = session.user?.token?.role;
            if (typeof role === 'string') {
              Cookies.set('role', role, { secure: true });
            }
          }

          toast.success('Login Success !!!');
          router.push('/simulator');
        }
      } else {
        toast.error('Login Failed !!!');
      }
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      console.log('enter press here! ');
      onSubmit();
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.push('/simulator');
    }
  }, []);
  return (
    <AuthLayout>
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full content-center items-center justify-center">
          <div className="w-full px-4 lg:w-4/12">
            <div className="bg-blueGray-200 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="text-blueGray-400 mb-3 text-center font-bold">
                  <small>Sign in with credentials</small>
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
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Email"
                      ref={inputReference}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      onFocus={() => setFocusedEmail(focusedEmail)}
                      onBlur={() => setFocusedEmail(true)}
                      onKeyDown={(e) => {
                        handleKeyPress(e);
                      }}
                    />
                  </div>

                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      onFocus={() => setFocusedPassword(focusedPassword)}
                      onBlur={() => setFocusedPassword(true)}
                      onKeyDown={(e) => {
                        handleKeyPress(e);
                      }}
                    />
                  </div>
                  <div className="hidden">
                    <label className="inline-flex cursor-pointer items-center">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox text-blueGray-700 ml-1 h-5 w-5 rounded border-0 transition-all duration-150 ease-linear"
                      />
                      <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      className="bg-blueGray-800 active:bg-blueGray-600 mb-1 mr-1 w-full rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none focus:ring"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        // toast.success('Login Process !!!');
                        onSubmit();
                      }}
                      // onKeyDown={(e) => {
                      //   handleKeyPress(e);
                      // }}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="relative mt-6 flex flex-wrap">
              {/* <div className="hidden"> */}
              <div className="w-1/2">
                {/* <div className="w-1/2"> */}
                <Link href="/auth/forgot" className="text-blueGray-200">
                  <small>Forgot password?</small>
                </Link>
              </div>
              <div className="hidden">
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
