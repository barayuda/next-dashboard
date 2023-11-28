/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { encrypt } from '../../services/encryptor';
import Cookies from 'js-cookie';
import fs from "fs";
import https from "https";


const url = process.env.NEXT_PUBLIC_SIMULATOR_TF || '';
const apikey = process.env.NEXT_PUBLIC_OPEN_API_KEY || '';

async function vaMega(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const record = req.body;

    const certPath = "/tmp/cert/bankmegalocal.crt";
    const keyPath = "/tmp/cert/bankmegalocal.key";

    const cert = fs.readFileSync(certPath);
    const key = fs.readFileSync(keyPath);

    const agent = new https.Agent({
        cert: cert,
        key: key,
        rejectUnauthorized: false, // Set this to true to validate the SSL certificate
    });


    // const customerID1 = record.customerID;
    const tranceNum1 = record.tranceNum;
    // const amount1 = record.parsedAmount;
    const tokens1 = record.tokenss;
    const tokenss = "Bearer " + tokens1;
    console.log("tokenss", tokenss)
    // Construct the query parameters

    const body = {

        Data: {
            AccDebit: "010740025111569",
            AccCredit: "010740020679820",
            ProcessingCode: "490001",
            TransmissionDateTime: "1410212121",
            TraceID: "trx_trace_umc",
            Time: "212121",
            Date: "1410",
            DatePlus: "1114",
            MerchType: "6017",
            ReferenceNumber: tranceNum1,
            CardAcceptorTerminalID: "MSMILE",
            DE48: {
                TransactionBranch: "074",
                AmountDebit: "000005000",
                CurrencyDebit: "IDR",
                RateDebit: "100",
                AmountCredit: "000005000",
                CurrencyCredit: "IDR",
                RateCredit: "",
                AccountReserve: "",
                CurrencyReserve: "",
                AmountReserve: "",
                Remark1: "",
                Remark2: "dari depan",
                Remark3: "dari depan",
                PassbookBalance: "",
                TellerID: "",
                JurnalSequence: "",
                DealNumber: "",
                DealEntryProfit: "",
                DealEntryLoss: ""
            }
        }

    }



    try {
        // Create an Axios instance with no proxy
        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });

        const encription = await encrypt(body);
        console.log("Body nya ", encription)

        if (encription) {


            const bodySend = encription.encryptedBody;
            const sigma = encription.signature
            const chrono = encription.timestamp
            const cred = encription.credential
            const prometheus = apikey

            const response = await axiosInstance.post<any>(url, bodySend, {
                headers: {
                    Authorization: tokenss,
                    'Content-Type': 'application/json',
                    'X-SIGNATURE': sigma,
                    'X-TIMESTAMP': chrono,
                    'X-PARTNER-ID': prometheus,
                    'X-EXTERNAL-ID': '418075533589500931',
                    'CHANNEL-ID': '95221',
                    'Host': 'openapidev1.bankmega.local',
                    'X-CREDENTIAL-KEY': cred
                },
                httpsAgent: agent
            });
            // Handle the response from the API as needed
            console.log("Test", response);
            res.status(200).json(response);
        }
        res.status(500).json({ error: 'An error occurred durring enc' });
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
        await vaMega(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}