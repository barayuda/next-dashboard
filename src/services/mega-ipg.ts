/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import callAPI, { ApiHeaders } from '../pages/api/call';

const urlIPG = process.env.NEXT_PUBLIC_IPG_URL || '';

export async function findByAccRef(data: any) {
  // const url = `http://10.14.20.49:8090/api/v1/transaction`;
  // const url = `${urlIPG}/transaction/sign`;

  const url = `/api/vaMegaInquiry`;


  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function openAdds(headers: any) {
  // const url = `http://10.14.20.49:8090/api/v1/transaction`;
  // const url = `${urlIPG}/transaction/sign`;

  const url = `/api/getAcsMa`;


  return callAPI({
    url,
    method: 'GET',
    headers,
  });
}
