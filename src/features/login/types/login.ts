export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: 1;
  name: string;
  username: string;
  role: string;
  token: string;
  refreshToken: string;
};
