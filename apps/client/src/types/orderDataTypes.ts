export interface OrderDataType {
  orderType: 'RESERVATION';
  productCode: string;
  amount: number;
  paymentType: 'POINT' | 'PG';
}
