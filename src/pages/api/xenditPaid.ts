/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { request } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
const ROOT_API = process.env.NEXT_PUBLIC_API || '';

async function xenditPaid(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const record = req.body;
    console.log("saw", record)
    try {
        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });
        const external_id = record.externalID;
        const amount = record.amount.toString(); // Convert to string
        const url = `${ROOT_API}/simulator/xendit/simulatepay/${external_id}`;
        console.log({
            url, amount, header: {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        });
        const response = await axiosInstance.post<any>(url, { amount }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("Zessssst", request);
        console.log("Test", response.data);
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
        await xenditPaid(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}