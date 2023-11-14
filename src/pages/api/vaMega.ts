
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

async function vaMega(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const record = req.body;

    const customerID1 = record.customerID;
    const tranceNum1 = record.tranceNum;
    const amount1 = record.parsedAmount;
    // Construct the query parameters
    const queryParams = `?BillAmount=${amount1}00&Amount=${amount1}00&BillAmount2=000&CardNum=4214088888888888&Time=172000&BillStatus=0&Operation=payment&CustomerID=${customerID1}&ProcessingCode=171000&D1=00000000000000000000IDRA&Date=0914&D2=010190012001081++++++++++++++++++++&DescRepeat=03&D3=010190011555550++++++++++++++++++++&TraceNum=${tranceNum1}&InstCode=VA&AccCredit=010190012001081&TerminalID=9481&AccDebit=010740021014062&DatePlus=0715&CustomerName=BAKTI+SOSIAL+TEST+++++++++++++&AmountRepeating=02`;

    try {
        // Create an Axios instance with no proxy
        const axiosInstance = axios.create({
            proxy: false // or proxy: {}
        });
        const uri = `http://10.14.20.174:9081/toPCE${queryParams}`;
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
        await vaMega(req, res);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}