/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
// Assuming necessary modules are properly imported

import Cookies from "js-cookie";
import { KEYUTIL, KJUR, RSAKey } from "jsrsasign";
import CryptoJS from 'crypto-js';
import { setLocalStorage } from "./auth";

// const public_public_key = process.env.NEXT_PUBLIC_KEY;

interface EncryptionResult {
    timestamp: string;
    randomAESKey: string;
    randomAESIv: string;
    credential: string;
    encryptedBody: any;
}


export async function encrypt(body: any): Promise<EncryptionResult> {

    const public_public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi+BZell6T8brcMgjK2y+TpmZZc1K1YzC/SDFHnrXgHLvn5oUIaI7nPyywMHknd03j9sPlDaGPa/JY8rx8TV3TDXlFWmOKee716TV8A4BrBVeL6LZWeNDm9ihj+uTt+77AbZPMAZndAiZ/HU9rq2FEqqQo3sxicbZit1UtmSs+7QIDAQAB"
    const bodd = body;
    console.log("FF", bodd)
    const token = Cookies.get('tokenss');
    console.log("PR", token)
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

    const dt = new Date();
    const timestamp = utils.toIsoString(dt);
    Cookies.set('timestamp', timestamp, { secure: true });
    console.log('X-TIMESTAMP: ' + timestamp);


    // Generate Random AES Key
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const randomAESKeyBytes = CryptoJS.PBKDF2('itec-cds-is-the-beast', salt, { keySize: 256 / 32 });
    const randomAESKey = CryptoJS.enc.Base64.stringify(randomAESKeyBytes);
    console.log('Random AES Key (256): ' + randomAESKey);
    Cookies.set('random_aes_key', randomAESKey, { secure: true });

    // Generate Random IV
    const IvBytes = CryptoJS.lib.WordArray.random(128 / 8);
    const randomAESIv = CryptoJS.enc.Base64.stringify(IvBytes);
    console.log('Random IV (16): ' + randomAESIv);
    Cookies.set('random_aes_iv', randomAESIv, { secure: true });

    console.log(public_public_key);
    console.log("HOXTON");

    // Calculate X-CREDENTIAL-KEY Header
    const public_key =
        '-----BEGIN PUBLIC KEY-----' + public_public_key + '-----END PUBLIC KEY-----';
    console.log("Pubs", public_key)
    const publicKey = KEYUTIL.getKey(public_key) as RSAKey;
    const req1 = bodd;
    console.log("Pala Yoan", req1)
    const body2 = JSON.parse(req1);
    console.log("lanciao Yoan", body2)
    const body1 = JSON.stringify(body2);
    console.log("Badan Yoan", body1)
    const combined = randomAESKey + ":" + randomAESIv;
    const encrypted = KJUR.crypto.Cipher.encrypt(combined, publicKey, "RSA");
    const xcred = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encrypted));

    // Encrypt Request Body
    const encryptedBody = CryptoJS.AES.encrypt(body1, randomAESKeyBytes, {
        iv: IvBytes,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });
    console.log('Plain Body: ' + body1);
    console.log('Encrypted Body: ' + encryptedBody.toString());
    console.log('Encrypted Body HAHAHAHAH: ' + encryptedBody);
    Cookies.set('encrypted_body', encryptedBody.toString(), { secure: true });








    const result: EncryptionResult = {
        timestamp,
        randomAESKey,
        randomAESIv,
        credential: xcred,
        encryptedBody
    };

    return result;

}