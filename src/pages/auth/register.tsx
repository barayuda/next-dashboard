/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// layout for page

import AuthLayout from '../../layouts/AuthLayout';
import {
  isAuth,
  setSignUp,
} from '../../services/auth';
import type { RegisterTypes } from '../../services/data-types/index';

export default function Register() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const [focusedName, setFocusedName] = React.useState(true);
  const [focusedEmail, setFocusedEmail] = React.useState(true);
  const [focusedPassword, setFocusedPassword] = React.useState(false);
  const [focusedRetypePassword, setFocusedRetypePassword] =
    React.useState(false);
  const [error, setError] = useState('');

  const inputReference = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    const data: RegisterTypes = {
      name,
      email,
      password,
      retypePassword,
    };
    
    if (password !== retypePassword) {
      setError('Passwords do not match');
    } else if (!name || !email || !password || !retypePassword) {
      // console.log('Error');
      toast.error('Please input required fields !!!');
    } else if (!isAgreed) {
      toast.error('Please check privacy policy and tern of service !!!');
    } else {
      const response = await setSignUp(data);
      console.log('response', response);
      if (response.error) {
        toast.error('Register Failed: ' + response.message);
      } else {
        toast.success('Register Success !!!');
        void router.push('/auth/login');
      }
    }

    return;
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
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
          <div className="w-full px-4 lg:w-6/12">
            <div className="bg-blueGray-200 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="text-blueGray-400 mb-3 text-center font-bold">
                  <small>Sign up with credentials</small>
                </div>
                <form>
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-retypePassword"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Name"
                      ref={inputReference}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      onFocus={() => setFocusedName(true)}
                      onBlur={() => setFocusedName(!focusedName)}
                    />
                  </div>

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
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      onFocus={() => setFocusedEmail(true)}
                      onBlur={() => setFocusedEmail(!focusedEmail)}
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
                      type={showPassword ? 'text' : 'password'}
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      onFocus={() => setFocusedPassword(true)}
                      onBlur={() => setFocusedPassword(!focusedPassword)}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                      }}
                      className="absolute right-5 mt-1 inline-block py-3"
                    >
                      <FaEye className={showPassword ? 'hidden' : 'block'} />
                      <FaEyeSlash
                        className={showPassword ? 'block' : 'hidden'}
                      />
                    </button>
                  </div>

                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Retype Password
                    </label>
                    <input
                      type={showRetypePassword ? 'text' : 'password'}
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Retype Password"
                      value={retypePassword}
                      onChange={(event) =>{
                        setError('');
                        setRetypePassword(event.target.value);
                      }}
                      onFocus={() => setFocusedRetypePassword(true)}
                      onBlur={() =>
                        setFocusedRetypePassword(!focusedRetypePassword)
                      }
                      onKeyDown={(e) => {
                        handleKeyPress(e);
                      }}
                    ></input>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowRetypePassword(!showRetypePassword);
                      }}
                      className="absolute right-5 mt-1 inline-block py-3"
                    >
                      <FaEye
                        className={showRetypePassword ? 'hidden' : 'block'}
                      />
                      <FaEyeSlash
                        className={showRetypePassword ? 'block' : 'hidden'}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="inline-flex cursor-pointer items-center">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox text-blueGray-700 ml-1 h-5 w-5 rounded border-0 transition-all duration-150 ease-linear"
                        checked={isAgreed}
                        defaultChecked={isAgreed}
                        onChange={() => {
                          setIsAgreed(!isAgreed);
                        }}
                      />
                      <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                        I agree with the{' '}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsAgreed(!isAgreed);
                          }}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                  <br />
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <br />
                  <div className="mt-6 text-center">
                    <button
                      className="bg-blueGray-800 active:bg-blueGray-600 mr-1 mb-1 w-full rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg 
                                  focus:outline-none "
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Sign in lagi ');
                        // toast.success('Login Process !!!');
                        void onSubmit();
                      }} 
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="relative mt-6 flex flex-wrap">
              {/* <div className="w-1/2"> */}
              <div className="hidden">
                <Link href="/auth/forgot" className="text-blueGray-200">
                  <small>Forgot password?</small>
                </Link>
              </div>
              <div className="w-1/2">
                <Link href="/auth/login" className="text-blueGray-200">
                  <small>Already have an account? Go to Login</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
