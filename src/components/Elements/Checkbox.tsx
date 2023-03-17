import React from "react";
import PropTypes from "prop-types";

interface CheckboxProps {
  label: string;
}

export default function Checkbox(props: CheckboxProps) {
  const { label, ...rest } = props;
  return (
    <>
      <label className="inline-flex cursor-pointer items-center">
        <input
          {...rest}
          type="checkbox"
          className="form-checkbox border-blueGray-300 checked:bg-blueGray-700 checked:border-blueGray-700 focus:border-blueGray-300 ml-1 h-5 w-5 appearance-none rounded border transition-all duration-150 ease-linear"
        />
        {label ? (
          <span className="text-blueGray-500 ml-2 text-sm font-semibold">
            {label}
          </span>
        ) : null}
      </label>
    </>
  );
}

Checkbox.defaultProps = {};
// you can also pass additional props
// such as defaultValue, value, onChange, onClick etc.
Checkbox.propTypes = {
  label: PropTypes.string,
};
