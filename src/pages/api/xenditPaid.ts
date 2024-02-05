/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { request } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

async function xenditPaid(req: NextApiRequest, res: NextApiResponse) {
  const record = req.body;
  try {
    const external_id = record.externalID;
    const urlIPG = process.env.NEXT_PUBLIC_IPG_URL || '';
    const API_KEY = process.env.NEXT_PUBLIC_IPG_SIM_KEY || '';
    const USER_NAME = process.env.NEXT_PUBLIC_IPG_USERNAME || '';

    const axiosInstance = axios.create({
      proxy: false, // or proxy: {}
    });
    
    const transactionUrl = `${urlIPG}/transaction/sign`;

    const data = {
      trxType: 'getby.account_ref',
      accountRef: record.va,
    };

    const transactionResponse = await axiosInstance.request({
      method: 'POST',
      url: transactionUrl,
      data: data,
      headers: {
        apikey: API_KEY,
        username: USER_NAME,
      },
    });

    ///
    const xenditKey =
      transactionResponse.data.data.configData.paymentData.api_key;
    const amount = record.amount.toString(); // Convert to string
    const url = `https://api.xendit.co/callback_virtual_accounts/external_id=${external_id}/simulate_payment`;
    const headers = {
      Authorization:
        'Basic ' + Buffer.from(`${String(xenditKey)}:`).toString('base64'),
    };

    const response = await axiosInstance.post<any>(
      url,
      { amount },
      {
        headers,
      }
    );

    const result = {
      status: 'ok',
      statusHttp: 200,
      message: 'Called',
      request: {
        amount: amount,
      },
      response: response.data,
    };

    console.log(`success to pay: ${request}, response: ${result}`);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await xenditPaid(req, res);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
