/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import FormInput from '../Elements/FormInput';

export default function CardChangePass() {
  const [values, setValues] = useState<{
    password: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  type ObjectKey = keyof typeof values;

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

  const handleSubmit = (e: React.SyntheticEvent) => {
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
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 mt-3 mb-6 text-sm font-bold uppercase">
              Please fill out all the fields
            </h6>
            <div className="flex flex-wrap">
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name as ObjectKey]}
                  onChange={onChange}
                />
              ))}
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
