import type { Session } from 'next-auth';
import callAPI from '../pages/api/call';

const ROOT_API = process.env.NEXT_PUBLIC_API || '';

export type User = {
  _id: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  roles?: string[];
  active?: boolean;
  alias?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  createdAt?: string;
  updatedAt?: string;
};

const defaultData = {
  email: '',
  password: 'secret',
  name: '',
  active: true,
  // roles: [''],
  roles: ['MEMBER'],
  // createdAt: '',
  // updatedAt: ''
};

export async function getUsers(session: Session, valueParams?: string) {
  let params = '';
  if (valueParams === 'all') {
    params = '';
  } else {
    params = `?status=${valueParams || ''}`;
  }
  const url = `${ROOT_API}/users/${params}`;

  return await callAPI({
    url,
    token: true,
    method: 'GET',
    session,
  });
}

export async function addUser(data: User) {
  const url = `${ROOT_API}/users`;
  const payload = { ...defaultData, ...data };
  if (payload.password.length === 0) {
    payload.password = defaultData.password;
  }

  return await callAPI({
    url,
    token: true,
    method: 'POST',
    data: payload,
  });
}

export async function updateUser(data: User) {
  const url = `${ROOT_API}/users`;
  const payload = { ...defaultData, ...data };
  payload.id = data._id;
  console.log('payload', payload);
  return await callAPI({
    url,
    token: true,
    method: 'PATCH',
    data: payload,
  });
}

export async function deleteUser(id: string) {
  const url = `${ROOT_API}/users`;
  const payload = { id };
  return await callAPI({
    url,
    token: true,
    method: 'DELETE',
    data: payload,
  });
}

export async function updatePassword(data: User) {
  const url = `${ROOT_API}/users`;
  const payload = { ...defaultData, ...data };
  payload.id = data._id;
  console.log('payload', payload);
  return await callAPI({
    url,
    token: true,
    method: 'PATCH',
    data: payload,
  });
}
