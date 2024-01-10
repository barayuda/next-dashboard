/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function authorize(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const ALLO_SERVICE_URL = process.env.ALLO_SERVICE_URL || '';
        const url = `${ALLO_SERVICE_URL}/alloServices/index.php`;

        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });
      
        const bodyAuth = {
            phoneNo: req.body.phoneNumber,
          };

        const authorize = await axiosInstance.post<any>(url, bodyAuth, {
            headers: {
            'Content-Type': 'application/json',
            'bu': 'mega',
            'secret': '082208222250',
            'action': 'authorize',
          }});

        const accessToken = authorize.data.responseData.accessToken;
        res.status(200).json(accessToken);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        await authorize(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}