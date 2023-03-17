import React from "react";
import Link from "next/link";

// components

import Navbar from "../../components/Navbars/IndexNavbar";
import Footer from "../../components/Footers/Footer";
import Image from "next/image";

import { HiHeart } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Product = () => {
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
                      <a href="index.html">
                        <Image
                          src="/assets/logo.svg"
                          alt="Logo"
                          className="w-32"
                          width={128}
                          height={128}
                        />
                      </a>

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
                        <a
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
                        </a>
                        <a
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
                        </a>
                        <a
                          href="#"
                          className="relative text-center text-gray-300 transition hover:text-primary"
                        >
                          <div className="text-2xl">
                            <i className="fa-regular fa-user"></i>
                          </div>
                          <div className="text-xs leading-3">Account</div>
                        </a>
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
                    <a
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
                    </a>
                    <a
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
                    </a>
                    <a
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
                    </a>
                    <a
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
                    </a>
                    <a
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
                    </a>
                    <a
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
                    </a>
                  </div>
                </div>

                <div className="flex flex-grow items-center justify-between pl-12">
                  <div className="flex items-center space-x-6 capitalize">
                    <a
                      href="../index.html"
                      className="text-gray-200 transition hover:text-white"
                    >
                      Home
                    </a>
                    <a
                      href="pages/shop.html"
                      className="text-gray-200 transition hover:text-white"
                    >
                      Shop
                    </a>
                    <a
                      href="#"
                      className="text-gray-200 transition hover:text-white"
                    >
                      About us
                    </a>
                    <a
                      href="#"
                      className="text-gray-200 transition hover:text-white"
                    >
                      Contact us
                    </a>
                  </div>
                  <a
                    href="#"
                    className="px-8 text-gray-200 transition hover:text-white"
                  >
                    Help
                  </a>
                </div>
              </div>
            </nav>

            <div className="container flex items-center gap-3 py-4">
              <a href="../index.html" className="text-base text-primary">
                <i className="fa-solid fa-house"></i>
              </a>
              <span className="text-sm text-gray-400">
                <i className="fa-solid fa-chevron-right"></i>
              </span>
              <p className="font-medium text-gray-600">Shop</p>
              <span className="text-sm text-gray-400">
                <i className="fa-solid fa-chevron-right"></i>
              </span>
              <p className="font-medium text-gray-600">Product</p>
            </div>

            <div className="container grid grid-cols-2 gap-6">
              <div>
                <Image
                  src="/assets/products/product1.jpg"
                  alt="product"
                  className="w-full"
                  width={608}
                  height={456}
                />
                <div className="mt-4 grid grid-cols-5 gap-4">
                  <Image
                    src="/assets/products/product2.jpg"
                    alt="product2"
                    className="w-full cursor-pointer border border-primary"
                    width={608}
                    height={456}
                  />
                  <Image
                    src="/assets/products/product3.jpg"
                    alt="product2"
                    className="w-full cursor-pointer border"
                    width={608}
                    height={456}
                  />
                  <Image
                    src="/assets/products/product4.jpg"
                    alt="product2"
                    className="w-full cursor-pointer border"
                    width={608}
                    height={456}
                  />
                  <Image
                    src="/assets/products/product5.jpg"
                    alt="product2"
                    className="w-full cursor-pointer border"
                    width={608}
                    height={456}
                  />
                  <Image
                    src="/assets/products/product6.jpg"
                    alt="product2"
                    className="w-full cursor-pointer border"
                    width={608}
                    height={456}
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-2 text-3xl font-medium uppercase">
                  Italian L Shape Sofa
                </h2>
                <div className="mb-4 flex items-center">
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
                  <div className="ml-3 text-xs text-gray-500">
                    (150 Reviews)
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="space-x-2 font-semibold text-gray-800">
                    <span>Availability: </span>
                    <span className="text-green-600">In Stock</span>
                  </p>
                  <p className="space-x-2">
                    <span className="font-semibold text-gray-800">Brand: </span>
                    <span className="text-gray-600">Apex</span>
                  </p>
                  <p className="space-x-2">
                    <span className="font-semibold text-gray-800">
                      Category:{" "}
                    </span>
                    <span className="text-gray-600">Sofa</span>
                  </p>
                  <p className="space-x-2">
                    <span className="font-semibold text-gray-800">SKU: </span>
                    <span className="text-gray-600">BE45VGRT</span>
                  </p>
                </div>
                <div className="font-roboto mb-1 mt-4 flex items-baseline space-x-2">
                  <p className="text-xl font-semibold text-primary">$45.00</p>
                  <p className="text-base text-gray-400 line-through">$55.00</p>
                </div>

                <p className="mt-4 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  eius eum reprehenderit dolore vel mollitia optio consequatur
                  hic asperiores inventore suscipit, velit consequuntur,
                  voluptate doloremque iure necessitatibus adipisci magnam
                  porro.
                </p>

                <div className="pt-4">
                  <h3 className="mb-1 text-sm uppercase text-gray-800">Size</h3>
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

                <div className="mt-4">
                  <h3 className="mb-1 text-sm uppercase text-gray-800">
                    Quantity
                  </h3>
                  <div className="flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
                    <div className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl">
                      -
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center text-base">
                      4
                    </div>
                    <div className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl">
                      +
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                  <a
                    href="#"
                    className="flex items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
                  >
                    <i className="fa-solid fa-bag-shopping"></i> Add to cart
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 rounded border border-gray-300 px-8 py-2 font-medium uppercase text-gray-600 transition hover:text-primary"
                  >
                    <i className="fa-solid fa-heart"></i> Wishlist
                  </a>
                </div>

                <div className="mt-4 flex gap-3">
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-500"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="container pb-16">
              <h3 className="font-roboto border-b border-gray-200 pb-3 font-medium text-gray-800">
                Product details
              </h3>
              <div className="w-3/5 pt-6">
                <div className="text-gray-600">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur necessitatibus deleniti natus dolore cum maiores
                    suscipit optio itaque voluptatibus veritatis tempora iste
                    facilis non aut sapiente dolor quisquam, ex ab.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorum, quae accusantium voluptatem blanditiis sapiente
                    voluptatum. Autem ab, dolorum assumenda earum veniam eius
                    illo fugiat possimus illum dolor totam, ducimus excepturi.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Error quia modi ut expedita! Iure molestiae labore cumque
                    nobis quasi fuga, quibusdam rem? Temporibus consectetur
                    corrupti rerum veritatis numquam labore amet.
                  </p>
                </div>

                <table className="mt-6 w-full table-auto border-collapse text-left text-sm text-gray-600">
                  <tr>
                    <th className="w-40 border border-gray-300 py-2 px-4 font-medium">
                      Color
                    </th>
                    <th className="border border-gray-300 py-2 px-4 ">
                      Blank, Brown, Red
                    </th>
                  </tr>
                  <tr>
                    <th className="w-40 border border-gray-300 py-2 px-4 font-medium">
                      Material
                    </th>
                    <th className="border border-gray-300 py-2 px-4 ">Latex</th>
                  </tr>
                  <tr>
                    <th className="w-40 border border-gray-300 py-2 px-4 font-medium">
                      Weight
                    </th>
                    <th className="border border-gray-300 py-2 px-4 ">55kg</th>
                  </tr>
                </table>
              </div>
            </div>

            <div className="container pb-16">
              <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
                Related products
              </h2>
              <div className="grid grid-cols-4 gap-6">
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
                      <a
                        href="#"
                        className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                        title="view product"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </a>
                      <a
                        href="#"
                        className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                        title="add to wishlist"
                      >
                        <i className="fa-solid fa-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="px-4 pt-4 pb-3">
                    <a href="#">
                      <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                        Guyer Chair
                      </h4>
                    </a>
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
                  <a
                    href="#"
                    className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary"
                  >
                    Add to cart
                  </a>
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
                      <a
                        href="#"
                        className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                        title="view product"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </a>
                      <a
                        href="#"
                        className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                        title="add to wishlist"
                      >
                        <i className="fa-solid fa-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="px-4 pt-4 pb-3">
                    <a href="#">
                      <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                        Bed King Size
                      </h4>
                    </a>
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
                  <a
                    href="#"
                    className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary"
                  >
                    Add to cart
                  </a>
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
                      <a
                        href="#"
                        className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                        title="view product"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </a>
                      <a
                        href="#"
                        className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                        title="add to wishlist"
                      >
                        <i className="fa-solid fa-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="px-4 pt-4 pb-3">
                    <a href="#">
                      <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                        Couple Sofa
                      </h4>
                    </a>
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
                  <a
                    href="#"
                    className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary"
                  >
                    Add to cart
                  </a>
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
                      <a
                        href="#"
                        className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                        title="view product"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </a>
                      <a
                        href="#"
                        className="flex h-8 w-9 items-center justify-center rounded-full bg-primary text-lg text-white transition hover:bg-gray-800"
                        title="add to wishlist"
                      >
                        <i className="fa-solid fa-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="px-4 pt-4 pb-3">
                    <a href="#">
                      <h4 className="mb-2 text-xl font-medium uppercase text-gray-800 transition hover:text-primary">
                        Mattrass X
                      </h4>
                    </a>
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
                  <a
                    href="#"
                    className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary"
                  >
                    Add to cart
                  </a>
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

export default Product;
