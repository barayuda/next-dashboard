import type { Session } from 'next-auth';
import callAPI from '../pages/api/call';

const ROOT_API = process.env.NEXT_PUBLIC_API || '';

export async function changeUserPassword(data: {
    // id: string;
    // currentPassword: string;
    newPassword: string;
}) {
    const url = `${ROOT_API}/users/password`;

    return await callAPI({
        url,
        token: true,
        method: 'PATCH',
        data,
    });
}