import callAPI from '../pages/api/call';

const ROOT_API = process.env.NEXT_PUBLIC_API || '';
const API_VERSION = 'api/v1';

export async function getMonitoringTransaction(valueParams?: string) {
  let params = '';
  if (valueParams === 'all') {
    params = '';
  } else {
    params = `?status=${valueParams || ''}`;
  }
  const url = `../api/getMonitoringAll`;
  const data = {
    H1: params,
  }
  //api/getMonitoringAll
  //${ROOT_API}/${API_VERSION}/monitoring/${params}
  return await callAPI({
    url,
    token: true,
    method: 'POST',
    data
  });
}

export async function getTransactionDetail(id: string, token: string) {
  const url = 'api/getMonitoringAll';

  //`${ROOT_API}/${API_VERSION}/monitoring/history/${id}/detail`

  return callAPI({
    url,
    method: 'GET',
    serverToken: token,
  });
}
