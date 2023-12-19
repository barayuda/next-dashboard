import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function list(req: NextApiRequest, res: NextApiResponse) {
  const ROOT_API = process.env.NEXT_PUBLIC_API || '';
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const axiosInstance = axios.create({
      proxy: false,
    });
    const url = `${ROOT_API}/simulator/webhook-list`;
    const headers = {
      token: true,
    };
    const response = await axiosInstance.get<any>(url, {
      headers,
    });

    console.log('Test', response);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    console.log('Error Suuhu');
    res.status(500).json({ error: 'An error occurred' });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await list(req, res);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
