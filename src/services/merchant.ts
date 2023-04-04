import callAPI from '../pages/api/call';

const ROOT_API = process.env.NEXT_PUBLIC_API || '';
const API_VERSION = 'api/v1';

export async function updateProfile(data: FormData, id: string) {
  const url = `${ROOT_API}/${API_VERSION}/players/profile/${id}/detail`;

  return callAPI({ url, method: 'GET', data, token: true });
}

export async function getMerchantTransaction(valueParams: string) {
  let params = '';
  if (valueParams === 'all') {
    params = '';
  } else {
    params = `?status=${valueParams}`;
  }
  const url = `${ROOT_API}/${API_VERSION}/merchant/transaction/${params}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getTransactionDetail(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/merchants/history/${id}/detail`;

  return callAPI({
    url,
    method: 'GET',
    serverToken: token,
  });
}
