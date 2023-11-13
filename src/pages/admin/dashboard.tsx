import React from "react";

// components
import CardBarChart from "../../components/Cards/CardBarChart";
import CardLineChart from "../../components/Cards/CardLineChart";
import CardPageVisits from "../../components/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";
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
