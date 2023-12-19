import React from "react";

// components
import CardLineChart from "../../components/Cards/CardLineChart";
import { getServerSideProps } from "./index";
// layout for page
import AdminWithStatsLayout from "../../layouts/AdminWithStatsLayout";

export { getServerSideProps };

export default function Dashboard() {
  return (
    <AdminWithStatsLayout>
      <div className="flex flex-wrap">
        <div className="mb-12 w-full px-4 xl:mb-0 xl:w-8/12">
          <CardLineChart />
        </div>
      </div>
     
    </AdminWithStatsLayout>
  );
}
