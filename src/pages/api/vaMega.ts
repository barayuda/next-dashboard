/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'js-cookie';
import { KJUR } from 'jsrsasign';
import CryptoJS from 'crypto-js';

interface Utils {
  toIsoString: (date: Date) => string;
}

const utils: Utils = {
  toIsoString: function (date: Date) {
    const tzo = -date.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = (num: number) => (num < 10 ? '0' : '') + num;

    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      dif +
      pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' +
      pad(Math.abs(tzo) % 60)
    );
  },
};

function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a 4-digit random number as a string
function generateRandomValueString() {
  const randomInt = generateRandomInt(1000, 9999); // Ensuring a 4-digit number
  return randomInt.toString();
}

function generateSignature(stringToSign: string, clientSecret: string) {
  const hash = CryptoJS.HmacSHA512(stringToSign, clientSecret);
  return CryptoJS.enc.Base64.stringify(hash);
}

function generateEncodedHash(bodyString: string) {
  const md = new KJUR.crypto.MessageDigest({ alg: 'sha256', prov: 'cryptojs' });
  md.updateString(bodyString);
  return md.digest();
}

async function vaMega(req: NextApiRequest, res: NextApiResponse) {
  try {
    const randomValueString = generateRandomValueString();
    const inquiryId = 'abcdef-123456-pqrstu-' + randomValueString;
    const clientSecret = 'u1nY1tHdlQV50sVbFCbfWThjSr5cMn0B';

    //inquiry
    const record = req.body;
    const body = {
      partnerServiceId: '     78',
      customerNo: '781000',
      virtualAccountNo: record.customerID,
      txnDateInit: '20201231T235959Z',
      channelCode: 6011,
      language: 'ID',
      amount: {
        value: record.parsedAmount,
        currency: 'IDR',
      },
      hashedSourceAccountNo:
        'M2EBYfK1Rc5fpQsDqRJTvjJRuxToOxNwbF1Dgk4BiBEjYQBXo0zW4z57TTYqDXo+lTtVzXiuahkZR4FrUagfVA==',
      sourceBankCode: '0426',
      passApp: '',
      inquiryRequestId: inquiryId,
      additionalInfo: {},
    };

    const dt = new Date();
    const timestamp = utils.toIsoString(dt);
    Cookies.set('timestamp', timestamp, { secure: true });

    let bodyString = JSON.stringify(body);
    let path = '/v1.0/transfer-va/inquiry';
    let url = process.env.SNAP_SERVICES_URL + path;
    let encodedHash = generateEncodedHash(bodyString);

    let stringToSign = 'POST' + ':' + path + ':' + record.tokenss + ':' + encodedHash + ':' + timestamp;
    let signature = generateSignature(stringToSign, clientSecret);

    const axiosInstance = axios.create({
      proxy: false, // or proxy: {}
    });

    const inquiry = await axiosInstance.request({
      method: 'POST',
      url,
      data: body,
      headers: {
        Authorization: 'Bearer ' + record.tokenss,
        'X-SIGNATURE': signature,
        'X-TIMESTAMP': timestamp,
        'X-PARTNER-ID': '0815e784-fbef-4224-9869-6e3d708bf487',
        'X-EXTERNAL-ID': '4009318416' + randomValueString,
        'CHANNEL-ID': '95221',
      },
    });
    // end of inquiry

    // payment
    const bodyPay = {
      partnerServiceId: '     78',
      customerNo: '781000',
      virtualAccountNo: record.customerID,
      virtualAccountName: '',
      virtualAccountEmail: '',
      virtualAccountPhone: '',
      trxId: 'abcdefgh1234',
      paymentRequestId: 'abcdef-123456-fghijklmno',
      channelCode: 6011,
      hashedSourceAccountNo:
        'M2EBYfK1Rc5fpQsDqRJTvjJRuxToOxNwbF1Dgk4BiBEjYQBXo0zW4z57TTYqDXo+lTtVzXiuahkZR4FrUagfVA==',
      sourceBankCode: '0426',
      paidAmount: {
        value: '100.00',
        currency: 'IDR',
      },
      cumulativePaymentAmount: {
        value: '100.00',
        currency: 'IDR',
      },
      paidBills: '',
      totalAmount: {
        value: '100.00',
        currency: 'IDR',
      },
      trxDateTime: '20201231T235959Z',
      referenceNo: '123456789012345',
      journalNum: '',
      paymentType: 1,
      flagAdvise: 'Y',
      subCompany: '',
      billDetails: [
        {
          billCode: '',
          billNo: '',
          billName: '',
          billShortName: '',
          billDescription: {
            english: '',
            indonesia: '',
          },
          billSubCompany: '',
          billAmount: {
            value: '',
            currency: '',
          },
          additionalInfo: {},
          billReferenceNo: '',
        },
      ],
      freeTexts: [
        {
          english: '',
          indonesia: '',
        },
      ],
      additionalInfo: {
        inquiryRequestId: inquiryId,
      },
    };

    bodyString = JSON.stringify(bodyPay);
    path = '/v1.0/transfer-va/payment';
    encodedHash = generateEncodedHash(bodyString);

    stringToSign = 'POST' + ':' + path + ':' + record.tokenss + ':' + encodedHash + ':' + timestamp;
    signature = generateSignature(stringToSign, clientSecret);

    url = process.env.SNAP_SERVICES_URL + path;

    const payment = await axiosInstance.request({
      method: 'POST',
      url,
      data: bodyPay,
      headers: {
        Authorization: 'Bearer ' + record.tokenss,
        'X-SIGNATURE': signature,
        'X-TIMESTAMP': timestamp,
        'X-PARTNER-ID': '0815e784-fbef-4224-9869-6e3d708bf487',
        'X-EXTERNAL-ID': '4009318416' + generateRandomValueString(),
        'CHANNEL-ID': '95221',
      },
    });
    // end of payment


    // build result
    const result = {
      status: 'ok',
      statusHttp: 200,
      message: 'Called',
      request: {
        amount: record.parsedAmount,
      },
      response: {
        status: 'success', 
        message: 'success'
      },
    };

    console.log(`success to pay: ${body}}, response: ${result}`);

    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await vaMega(req, res);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
