/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from 'next';
import CryptoJS from 'crypto-js';

async function webHook(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const headSignature = req.headers?.signature as String;
    if (headSignature) {
      const splitSignature = headSignature.split(";");
      const secretKey = process.env.NEXT_PUBLIC_IPG_SECRET_KEY || '';
      const signature = splitSignature[0];
      const timestamps = splitSignature[1];
      
      let stringVS = secretKey + signature + timestamps;
      let hash = CryptoJS.MD5(stringVS).toString();

      console.log(
        `ValidateSignature: ${stringVS} (${typeof stringVS}), hash: ${hash}`
      );

      res.status(200).json({
            status: "ok",
            validateSignature: CryptoJS.MD5(
                secretKey + signature + timestamps
            ).toString(),
            });
    }

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        await webHook(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




