import { IUser } from "./user";

export interface IProfile extends IUser {
  subscription: boolean;
}
