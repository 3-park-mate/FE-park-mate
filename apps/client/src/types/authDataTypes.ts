// Re-export shared types for backward compatibility
export type {
  SignInResponseDataType,
  SignUpRequestDataType,
  SignInRequestDataType,
} from '@repo/shared-types';

// Legacy type aliases for backward compatibility
export interface SignUpStoreDataType {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
}

export interface SignInStoreDataType {
  email: string;
  password: string;
}

export interface UserInfoResponseDataType {
  userUuid: string;
  email: string;
  name: string;
  phoneNumber: string;
}
