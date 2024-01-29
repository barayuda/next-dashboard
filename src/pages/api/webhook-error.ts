/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from 'next';

function webHook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ "status": "nok", "validateSignature": null });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    webHook(req, res);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}