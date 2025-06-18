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
  password: string;
  name: string;
  phoneNumber: string;
  verificationCode: string;
}

export interface SignInDataType {
  email: string;
  password: string;
}

export interface SignInResponseDataType {
  accessToken: string;
  refreshToken: string;
  userUuid: string;
}
