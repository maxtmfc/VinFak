export type LoggedType = UserFromBackend & {
  status: 'logged';
};

export type FetchingUserType = {
  status: 'fetching';
};

export type GuestType = {
  status: 'guest';
};

export type UserType = GuestType | FetchingUserType | LoggedType;

export type UserFromBackend = {
  id: number;
  email: string;
  name: string;
  admin: boolean;
};

//   в БД мы добавили uuid , поэтому добавить и сюда и в formTypes.ts 