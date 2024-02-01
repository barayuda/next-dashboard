/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { v4 as uuidv4 } from 'uuid';
import callAPI from '../pages/api/call';
import type { AlloTypes, SimulatorTypes } from './data-types';
import axios from 'axios';

const ROOT_API = process.env.NEXT_PUBLIC_API || '';

export async function setSimulator(data: SimulatorTypes) {
  const reqId = uuidv4();

  let alloJson = '';
  if (data.phoneNumber !== '' && data.phoneNumber) {
    const alloVerifier = await axios.post<any>(`../api/alloVerifier`, data, {
      timeout: 30000,
    });
    alloJson = alloVerifier.data || '';
  }

  const testCaseName = data.name || 'Test Name';
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
    referenceUrl: ('https://demo-merchant.bankmega.com' || '') + '/simulator/',
    order: {
      id: data.orderId || orderRefId,
      recurringId: data.recurringId || '',
      disablePromo: data.disablePromo || false,
      auth: alloJson || '',
      afterDiscount: '', // megacards, debitmega, creditmega
      retryPolicy: data.retryPolicy || 'failed',
      discountAmmount: data.discountAmount || '',
      paymentMethod: data.paymentMethod || '',
      items: [
        {
          name: data.material || 'Wood',
          quantity: data.quantity || 1,
          amount: data.total || 1,
        },
      ],
    },
    customer: {
      name: testCaseName,
      email: data.email || 'Daivaayala@yahoo.com',
      phoneNumber: data.phoneNumber || '081318291877',
      country: 'ID',
      postalCode: '12345',
    },
    paymentSource: data.paymentSource,
    paymentSourceMethod: data.paymentSourceMethod,
    token: data.token || '',
  };

  const apiUrl = '/api/simulator';
  const response = await axios.post<any>(apiUrl, requestData, {
    timeout: 30000,
  });

  // START Save to DB
  const url = '/api/simulatorSaveDb';
  const payload = {
    reqId: response?.data?.id,
    apiKey: process.env.NEXT_PUBLIC_IPG_API_KEY,
    orderRefId,
    currency: 'IDR',
    trxType: 'inquiry',
    trxStatus: 'submitted',
    paymentSource: data.paymentSource,
    auth: data.authData || 'nihil',
    paymentSourceMethod: data.paymentSourceMethod,
    amount: data.total,
    trxToken: response?.data?.token,
    selectionsUrl: response?.data?.urls?.selections,
    checkoutUrl: response?.data?.urls?.checkout,
    statusHttp: response?.status,
    requestData,
    response,
  };

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
  const url = `/api/xenditPaid`;

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

export async function vaMega(
  customerID: string,
  tranceNum: string,
  parsedAmount: number,
  tokenss: any
) {
  const url = `/api/vaMega`;

  const requestBody = {
    customerID,
    tranceNum,
    parsedAmount,
    tokenss,
  };
  console.log(requestBody);
  try {
    const response = await axios.post(url, requestBody);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function alloAction(data: AlloTypes) {
  const url =
    data.actionType === 'add' ? `/api/allo/addPoint` : `/api/allo/deductPoint`;

  return await callAPI({
    url,
    method: 'POST',
    data: data,
  });
}

export async function alloBalancePoint(data: AlloTypes) {
  const url = `/api/allo/balance`;

  return await callAPI({
    url,
    method: 'POST',
    data: data,
  });
}

export async function transactionList() {
  const url = `/api/transactionList`;

  return await axios.get<any>(url, {
    timeout: 30000,
  });
}

export async function transactionStatuses(id: any) {
  const url = `/api/transactionStatus?id=${id}`;

  return await axios.get<any>(url, {
    timeout: 30000,
  });
}
