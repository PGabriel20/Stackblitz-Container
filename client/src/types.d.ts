export type Session = {
  user: User;
};

export type User = {
  uid: string;
  email: string;
  username: string;
  role: string;
  avatar: string;
};
