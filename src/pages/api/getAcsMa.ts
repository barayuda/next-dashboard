/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */

import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import https from "https";

async function getAll(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const certPath = "/tmp/cert/bankmegalocal.crt";
    const keyPath = "/tmp/cert/bankmegalocal.key";

    const cert = fs.readFileSync(certPath);
    const key = fs.readFileSync(keyPath);

    const agent = new https.Agent({
        cert: cert,
        key: key,
        rejectUnauthorized: false, // Set this to true to validate the SSL certificate
    });

    const API_KEY = process.env.NEXT_PUBLIC_IPG_API_KEY || '';
    const API_ADDS = process.env.NEXT_PUBLIC_SIMULATOR_ADDS || '';
    console.log(`  Idk//`);
    // ${ROOT_API}/${API_VERSION}/monitoring/history/${id}/detail
    //${ROOT_API}/${API_VERSION}/monitoring/${params}
    const record = req.body;
    console.log("Happier", record)

    const apiKey = req.headers.apikey;
    if (!apiKey || apiKey !== API_KEY) {
        return res.status(400).json({ error: 'Missing or invalid API key' });
    }


    try {

        const headers = {
            Authorization: process.env.NEXT_PUBLIC_VA_PASSWORD?.toString(),
            'Content-Type': 'application/x-www-form-urlencoded', // Use quotes for keys with special characters
            // Add any other headers as needed
        };

        const body = {
            grant_type: "client_credentials"
        }
        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });
        const url = API_ADDS;
        console.log("INI URL NYA:" + url);


        const response = await axiosInstance.post<any>(url, body, {
            headers,
            httpsAgent: agent
        });


        console.log("RESPONSE NYA: ", response);



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
        await getAll(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}