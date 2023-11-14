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
    const API_KEY = process.env.NEXT_PUBLIC_IPG_API_KEY || '';
    const USER_NAME = process.env.NEXT_PUBLIC_IPG_USERNAME || '';

    const record = req.body;
    console.log("Happy", record)

    try {


        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });
        const url = `${urlIPG}/transaction/sign`;
        console.log(url);
        const data = {
            trxType: req.body.trxType,
            accountRef: req.body.accountRef,
        }
        console.log("Data HASHSAHSAHSAH", data)
        const headers = {
            apikey: API_KEY,
            username: USER_NAME
        }
        const response = await axiosInstance.post<any>(url, data, {
            headers
        });

        console.log("Test", response);

        // const response = await axiosInit.post<any>(PostAddrest, requestData, {
        //     headers,
        //     timeout: 10000,
        //   });


        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error:', error);
        console.log("Error Suuhu");
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




