export interface OrderDataType {
  orderType: 'RESERVATION';
  productCode: string;
  amount: number;
  paymentType: 'POINT' | 'PG';
}

export interface OrderResponseDataType {
  orderCode: string;
  amount: number;
}

export interface OrderDetailDataType {
  orderCode: string;
  amount: number;
  paymentType: 'POINT' | 'PG';
  timestamp: string;
}
