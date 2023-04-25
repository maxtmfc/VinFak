export type AdminFormType = {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
  birthDate: string;
};

export type AdminFromBackend = {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  oauthId: string;
  birthDate: Date;
  image: string;
  admin: boolean;
  statusId: number;
};
