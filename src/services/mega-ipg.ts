/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import callAPI from '../pages/api/call';
export async function findByAccRef(data: any) {
  const url = `/api/vaMegaInquiry`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function openAdds(headers: any) {
  const url = `/api/getAcsMa`;

  return callAPI({
    url,
    method: 'GET',
    headers,
  });
}
