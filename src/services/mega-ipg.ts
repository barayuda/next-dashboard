/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import callAPI from '../pages/api/call';

export async function findByAccRef(data: any) {
  // const url = `http://10.14.20.49:8090/api/v1/transaction`;
  const url = `http://10.14.20.49:3000/transaction/sign`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}
