/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';

const axiosInstance = axios.create({
    proxy: false, // or proxy: {}
  });

export async function authorize(phoneNumber: string) {
  try {
    const ALLO_SERVICE_URL = process.env.ALLO_SERVICE_URL || '';
    const url = `${ALLO_SERVICE_URL}/alloServices/index.php`;

    const bodyAuth = {
      phoneNo: phoneNumber,
    };

    const response = await axiosInstance.post<any>(url, bodyAuth, {
      headers: {
        'Content-Type': 'application/json',
        bu: 'mega',
        secret: '082208222250',
        action: 'authorize',
      },
    });

    return response.data.responseData.accessToken as string;
  } catch (error) {
    return '';
  }
}

export async function balance(accessToken: string) {
  try {
    const ALLO_SERVICE_URL = process.env.ALLO_SERVICE_URL || '';
    const url = `${ALLO_SERVICE_URL}/alloServices/index.php`;
    const bodyToken = {
      accessToken: accessToken,
    };

    const response = await axiosInstance.post<any>(url, bodyToken, {
      headers: {
        'Content-Type': 'application/json',
        bu: 'mega',
        secret: 'K7499_sZG8765Ys2',
        action: 'inquiryBalance',
      },
    });

    return response.data.responseData.balance as number;
  } catch (error) {
    return 0;
  }
}


export function generateNumber(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
