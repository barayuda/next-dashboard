import React from 'react';

// components
import ApiTable from '../../components/SimulatorContent/ApiTable';

// layout for page
import AdminLayout from '../../layouts/AdminLayout';
import { getServerSideProps } from './index';
export { getServerSideProps };

export default function Monitoring() {
  return (
    <AdminLayout>
      <div className="mt-4 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <ApiTable color="dark" />
        </div>
      </div>
    </AdminLayout>
  );
}
