/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from 'crypto-js';

async function signUp(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const apiKey = process.env.NEXT_PUBLIC_IPG_SIM_KEY || '';
    const userApi = process.env.NEXT_PUBLIC_IPG_USERNAME || '';

    const API_VERSION = 'v1';
    try {
        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });
        const url = `./api/auth/signup`;
        console.log(url);
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            retypePassword: req.body.retypePassword
        }

        const headers = {
            apikey: apiKey,
            username: userApi
        }
        const response = await axiosInstance.post<any>(url, data, {
            headers
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        await signUp(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}