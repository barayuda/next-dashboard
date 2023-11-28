
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


async function tfOpenApi(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const record = req.body;

    const customerID1 = record.customerID;
    const tranceNum1 = record.tranceNum;
    const amount1 = record.parsedAmount;
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
            ReferenceNumber: "941114",
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
        const uri = `http://10.14.20.174:9081/toPCE`;
        console.log(uri);
        const response = await axiosInstance.get(uri);
        console.log("Test", response);
        // Handle the response from the API as needed
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
        await tfOpenApi(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}