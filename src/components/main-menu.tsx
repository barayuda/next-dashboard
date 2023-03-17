import Link from "next/link";
import React, { useState } from "react";
import LogoutIcon from "./svgs/logout-icon";
import MenuItem, { Menu } from "./menu-item";
import BellMenuIcon from "./svgs/bell-menu-icon";
import BookingMenuIcon from "./svgs/booking-menu-icon";
import CarMenuIcon from "./svgs/car-menu-icon";
import DashboardMenuIcon from "./svgs/dashboard-menu-icon";
import Hamburger from "./svgs/hamburger";
import Logo from "./svgs/logo";
import PaymentMenuIcon from "./svgs/payment-menu-icon";
import ReportMenuIcon from "./svgs/report-menu-icon";
import SettingMenuIcon from "./svgs/setting-menu-icon";
import TransactionMenuIcon from "./svgs/transaction-menu-icon";

const menus = [
  { icon: DashboardMenuIcon, title: "Dashboard", href: "/" },
  { icon: CarMenuIcon, title: "Drivers", href: "/drivers" },
  { icon: BookingMenuIcon, title: "Bookings", href: "/bookings" },
  { icon: BellMenuIcon, title: "Notifications", href: "/notifications" },
  { icon: SettingMenuIcon, title: "Settings", href: "/admin/settings" },
  { icon: SettingMenuIcon, title: "Tables", href: "/admin/tables" },
  { icon: SettingMenuIcon, title: "Login", href: "/auth/login" },
  { icon: SettingMenuIcon, title: "Register", href: "/auth/register" },
  { icon: SettingMenuIcon, title: "Forgot Pass", href: "/auth/forgot" },
] as Menu[];

const reportMenus = [
  {
    icon: PaymentMenuIcon,
    title: "Payment Details",
    href: "/payment-details",
    submenu: true,
    submenuItems: [
      {
        title: "Payment Cards",
        href: "/payment-cards",
      },
      {
        title: "Payment VA",
        href: "/payment-va",
      },
    ],
  },
  {
    icon: TransactionMenuIcon,
    title: "Transactions",
    href: "/transactions",
  },
  {
    icon: ReportMenuIcon,
    title: "Car Reports",
    href: "/car-reports",
  },
] as Menu[];

function MainMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div
      className={`relative flex ${
        sidebarOpen ? "w-72" : "w-28"
      } flex-none flex-col justify-between bg-black p-6 text-white duration-300`}
    >
      <div className="relative flex flex-col justify-between space-y-5">
        {/* Logo */}
        <div className={`inline-flex ${sidebarOpen ? "justify-between" : ""}`}>
          <Link href="/" className="block px-2 py-6">
            {sidebarOpen ? <Logo /> : ""}
          </Link>
          <Hamburger
            className="right-0 py-7"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <ul className="flex flex-col space-y-2">
            {menus.map((menu, index) => (
              <MenuItem
                key={index}
                title={menu.title}
                href={menu.href}
                icon={menu.icon}
                isSidebarOpen={sidebarOpen}
                submenu={menu.submenu}
                submenuItem={menu.submenuItem}
                submenuOpen={submenuOpen}
              />
            ))}
          </ul>

          <hr className="ml-4 py-2 text-white/20" />

          <div>
            <p className="px-4 py-3 text-white/50">
              {sidebarOpen ? "Report" : ""}
            </p>

            <ul>
              {reportMenus.map((menu, index) => (
                <MenuItem
                  key={index}
                  title={menu.title}
                  href={menu.href}
                  icon={menu.icon}
                  isSidebarOpen={sidebarOpen}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <button className="h3 flex w-full items-center justify-center rounded-lg bg-white/20 py-3 px-4">
          <LogoutIcon className="mr-3" /> {sidebarOpen ? "Logout" : ""}
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
