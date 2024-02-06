/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// import Cookies from 'js-cookie';
import {
  setCookie as setCookieNext,
  getCookie as getCookieNext,
  deleteCookie as deleteCookieNext,
} from 'cookies-next';

import callAPI from '../pages/api/call';
import type {
  ForgotPassTypes,
  LoginTypes,
  RegisterTypes,
  ResetPassTypes,
  RegisterUserTypes
} from './data-types';

const ROOT_SELF = '/api/signUp'
const ROOT_API = process.env.NEXT_PUBLIC_API || '';

const API_VERSION = 'v1';

export async function setSignUp(data: RegisterTypes) {
  const url = `/api/auth/signUp`;

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

// export async function setForgotPass(data: ForgotPassTypes) {
//   const url = `${ROOT_API}/${API_VERSION}/auth/forgotpass`;

//   return callAPI({
//     url,
//     method: 'POST',
//     data,
//   });
// }

export async function setForgotPass(data: ForgotPassTypes) {
  const url = `/api/auth/forgotPass`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function setResetPass(data: ResetPassTypes) {
  const url = `${ROOT_API}/${API_VERSION}/auth/resetpass`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function setChangePass(data: any) {
  const url = `${ROOT_API}/${API_VERSION}/auth/changepass`;

  return callAPI({
    url,
    method: 'PUT',
    data,
  });
}

// Set in Cookie
export const setCookie = (key: string, value: string) => {
  const env = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
  setCookieNext(key, value, {
    // 1 Day
    httpOnly: env,
    expires: new Date(new Date().setDate(new Date().getDate() + 1)),
    maxAge: 60 * 60 * 24,
  });
};
// remove from cookie
export const removeCookie = (key: string) => {
  // Cookies.remove(key);
  deleteCookieNext(key)
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key: string) => {
  // return Cookies.get(key);
  return getCookieNext(key);
};

// Set in localstorage
export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key) || '{}');
    }
  }
  return false;
};

// Remove from localstorage
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response: any, next: any) => {
  console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
  if (response?.token !== undefined) {
    setCookie('token', response?.token);
    setLocalStorage('user', response?.user);
  }
  next();
};

// Access user info from localstorage
export function isAuth() {
  const cookieChecked = getCookie('token');
  if (cookieChecked) {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
  }
  return false;
}

export const sendSignOut = (next: any) => {
  removeCookie('token');
  removeCookie('refreshToken');
  removeLocalStorage('user');
  const url = `${ROOT_API}/${API_VERSION}/auth/signout`;

  console.log('url', url);

  return callAPI({
    url,
    method: 'POST',
    data: {},
  });
};

export const updateUser = (response: any, next: any) => {
  console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user') || '{}');
    auth = response.data;
    localStorage.setItem('user', JSON.stringify(auth));
  }
  next();
};

export const sendGoogleToken = async (tokenId: string) => {
  const response = await callAPI({
    url: `${ROOT_API}/${API_VERSION}/auth/google`,
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

export async function setRegisterUser(data: RegisterUserTypes) {
  const url = `/api/auth/registerUser`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}