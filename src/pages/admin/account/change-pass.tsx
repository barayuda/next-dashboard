/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

// components

import CardProfile from '../../../components/Cards/CardProfile';

// layout for page

import AdminLayout from '../../../layouts/AdminLayout';
import CardChangePass from '../../../components/Cards/CardChangePass';
import { JWTPayloadTypes } from '../../../services/data-types';
import jwtDecode from 'jwt-decode';

interface GetServerSideProps {
  req: {
    cookies: {  
      token: string;
    };
  };
}

export function getServerSideProps(context: GetServerSideProps) {
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const payload: JWTPayloadTypes = jwtDecode<JWTPayloadTypes>(token);
  // console.log(payload);
  const userFromPayload = payload;
  return {
    props: {
      user: userFromPayload,
    },
  };
}

export default function ChangePass() {
  return (
    <AdminLayout>
      <div className="flex flex-wrap">
        <div className="w-full px-4 lg:w-8/12">
          <CardChangePass />
        </div>

      </div>
    </AdminLayout>
  );
}
