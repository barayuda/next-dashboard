import React from "react";

// components

import CardTable from "../../components/Cards/CardTable";

// layout for page

import AdminLayout from "../../layouts/AdminLayout";

export default function Tables() {
  return (
    <AdminLayout>
      <div className="mt-4 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <CardTable />
        </div>
        <div className="mb-12 w-full px-4">
          <CardTable color="dark" />
        </div>
      </div>
    </AdminLayout>
  );
}
