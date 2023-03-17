/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

const FormInput = (props: {
  value: any;
  onChange: (e: { target: { name: any; value: any } }) => void;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  label: string;
  pattern: string;
  required: boolean;
  key: string;
}) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="relative mb-4 w-full">
      <label
        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <input
        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
      />
      <span className="text-sm text-red-400">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
