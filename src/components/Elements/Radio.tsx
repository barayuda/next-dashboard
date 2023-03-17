import React from "react";
import PropTypes from "prop-types";

interface RadioProps {
  label: string;
}

export default function Radio(props: RadioProps) {
  const { label, ...rest } = props;
  return (
    <>
      <label className="inline-flex cursor-pointer items-center">
        <input
          {...rest}
          type="radio"
          className="form-radio border-blueGray-400 checked:bg-blueGray-800 checked:border-blueGray-800 focus:border-blueGray-400 ml-1 h-5 w-5 appearance-none rounded-full border transition-all duration-150 ease-linear"
        />
        {label ? (
          <span className="text-blueGray-700 ml-2 text-sm font-semibold">
            {label}
          </span>
        ) : null}
      </label>
    </>
  );
}

Radio.defaultProps = {};
// you can also pass additional props
// such as defaultValue, value, onChange, onClick etc.
Radio.propTypes = {
  label: PropTypes.string,
};
