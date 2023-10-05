/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { v4 as uuidv4 } from 'uuid';
import callAPI from '../pages/api/call';
import type { ApiHeaders } from '../pages/api/call';
import type { SimulatorTypes } from './data-types';
import axios from 'axios';

const ROOT_API = process.env.NEXT_PUBLIC_API || '';

const urlInquiry = process.env.NEXT_PUBLIC_IPG_INQUIRY_URL;

const headers = {
  Authorization: process.env.NEXT_PUBLIC_IPG_API_KEY?.toString(),
  // Add any other headers as needed
};

export async function setSimulator(data: SimulatorTypes) {
  // START Process Inquiry
  console.log('dataSimulator', data);
  const reqId = uuidv4();

  const allo = data.authData || "{ }";
  let alloJson;


  try {
    alloJson = JSON.parse(allo);
  } catch (error) {

    console.error("NO JSON VALUE:", error);
    alloJson = {};
  }

  const testCaseName = data.name || "Test Name";

  const date = new Date();
  const orderRefId =
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDate().toString() +
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getSeconds().toString();

  // [
  //   {
  //     alloCode: data.authData.alloCode,
  //     alloCodeVerifier: data.alloCodeVerifier,
  //     alloOsType: data.alloOsType,
  //     alloDeviceId: data.alloDeviceId,
  //     alloAppType: data.alloAppType
  //   }

  // ]
  const requestData = {
    amount: data.total,
    currency: 'IDR',
    referenceUrl:
      (process.env.NEXT_PUBLIC_CLIENT_URL || '') + '/simulator/' + orderRefId,
    order: {
      id: data.orderId || orderRefId,
      recurringId: data.recurringId || "",
      disablePromo: data.disablePromo || false,
      auth: alloJson || "",
      afterDiscount: '', // megacards, debitmega, creditmega
      retryPolicy: data.retryPolicy || "failed",
      discountAmmount: data.discountAmount || "",
      paymentMethod: data.paymentMethod || "",
      items: [
        {
          name: data.material || "Wood",
          quantity: data.quantity || 1,
          amount: data.total || 1,
        },
      ],
    },
    customer: {
      name: testCaseName,
      email: data.email || "Daivaayala@yahoo.com",
      phoneNumber: data.phoneNumber || "081318291877",
      country: 'ID',
      postalCode: '12345',
    },
    paymentSource: data.paymentSource,
    paymentSourceMethod: data.paymentSourceMethod,
    token: data.token || "",
  };

  const apiUrl = '/api/simulator';
  console.log('urlInquiry', urlInquiry);
  console.log('requestData', requestData);
  const response = await axios.post<any>(apiUrl, requestData, {
    timeout: 30000,
  });

  console.log('responseData', response);
  console.log('Stup');
  // START Save to DB
  const url = `${ROOT_API}/simulator`;
  console.log('url', url);
  console.log('Json', data.authData)

  const payload = {
    reqId,
    apiKey: process.env.NEXT_PUBLIC_IPG_API_KEY,
    orderRefId,
    currency: 'IDR',
    paymentSource: data.paymentSource,
    auth: data.authData,
    paymentSourceMethod: data.paymentSourceMethod,
    amount: data.total,
    trxToken: response?.data?.token,
    selectionsUrl: response?.data?.urls?.selections,
    checkoutUrl: response?.data?.urls?.checkout,
    statusHttp: response?.status,
    requestData,
    response,
  };
  console.log('payload', payload);

  return await callAPI({
    url,
    method: 'POST',
    data: payload,
  });
}

export async function brivaInquiry(data: any) {
  // const url = `${ROOT_API}/${API_VERSION}/simulator/bcava/inquiry`;
  // const url = `http://10.14.20.49:8088/va/bills`;
  const url = `${ROOT_API}/simulator/briva/inquiry`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function brivaPaymentConfirm(data: any) {
  // const url = `${ROOT_API}/${API_VERSION}/simulator/bcava/payconfirm`;
  // const url = `http://10.14.20.49:8088/va/bills`;
  const url = `${ROOT_API}/simulator/briva/payconfirm`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function bcavaInquiry(data: any) {
  // const url = `${ROOT_API}/${API_VERSION}/simulator/bcava/inquiry`;
  // const url = `http://10.14.20.49:8088/va/bills`;
  const url = `${ROOT_API}/simulator/bcava/inquiry`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function bcavaPaymentConfirm(data: any) {
  // const url = `${ROOT_API}/${API_VERSION}/simulator/bcava/payconfirm`;
  // const url = `http://10.14.20.49:8088/va/bills`;
  const url = `${ROOT_API}/simulator/bcava/payconfirm`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function xenditSimulatePayment(data: any, external_id: string) {
  // const url = `https://api.xendit.co/callback_virtual_accounts/external_id=${external_id}/simulate_payment`;
  // const url = `${ROOT_API}/${API_VERSION}/simulator/xendit/simulatepay/${external_id}`;
  const url = `${ROOT_API}/simulator/xendit/simulatepay/${external_id}`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function xenditGetVa(id: string) {
  // const url = `${ROOT_API}/${API_VERSION}/auth/signup`;
  // const url = `http://10.14.20.49:8088/va/bills`;
  const url = `https://api.xendit.co/callback_virtual_accounts/${id}`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function xenditGetVaPayment(payment_id: string) {
  // const url = `${ROOT_API}/${API_VERSION}/auth/signup`;
  // const url = `http://10.14.20.49:8088/va/bills`;
  const url = `https://api.xendit.co/callback_virtual_account_payments/payment_id=${payment_id}`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function vaMega(customerID: string, tranceNum: string, parsedAmount: number) {
  const url = `/api/vaMega`;

  const requestBody = {
    customerID,
    tranceNum,
    parsedAmount
  };
  console.log(requestBody)
  try {
    const response = await axios.post(url, requestBody);
    return response.data;
  } catch (error) {
    console.log("Error Suhu")
    console.error('Error:', error);
    throw error;
  }
}


