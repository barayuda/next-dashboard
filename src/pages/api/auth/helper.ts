/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import fs from 'fs';

const dataFilePath = `${process.env.FILE_PATH_ROOT}/users.json`;
const dataValidEmail = `${process.env.FILE_PATH_ROOT}/emails.json`;

const jsonDataEmails = fs.readFileSync(dataValidEmail, 'utf8')
const emails = JSON.parse(jsonDataEmails);

const jsonData = fs.readFileSync(dataFilePath, 'utf8')
let users = JSON.parse(jsonData);


export interface UserTypes {
    id: number;
    name: string;
    email: string;
    password: string;
    dateCreated: string;
    dateUpdated: string;
  }

export const usersRepo = {
    getAll: () => users,
    getById: (id: number) => users.find((x: UserTypes) => x.id.toString() === id.toString()),
    getByEmail: (email: any) => users.find((x: UserTypes) => x.email.toString() === email.toString()),
    getByEmailAndPassword: (email: any, password: any) => users.find((x: UserTypes) => x.email.toString() === email.toString() && x.password.toString() === password.toString()),
    find: (x: string) => users.find(x),
    isValidEmail: (email: any) => emails.includes(email),
    create,
    update,
    delete: _delete
};

export async function create(user: UserTypes) {
    // generate new user id
    user.id = users.length ? Math.max(...users.map((x: UserTypes) => x.id)) + 1 : 1;

    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();

    return user;
}

export function update(id: number, params: UserTypes) {
    const user = users.find((x: UserTypes)  => x.id.toString() === id.toString());

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

export function _delete(id: number) {
    // filter out deleted user and save
    users = users.filter((x: UserTypes) => x.id.toString() !== id.toString());
    saveData();
    
}

export function saveData() {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 4));
}