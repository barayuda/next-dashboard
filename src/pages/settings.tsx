import React from "react";
import Layout from "../components/layout";
import NotificationIcon from "../components/svgs/notification-icon";
import SearchIcon from "../components/svgs/search-icon";

function Settings() {
  return (
    <Layout>
      <div className="flex flex-1 flex-col space-y-5 p-7">
        {/* Notificaiton and Search bar */}
        <div className="flex flex-row justify-end space-x-10">
          <button>
            <NotificationIcon />
          </button>
          <form className="flex flex-row items-center rounded-xl bg-white py-3 pr-6 pl-8 drop-shadow-card">
            <label htmlFor="search" className="w-full max-w-xs ">
              <input placeholder="Search" className="focus-visible:outline-none" />
            </label>
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
