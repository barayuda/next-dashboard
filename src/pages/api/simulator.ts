import type { NextApiRequest, NextApiResponse } from 'next';
import callAPI from './call';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGET(req, res);
    case 'POST':
      return handlePOST(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        data: null,
        error: {
          message: method ? `Method ${method} Not Allowed` : 'Method undefined',
        },
      });
  }
  res.status(200).json({ message: 'Hello World!' });
}

// Get simulator
const handleGET = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ error: null });
};

// Simulate transaction
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const urlInquiry = process.env.NEXT_PUBLIC_IPG_INQUIRY_URL || '';
  let data = {};
  if (
    typeof req.body === 'object' &&
    req.body !== null &&
    !(req.body instanceof Array)
  ) {
    data = req.body as object;
  }

  const response = await callAPI({
    url: urlInquiry,
    method: 'POST',
    data,
  });
  console.log('response', response);
  return res.status(200).json({ data: response });
};
