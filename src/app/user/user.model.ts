export interface IMutableUser {
  _id?: string;
  index?: number;
  guid: string;
  isActive?: boolean;
  balance?: string;
  picture?: string;
  age?: number;
  eyeColor?: string;
  name?: string;
  gender?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  about?: string;
  registered?: string;
  latitude?: number;
  longitude?: number;
  friends?: IFriend[];
  greeting?: string;
  favoriteFruit?: string;
}

export interface IUser extends Readonly<IMutableUser> {}

export interface IFriend {
  readonly id: number;
  readonly name: string;
}
