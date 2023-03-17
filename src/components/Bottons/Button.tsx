import React from "react";
import { FaHeart } from "react-icons/fa";

export default function Button() {
  return (
    <>
      <div className="mt-8">
        <h1 className="mt-8 mb-2 text-3xl font-semibold">
          Small Filled Buttons
        </h1>
        <p className="lead text-blueGray-500 text-lg">
          Small filled buttons in different styles and colors can be used for
          call to actions in forms and more.
        </p>
        <hr className="border-b-1 border-blueGray-200 mt-6 mb-8" />
      </div>
      <button
        className="mr-1 mb-1 rounded bg-pink-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600"
        type="button"
      >
        <FaHeart /> Small
      </button>
      <hr className="border-b-1 border-blueGray-200 mt-6 mb-8" />
      <button
        className="mr-1 mb-1 rounded-full bg-pink-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
        type="button"
      >
        <FaHeart /> Regular
      </button>
      <hr className="border-b-1 border-blueGray-200 mt-6 mb-8" />
      <button
        className="mr-1 mb-1 rounded bg-red-500 px-6 py-3 text-base font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
        type="button"
      >
        <FaHeart />
      </button>
      <hr className="border-b-1 border-blueGray-200 mt-6 mb-8" />
    </>
  );
}
