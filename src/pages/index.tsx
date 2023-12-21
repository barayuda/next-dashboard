import React, { Component } from 'react';
import Router from 'next/router';
import jwt from 'jsonwebtoken';

import type { JWTPayloadTypes } from '../services/data-types';
export default class Index extends Component {
  componentDidMount = () => {
    void Router.push('/simulator');
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

  const userFromPayload = payload;
  return {
    props: {
      user: userFromPayload,
    },
  };
}
