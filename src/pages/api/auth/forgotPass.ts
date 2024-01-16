/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { NextApiRequest, NextApiResponse } from 'next';
import { usersRepo, generateRandomValueString, update, emailHtmlAuth } from './helper';
import CryptoJS from 'crypto-js';
import { sendMail } from '../../../services/mailService';

async function signUp(req: NextApiRequest, res: NextApiResponse) {
  try {
    const randomValueString = generateRandomValueString();
    const password = CryptoJS.MD5(randomValueString).toString();

    let status;
    let result;

    const user = usersRepo.getByEmail(req.body.email);
    const html = emailHtmlAuth('You have requested to reset your password', randomValueString);

    if (!user) {
      status = 500;
      result = { message: `User with the email ${req.body.email} not exists` };
    } else {
      sendMail('Reset Password', req.body.email, html);

      user.password = password;
      user.dateUpdated = new Date().toISOString();

      status = 200;
      result = update(user.id, user);
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
