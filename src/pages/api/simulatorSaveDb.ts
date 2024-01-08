/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import type { SimulatorTypes } from '../../services/data-types/';
import callAPI from './call';
import fs from "fs";
import https from "https";

const ROOT_API = process.env.NEXT_PUBLIC_API || '';

// const certPath = "/tmp/cert/bankmegalocal.crt";
// const keyPath = "/tmp/cert/bankmegalocal.key";

// const cert = fs.readFileSync(certPath);
// const key = fs.readFileSync(keyPath);

// const agent = new https.Agent({
//     cert: cert,
//     key: key,
//     rejectUnauthorized: false, // Set this to true to validate the SSL certificate
// });

function simulatorSaveDb(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    const record = req.body
    const url = `${ROOT_API}/simulator`;
    console.log('url', url);

    const payload = record;
    console.log('payloadssss', payload);

    try {
        // await callAPI({
        //     url,
        //     method: 'POST',
        //     data: payload,
        // });


    } catch (error) {
        // res.status(500).json("Error");
    }
    console.log("resz", Response)
    res.status(200).json(payload.selectionsUrl);
}


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    data: SimulatorTypes
) {
    try {
        simulatorSaveDb(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}









