/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import Cookies from "js-cookie";
import { KEYUTIL, KJUR, RSAKey } from "jsrsasign";
import CryptoJS from 'crypto-js';
import { setLocalStorage } from "./auth";

interface DecryptionResult {
    decryptedBody: string;
}

export async function decrypt(body: any): Promise<DecryptionResult> {
    // Assuming pm.collectionVariables are accessible in your Next.js environment
    const boddy = body;
    const key = boddy.aes;
    const iv = boddy.four;
    const responseBody = boddy.decryptBody; // Replace with your actual response body

    const rawData = CryptoJS.enc.Base64.parse(responseBody);
    console.log('Encrypted Response Body: ' + responseBody);

    const decryptedBytes = CryptoJS.AES.decrypt(
        rawData.toString(CryptoJS.enc.Base64),  // Assuming rawData is a WordArray
        CryptoJS.enc.Base64.parse(key),
        { iv: CryptoJS.enc.Base64.parse(iv) }
    );

    const decryptedBody = decryptedBytes.toString(CryptoJS.enc.Utf8);

    console.log('Decrypted Response Body: ' + decryptedBody);

    const result: DecryptionResult = {
        decryptedBody: decryptedBody,
    };

    return result;
}
