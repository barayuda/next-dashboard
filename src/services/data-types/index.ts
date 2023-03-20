export interface LoginTypes {
  email: string;
  password: string;
}

export interface RegisterTypes {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
}

export interface UserTypes {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface JWTPayloadTypes {
  player: UserTypes;
  iat: number;
}

export interface MerchantTransactionTypes {
  trx_id: number;
  bm_id: string;
  xdt_id: string;
  external_id: string;
  bank_code: string;
  name: string;
  is_closed: boolean;
  is_single_use: boolean;
  currency: string;
  expected_amount: number;
  suggested_amount: number;
  expiration_date: string;
  description: string;
  status: string;
  owner_id: string;
  merchant_code: string;
  account_number: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface MonitoringTransactionTypes {
  _id: string;
  logId: string;
  appIP: string;
  appName: string;
  merchantId: string;
  requestData: number;
  responseData: string;
  status: string;
  trxAmount: string;
  trxTimestamp: string;
  created_at: string;
  updated_at: string;
}

export interface SimulatorTypes {
  quantity: number;
  total: number;
  material: string;
  paymentSource: string;
  paymentSourceMethod?: string;
}
