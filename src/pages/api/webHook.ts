/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


async function webHook(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const urlIPG = process.env.NEXT_PUBLIC_IPG_URL || '';
    const API_KEY = process.env.NEXT_PUBLIC_IPG_SIM_KEY || '';
    const USER_NAME = process.env.NEXT_PUBLIC_IPG_USERNAME || '';
    const API_URL = process.env.NEXT_PUBLIC_API || '';



    console.log("First", req.headers)
    const headers = req.headers
    const body = req.body
    const url = `${API_URL}/simulator/validhook`;
    console.log("Serst", body)
    const axiosInit = axios.create({
        proxy: false,
    });

    const response = await axiosInit.post<any>(url, body, {
        headers: headers,
        timeout: 30000,
    });

    console.log("Checkers", response.data)

    res.status(200).json(response.data);




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




