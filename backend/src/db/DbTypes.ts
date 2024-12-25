export interface IUser {
  fullName: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
}
