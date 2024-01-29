/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { transactionRepo, update } from './transactionRepo';

async function transactionStatus(req: NextApiRequest, res: NextApiResponse) {
  try {
    const headers = {
      Authorization: process.env.NEXT_PUBLIC_IPG_API_KEY?.toString(),
      'Content-Type': 'application/json',
    };

    const url = `${process.env.NEXT_PUBLIC_IPG_URL}/inquiries/${req.query.id}/transactions/`;

    const axiosInit = axios.create({
      proxy: false,
    });

    const response = await axiosInit.get<any>(url, {
      headers,
      timeout: 10000,
    });

    console.log('Get Transaction Status response:', response.data);

    const transaction = '';
    try {
      const transaction = transactionRepo.getById(req.query.id as string);
      if (transaction) {
        transaction.trxType = response.data[0].type;
        transaction.trxStatus = response.data[0].status;

        update(req.query.id as string, transaction);
      }
    } catch (error) {
      console.log('Error when saving transaction:', transaction);
    }

    res.status(200).json(response.data);
  } catch (error) {
    // Handle error
    console.error('Error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await transactionStatus(req, res);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
