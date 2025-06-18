export interface SignUpStoreDataType {
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
}

export interface SignUpDataType {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  accountNumber: string;
  businessRegistrationNumber: string;
  settlementCycle: number;
  verificationCode: number;
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
