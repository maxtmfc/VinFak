export type LoggedType = UserFromBackend & {
  status: 'logged';
};

export type FetchingUserType = UserFromBackend & {
  status: 'fetching';
};

export type GuestType = UserFromBackend & {
  status: 'guest';
};

export type UserType = GuestType | FetchingUserType | LoggedType;

export type UserFromBackend = {
  id: number;
  email: string;
  name: string;
  admin: boolean;
};

