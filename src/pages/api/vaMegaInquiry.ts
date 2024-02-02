/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

async function vaMegaInquiry(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const urlIPG = process.env.NEXT_PUBLIC_IPG_URL || '';
    const API_KEY = process.env.NEXT_PUBLIC_IPG_SIM_KEY || '';
    const USER_NAME = process.env.NEXT_PUBLIC_IPG_USERNAME || '';

    try {
        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });
        const url = `${urlIPG}/transaction/sign`;

        const data = {
            trxType: req.body.trxType,
            accountRef: req.body.accountRef,
        }

        const headers = {
            apikey: API_KEY,
            username: USER_NAME
        }
        
        const response = await axiosInstance.post<any>(url, data, {
            headers
        });

        console.log("Get Transaction Detail Response:", response);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        await vaMegaInquiry(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




