import axios from 'axios';
import Cookies from 'js-cookie';
import callAPI from '../config/api';
import { LoginTypes } from './data-types';

declare const window: any;
declare const localStorage: any;

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function setSignUp(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signup`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function setLogin(data: LoginTypes) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signin`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function setForgotpass(data: { email: string }) {
  const url = `${ROOT_API}/${API_VERSION}/auth/forgotpassword`;

  return callAPI({
    url,
    method: 'PUT',
    data,
  });
}

// Set in Cookie
export const setCookie = (key: string, value: any) => {
  if (window !== 'undefiend') {
    Cookies.set(key, value, {
      // 1 Day
      expires: 1,
    });
  }
};
// remove from cookie
export const removeCookie = (key: string) => {
  if (window !== 'undefined') {
    Cookies.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key: string) => {
  if (window !== 'undefined') {
    return Cookies.get(key);
  }
  return false;
};

// Set in localstorage
export const setLocalStorage = (key: string, value: any) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localstorage
export const removeLocalStorage = (key: string) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response: any, next: any) => {
  console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next();
};

// Access user info from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      }
    }
  }
  return false;
};

export const signout = (next: any) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
};

export const sendGoogleToken = async (tokenId: string) => {
  let response = await callAPI({
    url: `${ROOT_API}/${API_VERSION}/auth/googlelogin`,
    method: 'POST',
    data: {
      idToken: tokenId,
    },
  });
  console.log('GOOGLE SIGNIN: ', response?.data);
  return response?.data;
  // axios
  //   .post(`${ROOT_API}/${API_VERSION}/auth/googlelogin`, {
  //     idToken: tokenId,
  //   })
  //   .then((res: any) => {
  //     console.log(res.data);
  //     informParent(res);
  //   })
  //   .catch((error) => {
  //     console.log('GOOGLE SIGNIN ERROR', error.response);
  //   });
};
