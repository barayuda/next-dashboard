import callAPI, { ApiHeaders } from '../pages/api/call';
const KEY = process.env.NEXT_PUBLIC_IPG_API_KEY || '';

export async function getMonitoringTransaction(valueParams?: string) {
  let params = '';
  if (valueParams === 'all') {
    params = '';
  } else {
    params = `?status=${valueParams || ''}`;
  }
  const url = `../api/monitoring/list`;
  const data = {
    H1: params,
  }


  return await callAPI({
    url,
    token: true,
    method: 'POST',
    headers: {
      apikey: KEY,
    } as ApiHeaders,
    data
  });
}

export async function getTransactionDetail(id: string, token: string) {
  const url = 'api/monitoring/list';
  return callAPI({
    url,
    method: 'GET',
    serverToken: token,
    headers: {
      apikey: KEY,
    } as ApiHeaders
  });
}
