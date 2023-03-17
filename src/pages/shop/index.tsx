import React from "react";
import Link from "next/link";

// components

import Navbar from "../../components/Navbars/IndexNavbar";
import Footer from "../../components/Footers/Footer";
import Image from "next/image";

import { HiHeart } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Shop = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="min-h-screen-25 relative flex content-center items-center justify-center pt-16 pb-8">
          <div
            className="absolute top-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="absolute h-full w-full bg-black opacity-75"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center">
                <div className="pr-12">
                  <header className="py-4 shadow-sm">
                    <div className="container flex items-center justify-between">
                      <Link href="#">
                        <Image
                          src="/assets/logo.svg"
                          alt="Logo"
                          className="w-32"
                          width={128}
                          height={128}
                        />
                      </Link>

                      <div className="relative flex w-full max-w-xl">
                        <span className="absolute left-4 top-3 text-lg text-gray-400">
                          <HiMagnifyingGlass />
                        </span>
                        <input
                          type="text"
                          name="search"
                          id="search"
                          className="w-full rounded-l-md border border-r-0 border-primary py-3 pl-12 pr-3 focus:outline-none"
                          placeholder="search"
                        />
                        <button className="rounded-r-md border border-primary bg-primary px-8 text-white transition hover:bg-transparent hover:text-primary">
                          Search
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Link
                          href="#"
                          className="relative text-center text-gray-300 transition hover:text-primary"
                        >
                          <div className="text-2xl">
                            <HiHeart />
                          </div>
                          <div className="text-xs leading-3">Wishlist</div>
                          <div className="absolute right-0 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                            8
                          </div>
                        </Link>
                        <Link
                          href="#"
                          className="relative text-center text-gray-300 transition hover:text-primary"
                        >
                          <div className="text-2xl">
                            <i className="fa-solid fa-bag-shopping"></i>
                          </div>
                          <div className="text-xs leading-3">Cart</div>
                          <div className="absolute -right-3 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                            2
                          </div>
                        </Link>
                        <Link
                          href="#"
                          className="relative text-center text-gray-300 transition hover:text-primary"
                        >
                          <div className="text-2xl">
                            <i className="fa-regular fa-user"></i>
                          </div>
                          <div className="text-xs leading-3">Account</div>
                        </Link>
                      </div>
                    </div>
                  </header>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-blueGray-200 mt-0 px-4 pb-20">
          <div className="container mx-auto px-4">
            <nav className="bg-gray-800">
              <div className="container flex">
                <div className="group relative flex cursor-pointer items-center bg-primary px-8 py-4">
                  <span className="text-white">
                    <i className="fa-solid fa-bars"></i>
                  </span>
                  <span className="ml-2 capitalize text-white">
                    All Categories
                  </span>

                  <div className="invisible absolute left-0 top-full w-full divide-y divide-dashed divide-gray-300 bg-white py-3 opacity-0 shadow-md transition duration-300 group-hover:visible group-hover:opacity-100">
                    <Link
                      href="#"
                      className="flex items-center px-6 py-3 transition hover:bg-gray-100"
                    >
                      <Image
                        src="/assets/icons/sofa.svg"
                        alt="sofa"
                        className="h-5 w-5 object-contain"
                        width={20}
                        height={20}
                      />
                      <span className="ml-6 text-sm text-gray-600">Sofa</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-6 py-3 transition hover:bg-gray-100"
                    >
                      <Image
                        src="/assets/icons/terrace.svg"
                        alt="terrace"
                        className="h-5 w-5 object-contain"
                        width={20}
                        height={20}
                      />
                      <span className="ml-6 text-sm text-gray-600">
                        Terarce
                      </span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-6 py-3 transition hover:bg-gray-100"
                    >
                      <Image
                        src="/assets/icons/bed.svg"
                        alt="bed"
                        className="h-5 w-5 object-contain"
                        width={20}
                        height={20}
                      />
                      <span className="ml-6 text-sm text-gray-600">Bed</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-6 py-3 transition hover:bg-gray-100"
                    >
                      <Image
                        src="/assets/icons/office.svg"
                        alt="office"
                        className="h-5 w-5 object-contain"
                        width={20}
                        height={20}
                      />
                      <span className="ml-6 text-sm text-gray-600">office</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-6 py-3 transition hover:bg-gray-100"
                    >
                      <Image
                        src="/assets/icons/outdoor-cafe.svg"
                        alt="outdoor"
                        className="h-5 w-5 object-contain"
                        width={20}
                        height={20}
                      />
                      <span className="ml-6 text-sm text-gray-600">
                        Outdoor
                      </span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-6 py-3 transition hover:bg-gray-100"
                    >
                      <Image
                        src="/assets/icons/bed-2.svg"
                        alt="Mattress"
                        className="h-5 w-5 object-contain"
                        width={20}
                        height={20}
                      />
                      <span className="ml-6 text-sm text-gray-600">
                        Mattress
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-grow items-center justify-between pl-12">
                  <div className="flex items-center space-x-6 capitalize">
                    <Link
                      href="../index.html"
                      className="text-gray-200 transition hover:text-white"
                    >
                      Home
                    </Link>
                    <Link
                      href="pages/shop.html"
                      className="text-gray-200 transition hover:text-white"
                    >
                      Shop
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-200 transition hover:text-white"
                    >
                      About us
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-200 transition hover:text-white"
                    >
                      Contact us
                    </Link>
                  </div>
                  <Link
                    href="/shop/checkout"
                    className="px-8 text-gray-200 transition hover:text-white"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="#"
                    className="px-8 text-gray-200 transition hover:text-white"
                  >
                    Help
                  </Link>
                </div>
              </div>
            </nav>

            <div className="container flex items-center gap-3 py-4">
              <Link href="../index.html" className="text-base text-primary">
                <i className="fa-solid fa-house"></i>
              </Link>
              <span className="text-sm text-gray-400">
                <i className="fa-solid fa-chevron-right"></i>
              </span>
              <p className="font-medium text-gray-600">Shop</p>
            </div>

            <div className="container grid grid-cols-4 items-start gap-6 pt-4 pb-16">
              <div className="col-span-1 overflow-hidden rounded bg-white px-4 pb-6 shadow">
                <div className="space-y-5 divide-y divide-gray-200">
                  <div>
                    <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="cat-1"
                          id="cat-1"
                          className="cursor-pointer rounded-sm text-primary focus:ring-0"
                        />
                        <label className="cusror-pointer ml-3 text-gray-600">
                          Bedroom
                        </label>
                        <div className="ml-auto text-sm text-gray-600">
                          (15)
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="cat-2"
                          id="cat-2"
                          className="cursor-pointer rounded-sm text-primary focus:ring-0"
                        />
                        <label className="cusror-pointer ml-3 text-gray-600">
                          Sofa
                        </label>
                        <div className="ml-auto text-sm text-gray-600">(9)</div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="cat-3"
                          id="cat-3"
                          className="cursor-pointer rounded-sm text-primary focus:ring-0"
                        />
                        <label className="cusror-pointer ml-3 text-gray-600">
                          Office
                        </label>
                        <div className="ml-auto text-sm text-gray-600">
                          (21)
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="cat-4"
                          id="cat-4"
                          className="cursor-pointer rounded-sm text-primary focus:ring-0"
                        />
                        <label className="cusror-pointer ml-3 text-gray-600">
                          Outdoor
                        </label>
                        <div className="ml-auto text-sm text-gray-600">
                          (10)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
                      Brands
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="brand-1"
                          id="brand-1"
                          className="cursor-pointer rounded-sm text-primary focus:ring-0"
                        />
                        <label className="cusror-pointer ml-3 text-gray-600">
                          Cooking Color
                        </label>
                        <div className="ml-auto text-sm text-gray-600">
                          (15)
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="brand-2"
                          id="brand-2"
                          className="cursor-pointer rounded-sm text-primary focus:ring-0"
                        />
                        <label className="cusror-pointer ml-3 text-gray-600">
                          Magniflex
                        </label>
                        <div className="ml-auto text-sm text-gray-600">(9)</div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="brand-3"
                          id="brand-3"
                          className="cursor-pointer rounded-sm text-primary focus:ring-0"
                        />
                        <label className="cusror-pointer ml-3 text-gray-600">
                          Ashley
                        </label>
                        <div className="ml-auto text-sm text-gray-600">
                          (21)
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="brand-4"
                          id="brand-4"
                          className="cursor-pointer rounded-sm text-primary focus:ring-0"
                        />
                        <label className="cusror-pointer ml-3 text-gray-600">
                          M&D
                        </label>
                        <div className="ml-auto text-sm text-gray-600">
                          (10)
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="brand-5"
                          id="brand-5"
                          className="cursor-pointer rounded-sm text-primary focus:ring-0"
                        />
                        <label className="cusror-pointer ml-3 text-gray-600">
                          Olympic
                        </label>
                        <div className="ml-auto text-sm text-gray-600">
                          (10)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
                      Price
                    </h3>
                    <div className="mt-4 flex items-center">
                      <input
                        type="text"
                        name="min"
                        id="min"
                        className="w-full rounded border-gray-300 px-3 py-1 text-gray-600 shadow-sm focus:border-primary focus:ring-0"
                        placeholder="min"
                      />
                      <span className="mx-3 text-gray-500">-</span>
                      <input
                        type="text"
                        name="max"
                        id="max"
                        className="w-full rounded border-gray-300 px-3 py-1 text-gray-600 shadow-sm focus:border-primary focus:ring-0"
                        placeholder="max"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
                      size
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="size-selector">
                        <input
                          type="radio"
                          name="size"
                          id="size-xs"
                          className="hidden"
                        />
                        <label className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm">
                          XS
                        </label>
                      </div>
                      <div className="size-selector">
                        <input
                          type="radio"
                          name="size"
                          id="size-sm"
                          className="hidden"
                        />
                        <label className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm">
                          S
                        </label>
                      </div>
                      <div className="size-selector">
                        <input
                          type="radio"
                          name="size"
                          id="size-m"
                          className="hidden"
                        />
                        <label className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm">
                          M
                        </label>
                      </div>
                      <div className="size-selector">
                        <input
                          type="radio"
                          name="size"
                          id="size-l"
                          className="hidden"
                        />
                        <label className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm">
                          L
                        </label>
                      </div>
                      <div className="size-selector">
                        <input
                          type="radio"
                          name="size"
                          id="size-xl"
                          className="hidden"
                        />
                        <label className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm">
                          XL
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
                      Color
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="color-selector">
                        <input
                          type="radio"
                          name="color"
                          id="red"
                          className="hidden"
                        />
                        <label className="block h-6 w-6 cursor-pointer rounded-sm  border border-gray-200 shadow-sm"></label>
                      </div>
                      <div className="color-selector">
                        <input
                          type="radio"
                          name="color"
                          id="black"
                          className="hidden"
                        />
                        <label className="block h-6 w-6 cursor-pointer rounded-sm  border border-gray-200 shadow-sm"></label>
                      </div>
                      <div className="color-selector">
                        <input
                          type="radio"
                          name="color"
                          id="white"
                          className="hidden"
                        />
                        <label className="block h-6 w-6 cursor-pointer rounded-sm  border border-gray-200 shadow-sm"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <div className="mb-4 flex items-center">
                  <select
                    name="sort"
                    id="sort"
                    className="w-44 rounded border-gray-300 py-3 px-4 text-sm text-gray-600 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="">Default sorting</option>
                    <option value="price-low-to-high">Price low to high</option>
                    <option value="price-high-to-low">Price high to low</option>
                    <option value="latest">Latest product</option>
                  </select>

                  <div className="ml-auto flex gap-2">
                    <div className="flex h-9 w-10 cursor-pointer items-center justify-center rounded border border-primary bg-primary text-white">
                      <i className="fa-solid fa-grip-vertical"></i>
                    </div>
                    <div className="flex h-9 w-10 cursor-pointer items-center justify-center rounded border border-gray-300 text-gray-600">
                      <i className="fa-solid fa-list"></i>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="group overflow-hidden rounded bg-white shadow">
                    <div className="relative">
                      <Image
                        src="/assets/products/product1.jpg"
                        alt="product 1"
                        className="w-full"
                        width={608}
                        height={456}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center gap-2 
                          bg-black bg-opacity-40 opacity-0 transition group-hover:opacity-100"
                      >
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="view product"
                        >
                          <HiMagnifyingGlass />
                        </Link>
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="add to wishlist"
                        >
                          <HiHeart />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 pt-4 pb-3">
                      <Link href="#">
                        <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                          Guyer Chair
                        </h4>
                      </Link>
                      <div className="mb-1 flex items-baseline space-x-2">
                        <p className="text-xl font-semibold text-primary">
                          $45.00
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          $55.90
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex gap-1 text-sm text-yellow-400">
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                        </div>
                        <div className="ml-3 text-xs text-gray-500">(150)</div>
                      </div>
                    </div>
                    <Link
                      href="/shop/product1"
                      className="block w-full rounded-b border border-primary bg-black py-1 text-center text-white transition hover:bg-transparent hover:text-black"
                    >
                      Add to cart
                    </Link>
                  </div>

                  <div className="group overflow-hidden rounded bg-white shadow">
                    <div className="relative">
                      <Image
                        src="/assets/products/product2.jpg"
                        alt="product 1"
                        className="w-full"
                        width={608}
                        height={456}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center gap-2 
                          bg-black bg-opacity-40 opacity-0 transition group-hover:opacity-100"
                      >
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="view product"
                        >
                          <HiMagnifyingGlass />
                        </Link>
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="add to wishlist"
                        >
                          <HiHeart />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 pt-4 pb-3">
                      <Link href="#">
                        <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                          Guyer Chair
                        </h4>
                      </Link>
                      <div className="mb-1 flex items-baseline space-x-2">
                        <p className="text-xl font-semibold text-primary">
                          $45.00
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          $55.90
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex gap-1 text-sm text-yellow-400">
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                        </div>
                        <div className="ml-3 text-xs text-gray-500">(150)</div>
                      </div>
                    </div>
                    <Link
                      href="/shop/product2"
                      className="block w-full rounded-b border border-primary bg-black py-1 text-center text-white transition hover:bg-transparent hover:text-black"
                    >
                      Add to cart
                    </Link>
                  </div>

                  <div className="group overflow-hidden rounded bg-white shadow">
                    <div className="relative">
                      <Image
                        src="/assets/products/product3.jpg"
                        alt="product 1"
                        className="w-full"
                        width={608}
                        height={456}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center gap-2 
                          bg-black bg-opacity-40 opacity-0 transition group-hover:opacity-100"
                      >
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="view product"
                        >
                          <HiMagnifyingGlass />
                        </Link>
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="add to wishlist"
                        >
                          <HiHeart />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 pt-4 pb-3">
                      <Link href="#">
                        <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                          Guyer Chair
                        </h4>
                      </Link>
                      <div className="mb-1 flex items-baseline space-x-2">
                        <p className="text-xl font-semibold text-primary">
                          $45.00
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          $55.90
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex gap-1 text-sm text-yellow-400">
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                        </div>
                        <div className="ml-3 text-xs text-gray-500">(150)</div>
                      </div>
                    </div>
                    <Link
                      href="/shop/product3"
                      className="block w-full rounded-b border border-primary bg-black py-1 text-center text-white transition hover:bg-transparent hover:text-black"
                    >
                      Add to cart
                    </Link>
                  </div>

                  <div className="group overflow-hidden rounded bg-white shadow">
                    <div className="relative">
                      <Image
                        src="/assets/products/product4.jpg"
                        alt="product 1"
                        className="w-full"
                        width={608}
                        height={456}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center gap-2 
                          bg-black bg-opacity-40 opacity-0 transition group-hover:opacity-100"
                      >
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="view product"
                        >
                          <HiMagnifyingGlass />
                        </Link>
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="add to wishlist"
                        >
                          <HiHeart />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 pt-4 pb-3">
                      <Link href="#">
                        <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                          Guyer Chair
                        </h4>
                      </Link>
                      <div className="mb-1 flex items-baseline space-x-2">
                        <p className="text-xl font-semibold text-primary">
                          $45.00
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          $55.90
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex gap-1 text-sm text-yellow-400">
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                        </div>
                        <div className="ml-3 text-xs text-gray-500">(150)</div>
                      </div>
                    </div>
                    <Link
                      href="/shop/product4"
                      className="block w-full rounded-b border border-primary bg-black py-1 text-center text-white transition hover:bg-transparent hover:text-black"
                    >
                      Add to cart
                    </Link>
                  </div>

                  <div className="group overflow-hidden rounded bg-white shadow">
                    <div className="relative">
                      <Image
                        src="/assets/products/product5.jpg"
                        alt="product 1"
                        className="w-full"
                        width={608}
                        height={456}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center gap-2 
                          bg-black bg-opacity-40 opacity-0 transition group-hover:opacity-100"
                      >
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="view product"
                        >
                          <HiMagnifyingGlass />
                        </Link>
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="add to wishlist"
                        >
                          <HiHeart />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 pt-4 pb-3">
                      <Link href="#">
                        <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                          Guyer Chair
                        </h4>
                      </Link>
                      <div className="mb-1 flex items-baseline space-x-2">
                        <p className="text-xl font-semibold text-primary">
                          $45.00
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          $55.90
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex gap-1 text-sm text-yellow-400">
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                        </div>
                        <div className="ml-3 text-xs text-gray-500">(150)</div>
                      </div>
                    </div>
                    <Link
                      href="/shop/product5"
                      className="block w-full rounded-b border border-primary bg-black py-1 text-center text-white transition hover:bg-transparent hover:text-black"
                    >
                      Add to cart
                    </Link>
                  </div>

                  <div className="group overflow-hidden rounded bg-white shadow">
                    <div className="relative">
                      <Image
                        src="/assets/products/product6.jpg"
                        alt="product 1"
                        className="w-full"
                        width={608}
                        height={456}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center gap-2 
                          bg-black bg-opacity-40 opacity-0 transition group-hover:opacity-100"
                      >
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="view product"
                        >
                          <HiMagnifyingGlass />
                        </Link>
                        <Link
                          href="#"
                          className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                          title="add to wishlist"
                        >
                          <HiHeart />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 pt-4 pb-3">
                      <Link href="#">
                        <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                          Guyer Chair
                        </h4>
                      </Link>
                      <div className="mb-1 flex items-baseline space-x-2">
                        <p className="text-xl font-semibold text-primary">
                          $45.00
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          $55.90
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex gap-1 text-sm text-yellow-400">
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span>
                        </div>
                        <div className="ml-3 text-xs text-gray-500">(150)</div>
                      </div>
                    </div>
                    <Link
                      href="/shop/product6"
                      className="block w-full rounded-b border border-primary bg-black py-1 text-center text-white transition hover:bg-transparent hover:text-black"
                    >
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Shop;
