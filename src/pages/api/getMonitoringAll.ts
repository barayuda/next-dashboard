/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function getAll(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const urlIPG = process.env.NEXT_PUBLIC_IPG_URL || '';
    const ROOT_API = process.env.NEXT_PUBLIC_API || '';
    console.log(`ROOT_API: ${ROOT_API}`);
    const API_VERSION = 'v1';
    const params = req.body.params
    // ${ROOT_API}/${API_VERSION}/monitoring/history/${id}/detail
    //${ROOT_API}/${API_VERSION}/monitoring/${params}
    const record = req.body;
    console.log("Happy", record)

    try {


        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });
        const url = `${ROOT_API}/apierrmon`;
        console.log(url);

        const headers = {
            token: true
        }
        const response = await axiosInstance.get<any>(url, {
            headers,
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
        await getAll(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}