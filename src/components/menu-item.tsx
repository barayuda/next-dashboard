import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export interface Menu {
  icon: (props: { className: string }) => JSX.Element;
  title: string;
  href: string;
  isSidebarOpen?: boolean;
  submenu?: boolean;
  submenuOpen?: boolean;
  submenuItem?: [
    {
      title: string;
      href: string;
    }
  ];
}

function MenuItem(props: Menu) {
  const router = useRouter();

  let submenuItem: [];
  if (props.submenu) {
    props.submenuItem?.map((menuitem, index) => {
      <li>
        <Link href={menuitem.href}>{menuitem.title}</Link>
      </li>;
    });
  }

  return (
    <li>
      <Link
        href={props.href}
        className={`relative flex rounded py-3 px-4 ${
          router.route == props.href ? "button-text bg-primary " : "opacity-75 hover:bg-primary"
        }`}
      >
        {router.route == props.href && (
          <span className="absolute left-0 top-1/2 h-9 w-[6px] -translate-y-1/2 rounded bg-white"></span>
        )}
        <props.icon className={`${props.isSidebarOpen ? "mr-3" : "flex-1"}`} />
        {props.isSidebarOpen ? props.title : ""}
      </Link>
    </li>
  );
}

export default MenuItem;
