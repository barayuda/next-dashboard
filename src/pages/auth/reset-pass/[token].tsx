/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// layout for page
import AuthLayout from '../../../layouts/AuthLayout';
import { isAuth, setResetPass } from '../../../services/auth';
import type { ResetPassTypes } from '../../../services/data-types/index';

export default function Register() {
  const router = useRouter();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [focusedNewPassword, setFocusedNewPassword] = useState(true);
  const [focusedRetypePassword, setFocusedRetypePassword] = useState(false);

  const inputReference = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    const data: ResetPassTypes = {
      resetPasswordToken: router.query.token as string,
      newPassword,
      retypePassword,
    };

    if (!newPassword || !retypePassword) {
      // console.log('Error');
      toast.error('Please input required fields !!!');
    } else {
      const response = await setResetPass(data);
      console.log('response', response);
      if (response.error) {
        toast.error('Reset Password Failed: ' + response.message);
      } else {
        toast.success('Reset Password Success !!!');
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
  }, [router]);

  return (
    <AuthLayout>
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full content-center items-center justify-center">
          <div className="w-full px-4 lg:w-4/12">
            <div className="bg-blueGray-200 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
              <div className="mb-0 rounded-t px-6 py-6">
                <div className="mb-3 text-center">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Reset your password
                  </h6>
                </div>
                <div className="btn-wrapper text-center"></div>
                <hr className="border-b-1 border-blueGray-300 mt-6" />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <form>
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      New Password
                    </label>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Password"
                      ref={inputReference}
                      onChange={(event) => setNewPassword(event.target.value)}
                      onFocus={() => setFocusedNewPassword(true)}
                      onBlur={() => setFocusedNewPassword(!focusedNewPassword)}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowNewPassword(!showNewPassword);
                      }}
                      className="absolute right-5 mt-1 inline-block py-3"
                    >
                      <FaEye className={showNewPassword ? 'hidden' : 'block'} />
                      <FaEyeSlash
                        className={showNewPassword ? 'block' : 'hidden'}
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
                      onChange={(event) =>
                        setRetypePassword(event.target.value)
                      }
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

                  <div className="mt-6 text-center">
                    <button
                      className="bg-blueGray-800 active:bg-blueGray-600 mr-1 mb-1 w-full rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        void onSubmit();
                      }}
                    >
                      Set a new password
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
