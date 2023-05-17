export type LoggedType = UserFromBackend & {
  status: 'logged';
  error: '';
};

export type FetchingUserType = UserFromBackend & {
  status: 'fetching';
  error: '';
};

export type GuestType = UserFromBackend & {
  status: 'guest';
  error: '';
};

export type UserType = GuestType | FetchingUserType | LoggedType;

export type UserFromBackend = {
  id: number;
  email: string;
  name: string;
  admin: boolean;
  status: 'guest' | 'fetching' | 'logged';
};

