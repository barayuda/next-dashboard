import React, { type ReactNode } from "react";
import PropTypes from "prop-types";

interface AlertProps {
  children?: ReactNode;
  color: string;
}

type alertColorsOptions = {
  [key: string]: string;
};

export default function Alert(props: AlertProps) {
  const { color, children } = props;
  const alertColors: alertColorsOptions = {
    light: "text-blueGray-800 bg-blueGray-200",
    dark: "text-blueGray-200 bg-blueGray-800",
    blueGray: "text-white bg-blueGray-500",
    red: "text-white bg-red-500",
    orange: "text-white bg-orange-500",
    amber: "text-white bg-amber-500",
    emerald: "text-white bg-emerald-500",
    teal: "text-white bg-teal-500",
    lightBlue: "text-white bg-lightBlue-500",
    indigo: "text-white bg-indigo-500",
    purple: "text-white bg-purple-500",
    pink: "text-white bg-pink-500",
  };
  return (
    <>
      <div
        className={`"relative " + alertColors[color] mb-4 rounded border-0 px-6 py-4`}
      >
        {children}
      </div>
    </>
  );
}
Alert.defaultProps = {
  color: "blueGray",
};
Alert.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    "light",
    "dark",
    "blueGray",
    "red",
    "orange",
    "amber",
    "emerald",
    "teal",
    "lightBlue",
    "indigo",
    "purple",
    "pink",
  ]),
};
