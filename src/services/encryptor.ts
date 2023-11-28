/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
// Assuming necessary modules are properly imported
import CryptoJS, { lib, enc } from 'crypto-js';
import Cookies from 'js-cookie';
import { KEYUTIL, KJUR, RSAKey } from 'jsrsasign';

const public_public_key = process.env.NEXT_PUBLIC_KEY;

interface EncryptionResult {
    timestamp: string;
    randomAESKey: string;
    randomAESIv: string;
    credential: string;
    encryptedBody: string;
    signature: string;
}


export async function encrypt(body: any): Promise<EncryptionResult> {

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
    Cookies.set('timestamp', timestamp);
    console.log('X-TIMESTAMP: ' + timestamp);

    const pad = (num: number) => (num < 10 ? '0' : '') + num;

    Cookies.set(
        'prefix',
        (dt.getFullYear() - 10) +
        pad(dt.getMonth() + 1) +
        pad(dt.getDate()) +
        pad(dt.getHours()) +
        pad(dt.getMinutes()) +
        pad(dt.getSeconds())
    );

    // Generate Random AES Key
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const randomAESKeyBytes = CryptoJS.PBKDF2('itec-cds-is-the-beast', salt, { keySize: 256 / 32 });
    const randomAESKey = CryptoJS.enc.Base64.stringify(randomAESKeyBytes);
    console.log('Random AES Key (256): ' + randomAESKey);
    Cookies.set('random_aes_key', randomAESKey);

    // Generate Random IV
    const IvBytes = lib.WordArray.random(128 / 8);
    const randomAESIv = CryptoJS.enc.Base64.stringify(IvBytes);
    console.log('Random IV (16): ' + randomAESIv);
    Cookies.set('random_aes_iv', randomAESIv);

    console.log(public_public_key);

    // Calculate X-CREDENTIAL-K   EY Header
    const public_key =
        '-----BEGIN PUBLIC KEY-----' + public_public_key + '-----END PUBLIC KEY-----';
    const publicKey = KEYUTIL.getKey(public_key) as RSAKey;
    let rawbody = JSON.stringify(body);
    rawbody = rawbody.replace('{{prefix}}', "20131122161351");
    rawbody = rawbody.replace('{{sequence}}', "26");
    const req = JSON.parse(rawbody);
    const body1 = JSON.stringify(req);
    console.log('body: ' + body1);
    const combined = randomAESKey + ':' + randomAESIv;
    const encrypted = KJUR.crypto.Cipher.encrypt(combined, publicKey, 'RSA');
    const xcred = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encrypted));
    console.log('X-CREDENTIAL-KEY: ' + xcred);
    Cookies.set('credential', xcred);

    // Encrypt Request Body
    const encryptedBody = CryptoJS.AES.encrypt(body1, randomAESKeyBytes, {
        iv: IvBytes,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });
    console.log('Plain Body: ' + body1);
    console.log('Encrypted Body: ' + encryptedBody.toString());
    Cookies.set('encrypted_body', encryptedBody.toString());

    // Calculate X-SIGNATURE Header
    const method = 'POST';
    const path = '/openapi/v1.0/ovb/transfer';
    const access_token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGdDFYVGlyd05qV2w2dDY1SF9oTWhyNjhVTk53ZU9ZSVd3VFhCX29WNy0wIn0.eyJleHAiOjE3MDA0NjYwNTEsImlhdCI6MTcwMDQ2NTc1MSwianRpIjoiOTcxZmM0ZWItYjVlYy00NGExLWFlYmEtMzA3YTRjMDdkZWM5IiwiaXNzIjoiaHR0cHM6Ly9zbmFwa2NkZXYxLmJhbmttZWdhLmxvY2FsOjg0NDMvcmVhbG1zL2Jwc2VjdXJpdHkiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNzdlNDdjZmItMjA0MS00MjlkLTlmMmMtOGYzZmU2NDUxMDVmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidGVzdCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWJwc2VjdXJpdHkiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTAuMTkwLjUuMiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LXRlc3QiLCJjbGllbnRBZGRyZXNzIjoiMTAuMTkwLjUuMiIsImNsaWVudF9pZCI6InRlc3QifQ.JL78GVLi8QrIP-bvetBg8D_JPG4Co_1clw2qli0UoVn1kSYH4IzNEKCsCbfRSF1RvGvMOkWIHrTb4bojneiCz41PLxKuIG7UK1S93DFkIKFQTObaBW5mXOJmtm4NRX6OWMA8fccEj9gBglGpBm4ldQSQ5tM3u-plTpOIBbfkY7TPWauKVPQ-ErVSKs7Nj8YAWx3fxPZ9BggJ7IYp-FegaxCZy4oilNfy9PdYv5DKw_VFn25mNPUGnT8xflhoCqqsBGCf_Xi6nipoVIeKldp4T2b-39nfZKuiqVzWsefY6-Ke1wK8N8gDF1G9kCiZNPBPT2klu1tfxHaOnFqbrmrltA";
    const md = new KJUR.crypto.MessageDigest({ alg: 'sha256', prov: 'cryptojs' });
    md.updateString(body1);
    const mdHex = md.digest();
    const stringToSign = method + ':' + path + ':' + access_token + ':' + mdHex + ':' + timestamp;
    const clientSecret = "Jie2LHVWOBnHE1OQUU7XlpLXiFSOFXH5" || '';
    const hash = CryptoJS.HmacSHA512(stringToSign, clientSecret);
    const signature = CryptoJS.enc.Base64.stringify(hash);
    console.log('X-SIGNATURE: ' + signature);
    Cookies.set('signature', signature);

    const result: EncryptionResult = {
        timestamp,
        randomAESKey,
        randomAESIv,
        credential: xcred,
        encryptedBody: encryptedBody.toString(),
        signature,
    };

    return result;

}