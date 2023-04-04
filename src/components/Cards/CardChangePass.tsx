/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { JWTPayloadTypes } from '../../services/data-types';
import jwtDecode from 'jwt-decode';
import { setChangePass } from '../../services/auth';
import FormInput from '../Elements/FormInput';

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}
export function getServerSideProps(context: GetServerSideProps) {
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const payload: JWTPayloadTypes = jwtDecode<JWTPayloadTypes>(token);
  // console.log(payload);
  const userFromPayload = payload;
  return {
    props: {
      user: userFromPayload,
    },
  };
}

type ChangePassword = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};
const schema = z
  .object({
    password: z
      .string()
      .min(1, { message: 'Old password is required!' })
      .max(100),
    newPassword: z
      .string()
      .min(1, { message: 'New password is required!' })
      .max(100),
    confirmPassword: z
      .string()
      .min(1, { message: 'New password is required!' })
      .max(100),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Confirm password did not match',
      });
    }
  });

export default function CardChangePass() {
  const [values, setValues] = useState<ChangePassword>({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  type ObjectKey = keyof typeof values;

  // Form validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePassword>({
    // defaultValues: {
    //   name: '',
    //   email: '',
    //   // roles: [],
    //   active: true,
    // },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangePassword> = async (
    props: ChangePassword
  ) => {
    const response = await setChangePass(props);
    if (response) {
      if (response.error) {
        console.log('Change password failed: ' + JSON.stringify(response));
        toast.error('Change password failed:' + response.message);
      } else {
        toast.success('Change password success !!!');
      }
    }
  };

  const inputs = [
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 'newPassword',
      name: 'newPassword',
      type: 'password',
      placeholder: 'New Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'New Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: "Passwords don't match!",
      label: 'Confirm Password',
      pattern: values.newPassword,
      required: true,
    },
  ];

  const handleSubmitOld = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    // const email = target.email.value; // typechecks!
    // const password = target.password.value; // typechecks!
    // etc...
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-blueGray-100 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
        <div className="mb-0 rounded-t bg-white px-6 py-6">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Change Password
            </h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 mr-1 rounded px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none"
              type="button"
            >
              Settings
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h6 className="text-blueGray-400 mt-3 mb-6 text-sm font-bold uppercase">
              Please fill out all the fields
            </h6>
            <div className="flex flex-wrap">
              {/* {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name as ObjectKey]}
                  onChange={onChange}
                />
              ))} */}
              <FormInput
                key={'1'}
                value={1}
                onChange={function (e: {
                  target: { name: any; value: any };
                }): void {
                  throw new Error('Function not implemented.');
                }}
                id={''}
                name={''}
                type={''}
                placeholder={''}
                errorMessage={''}
                label={''}
                pattern={''}
                required={false}
              />
            </div>

            <hr className="border-b-1 border-blueGray-300 mt-6" />

            <div className="mt-10 flex flex-wrap justify-center">
              <button
                className="mr-1 mb-1 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
                type="button"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
