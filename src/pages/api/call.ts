/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
// import Cookies from 'js-cookie';

export interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
  headers?: ApiHeaders;
}

export interface ApiHeaders extends AxiosHeaders {
  Authorization: any;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
  headers,
}: CallAPIProps) {
  if (serverToken) {
    if (headers !== undefined) headers.Authorization = `Bearer ${serverToken}`;
  } else if (token) {
    // const tokenCookies = Cookies.get('token');
    const tokenCookies = '';
    if (tokenCookies) {
      // const jwtToken = atob(tokenCookies);
      if (headers !== undefined)
        headers.Authorization = `Bearer ${tokenCookies}`;
    }
  }
  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((err) => err.response);

  console.log('API Response', JSON.stringify(response));

  let res = {
    error: true,
    message: 'error',
    data: response?.data,
    statusHttp: response?.status || 500,
  };

  if (response?.status > 300) {
    res = {
      error: true,
      message: response?.data?.message,
      data: {
        data: response?.data?.data,
      },
      statusHttp: response.status || 500,
    };
    return res;
  }

  if (response?.data) {
    const { length } = Object.keys(response?.data);
    res = {
      error: false,
      message: 'success',
      data: length > 1 ? response?.data : response?.data?.data,
      statusHttp: response?.status || 500,
    };
  }

  console.log('NextJS Response', JSON.stringify(res));

  return res;
}
