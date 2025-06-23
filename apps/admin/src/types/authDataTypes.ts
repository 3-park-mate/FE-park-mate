export interface SignUpStoreDataType {
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  bankName: string;
  accountNumber: string;
  businessRegistrationNumber: string;
  settlementCycle: 15 | 30;
}

export interface SignUpDataType {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  bankName: string;
  accountNumber: string;
  businessRegistrationNumber: string;
  settlementCycle: 15 | 30;
  verificationCode: string;
}

export interface SignInDataType {
  email: string;
  password: string;
}

export interface SignInResponseDataType {
  accessToken: string;
  refreshToken: string;
  hostUuid: string;
}
