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

const dataFilePath = 'data/users.json';

const jsonData = fs.readFileSync(dataFilePath, 'utf8');
let users = JSON.parse(jsonData);

export interface UserTypes {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  dateCreated: string;
  dateUpdated: string;
}

export const usersRepo = {
  getAll: () => users,
  getById: (id: number) => users.find((x: UserTypes) => x.id.toString() === id.toString()),
  getByEmail: (email: any) => users.find((x: UserTypes) => x.email.toString() === email.toString()),
  getByEmailAndPassword: (email: any, password: any) =>
    users.find(
      (x: UserTypes) =>
        x.email.toString() === email.toString() &&
        x.password.toString() === password.toString()
    ),
  find: (x: string) => users.find(x),
  create,
  update,
  delete: _delete,
};

export async function create(user: UserTypes) {
  // generate new user id
  user.id = users.length
    ? Math.max(...users.map((x: UserTypes) => x.id)) + 1
    : 1;

  // set date created and updated
  user.dateCreated = new Date().toISOString();
  user.dateUpdated = new Date().toISOString();

  // add and save user
  users.push(user);
  saveData();

  return user;
}

export function update(id: number, params: UserTypes) {
  const user = users.find((x: UserTypes) => x.id.toString() === id.toString());

  // set date updated
  user.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(user, params);
  saveData();

  return user;
}

export function _delete(id: number) {
  // filter out deleted user and save
  users = users.filter((x: UserTypes) => x.id.toString() !== id.toString());
  saveData();
}

export function saveData() {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 4));
}

function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomValueString() {
  const randomInt = generateRandomInt(100000, 999999);
  return randomInt.toString();
}



export function emailHtmlAuth(headerBody: string, password: string){
    return `
    <!doctype html>
    <html lang="en-US">
    
    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password Email Template</title>
        <meta name="description" content="Reset Password Email Template.">
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
    </head>
    
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:30px;font-family:'Rubik',sans-serif;">${headerBody}</h1>
                                          <br/>
                                          <p style="color:#455056; font-size:18px;line-height:24px; margin:0;">Your Password : <b> ${password} </b></p>
                                          
                                          <br/> <a href="https://demo-merchant.bankmega.com/" target="_blank">Visit The Simulator</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    
    </html>`;
}