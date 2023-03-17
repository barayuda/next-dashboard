import React from "react";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";

interface AdminProps {
  children: JSX.Element | JSX.Element[];
}
export default function AdminWithStatsLayout(props: AdminProps) {
  const { children } = props;
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={
          "bg-blueGray-100 relative z-0" +
          (sidebarOpen ? " md:ml-64" : " md:ml-[90px]")
        }
      >
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="-m-24 mx-auto w-full px-4 md:px-10">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
