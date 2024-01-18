/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import AuthLayout from '../../layouts/AuthLayout';
import { isAuth, setRegisterUser } from '../../services/auth';
import type { RegisterUserTypes } from '../../services/data-types/index';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Register() {
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [focusedName, setFocusedName] = React.useState(true);
  const [focusedEmail, setFocusedEmail] = React.useState(true);
  React.useState(false);

  const inputReference = useRef<HTMLInputElement>(null);

  const [captcha, setCaptcha] = useState<string | null>();
  const recaptchaRef: any = React.createRef();

  const onSubmit = async () => {
    const data: RegisterUserTypes = {
      name,
      email,
      admin,
    };

    if (!captcha) {
      toast.error('captcha not verified !!!');
    } else if (!name || !email) {
      toast.error('name or email is required');
    } else {
      const response = await setRegisterUser(data);
      if (response.data) {
        toast.error('Register Failed: ' + response.message);
      } else {
        toast.success('Register Success !!!');
        void router.push('/auth/login');
      }
    }

    return;
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
                <form>
                  <div className="relative mb-3 mt-5 w-full">
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
                  <div className="grid">
                    <div className="relative mb-5 mt-5 w-full">
                      <label className="inline-flex cursor-pointer items-center">
                        <input
                          id="disablePromo"
                          type="checkbox"
                          className="form-checkbox text-blueGray-700 ml-1 h-5 w-5 rounded border-0 transition-all duration-150 ease-linear"
                          checked={admin}
                          onChange={(e) => {
                            setAdmin(e.target.checked);
                          }}
                        />
                        <span className="text-blueGray-600 ml-2 text-sm font-semibold">
                          admin
                        </span>
                      </label>
                    </div>

                    <div className="grid">
                      <div className="relative mb-5 mt-5 w-full">
                        <ReCAPTCHA
                          size="normal"
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                          className="mx-auto"
                          onChange={setCaptcha}
                          ref={recaptchaRef}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      className="bg-blueGray-800 active:bg-blueGray-600 mb-1 mr-1 w-full rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg 
                                  focus:outline-none "
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        void onSubmit();
                      }}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
