/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Cookies from 'js-cookie';

import type { AxiosHeaders, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { Session } from 'next-auth';

export interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
  headers?: ApiHeaders;
  session?: Session;
}

export interface ApiHeaders extends AxiosHeaders {
  Authorization?: string;
  apikey?: string;
  username?: string;
}

const ROOT_API = process.env.NEXT_PUBLIC_API || 'http://127.0.0.1:4010';
const refreshTokenUrl = `${ROOT_API}/auth/refresh`;

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
  headers,
  session,
}: CallAPIProps) {
  if (serverToken) {
    if (headers !== undefined) headers.Authorization = `Bearer ${serverToken}`;
    else {
      headers = {
        Authorization: `Bearer ${serverToken}`,
      } as ApiHeaders;
    }
  } else if (token) {
    //JGN DI GANTIIII
    const tokenCookies = Cookies.get('token');
    console.log('tokenCookies', tokenCookies);
    // const tokenCookies = '';
    if (tokenCookies) {
      // const jwtToken = atob(tokenCookies);
      if (headers !== undefined) {
        console.log('tokenCookies1', tokenCookies);
        headers.Authorization = `Bearer ${tokenCookies}`;
      } else {
        console.log('tokenCookies2', tokenCookies);
        headers = {
          Authorization: `Bearer ${tokenCookies}`,
        } as ApiHeaders;
      }
    }
  }

  // console.log('headers', headers);
  // session = (await getServerSession(authOptions)) || undefined;

  const axiosCall = axios.create();

  const requestIntercept = axiosCall.interceptors.request.use(
    (config) => {
      if (
        !config.headers['Authorization'] &&
        session?.user?.token?.accessToken
      ) {
        config.headers['Authorization'] = `Bearer ${session?.user?.token?.accessToken as string
          }`;
      } else {
        console.log('requestIntercept else');
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const responseIntercept = axiosCall.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (
        (error?.response?.status === 401 || error?.response?.status === 403) &&
        !prevRequest?.sent &&
        session !== undefined
      ) {
        prevRequest.sent = true;
        console.log('session refresh: ' + JSON.stringify(session));
        // await refreshToken();
        if (session?.user?.token) {
          const res = await axios.post(refreshTokenUrl, {
            refreshToken: session?.user?.token?.refreshToken,
          });
          console.log('response refresh1: ' + JSON.stringify(res));

          session.user.token.accessToken = res.data.accessToken;
          Cookies.set('token', res.data.accessToken, { secure: true });
          if (res.data.accessToken) {
            prevRequest.headers['Authorization'] = `Bearer ${res.data.accessToken as string
              }`;
            return callAPI(prevRequest);
          }
        } else {
          //if (token) {
          const refreshTokenCookies = Cookies.get('refreshToken');
          const res = await axios.post(refreshTokenUrl, {
            refreshToken: refreshTokenCookies,
          });
          console.log('response refresh2: ' + JSON.stringify(res));
          if (res.data.accessToken) {
            prevRequest.headers['Authorization'] = `Bearer ${res.data.accessToken as string
              }`;
            return callAPI(prevRequest);
          }
        }
        if (res.data.accessToken) {
          prevRequest.headers['Authorization'] = `Bearer ${res.data.accessToken as string
            }`;
          return callAPI(prevRequest);
        }
      } else {
        console.log('responseIntercept else');
      }
      return Promise.reject(error);
    }
  );

  const response = await axiosCall({
    url,
    method,
    data,
    headers,
  }).catch((err) => err.response);

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
    console.log('NextJS Response1', JSON.stringify(res));
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
