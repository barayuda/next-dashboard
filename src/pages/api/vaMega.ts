/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { KJUR } from 'jsrsasign';
import CryptoJS from 'crypto-js';
import { decrypt } from '../../services/decrypt';


function generateRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a 4-digit random number as a string
function generateRandomValueString() {
    const randomInt = generateRandomInt(1000, 9999); // Ensuring a 4-digit number
    return randomInt.toString();
}

// Generating a 4-digit random number as a string
const randomValueString = generateRandomValueString();
console.log('Random 4-Digit Number String:', randomValueString);

const url = process.env.NEXT_PUBLIC_SIMULATOR_TF || '';
const apikey = process.env.NEXT_PUBLIC_OPEN_API_KEY || '';

async function vaMega(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const record = req.body;
    const tokensss = record.tokenss
    console.log("sasa", record)

    const certPath = "/tmp/cert/bankmegalocal.crt";
    const keyPath = "/tmp/cert/bankmegalocal.key";

    const cert = fs.readFileSync(certPath);
    const key = fs.readFileSync(keyPath);

    const agent = new https.Agent({
        cert: cert,
        key: key,
        rejectUnauthorized: false, // Set this to true to validate the SSL certificate
    });


    const customerID1 = record.customerID;
    const tranceNum1 = record.tranceNum;
    const amount1 = record.parsedAmount;
    const tokens1 = record.tokenss;
    const tokenss = "Bearer " + tokens1;
    // Construct the query parameters

    const body = {


        "BillAmount": amount1 + "00",
        "Amount": amount1 + "00",
        "BillAmount2": "000",
        "CardNum": "4214088888888888",
        "Time": "172000",
        "BillStatus": "0",
        "Operation": "payment",
        "CustomerID": customerID1,
        "ProcessingCode": "171000",
        "D1": "00000000000000000000IDRF",
        "Date": "0914",
        "D2": "010190012001081++++++++++++++++++++",
        "DescRepeat": "03",
        "D3": "010190011555550++++++++++++++++++++",
        "TraceNum": tranceNum1,
        "InstCode": "VA",
        "AccCredit": "010190012001081",
        "TerminalID": "9481",
        "AccDebit": "010740021014062",
        "DatePlus": "0715",
        "CustomerName": "JHONEDDI+SETIAWAN+++++++++++++",
        "AmountRepeating": "02"

        // tokenss: tokensss

    }
    const requestBody = JSON.stringify(body);

    console.log("saw", requestBody)

    const axiosInstance = axios.create({
        proxy: false // or proxy: {}
    });

    // try {
    // Create an Axios instance with no proxy

    const encription = await encrypt(requestBody);
    console.log(13212312, encription)



    if (encription) {

        const bodySend = encription.encryptedBody.toString();
        console.log("Check ", bodySend)
        const chrono = encription.timestamp
        const cred = encription.credential
        const prometheus = 123


        const clientSecret = "Jie2LHVWOBnHE1OQUU7XlpLXiFSOFXH5";
        // Calculate X-SIGNATURE Header
        const method = 'POST';
        const path = '/openapi/v1.0/va/payment-transfer';
        const access_token = tokens1
        console.log("Acssss", access_token)
        const md = new KJUR.crypto.MessageDigest({ alg: 'sha256', prov: 'cryptojs' });
        md.updateString(requestBody);
        const mdHex = md.digest();
        const stringToSign = method + ':' + path + ':' + access_token + ':' + mdHex + ':' + chrono;
        const hash = CryptoJS.HmacSHA512(stringToSign, clientSecret);
        const signature = CryptoJS.enc.Base64.stringify(hash);
        console.log('Seyan: ' + stringToSign);
        Cookies.set('signature', signature);


        const sigma = signature


        const response = await axiosInstance.request({
            method: "POST",
            url,
            data: bodySend,
            headers: {
                Authorization: tokenss,
                'Content-Type': 'text/plain',
                'X-SIGNATURE': sigma,
                'X-TIMESTAMP': chrono,
                'X-PARTNER-ID': prometheus,
                'X-EXTERNAL-ID': '4180755335895009318416' + randomValueString,
                'CHANNEL-ID': '95221',
                'Host': 'openapidev1.bankmega.local',
                'X-CREDENTIAL-KEY': cred
            },
            httpsAgent: agent
        });

        console.log(13212312, encription)
        console.log(13212312, response)
        // Handle the response from the API as needed
        const aes = encription.randomAESKey
        const four = encription.randomAESIv
        const decryptBody = response.data
        const bbody = {
            decryptBody,
            aes,
            four
        }
        console.log("ubud", bbody)
        const decrtpt = await decrypt(bbody)

        const restab = decrtpt.decryptedBody

        console.log("res", restab)

        console.log("decrtpt", decrtpt)
        res.status(200).json(restab);

        // console.log("decrtpt", decrtpt)
        // res.status(500).json({ error: 'Internal Server Error' });
    }
    // res.status(500).json({ error: 'An error occurred durring enc' });
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).json({ error: 'An error occurred' });
    // }

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