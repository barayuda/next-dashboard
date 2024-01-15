/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { NextApiRequest, NextApiResponse } from 'next';
import { create, UserTypes, usersRepo } from './helper';
import CryptoJS from 'crypto-js';

async function signUp(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.MD5(req.body.password as any).toString(),
    };

    let status;
    let result;
    if (usersRepo.getByEmail(req.body.email)) {
      status = 500;
      result = { message: `User with the email ${req.body.email} already exists`};
    } else if (!usersRepo.isValidEmail(req.body.email)) {
      status = 500;
      result = { message: `The email is not valid for this application` };
    } else {
      status = 200;
      result = create(data as UserTypes);
    }

    res.status(status).json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await signUp(req, res);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
