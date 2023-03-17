/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { RefObject } from "react";
import PropTypes from "prop-types";
import { createPopper } from "@popperjs/core";

// components
import Input from "../../components/Elements/Input";

interface SelectProps {
  border: string;
  size: string;
  leftIcon: string;
  rightIcon: string;
  type: string;
  items?: [];
  closeOnSelect: boolean;
  placeholder: string;
  defaultValue: string | number;
  rest: object;
}

type commonOptions = {
  [key: string]: string;
};

export default function Select(props: SelectProps) {
  const {
    border,
    size,
    leftIcon,
    rightIcon,
    type,
    items,
    closeOnSelect,
    placeholder,
    defaultValue,
    ...rest
  } = props;
  const [inputValue, setInputValue] = React.useState(defaultValue);
  const [menuClasses, setMenuClasses] = React.useState("");
  const [menuShow, setMenuShow] = React.useState(false);
  const [animating, setAntimating] = React.useState(false);
  const [transformOrigin, setTransformOrigin] =
    React.useState("origin-top-right");

  const btnDropdownRef = React.createRef() as RefObject<HTMLAnchorElement>;
  const popoverDropdownRef = React.createRef() as RefObject<HTMLDivElement>;

  const origins: commonOptions = {
    "top-start": "origin-bottom-left",
    "top-end": "origin-bottom-right",
    "bottom-start": "origin-top-left",
    "bottom-end": "origin-top-right",
    "right-start": "origin-top-left",
    "right-end": "origin-top-left",
    "left-start": "origin-top-right",
    "left-end": "origin-top-right",
    bottom: "origin-top",
    top: "origin-bottom",
    left: "origin-right",
    right: "origin-left",
  };
  const startAnimation = () => {
    if (!animating) {
      setAntimating(true);
      if (menuShow) {
        setMenuClasses("");
        setTimeout(function () {
          setMenuShow(false);
        }, 310);
      } else {
        const popperObject = createPopper(
          btnDropdownRef.current as Element,
          popoverDropdownRef.current as HTMLElement,
          {
            placement: "bottom-start",
          }
        );
        const transOrigin =
          origins[popperObject.state.placement] || "top-start";
        setTransformOrigin(transOrigin);
        setMenuShow(true);
        setTimeout(function () {
          setMenuClasses("opacity-100 scale-100 ");
        }, 10);
      }
      setTimeout(function () {
        setAntimating(false);
      }, 350);
    }
  };
  return (
    <>
      <div className="relative">
        <Input
          value={inputValue}
          type="text"
          onChange={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
          }}
          onClick={startAnimation}
          placeholder={placeholder}
          ref={btnDropdownRef}
          size={size}
        />
        <div
          ref={popoverDropdownRef as React.RefObject<HTMLDivElement>}
          className={(menuShow ? "block " : "hidden ") + "z-50"}
        >
          <div
            className={
              menuClasses +
              " min-w-48 absolute z-50 float-left origin-top-left scale-95 transform rounded-lg border bg-white p-2 text-left text-base opacity-0 shadow-lg transition-all duration-200 ease-in-out " +
              transformOrigin
            }
          >
            {items?.map(
              (
                prop: { disabled: boolean; text: string; value: string },
                key: number
              ) => {
                if (prop.disabled) {
                  return (
                    <span
                      className="text-blueGray-500 block w-full whitespace-nowrap bg-transparent px-4 pt-2 pb-0 text-sm font-bold"
                      key={key}
                    >
                      {prop.text}
                    </span>
                  );
                } else {
                  return (
                    <a
                      href="#pablo"
                      key={key}
                      className={
                        (prop.value === inputValue ? "bg-lightBlue-100 " : "") +
                        "hover:bg-blueGray-100 block w-full whitespace-nowrap rounded px-3 py-2 text-sm font-normal transition-all duration-200"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setInputValue(prop.value);
                        if (closeOnSelect) {
                          startAnimation();
                        }
                      }}
                    >
                      {prop.text}
                    </a>
                  );
                }
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Select.defaultProps = {
  border: "border",
  size: "regular",
  items: [],
  closeOnSelect: true,
  defaultValue: "",
};

Select.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  border: PropTypes.oneOf(["border", "borderless"]),
  closeOnSelect: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      // pass an object with text of string
      // if you want it to be disabled
      PropTypes.shape({
        text: PropTypes.string,
      }),
      // this will not be disabled and
      // users will be able to select it
      PropTypes.string,
    ])
  ),
  size: PropTypes.oneOf(["sm", "lg", "regular"]),
  // NOTE: you sould only pass icon classes
  // // // if you also pass tailwindcss classes
  // // // the output may not be a desired one
  leftIcon: PropTypes.string,
  // NOTE: you sould only pass icon classes
  // // // if you also pass tailwindcss classes
  // // // the output may not be a desired one
  rightIcon: PropTypes.string,
};
