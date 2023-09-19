/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import type { SimulatorTypes } from '../../services/data-types/';

async function inqueryApi(
  req: NextApiRequest,
  res: NextApiResponse,
  data: SimulatorTypes
) {
  const record = req.body;
  try {
    const refUrl =
      process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:4000';
    const requestData = {
      amount: record.amount,
      currency: record.currency,
      referenceUrl: record.referenceUrl,
      order: {
        id: record.order.id,
        disablePromo: record.order.disablePromo,
        auth: record.order.auth,
        afterDiscount: record.order.afterDiscount,
        recurringId: record.order.recurringId,
        retryPolicy: record.order.retryPolicy,
        paymentMethod: record.order.paymentMethod,
        items: record.order.items,
      },
      customer: {
        name: record.customer.name,
        email: record.customer.email,
        phoneNumber: record.customer.phoneNumber,
        country: record.customer.country,
        postalCode: record.customer.postalCode,
      },
      paymentSource: record.paymentSource,
      paymentSourceMethod: record.paymentSourceMethod,
      token: record.token,
    };

    // console.log('Test Case Name', record);
    console.log('Request', requestData);

    const headers = {
      Authorization: process.env.NEXT_PUBLIC_IPG_API_KEY?.toString(),
      // Add any other headers as needed
    };

    const PostAddrest = process.env.NEXT_PUBLIC_IPG_INQUIRY_URL || '';

    const axiosInit = axios.create({
      proxy: false,
    });
    const response = await axiosInit.post<any>(PostAddrest, requestData, {
      headers,
      timeout: 10000,
    });

    // Handle the response as needed
    console.log('Response', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    // Handle error
    console.error('Error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  data: SimulatorTypes
) {
  try {
    await inqueryApi(req, res, data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
