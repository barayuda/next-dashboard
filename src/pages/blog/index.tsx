import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { BiChevronDown, BiLoaderCircle } from 'react-icons/bi';
import { TfiSearch } from 'react-icons/tfi';

// components
import Navbar from '../../components/Navbars/AuthNavbar';

import { trpc } from '../../utils/trpc';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../../components/Post';
import Footer from '../../components/Footers/Footer';
import MainSection from '../../components/MainSection';
import SideSection from '../../components/SideSection';

const Blog = () => {
  const getPosts = trpc.post.getPosts.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  console.log(getPosts.data?.pages.flatMap((page) => page.posts));

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
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-6/12">
                <div className="pr-12">
                  <h1 className="text-5xl font-semibold text-white">
                    A Place for Entrepreneurs to Share and Discover New Stories
                  </h1>
                  <p className="text-blueGray-200 mt-4 text-lg">
                    This is a simple notes that can be your inspirations.
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
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <section className="relative">
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
        </section>
        <section className="grid grid-cols-12">
          <MainSection />
          <SideSection />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
