export interface User {
  fullName: string;
  email: string;
  password: string;
  role?: string;
  root?: boolean;
  avatar?: string;
  accessToken?: string;
  refreshToken?: string;
}
