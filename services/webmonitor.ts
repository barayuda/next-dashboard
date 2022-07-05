import callAPI from '../config/api';
import { MonitorTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function addMonitor(data: MonitorTypes) {
  const url = `${ROOT_API}/${API_VERSION}/webmonitor/add`;

  return callAPI({
    url,
    token: true,
    method: 'POST',
    data,
  });
}

export async function getMonitor(valueParams?: string) {
  let params = '';
  if (valueParams === 'all') {
    params = '';
  } else {
    params = `?status=${valueParams}`;
  }
  const url = `${ROOT_API}/${API_VERSION}/monitor/${params}`;

  return callAPI({
    url,
    token: true,
    method: 'GET',
  });
}

export async function getTransactionDetail(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/monitor/${id}/detail`;

  return callAPI({
    url,
    method: 'GET',
    serverToken: token,
  });
}
