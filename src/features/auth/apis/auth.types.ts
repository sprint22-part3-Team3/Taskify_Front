export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type LoginFormValues = LoginRequest;

export type SignupRequest = {
  email: string;
  nickname: string;
  password: string;
};

export type SignupFormValues = SignupRequest & {
  passwordConfirm: string;
  isAgreementChecked: boolean;
};
