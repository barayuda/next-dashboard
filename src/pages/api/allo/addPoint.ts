import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function addPoint(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });
        const ALLO_SERVICE_URL = process.env.ALLO_SERVICE_URL || '';
        const url = `${ALLO_SERVICE_URL}/alloServices/index.php`;
      
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
        const bodyToken = {
            'phoneNo': req.body.phoneNumber,
            'amount':  req.body.point,
            'merchantId': '010101001',
            'accessToken': accessToken
          }

        const response = await axiosInstance.post<any>(url, bodyToken, {
            headers: {
            'Content-Type': 'application/json',
            'bu': 'mega',
            'secret': 'K7499_sZG8765Ys2',
            'action': 'addPoint',
          }});

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
        await addPoint(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}