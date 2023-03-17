/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import Props from "../props";

function Hamburger(props: Props) {
  return (
    <div
      className={`${props.className ? props.className : ""}`}
      onClick={props.onClick}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div>
  );
}

export default Hamburger;
