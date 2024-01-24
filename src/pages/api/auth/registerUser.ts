/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { NextApiRequest, NextApiResponse } from 'next';
import { create, UserTypes, usersRepo, emailHtmlAuth } from './helper';
import CryptoJS from 'crypto-js';
import { sendMail } from '../../../services/mailService';

function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValueString() {
  const randomInt = generateRandomInt(100000, 999999);
  return randomInt.toString();
}

async function signUp(req: NextApiRequest, res: NextApiResponse) {
  try {
    const randomValueString = generateRandomValueString();
    const password = CryptoJS.MD5(randomValueString).toString();

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: password,
      admin: req.body.admin,
    };

    let status;
    let result;

    const html = emailHtmlAuth('Your Account Has Been Successfully Created', randomValueString);

    if (usersRepo.getByEmail(req.body.email)) {
      status = 500;
      result = {
        message: `User with the email ${req.body.email} already exists`,
      };
    } else {
      status = 200;
      result = create(data as UserTypes);

      sendMail('Register', req.body.email, html);
    }
    console.log(`Register User: ${req.body.email}, status: ${status}` );

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
