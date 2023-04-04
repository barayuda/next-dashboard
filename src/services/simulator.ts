/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { v4 as uuidv4 } from 'uuid';
import callAPI from '../pages/api/call';
import type { ApiHeaders } from '../pages/api/call';
import type { SimulatorTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API || '';

const urlInquiry = process.env.NEXT_PUBLIC_IPG_INQUIRY_URL;

export async function setSimulator(data: SimulatorTypes) {
  // START Process Inquiry
  console.log('dataSimulator', data);
  const reqId = uuidv4();

  const date = new Date();
  const orderRefId =
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDate().toString() +
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getSeconds().toString();

  const requestData = {
    amount: data.total,
    currency: 'IDR',
    referenceUrl:
      process.env.NEXT_PUBLIC_CLIENT_URL || '' + '/simulator/' + orderRefId,
    order: {
      id: orderRefId,
      disablePromo: true,
      afterDiscount: '', // megacards, debitmega, creditmega
      items: [
        {
          name: data.material,
          quantity: data.quantity,
          amount: data.total,
        },
      ],
    },
    customer: {
      name: 'Fyan E. Widyantoro',
      email: 'fyanestu@gmail.com',
      phoneNumber: '082114017471',
      country: 'ID',
      postalCode: '12345',
    },
    paymentSource: data.paymentSource,
    paymentSourceMethod: data.paymentSourceMethod,
    token: '',
  };

  console.log('urlInquiry', urlInquiry);
  console.log('requestData', requestData);
  const responseData = await callAPI({
    url: urlInquiry,
    method: 'POST',
    data: requestData,
    headers: {
      Authorization: process.env.NEXT_PUBLIC_IPG_API_KEY?.toString(),
    } as ApiHeaders,
  });
  console.log('responseData', responseData);

  // START Save to DB
  const url = `${ROOT_API}/simulator`;
  console.log('url', url);

  const payload = {
    reqId,
    apiKey: process.env.NEXT_PUBLIC_IPG_API_KEY,
    orderRefId,
    currency: 'IDR',
    paymentSource: data.paymentSource,
    paymentSourceMethod: data.paymentSourceMethod,
    amount: data.total,
    trxToken: responseData?.data?.token,
    selectionsUrl: responseData?.data?.urls?.selections,
    checkoutUrl: responseData?.data?.urls?.checkout,
    statusHttp: responseData?.statusHttp,
    requestData,
    responseData,
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
