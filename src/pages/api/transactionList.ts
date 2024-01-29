/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NextApiRequest, NextApiResponse } from 'next';
import type { SimulatorTypes } from '../../services/data-types/';
import { transactionRepo } from './transactionRepo';

function transactionList(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = transactionRepo.getAll();
    res.status(200).json(data);
  } catch (e) {
    console.log('error when saving transaction to file', e);
    res.status(500).json("Error to save transaction")
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    transactionList(req, res);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
