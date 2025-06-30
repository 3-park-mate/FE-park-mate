// Auth Response Types
export interface SignInResponseDataType {
  accessToken: string;
  refreshToken: string;
  userUuid?: string;
  hostUuid?: string;
  email?: string;
  name?: string;
}

export interface SignUpRequestDataType {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export interface SignInRequestDataType {
  email: string;
  password: string;
}

// Social Auth Types
export interface SocialAuthRequestDataType {
  email: string;
  name: string;
  provider: 'KAKAO' | 'GOOGLE' | 'NAVER';
}

// Auth Session Types
export interface AuthSession {
  user: {
    accessToken: string;
    refreshToken: string;
    name?: string;
    uuid: string;
  };
  expires: string;
}

// Auth Provider Types
export type AuthProvider = 'credentials' | 'kakao' | 'google' | 'naver';

// Auth Error Types
export interface AuthError {
  code: string;
  message: string;
  field?: string;
}
