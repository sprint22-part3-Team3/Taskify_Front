export type UserMe = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UploadProfileImageResponse = {
  profileImageUrl: string;
};

export type UpdateUserMeRequest = {
  nickname: string;
  profileImageUrl: string | null;
};

export type UpdatePasswordRequest = {
  password: string;
  newPassword: string;
};
