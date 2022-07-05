import axios from 'axios';
import callAPI from '../config/api';
import { CheckoutTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getFeaturedGame() {
  const URL = 'users/landingpage';

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getDetailVoucher(id: string) {
  const URL = `users/${id}/detail`;

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getGameCategory() {
  const URL = 'users/category';

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function setCheckout(data: CheckoutTypes) {
  const url = `${ROOT_API}/${API_VERSION}/users/checkout`;

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  });
}

export async function loadProfile(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/user/${id}`;

  return callAPI({
    url,
    method: 'GET',
    data: null,
    token: true,
  });
}
