/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { authorize } from './helper';

async function balance(req: NextApiRequest, res: NextApiResponse) {
  try {
    const axiosInstance = axios.create({
      proxy: false, // or proxy: {}
    });

    const ALLO_SERVICE_URL = process.env.ALLO_SERVICE_URL || '';
    const url = `${ALLO_SERVICE_URL}/alloServices/index.php`;

    const accessToken = await authorize(req.body.phoneNumber);
    const bodyToken = {
      accessToken: accessToken,
    };

    const response = await axiosInstance.post<any>(url, bodyToken, {
      headers: {
        'Content-Type': 'application/json',
        bu: 'mega',
        secret: 'K7499_sZG8765Ys2',
        action: 'inquiryBalance',
      },
    });

    res.status(200).json(response.data.responseData.balance);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await balance(req, res);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
