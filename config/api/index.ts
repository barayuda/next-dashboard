import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
}: CallAPIProps) {
  let headers = {};
  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const tokenCookies = Cookies.get('token');
    if (tokenCookies) {
      // const jwtToken = atob(tokenCookies);
      headers = {
        // Authorization: `Bearer ${jwtToken}`,
        Authorization: `Bearer ${tokenCookies}`,
      };
    }
  }
  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((err) => err.response);

  // console.log('API Response', JSON.stringify(response));

  if (response?.status > 300) {
    let res = {
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
    let res = {
      error: false,
      message: 'success',
      data: length > 1 ? response?.data : response?.data?.data,
      statusHttp: response?.status || 500,
    };
  }

  let res = {
    error: true,
    message: 'error',
    data: response?.data,
    statusHttp: response?.status || 500,
  };

  return res;
}
