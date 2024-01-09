/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { KJUR } from 'jsrsasign';

async function dunk(req: NextApiRequest, res: NextApiResponse) {
  try {
    const private_value = process.env.SNAP_SERVICES_PRIV_KEY;

    const body = {
        grantType: 'client_credentials',
    };

    interface Utils {
      toIsoString: (date: Date) => string;
    }

    const utils: Utils = {
      toIsoString: function (date: Date) {
        const tzo = -date.getTimezoneOffset();
        const dif = tzo >= 0 ? '+' : '-';
        const pad = (num: number) => (num < 10 ? '0' : '') + num;

        return (
          date.getFullYear() +
          '-' +
          pad(date.getMonth() + 1) +
          '-' +
          pad(date.getDate()) +
          'T' +
          pad(date.getHours()) +
          ':' +
          pad(date.getMinutes()) +
          dif +
          pad(Math.floor(Math.abs(tzo) / 60)) +
          ':' +
          pad(Math.abs(tzo) % 60)
        );
      },
    };

    const dt = new Date();
    const timestamp = utils.toIsoString(dt);
    Cookies.set('timestamp', timestamp, { secure: true });

    var private_key =
      '-----BEGIN PRIVATE KEY-----' +
      private_value +
      '-----END PRIVATE KEY-----';
    const clientKey = '0cd72de3-d5d0-4d7e-94bc-78f84624ea43';
    const combined = clientKey + '|' + timestamp;

    var sig = new KJUR.crypto.Signature({"alg": "SHA256withRSA"});
    sig.init(private_key);
    sig.updateString(combined);
    
    var encodedSignature = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Hex.parse(sig.sign())
    );

    const axiosInstance = axios.create({
      proxy: false, // or proxy: {}
    });

    const url = process.env.SNAP_SERVICES_URL + '/api/v1.0/access-token/b2b';

    const response = await axiosInstance.request({
      method: 'POST',
      url,
      data: body,
      headers: {
        'X-SIGNATURE': encodedSignature,
        'X-TIMESTAMP': timestamp,
        'X-CLIENT-KEY': clientKey,
        Host: 'snap.bankmega.app',
      },
    });

    Cookies.set('accessToken', response.data.accessToken, { secure: true });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dunk(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
