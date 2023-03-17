import React from "react";
import { FaBell } from "react-icons/fa";

export default function Alerts() {
  return (
    <>
      <div className="w-full px-4 sm:w-9/12 sm:pr-10 lg:w-8/12 lg:pr-4">
        <div className="my-8">
          <div className="mt-8">
            <h1 className="mt-8 mb-2 text-3xl font-semibold">Alerts</h1>
            <p className="lead text-blueGray-500 text-lg">
              Elements that provide contextual feedback messages for user
              actions. The notification is a simple colored block meant to draw
              the attention to the user about something.
            </p>
            <hr className="border-b-1 border-blueGray-200 mt-6 mb-8" />
          </div>
        </div>
        <div className="relative mb-4 rounded border-0 bg-pink-500 px-6 py-4 text-white">
          <span className="mr-5 inline-block align-middle text-xl">
            <FaBell />
          </span>
          <span className="mr-8 inline-block align-middle">
            <b className="capitalize">pink!</b> This is a pink alert - check it
            out!
          </span>
          <button className="absolute right-0 top-0 mt-4 mr-4 bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none">
            <span>×</span>
          </button>
        </div>
        <hr className="border-b-1 border-blueGray-200 mt-6 mb-8" />
      </div>
      <hr className="border-b-1 border-blueGray-200 mt-6 mb-8" />
    </>
  );
}
