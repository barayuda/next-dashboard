import React, { Component } from 'react';
import Router from 'next/router';
import jwt from 'jsonwebtoken';

import type { JWTPayloadTypes, UserTypes } from '../../services/data-types';
export default class Admin extends Component {
  componentDidMount = () => {
    void Router.push('/admin/dashboard');
  };

  render() {
    return <div />;
  }
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadTypes = jwt.decode(jwtToken) as JWTPayloadTypes;
  console.log(payload);
  const userFromPayload = payload;
  // const userFromPayload = {};
  // const IMG = process.env.NEXT_PUBLIC_IMG || "";
  // userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  return {
    props: {
      user: userFromPayload,
    },
  };
}
