export interface CategoryTypes {
  _id: string;
  name: string;
  __v: number;
}

export interface GameItemTypes {
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BanksTypes {
  _id: string;
  name: string;
  bankName: string;
  noRekening: string;
}
export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BanksTypes[];
}

export interface NominalsTypes {
  _id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface UserTypes {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
}

export interface JWTPayloadTypes {
  user: UserTypes;
  _id: string;
  iat: number;
  exp: number;
}

export interface CheckoutTypes {
  voucher: string;
  nominal: string;
  payment: string;
  bank: string;
  name: string;
  accountUser: string;
}

export interface HistoryVoucherTopupTypes {
  category: string;
  coinName: string;
  coinQuantity: string;
  gameName: string;
  price: number;
  thumbnail: string;
}

export interface HistoryPaymentTypes {
  bankName: string;
  name: string;
  noRekening: string;
  type: string;
}

export interface HistoryTransactionTypes {
  _id: string;
  historyVoucherTopup: HistoryVoucherTopupTypes;
  value: number;
  status: string;
  accountUser: string;
  tax: number;
  name: string;
  historyPayment: HistoryPaymentTypes;
}

export interface TopUpCategoriesTypes {
  _id: string;
  value: number;
  name: string;
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
}

export interface MonitorTypes {
  name: string;
  url: string;
  interval: number;
  alerts: object;
  note: string;
}
