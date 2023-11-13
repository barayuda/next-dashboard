import Link from "next/link";
import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="border-b-1 border-blueGray-200 mb-4" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full px-4 md:w-4/12">
              <div className="text-blueGray-500 py-1 text-center text-sm font-semibold md:text-left">
              Copyright © {new Date().getFullYear()} Bank Mega by{' '}
                <Link
                  href="https://www.bankmega.com"
                  className="text-blueGray-500 hover:text-blueGray-800"
                >
                  ITEC - 
                  CDS Developer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
