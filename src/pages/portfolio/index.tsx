import React from 'react';
import Link from 'next/link';

// components

import Navbar from '../../components/Navbars/IndexNavbar';
import Footer from '../../components/Footers/Footer';
import Image from 'next/image';

import AWS from ' ../../../public/assets/skills/aws.png';
import Css from '../../../public/assets/skills/css.png';
import Firebase from '../../../public/assets/skills/firebase.png';
import Github from '../../../public/assets/skills/github1.png';
import Html from '../../../public/assets/skills/html.png';
import Javascript from '../../../public/assets/skills/javascript.png';
import NextJS from '../../../public/assets/skills/nextjs.png';
import ReactImg from '../../../public/assets/skills/react.png';
import Tailwind from '../../../public/assets/skills/tailwind.png';

import cryptoImg from '../../../public/assets/projects/crypto.jpg';
import netflixImg from '../../../public/assets/projects/netflix.jpg';
import propertyImg from '../../../public/assets/projects/property.jpg';
import twitchImg from '../../../public/assets/projects/twitch.jpg';

const Portfolio = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="min-h-screen-25 relative flex content-center items-center justify-center pt-16 pb-32">
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
              <div className="ml-auto mr-auto mt-16 w-full px-4 text-center lg:w-6/12">
                <div className="pr-12">
                  <h1 className="text-5xl font-semibold text-white">
                    Your story starts with us.
                  </h1>
                  <p className="text-blueGray-200 mt-4 text-lg">
                    LET&#39;S BUILD SOMETHING TOGETHER
                  </p>
                  <h1 className="text-blueGray-200 py-4 pt-8 text-5xl text-gray-700">
                    Hi, I&#39;m <span className="text-[#5651e5]"> Doavers</span>
                  </h1>
                  <h1 className="text-blueGray-200 py-2 text-5xl text-gray-700">
                    A FullStack Developer
                  </h1>
                  <p className="m-auto py-4 text-gray-100 sm:max-w-[70%]">
                    I’m focused on building responsive front-end web
                    applications integrating back-end technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute top-auto bottom-0 left-0 right-0 h-16 w-full overflow-hidden"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-current text-white"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="-mt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="mt-24 flex flex-wrap items-center">
              <div className="mr-auto ml-auto w-full px-4 pt-8 md:w-4/12">
                <div className="bg-blueGray-700 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg shadow-lg">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full rounded-t-lg align-middle"
                    width={336}
                    height={224}
                  />
                  <blockquote className="relative mb-4 p-8">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="h-95-px -top-94-px absolute left-0 block w-full"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-blueGray-700 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services
                    </h4>
                  </blockquote>
                </div>
              </div>

              <div className="mr-auto ml-auto w-full px-4 md:w-5/12">
                <h3 className="mb-2 text-3xl font-semibold leading-normal">
                  Working with us is a pleasure
                </h3>
                <p className="text-blueGray-600 mt-4 mb-4 text-lg font-light leading-relaxed">
                  Don&apos;t let your uses guess by attaching tooltips and
                  popoves to any element. Just make sure you enable them first
                  via JavaScript.
                </p>
                <p className="text-blueGray-600 mt-0 mb-4 text-lg font-light leading-relaxed">
                  The kit comes with three pre-built pages to help you get
                  started faster. You can change the text and images and
                  you&apos;re good to go. Just make sure you enable them first
                  via JavaScript.
                </p>
                <Link href="/" className="text-blueGray-700 mt-8 font-bold">
                  Check Mega IPG!
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blueGray-200 relative py-20">
          <div
            className="pointer-events-none absolute bottom-auto top-0 left-0 right-0 -mt-20 h-20 w-full overflow-hidden"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 pt-0 pb-16">
            <div className="flex flex-wrap justify-center text-center">
              <div className="w-full px-4 lg:w-6/12">
                <h2 className="text-4xl font-semibold">Skills</h2>
                <p className="text-blueGray-400 mt-4 mb-4 text-lg leading-relaxed">
                  Put the potentially record low maximum sea ice extent tihs
                  year down to low ice. According to the National Oceanic and
                  Atmospheric Administration, Ted, Scambos.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                <div className="rounded-xl bg-white p-6 shadow-xl duration-300 ease-in hover:scale-105">
                  <div className="grid grid-cols-2 items-center justify-center gap-4">
                    <div className="m-auto">
                      <Image src={Html} width={64} height={64} alt="/" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3>HTML</h3>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-xl duration-300 ease-in hover:scale-105">
                  <div className="grid grid-cols-2 items-center justify-center gap-4">
                    <div className="m-auto">
                      <Image src={Css} width={64} height={64} alt="/" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3>CSS</h3>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-xl duration-300 ease-in hover:scale-105">
                  <div className="grid grid-cols-2 items-center justify-center gap-4">
                    <div className="m-auto">
                      <Image src={Javascript} width={64} height={64} alt="/" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3>JavaScript</h3>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-xl duration-300 ease-in hover:scale-105">
                  <div className="grid grid-cols-2 items-center justify-center gap-4">
                    <div className="m-auto">
                      <Image src={ReactImg} width={64} height={64} alt="/" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3>React</h3>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-xl duration-300 ease-in hover:scale-105">
                  <div className="grid grid-cols-2 items-center justify-center gap-4">
                    <div className="m-auto">
                      <Image src={Tailwind} width={64} height={64} alt="/" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3>Tailwind</h3>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-xl duration-300 ease-in hover:scale-105">
                  <div className="grid grid-cols-2 items-center justify-center gap-4">
                    <div className="m-auto">
                      <Image src={Firebase} width={64} height={64} alt="/" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3>Firebase</h3>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-xl duration-300 ease-in hover:scale-105">
                  <div className="grid grid-cols-2 items-center justify-center gap-4">
                    <div className="m-auto">
                      <Image src={Github} width={64} height={64} alt="/" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3>Github</h3>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-xl duration-300 ease-in hover:scale-105">
                  <div className="grid grid-cols-2 items-center justify-center gap-4">
                    <div className="m-auto">
                      <Image src={NextJS} width={64} height={64} alt="/" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3>Next</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="pointer-events-none absolute bottom-auto top-0 left-0 right-0 -mt-20 h-20 w-full overflow-hidden"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-current text-white"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 pt-0 pb-16">
            <div className="flex flex-wrap justify-center text-center">
              <div className="w-full px-4 lg:w-6/12">
                <h2 className="text-4xl font-semibold">Projects</h2>
                <p className="text-blueGray-400 mt-4 mb-4 text-lg leading-relaxed">
                  Put the potentially record low maximum sea ice extent tihs
                  year down to low ice. According to the National Oceanic and
                  Atmospheric Administration, Ted, Scambos.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-2 gap-8 lg:grid-cols-2">
                <div className="group relative flex h-auto w-full items-center justify-center rounded-xl from-[#5651e5] to-[#709dff] shadow-xl shadow-gray-400 hover:bg-gradient-to-r">
                  <Image
                    className="rounded-xl group-hover:opacity-10"
                    src={propertyImg}
                    alt="/"
                  />
                  <div className="absolute top-[50%] left-[50%] hidden translate-x-[-50%] translate-y-[-50%] group-hover:block">
                    <h3 className="text-center text-2xl tracking-wider text-white">
                      {'Property Finder'}
                    </h3>
                    <p className="pb-4 pt-2 text-center text-white">
                      {'React JS'}
                    </p>
                    <Link href={'/property'}>
                      <p className="cursor-pointer rounded-lg bg-white py-3 text-center text-lg font-bold text-gray-700">
                        More Info
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blueGray-800 relative block pb-20">
          <div
            className="pointer-events-none absolute bottom-auto top-0 left-0 right-0 -mt-20 h-20 w-full overflow-hidden"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap justify-center text-center">
              <div className="w-full px-4 lg:w-6/12">
                <h2 className="text-4xl font-semibold text-white">
                  Build something
                </h2>
                <p className="text-blueGray-400 mt-4 mb-4 text-lg leading-relaxed">
                  Put the potentially record low maximum sea ice extent tihs
                  year down to low ice. According to the National Oceanic and
                  Atmospheric Administration, Ted, Scambos.
                </p>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap justify-center">
              <div className="w-full px-4 text-center lg:w-3/12">
                <div className="text-blueGray-800 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 shadow-lg">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="mt-5 text-xl font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="text-blueGray-400 mt-2 mb-4">
                  Some quick example text to build on the card title and make up
                  the bulk of the card&apos;s content.
                </p>
              </div>
              <div className="w-full px-4 text-center lg:w-3/12">
                <div className="text-blueGray-800 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 shadow-lg">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="mt-5 text-xl font-semibold text-white">
                  Grow your market
                </h5>
                <p className="text-blueGray-400 mt-2 mb-4">
                  Some quick example text to build on the card title and make up
                  the bulk of the card&apos;s content.
                </p>
              </div>
              <div className="w-full px-4 text-center lg:w-3/12">
                <div className="text-blueGray-800 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 shadow-lg">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="mt-5 text-xl font-semibold text-white">
                  Launch time
                </h5>
                <p className="text-blueGray-400 mt-2 mb-4">
                  Some quick example text to build on the card title and make up
                  the bulk of the card&apos;s content.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-blueGray-800 relative block py-24 lg:pt-0">
          <div className="container mx-auto px-4">
            <div className="-mt-48 flex flex-wrap justify-center lg:-mt-64">
              <div className="w-full px-4 lg:w-6/12">
                <div className="bg-blueGray-200 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg shadow-lg">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to work with us?
                    </h4>
                    <p className="text-blueGray-500 mt-1 mb-4 leading-relaxed">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative mb-3 mt-8 w-full">
                      <label
                        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative mb-3 w-full">
                      <label
                        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative mb-3 w-full">
                      <label
                        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows={4}
                        cols={80}
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="mt-6 text-center">
                      <button
                        className="bg-blueGray-800 active:bg-blueGray-600 mr-1 mb-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
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

export default Portfolio;
