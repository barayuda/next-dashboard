import React from "react";
import Props from "./props";
import Logo from "./svgs/logo";

function LayoutAuth(props: Props) {
  // return <div className="flex h-screen w-screen flex-row bg-white font-inter">{props.children}</div>;
  return <div>{props.children}</div>;
}

export default LayoutAuth;
