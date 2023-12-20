/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from 'next';
import CryptoJS from 'crypto-js';

function webHook(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const headSignature = req.headers?.signature as string;
    const splitSignature = headSignature.split(";");
    const secretKey = process.env.NEXT_PUBLIC_IPG_SECRET_KEY || '';
    const signature = splitSignature[0];
    const timestamps = splitSignature[1];
    
    const stringVS = `${String(secretKey)}${String(signature)}${String(timestamps)}`;
    const hash =  CryptoJS.MD5(stringVS).toString();

    console.log(
    `ValidateSignature: ${stringVS} (${typeof stringVS}), hash: ${hash}`
    );

    res.status(200).json({
        status: "ok",
        validateSignature: hash,
        });
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




