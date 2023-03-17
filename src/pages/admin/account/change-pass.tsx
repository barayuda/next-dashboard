import React from 'react';

// components

import CardProfile from '../../../components/Cards/CardProfile';

// layout for page

import AdminLayout from '../../../layouts/AdminLayout';
import CardChangePass from '../../../components/Cards/CardChangePass';

export default function ChangePass() {
  return (
    <AdminLayout>
      <div className="flex flex-wrap">
        <div className="w-full px-4 lg:w-8/12">
          <CardChangePass />
        </div>
        <div className="w-full px-4 lg:w-4/12">
          <CardProfile />
        </div>
      </div>
    </AdminLayout>
  );
}
