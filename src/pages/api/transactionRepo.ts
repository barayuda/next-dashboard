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

const dataFilePath = 'data/transaction.json';

const jsonData = fs.readFileSync(dataFilePath, 'utf8');
const transactions = JSON.parse(jsonData);

export interface TransactionTypes {
  reqId: string,
  apiKey: string,
  orderRefId: string,
  currency: string,
  paymentSource: string,
  trxType: string,
  trxStatus: string,
  auth: string,
  paymentSourceMethod: string,
  amount: number,
  trxToken: string,
  selectionsUrl: string,
  checkoutUrl: string,
  statusHttp: number,
  requestData: any,
  response: any
}

export const transactionRepo = {
  getAll: () => transactions,
  getById: (id: string) => transactions.find((x: TransactionTypes) => x.reqId.toString() === id.toString()),
  find: (x: string) => transactions.find(x),
  create,
  update,
};

export async function create(transaction: TransactionTypes) {

  // add and save user
  transactions.push(transaction);
  saveData();

  return transaction;
}

export function update(id: string, params: TransactionTypes) {
  const transaction = transactions.find((x: TransactionTypes) => x.reqId.toString() === id.toString());

  // update and save
  Object.assign(transaction, params);
  saveData();

  return transaction;
}


export function saveData() {
  fs.writeFileSync(dataFilePath, JSON.stringify(transactions, null, 4));
}