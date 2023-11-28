/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function signUp(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const apiKey = process.env.NEXT_PUBLIC_IPG_SIM_KEY || '';
    const userApi = process.env.NEXT_PUBLIC_IPG_USERNAME || '';
    const urlIPG = process.env.NEXT_PUBLIC_IPG_URL || '';
    const ROOT_API = process.env.NEXT_PUBLIC_API || '';
    console.log(`ROOT_API: ${ROOT_API}`);
    const API_VERSION = 'v1';
    // ROOT_API/${API_VERSION}/auth/signup

    const record = req.body;
    console.log("Happy", record)

    try {


        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });
        const url = `${ROOT_API}/${API_VERSION}/auth/signup`;
        console.log(url);
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            retypePassword: req.body.retypePassword
        }
        console.log("Data HASHSAHSAHSAH", data)
        const headers = {
            apikey: apiKey,
            username: userApi
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
        await signUp(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}