/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { getSession, signIn } from 'next-auth/react';

import { env } from '../../env/client.mjs';

// layout for page
import AuthLayout from '../../layouts/AuthLayout';

import type { JWTPayloadTypes, LoginTypes } from '../../services/data-types';
import {
  authenticate,
  isAuth,
  sendGoogleToken,
  setLogin,
} from '../../services/auth';

/* interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (token) {
    toast.success('You are already logged in!');
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
} */

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
      password: password,
      redirect: false,
      callbackUrl: '/',
    }).then(async (res) => {
      const session = await getSession();
      console.log('session', session);
      if (session) {
        const accessToken = session.user?.token?.accessToken;
        console.log('typeof accessToken', typeof accessToken);
        console.log('accessToken', accessToken);
        if (typeof accessToken === 'string') {
          Cookies.set('token', accessToken, { secure: true });
          console.log('token', accessToken);
        }

        const refreshToken = session.user?.token?.refreshToken;
        console.log('typeof refreshToken', typeof refreshToken);
        if (typeof refreshToken === 'string') {
          Cookies.set('refreshToken', refreshToken, { secure: true });
          console.log('refreshToken', refreshToken);
        }

        // console.log('response', response);
        // console.log('response.data', response.data);
        // console.log('response.data.data', response.data.data);
        // console.log('token', token);
        // const tokenBase64 = btoa(token);

        // const tokenBase64 = Buffer.from(accessToken).toString('base64');
        // console.log('tokenBase64', tokenBase64);
        // Cookies.set('token', tokenBase64);
        // console.log('token', tokenBase64);

        // const jwtBase64 = Buffer.from(refreshToken).toString('base64');
        // Cookies.set('refreshToken', jwtBase64);
        // console.log('refreshToken', jwtBase64);
      }

      console.log('result', res);
      if (res) {
        if (!res.ok && res.error !== undefined) {
          toast.error(res.error);
        } else {
          toast.success('Login Success !!!');
          router.push('/admin/dashboard');
        }
      } else {
        toast.error('Login Failed !!!');
      }
    });
  };

  const informParent = (response: any) => {
    authenticate(response, () => {
      if (isAuth() && isAuth().role === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    });
  };

  const responseGoogle = async (response: any) => {
    console.log('GOOGLE CLIENT ID', env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    console.log('responseGoogle', response);
    const res = await sendGoogleToken(response.tokenId);
    informParent(res);
  };

  const responseFailed = (response: any) => {
    console.log('responseFailed', response);
    toast.error('Login Failed !!!');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      console.log('enter press here! ');
      onSubmit();
    }
  };

  useEffect(() => {
    if (inputReference.current) {
      inputReference.current.focus();
    }
    if (isAuth() && isAuth().role === 'admin') {
      router.push('/dashboard');
    } else if (isAuth()) {
      router.push('/');
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
                  <div>
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
                      className="bg-blueGray-800 active:bg-blueGray-600 mr-1 mb-1 w-full rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none focus:ring"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Sign in lagi ');
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
